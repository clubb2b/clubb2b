
-- Insert sample luxury vehicles
INSERT INTO public.vehicles (make, model, year, vin, price, currency, mileage, exterior_color, interior_color, transmission, fuel_type, engine_details, features, description, condition, status, location) VALUES
-- BMW Collection
('BMW', 'X7 M50i', 2024, 'WBAJE8C07RCF12345', 120000, 'USD', 15000, 'Alpine White', 'Cognac Leather', 'Automatic', 'Gasoline', '4.4L V8 Twin-Turbo 523HP', 
 ARRAY['Panoramic Sunroof', 'Harman Kardon Audio', 'Adaptive Cruise Control', 'Night Vision', 'Executive Lounge Seating'], 
 'Pristine 2024 BMW X7 M50i with executive package. Perfect for luxury transport with unmatched comfort and performance.', 'Excellent', 'Available', 'Vancouver, BC'),

('BMW', 'M8 Competition Coupe', 2023, 'WBSDM9C08NCF67890', 165000, 'USD', 8500, 'Frozen Dark Grey', 'Merino Black/Red', 'Automatic', 'Gasoline', '4.4L V8 Twin-Turbo 617HP',
 ARRAY['Carbon Fiber Package', 'M Driver Package', 'B&O Sound System', 'Laser Headlights', 'Carbon Ceramic Brakes'],
 'Stunning M8 Competition Coupe with carbon fiber accents. Track-bred performance meets luxury refinement.', 'Excellent', 'Available', 'Toronto, ON'),

-- Mercedes Collection  
('Mercedes-Benz', 'S63 AMG', 2024, 'WDDUG8FB8RA123456', 185000, 'USD', 5200, 'Obsidian Black', 'Nappa Leather Beige', 'Automatic', 'Gasoline', '4.0L V8 BiTurbo 603HP',
 ARRAY['Executive Rear Seating', 'Burmester 4D Surround Sound', 'Magic Body Control', 'First Class Rear', 'AMG Performance Package'],
 'The pinnacle of luxury sedans. This S63 AMG offers first-class comfort with supercar performance.', 'Like New', 'Available', 'Montreal, QC'),

('Mercedes-Benz', 'G63 AMG', 2023, 'WDCYC7HH8NX234567', 195000, 'USD', 12000, 'Diamond White', 'AMG Black Leather', 'Automatic', 'Gasoline', '4.0L V8 BiTurbo 577HP',
 ARRAY['AMG Night Package', 'Carbon Fiber Trim', 'Off-Road Package', 'Adaptive Damping', 'AMG Performance Exhaust'],
 'Iconic G-Wagon with AMG performance. Combines luxury with legendary off-road capability.', 'Excellent', 'Available', 'Calgary, AB'),

-- Porsche Collection
('Porsche', '911 Turbo S', 2024, 'WP0AB2A99PS345678', 275000, 'USD', 3500, 'GT Silver', 'Black/Bordeaux Red', 'PDK', 'Gasoline', '3.8L H6 Twin-Turbo 640HP',
 ARRAY['Sport Chrono Package', 'PCCB Ceramic Brakes', 'Sport Exhaust', 'Adaptive Sport Seats Plus', 'Porsche Dynamic Light System'],
 'The ultimate 911 Turbo S with every performance option. Delivers supercar acceleration with daily usability.', 'Like New', 'Available', 'Vancouver, BC'),

('Porsche', 'Cayenne Turbo GT', 2023, 'WP1AB2AY8NDA456789', 210000, 'USD', 18000, 'Carrara White', 'Black/Bordeaux', 'PDK', 'Gasoline', '4.0L V8 Twin-Turbo 631HP',
 ARRAY['Air Suspension', 'Carbon Interior Package', 'Bose Surround Sound', 'Panoramic Roof', 'Sport Chrono Package'],
 'The most powerful Cayenne ever built. Track performance in an SUV package with luxury appointments.', 'Excellent', 'Available', 'Toronto, ON'),

-- Lamborghini Collection
('Lamborghini', 'Huracan EVO Spyder', 2023, 'ZHWUC4ZF5NLA567890', 320000, 'USD', 6800, 'Arancio Borealis', 'Black Alcantara', 'LDF', 'Gasoline', '5.2L V10 630HP',
 ARRAY['Lifting System', 'Sensonum Sound System', 'Carbon Fiber Package', 'Style Package', 'Transparent Engine Bonnet'],
 'Breathtaking Huracan EVO Spyder in stunning orange. Open-top supercar experience with naturally aspirated V10 symphony.', 'Like New', 'Available', 'Vancouver, BC'),

-- Rolls-Royce Collection
('Rolls-Royce', 'Ghost Black Badge', 2024, 'SCA664S50NUX678901', 485000, 'USD', 2100, 'Black Badge', 'Black/Orange Leather', 'Automatic', 'Gasoline', '6.75L V12 Twin-Turbo 591HP',
 ARRAY['Starlight Headliner', 'Bespoke Audio', 'Massage Seats', 'Champagne Cooler', 'Spirit of Ecstasy Illuminated'],
 'The ultimate expression of luxury motoring. This Ghost Black Badge represents the pinnacle of automotive craftsmanship.', 'Like New', 'Available', 'Toronto, ON');

-- Insert sample customers
INSERT INTO public.customers (first_name, last_name, email, phone, company, country, address, preferred_currency, customer_type, status, notes) VALUES
('Sarah', 'Johnson', 'sarah.johnson@email.com', '+1-604-555-0123', 'Johnson Enterprises', 'Canada', '1200 West Georgia St, Vancouver, BC V6E 2Y3', 'CAD', 'Business', 'VIP', 'High-value client with multiple vehicle purchases. Prefers European luxury brands.'),
('Michael', 'Chen', 'michael.chen@email.com', '+1-416-555-0456', NULL, 'Canada', '100 King St W, Toronto, ON M5X 1C9', 'USD', 'Individual', 'Active', 'Sports car enthusiast. Looking for rare Porsche models.'),
('Emma', 'Williams', 'emma.williams@email.com', '+1-514-555-0789', 'Williams Holdings Ltd', 'Canada', '1250 René-Lévesque Blvd W, Montreal, QC H3B 4W8', 'USD', 'Business', 'Active', 'Corporate fleet management. Interested in luxury sedans for executive transport.'),
('James', 'Thompson', 'james.thompson@email.com', '+1-403-555-0321', NULL, 'Canada', '707 5 St SW, Calgary, AB T2P 0Y3', 'CAD', 'Individual', 'Active', 'First-time luxury vehicle buyer. Needs guidance on import process.'),
('Lisa', 'Anderson', 'lisa.anderson@email.com', '+1-604-555-0654', 'Anderson Investments', 'United States', '1201 3rd Avenue, Seattle, WA 98101', 'USD', 'Business', 'VIP', 'US-based client importing vehicles to Seattle. Regular customer with excellent payment history.');

-- Insert sample leads
INSERT INTO public.leads (first_name, last_name, email, phone, company, country, interest_type, vehicle_interest, budget_range, timeline, source, status, assigned_to, conversion_probability, notes) VALUES
('David', 'Rodriguez', 'david.rodriguez@email.com', '+1-647-555-0987', NULL, 'Canada', 'Vehicle Purchase', 'BMW M8 or Mercedes AMG GT', '$150,000 - $200,000', '3-6 months', 'Website', 'Qualified', 'Sales Team', 75, 'Serious buyer with financing pre-approved. Looking for performance coupe.'),
('Sophie', 'Martin', 'sophie.martin@email.com', '+1-438-555-0654', 'Martin Group', 'Canada', 'Export Service', 'Luxury SUV Fleet', '$500,000+', '1-3 months', 'Referral', 'New', NULL, 50, 'Corporate client looking to export 5 luxury SUVs to Europe.'),
('Alex', 'Kim', 'alex.kim@email.com', '+1-778-555-0321', NULL, 'Canada', 'VIP Rental', 'Supercar for Events', '$10,000 - $20,000', 'Immediate', 'Social Media', 'Contacted', 'VIP Team', 60, 'Event planner needing exotic car rentals for high-profile clients.'),
('Roberto', 'Silva', 'roberto.silva@email.com', '+55-11-9876-5432', 'Silva Automotive', 'Brazil', 'Vehicle Purchase', 'Porsche 911 Turbo S', '$250,000 - $300,000', '6-12 months', 'Website', 'New', NULL, 30, 'International client interested in importing to Brazil. Needs customs guidance.');

-- Insert sample quotes
INSERT INTO public.quotes (customer_email, customer_name, vehicle_type, vehicle_value, from_country, to_country, shipping_method, insurance_included, expedited_service, shipping_cost, customs_duties, insurance_cost, documentation_fee, inspection_cost, total_cost, currency, estimated_timeline, status, valid_until, notes) VALUES
('sarah.johnson@email.com', 'Sarah Johnson', 'BMW X7 M50i', 120000, 'Canada', 'United Kingdom', 'Maritime', true, false, 3500, 15000, 2400, 850, 1200, 22950, 'USD', '6-8 weeks', 'Sent', '2025-01-15', 'Export to London, UK. Customer approved maritime shipping to reduce costs.'),
('michael.chen@email.com', 'Michael Chen', 'Porsche 911 Turbo S', 275000, 'Canada', 'Japan', 'Air', true, true, 12000, 35000, 5500, 1200, 1500, 55200, 'USD', '2-3 weeks', 'Draft', '2025-01-20', 'Rush order for Tokyo delivery. Air freight for faster delivery.'),
('emma.williams@email.com', 'Emma Williams', 'Mercedes S63 AMG', 185000, 'Canada', 'Germany', 'Maritime', true, false, 2800, 18500, 3700, 950, 1300, 27250, 'USD', '5-7 weeks', 'Accepted', '2025-02-01', 'Corporate purchase for German subsidiary. Standard maritime shipping approved.');

-- Insert sample orders
INSERT INTO public.orders (customer_id, vehicle_id, order_type, total_amount, currency, payment_status, order_status, payment_method, shipping_method, shipping_address, estimated_delivery, notes) VALUES
((SELECT id FROM public.customers WHERE email = 'sarah.johnson@email.com'), 
 (SELECT id FROM public.vehicles WHERE make = 'BMW' AND model = 'X7 M50i'), 
 'Vehicle Purchase', 142950, 'USD', 'Partial', 'Processing', 'Wire Transfer', 'Maritime', '25 Grosvenor Square, London W1K 4QT, UK', '2025-02-15', 'Deposit received. Awaiting final payment before shipping.'),

((SELECT id FROM public.customers WHERE email = 'emma.williams@email.com'),
 (SELECT id FROM public.vehicles WHERE make = 'Mercedes-Benz' AND model = 'S63 AMG'),
 'Vehicle Purchase', 212250, 'USD', 'Paid', 'Confirmed', 'Corporate Check', 'Maritime', 'Kaiserstraße 52-60, 60329 Frankfurt am Main, Germany', '2025-02-10', 'Full payment received. Vehicle being prepared for export.');

-- Insert sample payments
INSERT INTO public.order_payments (order_id, amount, currency, payment_method, payment_type, transaction_id, status, payment_date, notes) VALUES
((SELECT id FROM public.orders WHERE customer_id = (SELECT id FROM public.customers WHERE email = 'sarah.johnson@email.com')),
 50000, 'USD', 'Wire Transfer', 'Deposit', 'TXN-CB2B-2025-001', 'Completed', '2025-01-02 10:30:00+00', '35% deposit payment received'),

((SELECT id FROM public.orders WHERE customer_id = (SELECT id FROM public.customers WHERE email = 'emma.williams@email.com')),
 212250, 'USD', 'Corporate Check', 'Full Payment', 'CHK-WH-2025-002', 'Completed', '2025-01-05 14:20:00+00', 'Full payment via corporate check - cleared');

-- Insert sample customer communications
INSERT INTO public.customer_communications (customer_id, communication_type, subject, content, direction, status, follow_up_required, follow_up_date, created_by) VALUES
((SELECT id FROM public.customers WHERE email = 'sarah.johnson@email.com'),
 'Email', 'BMW X7 M50i Export Quote Follow-up', 'Following up on your quote request for the BMW X7 M50i export to London. The quote includes all shipping, customs, and documentation fees. Please let me know if you have any questions.', 'Outbound', 'Completed', false, NULL, 'Sales Team'),

((SELECT id FROM public.customers WHERE email = 'michael.chen@email.com'),
 'Phone', 'Porsche 911 Turbo S Availability', 'Customer called asking about Porsche 911 Turbo S availability and pricing. Discussed financing options and delivery timeline. Very interested buyer.', 'Inbound', 'Completed', true, '2025-01-10', 'Sales Team'),

((SELECT id FROM public.customers WHERE email = 'emma.williams@email.com'),
 'WhatsApp', 'Mercedes S63 AMG Shipping Update', 'Provided shipping update for Mercedes S63 AMG. Vehicle cleared customs and will arrive in Frankfurt as scheduled. Customer very satisfied with service.', 'Outbound', 'Completed', false, NULL, 'Export Team');

-- Insert sample vehicle images (using placeholder URLs - you can replace with actual uploaded images later)
INSERT INTO public.vehicle_images (vehicle_id, image_url, caption, is_primary, display_order) VALUES
((SELECT id FROM public.vehicles WHERE make = 'BMW' AND model = 'X7 M50i'),
 '/lovable-uploads/bmw-x7-front.jpg', 'Front exterior view', true, 1),
((SELECT id FROM public.vehicles WHERE make = 'BMW' AND model = 'X7 M50i'),
 '/lovable-uploads/bmw-x7-interior.jpg', 'Luxury interior with cognac leather', false, 2),
((SELECT id FROM public.vehicles WHERE make = 'BMW' AND model = 'X7 M50i'),
 '/lovable-uploads/bmw-x7-side.jpg', 'Side profile showing elegant lines', false, 3),

((SELECT id FROM public.vehicles WHERE make = 'Porsche' AND model = '911 Turbo S'),
 '/lovable-uploads/porsche-911-front.jpg', 'Front view showcasing iconic design', true, 1),
((SELECT id FROM public.vehicles WHERE make = 'Porsche' AND model = '911 Turbo S'),
 '/lovable-uploads/porsche-911-interior.jpg', 'Sport interior with alcantara details', false, 2),

((SELECT id FROM public.vehicles WHERE make = 'Mercedes-Benz' AND model = 'S63 AMG'),
 '/lovable-uploads/mercedes-s63-front.jpg', 'Commanding presence in obsidian black', true, 1),
((SELECT id FROM public.vehicles WHERE make = 'Mercedes-Benz' AND model = 'S63 AMG'),
 '/lovable-uploads/mercedes-s63-interior.jpg', 'First-class rear seating area', false, 2);
