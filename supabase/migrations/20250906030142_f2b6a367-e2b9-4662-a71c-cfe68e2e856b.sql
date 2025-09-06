-- Fix transaction fees security issue by restricting access to authenticated users only
DROP POLICY IF EXISTS "Anyone can view transaction fees" ON public.transaction_fees;

-- Create new policy that only allows authenticated users to view transaction fees
CREATE POLICY "Authenticated users can view transaction fees" 
ON public.transaction_fees 
FOR SELECT 
TO authenticated
USING (true);

-- Alternatively, if you want to restrict to admins only, use this instead:
-- CREATE POLICY "Admins can view transaction fees" 
-- ON public.transaction_fees 
-- FOR SELECT 
-- USING (get_user_role() = 'admin'::text);