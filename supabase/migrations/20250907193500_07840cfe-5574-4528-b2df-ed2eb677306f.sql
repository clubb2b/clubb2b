-- Fix testimonials table access to prevent customer email exposure
-- Only admins should access the full testimonials table with sensitive data
-- Everyone else should use the public_testimonials view

-- Drop the current policy that allows authenticated users to see all approved testimonials
DROP POLICY IF EXISTS "Only authenticated users can view testimonials directly" ON public.testimonials;

-- Create a new restrictive policy - only admins can access the testimonials table directly
CREATE POLICY "Admin only access to testimonials with sensitive data" 
ON public.testimonials 
FOR SELECT 
TO authenticated
USING (get_user_role() = 'admin');

-- Ensure the public_testimonials view has proper access for everyone
-- This view already excludes customer_email and other sensitive data
GRANT SELECT ON public.public_testimonials TO anon, authenticated;

-- Add a comment to document the security approach
COMMENT ON VIEW public.public_testimonials IS 'Public-safe view of testimonials that excludes sensitive customer data like emails. Use this for public display instead of the testimonials table directly.';