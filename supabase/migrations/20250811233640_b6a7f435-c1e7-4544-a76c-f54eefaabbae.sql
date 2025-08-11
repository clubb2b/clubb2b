
-- Create user roles enum and table for proper role management
CREATE TYPE public.user_role AS ENUM ('user', 'admin', 'vip');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'user',
  assigned_by UUID REFERENCES auth.users(id),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID DEFAULT auth.uid())
RETURNS TEXT
LANGUAGE SQL
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role::text FROM public.user_roles WHERE user_id = $1 AND role IN ('admin', 'vip') 
  UNION ALL 
  SELECT 'user'::text WHERE NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = $1)
  LIMIT 1;
$$;

-- Create function to check if user has specific role
CREATE OR REPLACE FUNCTION public.has_role(check_user_id UUID, check_role TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = check_user_id AND role::text = check_role
  );
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Migrate existing profile roles to user_roles table
INSERT INTO public.user_roles (user_id, role, assigned_at)
SELECT id, role::user_role, created_at
FROM public.profiles 
WHERE role IS NOT NULL AND role != 'user'
ON CONFLICT (user_id, role) DO NOTHING;

-- Create trigger to prevent direct role updates on profiles
CREATE OR REPLACE FUNCTION public.prevent_role_updates()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins to update roles, and prevent self-promotion
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    IF NOT public.has_role(auth.uid(), 'admin') THEN
      RAISE EXCEPTION 'Only administrators can change user roles';
    END IF;
    
    IF auth.uid() = NEW.id THEN
      RAISE EXCEPTION 'Users cannot change their own role';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Add trigger to profiles table
DROP TRIGGER IF EXISTS prevent_role_updates_trigger ON public.profiles;
CREATE TRIGGER prevent_role_updates_trigger
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_role_updates();

-- Create trigger to prevent unauthorized membership upgrades
CREATE OR REPLACE FUNCTION public.prevent_membership_abuse()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Prevent users from creating premium memberships for themselves
  IF NEW.tier != 'basic' AND NEW.user_id = auth.uid() THEN
    IF NOT public.has_role(auth.uid(), 'admin') THEN
      RAISE EXCEPTION 'Premium memberships must be approved by administrators';
    END IF;
  END IF;
  
  -- Prevent status changes from pending without admin approval
  IF TG_OP = 'UPDATE' AND OLD.status = 'pending' AND NEW.status = 'active' THEN
    IF NOT public.has_role(auth.uid(), 'admin') THEN
      RAISE EXCEPTION 'Membership activation requires administrator approval';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Add trigger to vip_memberships table
DROP TRIGGER IF EXISTS prevent_membership_abuse_trigger ON public.vip_memberships;
CREATE TRIGGER prevent_membership_abuse_trigger
  BEFORE INSERT OR UPDATE ON public.vip_memberships
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_membership_abuse();

-- Update existing get_user_role function to use new table
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID DEFAULT auth.uid())
RETURNS TEXT
LANGUAGE SQL
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT role::text FROM public.user_roles WHERE user_id = $1 ORDER BY 
     CASE role 
       WHEN 'admin' THEN 1 
       WHEN 'vip' THEN 2 
       ELSE 3 
     END LIMIT 1),
    'user'
  );
$$;

-- Create rate limiting table for contact form
CREATE TABLE public.contact_form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  ip_address INET,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_agent TEXT
);

-- Enable RLS on contact submissions
ALTER TABLE public.contact_form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for contact submissions (admins only can view)
CREATE POLICY "Admins can view contact submissions" ON public.contact_form_submissions
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Allow contact form submissions" ON public.contact_form_submissions
  FOR INSERT WITH CHECK (true);

-- Create function to check rate limits
CREATE OR REPLACE FUNCTION public.check_contact_rate_limit(check_email TEXT, check_ip INET)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM public.contact_form_submissions 
    WHERE (email = check_email OR ip_address = check_ip)
    AND submitted_at > now() - INTERVAL '1 hour'
    HAVING COUNT(*) >= 3
  );
$$;
