
-- Create vehicle inventory table
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  vin TEXT UNIQUE,
  price DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  mileage INTEGER,
  exterior_color TEXT,
  interior_color TEXT,
  transmission TEXT,
  fuel_type TEXT,
  engine_details TEXT,
  features TEXT[],
  description TEXT,
  condition TEXT DEFAULT 'excellent',
  status TEXT DEFAULT 'available', -- available, reserved, sold
  location TEXT DEFAULT 'Canada',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vehicle images table
CREATE TABLE public.vehicle_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customers table
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  country TEXT,
  address TEXT,
  preferred_currency TEXT DEFAULT 'USD',
  customer_type TEXT DEFAULT 'individual', -- individual, business, dealer
  status TEXT DEFAULT 'active', -- active, inactive, vip
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.customers(id) NOT NULL,
  vehicle_id UUID REFERENCES public.vehicles(id),
  order_type TEXT NOT NULL, -- vehicle_purchase, export_service, vip_rental
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  payment_status TEXT DEFAULT 'pending', -- pending, partial, paid, refunded
  order_status TEXT DEFAULT 'created', -- created, confirmed, processing, shipped, delivered, cancelled
  payment_method TEXT,
  shipping_method TEXT,
  shipping_address TEXT,
  estimated_delivery DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order payments table
CREATE TABLE public.order_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  payment_method TEXT NOT NULL,
  payment_type TEXT NOT NULL, -- deposit, installment, full_payment
  transaction_id TEXT,
  status TEXT DEFAULT 'pending', -- pending, completed, failed, refunded
  payment_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quotes table
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.customers(id),
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  vehicle_type TEXT,
  vehicle_value DECIMAL(10,2),
  from_country TEXT DEFAULT 'canada',
  to_country TEXT NOT NULL,
  shipping_method TEXT NOT NULL, -- maritime, air
  insurance_included BOOLEAN DEFAULT true,
  expedited_service BOOLEAN DEFAULT false,
  shipping_cost DECIMAL(10,2),
  customs_duties DECIMAL(10,2),
  insurance_cost DECIMAL(10,2),
  documentation_fee DECIMAL(10,2),
  inspection_cost DECIMAL(10,2),
  total_cost DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  estimated_timeline TEXT,
  status TEXT DEFAULT 'draft', -- draft, sent, accepted, expired
  valid_until DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create documents table
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.customers(id),
  order_id UUID REFERENCES public.orders(id),
  quote_id UUID REFERENCES public.quotes(id),
  document_type TEXT NOT NULL, -- contract, invoice, export_permit, insurance, customs, shipping
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected, signed
  uploaded_by TEXT,
  signature_required BOOLEAN DEFAULT false,
  signature_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customer communications table (CRM)
CREATE TABLE public.customer_communications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.customers(id) NOT NULL,
  communication_type TEXT NOT NULL, -- email, phone, whatsapp, meeting, note
  subject TEXT,
  content TEXT NOT NULL,
  direction TEXT NOT NULL, -- inbound, outbound
  status TEXT DEFAULT 'completed', -- pending, completed, failed
  follow_up_required BOOLEAN DEFAULT false,
  follow_up_date DATE,
  created_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  country TEXT,
  interest_type TEXT, -- vehicle_purchase, export_service, vip_rental
  vehicle_interest TEXT,
  budget_range TEXT,
  timeline TEXT,
  source TEXT, -- website, referral, social_media, advertisement
  status TEXT DEFAULT 'new', -- new, contacted, qualified, converted, lost
  assigned_to TEXT,
  last_contact_date TIMESTAMP WITH TIME ZONE,
  next_follow_up DATE,
  conversion_probability INTEGER DEFAULT 0, -- 0-100%
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create public read policies for vehicles (for public browsing)
CREATE POLICY "Anyone can view available vehicles" ON public.vehicles
  FOR SELECT USING (status = 'available');

CREATE POLICY "Anyone can view vehicle images" ON public.vehicle_images
  FOR SELECT USING (true);

-- Create policies for authenticated users to manage their own data
CREATE POLICY "Users can view their customer data" ON public.customers
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view their orders" ON public.orders
  FOR SELECT USING (customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

CREATE POLICY "Users can view their payments" ON public.order_payments
  FOR SELECT USING (order_id IN (SELECT id FROM public.orders WHERE customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid())));

CREATE POLICY "Users can view their quotes" ON public.quotes
  FOR SELECT USING (customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

CREATE POLICY "Users can view their documents" ON public.documents
  FOR SELECT USING (customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

-- Create admin policies (you'll need to implement user roles later)
CREATE POLICY "Admin full access to vehicles" ON public.vehicles
  FOR ALL USING (true);

CREATE POLICY "Admin full access to vehicle_images" ON public.vehicle_images
  FOR ALL USING (true);

CREATE POLICY "Admin full access to customers" ON public.customers
  FOR ALL USING (true);

CREATE POLICY "Admin full access to orders" ON public.orders
  FOR ALL USING (true);

CREATE POLICY "Admin full access to order_payments" ON public.order_payments
  FOR ALL USING (true);

CREATE POLICY "Admin full access to quotes" ON public.quotes
  FOR ALL USING (true);

CREATE POLICY "Admin full access to documents" ON public.documents
  FOR ALL USING (true);

CREATE POLICY "Admin full access to customer_communications" ON public.customer_communications
  FOR ALL USING (true);

CREATE POLICY "Admin full access to leads" ON public.leads
  FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX idx_vehicles_status ON public.vehicles(status);
CREATE INDEX idx_vehicles_make_model ON public.vehicles(make, model);
CREATE INDEX idx_vehicle_images_vehicle_id ON public.vehicle_images(vehicle_id);
CREATE INDEX idx_customers_email ON public.customers(email);
CREATE INDEX idx_customers_user_id ON public.customers(user_id);
CREATE INDEX idx_orders_customer_id ON public.orders(customer_id);
CREATE INDEX idx_orders_status ON public.orders(order_status);
CREATE INDEX idx_order_payments_order_id ON public.order_payments(order_id);
CREATE INDEX idx_quotes_customer_email ON public.quotes(customer_email);
CREATE INDEX idx_documents_customer_id ON public.documents(customer_id);
CREATE INDEX idx_documents_order_id ON public.documents(order_id);
CREATE INDEX idx_customer_communications_customer_id ON public.customer_communications(customer_id);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_email ON public.leads(email);

-- Create function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'CB2B-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Create sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1000;

-- Create function to generate quote numbers
CREATE OR REPLACE FUNCTION generate_quote_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'QT-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('quote_number_seq')::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Create sequence for quote numbers
CREATE SEQUENCE IF NOT EXISTS quote_number_seq START 1000;

-- Create trigger to auto-generate order numbers
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_order_number
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();

-- Create trigger to auto-generate quote numbers
CREATE OR REPLACE FUNCTION set_quote_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.quote_number IS NULL THEN
    NEW.quote_number := generate_quote_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_quote_number
  BEFORE INSERT ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION set_quote_number();
