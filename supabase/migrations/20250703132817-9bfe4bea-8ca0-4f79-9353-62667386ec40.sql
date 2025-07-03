-- Priority 1 & 2: Fix Critical Admin Access Control and Secure Database RLS Policies

-- First, ensure the get_user_role function works correctly (it should already exist)
-- This function is needed for secure role-based RLS policies

-- Fix customer_communications policies
DROP POLICY IF EXISTS "Admin full access to customer_communications" ON public.customer_communications;
CREATE POLICY "Admin full access to customer_communications" 
ON public.customer_communications 
FOR ALL 
USING (public.get_user_role() = 'admin');

-- Fix customers policies  
DROP POLICY IF EXISTS "Admin full access to customers" ON public.customers;
CREATE POLICY "Admin full access to customers" 
ON public.customers 
FOR ALL 
USING (public.get_user_role() = 'admin');

-- Fix documents policies (replace JWT-based check with proper role check)
DROP POLICY IF EXISTS "Admin full access to documents" ON public.documents;
CREATE POLICY "Admin full access to documents" 
ON public.documents 
FOR ALL 
USING (public.get_user_role() = 'admin');

-- Fix leads policies
DROP POLICY IF EXISTS "Admin full access to leads" ON public.leads;
CREATE POLICY "Admin full access to leads" 
ON public.leads 
FOR ALL 
USING (public.get_user_role() = 'admin');

-- Fix order_payments policies
DROP POLICY IF EXISTS "Admin full access to order_payments" ON public.order_payments;
CREATE POLICY "Admin full access to order_payments" 
ON public.order_payments 
FOR ALL 
USING (public.get_user_role() = 'admin');

-- Fix orders policies
DROP POLICY IF EXISTS "Admin full access to orders" ON public.orders;
CREATE POLICY "Admin full access to orders" 
ON public.orders 
FOR ALL 
USING (public.get_user_role() = 'admin');

-- Fix quotes policies
DROP POLICY IF EXISTS "Admin full access to quotes" ON public.quotes;
CREATE POLICY "Admin full access to quotes" 
ON public.quotes 
FOR ALL 
USING (public.get_user_role() = 'admin');

-- Fix vehicle_images policies
DROP POLICY IF EXISTS "Admin full access to vehicle_images" ON public.vehicle_images;
CREATE POLICY "Admin full access to vehicle_images" 
ON public.vehicle_images 
FOR ALL 
USING (public.get_user_role() = 'admin');

-- Fix vehicles policies
DROP POLICY IF EXISTS "Admin full access to vehicles" ON public.vehicles;
CREATE POLICY "Admin full access to vehicles" 
ON public.vehicles 
FOR ALL 
USING (public.get_user_role() = 'admin');

-- Enhance data privacy: Restrict profile visibility to users and admins only
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.get_user_role() = 'admin');

-- Ensure admin users can still manage profiles
-- (The existing "Admins can manage all profiles" policy should handle this)

-- Add user-scoped policies where missing for enhanced security
-- Enhanced customer communications - users should only see communications for their customers
CREATE POLICY "Users can view communications for their customers" 
ON public.customer_communications 
FOR SELECT 
USING (customer_id IN (
  SELECT id FROM public.customers WHERE user_id = auth.uid()
));

-- Add audit trail for role changes (create a simple audit table)
CREATE TABLE IF NOT EXISTS public.role_changes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  old_role TEXT,
  new_role TEXT NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reason TEXT
);

-- Enable RLS on role_changes table
ALTER TABLE public.role_changes ENABLE ROW LEVEL SECURITY;

-- Only admins can view role changes
CREATE POLICY "Admins can view all role changes" 
ON public.role_changes 
FOR SELECT 
USING (public.get_user_role() = 'admin');

-- Only admins can insert role changes
CREATE POLICY "Admins can record role changes" 
ON public.role_changes 
FOR INSERT 
WITH CHECK (public.get_user_role() = 'admin');

-- Create trigger to automatically log role changes
CREATE OR REPLACE FUNCTION public.log_role_changes()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if role actually changed
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    INSERT INTO public.role_changes (user_id, old_role, new_role, changed_by)
    VALUES (NEW.id, OLD.role, NEW.role, auth.uid());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add trigger to profiles table
DROP TRIGGER IF EXISTS log_profile_role_changes ON public.profiles;
CREATE TRIGGER log_profile_role_changes
  AFTER UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.log_role_changes();