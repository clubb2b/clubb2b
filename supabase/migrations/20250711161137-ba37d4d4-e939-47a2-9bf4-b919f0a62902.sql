-- First create sequences with fully qualified names
CREATE SEQUENCE IF NOT EXISTS public.order_number_seq START 1000;
CREATE SEQUENCE IF NOT EXISTS public.quote_number_seq START 1000;

-- Update the function to use the correct sequence reference
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS text
LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN 'CB2B-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('public.order_number_seq')::TEXT, 6, '0');
END;
$function$;

-- Add trigger to orders table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t 
    JOIN pg_class c ON t.tgrelid = c.oid 
    WHERE c.relname = 'orders' AND t.tgname = 'set_order_number_trigger'
  ) THEN
    CREATE TRIGGER set_order_number_trigger
      BEFORE INSERT ON public.orders
      FOR EACH ROW
      EXECUTE FUNCTION public.set_order_number();
  END IF;
END $$;