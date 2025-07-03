-- Create VIP membership tiers system
CREATE TYPE public.membership_tier AS ENUM ('basic', 'premium', 'vip', 'ultra_vip', 'platinum');
CREATE TYPE public.subscription_status AS ENUM ('active', 'cancelled', 'expired', 'pending');
CREATE TYPE public.payment_frequency AS ENUM ('monthly', 'quarterly', 'yearly');

-- VIP Memberships table
CREATE TABLE public.vip_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tier membership_tier NOT NULL DEFAULT 'basic',
  status subscription_status NOT NULL DEFAULT 'pending',
  payment_frequency payment_frequency NOT NULL DEFAULT 'monthly',
  monthly_price DECIMAL(10,2) NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  auto_renew BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Membership benefits table
CREATE TABLE public.membership_benefits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier membership_tier NOT NULL,
  benefit_name TEXT NOT NULL,
  benefit_description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transaction fees table
CREATE TABLE public.transaction_fees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_tier membership_tier NOT NULL,
  service_type TEXT NOT NULL, -- 'sales', 'rental', 'import_export'
  fee_percentage DECIMAL(5,2) NOT NULL,
  min_fee DECIMAL(10,2),
  max_fee DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced payments table
CREATE TABLE public.enhanced_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  membership_id UUID REFERENCES vip_memberships(id) ON DELETE SET NULL,
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  payment_method TEXT NOT NULL, -- 'card', 'crypto', 'wire', 'paypal'
  crypto_currency TEXT, -- 'BTC', 'ETH', 'USDC', etc.
  crypto_address TEXT,
  transaction_hash TEXT,
  stripe_payment_intent_id TEXT,
  status TEXT DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics events table
CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_category TEXT NOT NULL,
  event_data JSONB,
  page_url TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.vip_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transaction_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enhanced_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own memberships" ON public.vip_memberships
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own memberships" ON public.vip_memberships
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view membership benefits" ON public.membership_benefits
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view transaction fees" ON public.transaction_fees
  FOR SELECT USING (true);

CREATE POLICY "Users can view their own payments" ON public.enhanced_payments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payments" ON public.enhanced_payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can create analytics events" ON public.analytics_events
  FOR INSERT WITH CHECK (true);

-- Insert default membership benefits
INSERT INTO public.membership_benefits (tier, benefit_name, benefit_description) VALUES
('basic', 'Standard Support', 'Email support within 48 hours'),
('basic', 'Basic Listings', 'List up to 5 vehicles'),
('premium', 'Priority Support', 'Email and phone support within 24 hours'),
('premium', 'Enhanced Listings', 'List up to 20 vehicles with premium features'),
('premium', 'Market Analytics', 'Basic market insights and reports'),
('vip', 'VIP Support', '24/7 phone and chat support'),
('vip', 'Unlimited Listings', 'Unlimited vehicle listings'),
('vip', 'Advanced Analytics', 'Detailed market analytics and trends'),
('vip', 'White-Glove Service', 'Personal account manager'),
('ultra_vip', 'Concierge Service', 'Full concierge and personal shopping'),
('ultra_vip', 'Private Events', 'Access to exclusive automotive events'),
('ultra_vip', 'Custom Solutions', 'Tailored business solutions'),
('platinum', 'White-Label Access', 'License to use our platform'),
('platinum', 'API Access', 'Full API access for integrations'),
('platinum', 'Revenue Sharing', 'Partnership revenue opportunities');

-- Insert transaction fees by tier
INSERT INTO public.transaction_fees (membership_tier, service_type, fee_percentage, min_fee, max_fee) VALUES
('basic', 'sales', 8.00, 50.00, 5000.00),
('basic', 'rental', 15.00, 25.00, 1000.00),
('basic', 'import_export', 10.00, 100.00, 10000.00),
('premium', 'sales', 6.00, 40.00, 4000.00),
('premium', 'rental', 12.00, 20.00, 800.00),
('premium', 'import_export', 8.00, 80.00, 8000.00),
('vip', 'sales', 4.00, 30.00, 3000.00),
('vip', 'rental', 8.00, 15.00, 600.00),
('vip', 'import_export', 5.00, 50.00, 5000.00),
('ultra_vip', 'sales', 3.00, 20.00, 2000.00),
('ultra_vip', 'rental', 5.00, 10.00, 400.00),
('ultra_vip', 'import_export', 3.00, 30.00, 3000.00),
('platinum', 'sales', 2.00, 10.00, 1000.00),
('platinum', 'rental', 3.00, 5.00, 200.00),
('platinum', 'import_export', 2.00, 20.00, 2000.00);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_vip_memberships_updated_at
    BEFORE UPDATE ON public.vip_memberships
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enhanced_payments_updated_at
    BEFORE UPDATE ON public.enhanced_payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();