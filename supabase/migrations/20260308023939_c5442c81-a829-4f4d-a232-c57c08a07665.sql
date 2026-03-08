-- Fix 1: PRIVILEGE_ESCALATION_MEMBERSHIP
-- Drop existing permissive INSERT/UPDATE policies on vip_memberships
DROP POLICY IF EXISTS "Users can create their own memberships" ON public.vip_memberships;
DROP POLICY IF EXISTS "Users can update their own memberships" ON public.vip_memberships;

-- New INSERT policy: users can only create memberships with status='pending' and tier='basic'
CREATE POLICY "Users can create their own memberships"
ON public.vip_memberships
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid()
  AND status = 'pending'
  AND tier = 'basic'
);

-- New UPDATE policy: users can update their own memberships but trigger prevents sensitive changes
CREATE POLICY "Users can update their own memberships"
ON public.vip_memberships
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create a trigger to prevent users from modifying restricted columns
CREATE OR REPLACE FUNCTION public.prevent_membership_self_promotion()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.has_role(auth.uid(), 'admin') THEN
    RETURN NEW;
  END IF;
  IF OLD.tier IS DISTINCT FROM NEW.tier THEN
    RAISE EXCEPTION 'Only administrators can change membership tier';
  END IF;
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    RAISE EXCEPTION 'Only administrators can change membership status';
  END IF;
  IF OLD.monthly_price IS DISTINCT FROM NEW.monthly_price THEN
    RAISE EXCEPTION 'Only administrators can change membership price';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS prevent_membership_self_promotion_trigger ON public.vip_memberships;
CREATE TRIGGER prevent_membership_self_promotion_trigger
  BEFORE UPDATE ON public.vip_memberships
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_membership_self_promotion();

-- Add admin full access policy for vip_memberships
DROP POLICY IF EXISTS "Admin full access to memberships" ON public.vip_memberships;
CREATE POLICY "Admin full access to memberships"
ON public.vip_memberships
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fix 2: SELF_PRIVILEGE_ESCALATION_PROFILE
CREATE OR REPLACE FUNCTION public.prevent_profile_self_promotion()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.has_role(auth.uid(), 'admin') THEN
    RETURN NEW;
  END IF;
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    RAISE EXCEPTION 'Only administrators can change user roles';
  END IF;
  IF OLD.membership_tier IS DISTINCT FROM NEW.membership_tier THEN
    RAISE EXCEPTION 'Only administrators can change membership tier';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS prevent_profile_self_promotion_trigger ON public.profiles;
CREATE TRIGGER prevent_profile_self_promotion_trigger
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_profile_self_promotion();