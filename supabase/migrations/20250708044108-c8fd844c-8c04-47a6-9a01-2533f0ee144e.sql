-- Insert sample realistic data for the dashboard

-- Insert sample vehicles
INSERT INTO vehicles (make, model, year, price, currency, condition, status, location, mileage, fuel_type, transmission, exterior_color, interior_color) VALUES
('Ferrari', '488 GTB', 2021, 285000, 'USD', 'excellent', 'available', 'Toronto, Canada', 8500, 'Gasoline', 'Automatic', 'Rosso Corsa Red', 'Black Leather'),
('Lamborghini', 'Huracan Evo', 2022, 320000, 'USD', 'excellent', 'available', 'Vancouver, Canada', 3200, 'Gasoline', 'Automatic', 'Arancio Borealis Orange', 'Black Alcantara'),
('McLaren', '720S', 2020, 295000, 'USD', 'excellent', 'available', 'Montreal, Canada', 12000, 'Gasoline', 'Automatic', 'Volcano Yellow', 'Carbon Black'),
('Porsche', '911 Turbo S', 2023, 245000, 'USD', 'excellent', 'available', 'Calgary, Canada', 1800, 'Gasoline', 'Automatic', 'Guards Red', 'Black Leather'),
('Aston Martin', 'DB11 V8', 2021, 225000, 'USD', 'excellent', 'sold', 'Toronto, Canada', 6500, 'Gasoline', 'Automatic', 'Midnight Blue', 'Tan Leather'),
('Bentley', 'Continental GT', 2022, 275000, 'USD', 'excellent', 'available', 'Vancouver, Canada', 4200, 'Gasoline', 'Automatic', 'Beluga Black', 'Beluga Leather'),
('Rolls-Royce', 'Wraith', 2020, 365000, 'USD', 'excellent', 'sold', 'Toronto, Canada', 8900, 'Gasoline', 'Automatic', 'Arctic White', 'Navy Blue Leather'),
('Mercedes-AMG', 'GT 63 S', 2023, 185000, 'USD', 'excellent', 'available', 'Ottawa, Canada', 2100, 'Gasoline', 'Automatic', 'AMG Solarbeam Yellow', 'Black Nappa Leather'),
('BMW', 'M8 Competition', 2022, 165000, 'USD', 'excellent', 'available', 'Montreal, Canada', 5600, 'Gasoline', 'Automatic', 'Frozen Dark Grey', 'Merino Leather'),
('Audi', 'R8 V10 Plus', 2021, 195000, 'USD', 'excellent', 'available', 'Calgary, Canada', 7200, 'Gasoline', 'Automatic', 'Suzuka Grey', 'Black Fine Nappa');

-- Insert sample customers
INSERT INTO customers (first_name, last_name, email, phone, company, country, address, customer_type, status, preferred_currency) VALUES
('Alexander', 'Windsor', 'a.windsor@luxurygroup.com', '+1-416-555-0123', 'Windsor Luxury Group', 'Canada', '1 Bloor St E, Toronto, ON M4W 1A9', 'business', 'active', 'USD'),
('Victoria', 'Chen', 'victoria.chen@techcorp.com', '+1-604-555-0145', 'Chen Tech Corp', 'Canada', '1055 W Georgia St, Vancouver, BC V6E 3P3', 'business', 'active', 'CAD'),
('James', 'Morrison', 'james.morrison@gmail.com', '+1-514-555-0167', null, 'Canada', '1250 René-Lévesque Blvd W, Montreal, QC H3B 4W8', 'individual', 'active', 'USD'),
('Sophia', 'Williams', 'sophia.w@williams-invest.com', '+1-403-555-0189', 'Williams Investment', 'Canada', '700 2 St SW, Calgary, AB T2P 2W2', 'business', 'active', 'USD'),
('Michael', 'Thompson', 'mthompson@realestate.ca', '+1-613-555-0201', 'Thompson Real Estate', 'Canada', '150 Elgin St, Ottawa, ON K2P 1L4', 'business', 'active', 'CAD'),
('Emma', 'Davies', 'emma.davies@hotmail.com', '+1-416-555-0223', null, 'Canada', '88 Harbour St, Toronto, ON M5J 2G2', 'individual', 'active', 'USD'),
('Robert', 'Johnson', 'r.johnson@maritime.com', '+1-902-555-0245', 'Maritime Holdings', 'Canada', '1800 Argyle St, Halifax, NS B3J 3N8', 'business', 'active', 'CAD'),
('Isabella', 'Martinez', 'isabella@luxlifestyle.com', '+1-604-555-0267', 'Luxury Lifestyle Inc', 'Canada', '999 W Hastings St, Vancouver, BC V6C 2W2', 'business', 'active', 'USD');

-- Insert sample orders
INSERT INTO orders (customer_id, vehicle_id, order_type, total_amount, currency, order_status, payment_status, payment_method, shipping_method, estimated_delivery) 
SELECT 
  c.id,
  v.id,
  'sale',
  v.price,
  v.currency,
  CASE 
    WHEN v.status = 'sold' THEN 'completed'
    ELSE 'pending'
  END,
  CASE 
    WHEN v.status = 'sold' THEN 'completed'
    ELSE 'pending'
  END,
  'wire_transfer',
  'enclosed_trailer',
  CURRENT_DATE + INTERVAL '14 days'
FROM customers c
CROSS JOIN vehicles v
WHERE (c.email = 'a.windsor@luxurygroup.com' AND v.make = 'Aston Martin')
   OR (c.email = 'james.morrison@gmail.com' AND v.make = 'Rolls-Royce')
LIMIT 2;

-- Insert sample VIP memberships
INSERT INTO vip_memberships (user_id, tier, status, monthly_price, payment_frequency, start_date, end_date)
SELECT 
  gen_random_uuid(), -- placeholder user_id
  CASE 
    WHEN ROW_NUMBER() OVER() % 5 = 1 THEN 'platinum'
    WHEN ROW_NUMBER() OVER() % 5 = 2 THEN 'ultra_vip'
    WHEN ROW_NUMBER() OVER() % 5 = 3 THEN 'vip'
    WHEN ROW_NUMBER() OVER() % 5 = 4 THEN 'premium'
    ELSE 'basic'
  END,
  'active',
  CASE 
    WHEN ROW_NUMBER() OVER() % 5 = 1 THEN 2500.00
    WHEN ROW_NUMBER() OVER() % 5 = 2 THEN 1200.00
    WHEN ROW_NUMBER() OVER() % 5 = 3 THEN 500.00
    WHEN ROW_NUMBER() OVER() % 5 = 4 THEN 200.00
    ELSE 50.00
  END,
  'monthly',
  CURRENT_DATE - INTERVAL '3 months',
  CURRENT_DATE + INTERVAL '9 months'
FROM generate_series(1, 25);

-- Insert some analytics events
INSERT INTO analytics_events (event_type, event_category, event_data, page_url, user_agent)
SELECT 
  CASE (random() * 4)::int
    WHEN 0 THEN 'page_view'
    WHEN 1 THEN 'vehicle_view'
    WHEN 2 THEN 'quote_request'
    ELSE 'contact_form'
  END,
  'user_engagement',
  jsonb_build_object(
    'timestamp', NOW() - (random() * INTERVAL '30 days'),
    'session_id', gen_random_uuid()
  ),
  CASE (random() * 5)::int
    WHEN 0 THEN '/cars-for-sale'
    WHEN 1 THEN '/vip-membership'
    WHEN 2 THEN '/import-export'
    WHEN 3 THEN '/video-inspection'
    ELSE '/'
  END,
  'Mozilla/5.0 (compatible; CLUB B2B Performance Analytics)'
FROM generate_series(1, 150);