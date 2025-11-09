-- Make enhanced_payments.user_id NOT NULL to enforce data integrity
-- This ensures all payment records are properly associated with a user
ALTER TABLE public.enhanced_payments 
  ALTER COLUMN user_id SET NOT NULL;

-- Add a comment to document the security requirement
COMMENT ON COLUMN public.enhanced_payments.user_id IS 'Required user association for all payment records. Enforced by RLS policies and database constraint.';