
import VehicleCard from "./VehicleCard";

const VehicleGrid = () => {
  const vehicles = [
    {
      images: ["/lovable-uploads/527d7368-7510-4039-a647-850a6054e780.png"],
      name: "2024 BMW X7 xDrive40i M Sport",
      features: ["xDrive AWD", "M Sport Package", "Panoramic Sky Lounge", "Harman Kardon Audio"]
    },
    {
      images: ["/lovable-uploads/c7257e02-0bee-428c-96ed-aa62be0331a3.png"],
      name: "2023 Mercedes-Benz S-Class S580 4MATIC",
      features: ["AIRMATIC Suspension", "Energizing Massage", "Burmester 3D Audio", "Head-Up Display"]
    },
    {
      images: ["/lovable-uploads/e15c69f6-6d3b-4aa1-b7f2-85292123b295.png"],
      name: "2024 Audi RS7 Sportback Performance",
      features: ["Quattro AWD", "Sport Differential", "Carbon Fiber Exterior", "Bang & Olufsen Audio"]
    },
    {
      images: ["/lovable-uploads/1a0d54fe-3d0e-4693-b7dc-73554ed8c7a4.png"],
      name: "2023 Porsche Cayenne Turbo",
      features: ["Porsche Traction Management", "Sport Chrono Package", "Air Suspension PASM", "Bose Audio"]
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
