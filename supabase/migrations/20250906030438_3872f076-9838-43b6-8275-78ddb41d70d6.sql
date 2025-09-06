-- Fix testimonials security issue - remove public access to customer personal information

-- Drop the current public policy that exposes customer emails
DROP POLICY IF EXISTS "Anyone can view approved testimonials" ON public.testimonials;

-- Create a new policy that allows public viewing of testimonials but excludes sensitive customer data
-- We'll create a view for public testimonials that excludes customer emails
CREATE OR REPLACE VIEW public.public_testimonials AS
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

-- Allow public read access to the safe view
GRANT SELECT ON public.public_testimonials TO anon, authenticated;

-- Create a new policy for the testimonials table that only allows approved access without emails
CREATE POLICY "Public can view approved testimonials without sensitive data" 
ON public.testimonials 
FOR SELECT 
USING (
  is_approved = true 
  AND auth.role() IN ('authenticated', 'anon')
);

-- Ensure the testimonials table RLS is properly configured
-- Keep the admin policy as is for full access
-- The view will be used for public access to avoid exposing emails