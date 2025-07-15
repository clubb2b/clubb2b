
import VehicleCard from "./VehicleCard";

const VehicleGrid = () => {
  const vehicles = [
    {
      id: "1",
      vehicle_images: [
        { image_url: "/lovable-uploads/843e7d21-d92c-497e-9d7b-b937f8f7ae71.png" },
        { image_url: "/lovable-uploads/8494dfd3-ce77-4317-b73c-f64c23c29e35.png" },
        { image_url: "/lovable-uploads/9dff55e6-5c4d-4775-aca9-b93b94fdb5fc.png" },
        { image_url: "/lovable-uploads/4019de92-8eb1-45df-ba0f-d9de0cd9542b.png" },
        { image_url: "/lovable-uploads/ddfe0135-a32f-4ff5-93a4-1120c8db8d11.png" },
        { image_url: "/lovable-uploads/ed4a45ef-45ff-487c-8a72-484e05697180.png" }
      ],
      make: "Cadillac",
      model: "Escalade",
      year: 2024,
      features: ["Premium Platinum Package", "Magnetic Ride Control", "Super Cruise Technology", "OLED Displays", "Premium Leather Seating", "Heated & Ventilated Seats", "Panoramic Sunroof", "Premium Audio System"],
      status: "available",
      location: "Canada",
      price: null,
      currency: "USD",
      condition: "excellent",
      transmission: "automatic",
      fuel_type: "gasoline",
      exterior_color: "black",
      interior_color: "black",
      mileage: 0,
      description: "The epitome of luxury in an SUV. This 2024 Cadillac Escalade features a stunning black exterior with premium black leather interior, showcasing Cadillac's finest craftsmanship and cutting-edge technology in a commanding presence."
    },
    {
      id: "2", 
      vehicle_images: [{ image_url: "/lovable-uploads/e31fe280-a6c2-40c4-96cb-3d9f0d9032f8.png" }],
      make: "McLaren",
      model: "720S", 
      year: 2024,
      features: ["Twin-Turbo V8", "Butterfly Doors", "Carbon Fiber Monocoque"],
      status: "available",
      location: "Canada",
      price: null,
      currency: "USD",
      condition: "excellent",
      transmission: "automatic",
      fuel_type: "gasoline",
      exterior_color: "orange",
      interior_color: "black",
      mileage: 0,
      description: "High-performance supercar"
    },
    {
      id: "3",
      vehicle_images: [
        { image_url: "/lovable-uploads/cae80353-f35f-4217-becc-94520067743e.png" },
        { image_url: "/lovable-uploads/cf0a5fd5-f1f6-41aa-bbd2-ae3e8b45e312.png" },
        { image_url: "/lovable-uploads/f1d37320-287c-470f-aa83-b83a5c16c8e5.png" },
        { image_url: "/lovable-uploads/fff53762-3684-45b6-9d76-33e606d6d578.png" }
      ],
      make: "Mercedes-AMG",
      model: "GLE 53",
      year: 2024, 
      features: ["AMG Panamericana Grille", "53 AMG 3.0L Turbo Engine", "AMG Performance Exhaust", "Red & Black Nappa Leather Interior", "AMG Performance Seats", "MBUX Infotainment", "Air Suspension", "21-inch AMG Wheels"],
      status: "available",
      location: "Canada",
      price: null,
      currency: "USD",
      condition: "excellent",
      transmission: "automatic",
      fuel_type: "gasoline",
      exterior_color: "black",
      interior_color: "red",
      mileage: 0,
      description: "A perfect blend of luxury and performance. This Mercedes-AMG GLE 53 features a striking black exterior with an exquisite red and black interior combination, delivering AMG's signature performance in a refined luxury SUV package."
    },
    {
      id: "4",
      vehicle_images: [{ image_url: "/lovable-uploads/c20aeb80-5c8c-4f37-9bb9-0f7583e27158.png" }],
      make: "Mercedes-AMG",
      model: "S580",
      year: 2024,
      features: ["Executive Luxury", "Massaging Seats", "Advanced Driver Assistance"],
      status: "available", 
      location: "Canada",
      price: null,
      currency: "USD",
      condition: "excellent",
      transmission: "automatic",
      fuel_type: "gasoline",
      exterior_color: "silver",
      interior_color: "beige",
      mileage: 0,
      description: "Executive luxury sedan"
    },
    {
      id: "5",
      vehicle_images: [
        { image_url: "/lovable-uploads/c7257e02-0bee-428c-96ed-aa62be0331a3.png" },
        { image_url: "/lovable-uploads/527d7368-7510-4039-a647-850a6054e780.png" },
        { image_url: "/lovable-uploads/e15c69f6-6d3b-4aa1-b7f2-85292123b295.png" },
        { image_url: "/lovable-uploads/1a0d54fe-3d0e-4693-b7dc-73554ed8c7a4.png" },
        { image_url: "/lovable-uploads/32031a20-8ac8-43d6-b351-5d654dad669e.png" },
        { image_url: "/lovable-uploads/554fc9ef-9529-4d80-963b-67be431b3bf2.png" },
        { image_url: "/lovable-uploads/747124d4-2310-4462-8d1b-fb1c45d466ed.png" },
        { image_url: "/lovable-uploads/74a5c922-b528-464a-b9db-da0f3ea7d193.png" },
        { image_url: "/lovable-uploads/4af3716b-3bd1-4e07-b6f3-95344e4311f2.png" },
        { image_url: "/lovable-uploads/212d5dcf-479c-4ff6-880b-322353e5f148.png" }
      ],
      make: "Range Rover",
      model: "",
      year: 2025,
      features: ["Luxury Interior", "Advanced Technology", "Premium Performance"],
      status: "available",
      location: "Canada", 
      price: null,
      currency: "USD",
      condition: "excellent",
      transmission: "automatic",
      fuel_type: "gasoline",
      exterior_color: "black",
      interior_color: "tan",
      mileage: 0,
      description: "Luxury SUV with advanced features"
    },
    {
      id: "6",
      vehicle_images: [
        { image_url: "/lovable-uploads/65e689ae-1df4-49a9-a317-bb8251b3da02.png" },
        { image_url: "/lovable-uploads/a6a7948c-8536-4a96-a73c-31af4cc2938e.png" },
        { image_url: "/lovable-uploads/c00631e6-b2ff-4eb2-80a0-4ef009b23f74.png" },
        { image_url: "/lovable-uploads/ce65b3ce-1420-4e71-b62d-a69b21f316fb.png" },
        { image_url: "/lovable-uploads/a48ed54a-5f9b-401c-8e99-133d3def0999.png" },
        { image_url: "/lovable-uploads/0c3939cf-05d7-4a24-8e56-aa046293559e.png" },
        { image_url: "/lovable-uploads/9f32dd48-49ea-45e1-98cd-93c533d8ea6f.png" },
        { image_url: "/lovable-uploads/a5527b0b-0a3d-4db2-a234-bf367c715a14.png" }
      ],
      make: "Audi",
      model: "RS Q8 TFSI Quattro",
      year: 2024,
      features: ["Twin-Turbo V8", "Quattro AWD", "Sport Interior", "Premium Technology"],
      status: "available",
      location: "Canada",
      price: null,
      currency: "USD",
      condition: "excellent",
      transmission: "automatic",
      fuel_type: "gasoline",
      exterior_color: "blue",
      interior_color: "black",
      mileage: 0,
      description: "High-performance luxury SUV"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VehicleGrid;
