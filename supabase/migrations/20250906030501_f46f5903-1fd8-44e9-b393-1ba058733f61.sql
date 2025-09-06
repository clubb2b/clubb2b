-- Fix the security definer view issue by recreating the view without SECURITY DEFINER
-- and using proper RLS policies instead

-- Drop the existing view
DROP VIEW IF EXISTS public.public_testimonials;

-- Recreate the view without SECURITY DEFINER (default is SECURITY INVOKER which is safer)
CREATE VIEW public.public_testimonials AS
SELECT 
  id,
  customer_name,
  customer_location,
  vehicle_purchased,
  review_text,
  rating,
  image_url,
  is_featured,
  created_at
FROM public.testimonials 
WHERE is_approved = true;

-- Enable RLS on the view
ALTER VIEW public.public_testimonials SET (security_invoker = true);

-- Grant appropriate permissions
GRANT SELECT ON public.public_testimonials TO anon, authenticated;

-- Update the testimonials table policy to be more restrictive
-- Remove the previous policy and create a more secure one
DROP POLICY IF EXISTS "Public can view approved testimonials without sensitive data" ON public.testimonials;

-- Create a policy that only allows viewing testimonials through proper authentication
-- For public access, they should use the public_testimonials view instead
CREATE POLICY "Only authenticated users can view testimonials directly" 
ON public.testimonials 
FOR SELECT 
TO authenticated
USING (is_approved = true);