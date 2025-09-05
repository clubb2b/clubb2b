-- Fix security issue with contact_form_submissions table
-- Drop the existing permissive insert policy
DROP POLICY IF EXISTS "Allow contact form submissions" ON public.contact_form_submissions;

-- Create a more secure insert policy that only allows service role or authenticated edge functions
CREATE POLICY "Allow secure contact form submissions" 
ON public.contact_form_submissions 
FOR INSERT 
WITH CHECK (
  -- Only allow inserts from service role (edge functions) or with proper validation
  auth.role() = 'service_role' OR 
  (
    email IS NOT NULL AND 
    email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
    length(email) <= 255
  )
);

-- Add explicit policies to prevent unauthorized updates and deletes
CREATE POLICY "Prevent contact submission updates" 
ON public.contact_form_submissions 
FOR UPDATE 
WITH CHECK (false);

CREATE POLICY "Prevent contact submission deletes" 
ON public.contact_form_submissions 
FOR DELETE 
USING (false);

-- Add a more restrictive admin-only select policy (replace existing)
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_form_submissions;

CREATE POLICY "Admin only access to contact submissions" 
ON public.contact_form_submissions 
FOR SELECT 
USING (
  auth.role() = 'service_role' OR 
  has_role(auth.uid(), 'admin'::text)
);

-- Add a function to validate contact form submissions with rate limiting
CREATE OR REPLACE FUNCTION public.secure_contact_submission(
  p_email text,
  p_ip_address inet,
  p_user_agent text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  submission_id uuid;
BEGIN
  -- Validate email format
  IF p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Check rate limit (using existing function)
  IF NOT check_contact_rate_limit(p_email, p_ip_address) THEN
    RAISE EXCEPTION 'Rate limit exceeded';
  END IF;
  
  -- Insert the submission
  INSERT INTO public.contact_form_submissions (email, ip_address, user_agent)
  VALUES (p_email, p_ip_address, p_user_agent)
  RETURNING id INTO submission_id;
  
  RETURN submission_id;
END;
$$;