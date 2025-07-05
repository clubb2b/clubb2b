
import VehicleCard from "./VehicleCard";

const VehicleGrid = () => {
  const vehicles = [
    {
      images: [
        "/lovable-uploads/32031a20-8ac8-43d6-b351-5d654dad669e.png",
        "/lovable-uploads/554fc9ef-9529-4d80-963b-67be431b3bf2.png",
        "/lovable-uploads/747124d4-2310-4462-8d1b-fb1c45d466ed.png",
        "/lovable-uploads/74a5c922-b528-464a-b9db-da0f3ea7d193.png"
      ],
      name: "2025 Range Rover Sport P530 HSE",
      features: ["4.4L V8 Twin-Turbo 530HP", "Terrain Response 2", "Air Suspension", "Meridian Signature Sound", "Pivi Pro Infotainment", "Adaptive LED Headlights"]
    },
    {
      images: [
        "/lovable-uploads/326ea060-ebc3-4094-94e1-3ba6182a6a85.png",
        "/lovable-uploads/cae80353-f35f-4217-becc-94520067743e.png",
        "/lovable-uploads/6cb7e5ff-7e93-40df-96ad-13cd66df0874.png",
        "/lovable-uploads/9dff55e6-5c4d-4775-aca9-b93b94fdb5fc.png"
      ],
      name: "2024 Cadillac Escalade Premium Luxury",
      features: ["6.2L V8 420HP", "Magnetic Ride Control", "Super Cruise", "AKG Studio Audio", "38-inch Curved OLED Display", "Night Vision", "Wireless Charging"]
    },
    {
      images: [
        "/lovable-uploads/e531db70-bf69-4ea7-89cd-ba92c7de4b79.png",
        "/lovable-uploads/4019de92-8eb1-45df-ba0f-d9de0cd9542b.png",
        "/lovable-uploads/ed4a45ef-45ff-487c-8a72-484e05697180.png",
        "/lovable-uploads/ddfe0135-a32f-4ff5-93a4-1120c8db8d11.png",
        "/lovable-uploads/843e7d21-d92c-497e-9d7b-b937f8f7ae71.png"
      ],
      name: "2024 Mercedes-AMG GLE 53 4MATIC+",
      features: ["3.0L I6 Turbo + EQ Boost 429HP", "AMG Performance 4MATIC+", "AMG Ride Control+", "Burmester 3D Audio", "Red & Black Interior", "AMG Track Pace"]
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {vehicles.map((vehicle, index) => (
        <VehicleCard key={index} vehicle={vehicle} index={index} />
      ))}
    </div>
  );
};

export default VehicleGrid;
