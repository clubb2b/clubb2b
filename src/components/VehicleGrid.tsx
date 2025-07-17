
import VehicleCard from "./VehicleCard";

const VehicleGrid = () => {
  const vehicles = [
    {
      id: "1",
      images: [
        { id: "1", image_url: "/lovable-uploads/232a13f0-e68d-4874-806c-0c6bdf94008c.png", caption: null, is_primary: true, display_order: 1 },
        { id: "2", image_url: "/lovable-uploads/e49ec679-cd55-4452-8d42-6d5b23efc8f4.png", caption: null, is_primary: false, display_order: 2 },
        { id: "3", image_url: "/lovable-uploads/ea6e633f-31a5-4496-92ca-7fdecbb544cf.png", caption: null, is_primary: false, display_order: 3 },
        { id: "4", image_url: "/lovable-uploads/65fbf4f2-5a57-49e2-b01d-3cc72f439e8f.png", caption: null, is_primary: false, display_order: 4 },
        { id: "5", image_url: "/lovable-uploads/d0d7e2e5-0cb3-46f9-8555-da0a58f9251d.png", caption: null, is_primary: false, display_order: 5 },
        { id: "6", image_url: "/lovable-uploads/9bbb7d4e-26de-4d51-89b0-19f15ba4cb39.png", caption: null, is_primary: false, display_order: 6 }
      ],
      make: "Cadillac",
      model: "Escalade",
      year: 2024,
      features: ["Premium Platinum Package", "Magnetic Ride Control", "Super Cruise Technology", "OLED Displays", "Premium Leather Seating", "Heated & Ventilated Seats", "Panoramic Sunroof", "AKG Premium Audio System"],
      videoUrl: null,
      description: "The ultimate expression of luxury and power, this 2024 Cadillac Escalade features a striking black exterior with premium interior. Equipped with the latest Super Cruise technology for hands-free driving and the industry-exclusive curved OLED displays spanning 38 inches across the dashboard."
    },
    {
      id: "2", 
      images: [{ id: "7", image_url: "/lovable-uploads/e31fe280-a6c2-40c4-96cb-3d9f0d9032f8.png", caption: null, is_primary: true, display_order: 1 }],
      make: "McLaren",
      model: "720S", 
      year: 2024,
      features: ["4.0L Twin-Turbo V8", "710 Horsepower", "Carbon Fiber Monocoque Chassis", "Butterfly Doors", "ProActive Chassis Control II", "Variable Drift Control", "Track Telemetry System", "Bowers & Wilkins Audio System"],
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      status: "available",
      location: "Canada",
      price: null,
      condition: "excellent",
      description: "Experience breathtaking performance in the McLaren 720S, featuring a striking papaya orange exterior. With 710 horsepower from its twin-turbocharged V8 and a lightweight carbon fiber chassis, it delivers a 0-60 mph time of just 2.8 seconds with uncompromising precision and thrilling dynamics."
    },
    {
      id: "3",
      images: [
        { id: "8", image_url: "/lovable-uploads/dfef9aa3-0fc4-4c1f-b418-b63015bdbe2a.png", caption: null, is_primary: true, display_order: 1 },
        { id: "9", image_url: "/lovable-uploads/57907b7c-a0e8-4f8f-918a-c6729e9e0894.png", caption: null, is_primary: false, display_order: 2 },
        { id: "10", image_url: "/lovable-uploads/a388b99d-efa8-418d-b71d-77581b323df9.png", caption: null, is_primary: false, display_order: 3 },
      ],
      make: "Mercedes-AMG",
      model: "GLE 53",
      year: 2024, 
      features: ["AMG Panamericana Grille", "3.0L Inline-6 Turbo Engine with EQ Boost", "429 Horsepower", "AMG Performance Exhaust System", "AMG Ride Control Air Suspension", "Black Exterior with AMG Styling", "21-inch AMG Wheels", "Exclusive Red/Black Interior"],
      videoUrl: null,
      status: "available",
      location: "Canada",
      price: null,
      condition: "excellent",
      description: "An exceptional combination of AMG performance and SUV practicality. The 2024 Mercedes-AMG GLE 53 features the distinctive AMG Panamericana grille, delivering 429 horsepower with its turbocharged inline-6 engine and EQ Boost system for instant response and efficiency."
    },
    {
      id: "4",
      images: [
        { id: "13", image_url: "/lovable-uploads/072c049b-dc6c-45e5-a227-e7d741c35528.png", caption: null, is_primary: true, display_order: 1 },
        { id: "14", image_url: "/lovable-uploads/8a969a91-6f24-4565-9dcd-b0813370e586.png", caption: null, is_primary: false, display_order: 2 },
        { id: "15", image_url: "/lovable-uploads/4e2687f3-6659-476f-b8ca-e624a094f893.png", caption: null, is_primary: false, display_order: 3 },
      ],
      make: "Mercedes-AMG",
      model: "S580",
      year: 2024,
      features: ["4.0L V8 Biturbo Engine", "493 Horsepower", "MBUX Hyperscreen", "4MATIC All-Wheel Drive", "Burmester 4D Surround Sound", "Nappa Leather Interior", "Augmented Reality Navigation", "Executive Rear Seats with Massage"],
      videoUrl: null,
      status: "available", 
      location: "Canada",
      price: null,
      condition: "excellent",
      description: "The pinnacle of Mercedes luxury, the S580 combines breathtaking performance with unparalleled comfort. Featuring a sophisticated black exterior with a sumptuous tan leather interior, this executive sedan offers cutting-edge technology and first-class amenities throughout."
    },
    {
      id: "5",
      images: [
        { id: "14", image_url: "/lovable-uploads/c7257e02-0bee-428c-96ed-aa62be0331a3.png", caption: null, is_primary: true, display_order: 1 },
        { id: "15", image_url: "/lovable-uploads/527d7368-7510-4039-a647-850a6054e780.png", caption: null, is_primary: false, display_order: 2 },
        { id: "16", image_url: "/lovable-uploads/e15c69f6-6d3b-4aa1-b7f2-85292123b295.png", caption: null, is_primary: false, display_order: 3 },
        { id: "17", image_url: "/lovable-uploads/1a0d54fe-3d0e-4693-b7dc-73554ed8c7a4.png", caption: null, is_primary: false, display_order: 4 },
        { id: "18", image_url: "/lovable-uploads/32031a20-8ac8-43d6-b351-5d654dad669e.png", caption: null, is_primary: false, display_order: 5 }
      ],
      make: "Range Rover",
      model: "Autobiography",
      year: 2025,
      features: ["5.0L V8 Supercharged Engine", "518 Horsepower", "Electronic Air Suspension", "Pixel LED Headlights", "Meridian™ Signature Sound System", "Semi-Aniline Leather Seats", "24-Way Power Front Seats with Hot Stone Massage", "Executive Class Rear Seating"],
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      status: "available",
      location: "Canada", 
      price: null,
      condition: "excellent",
      description: "Experience unparalleled luxury with the 2025 Range Rover Autobiography. This flagship model redefines SUV opulence with its commanding presence, masterful performance, and handcrafted interior featuring the finest leathers and veneers. The perfect blend of British craftsmanship and cutting-edge technology."
    },
    {
      id: "6",
      images: [
        { id: "24", image_url: "/lovable-uploads/65e689ae-1df4-49a9-a317-bb8251b3da02.png", caption: null, is_primary: true, display_order: 1 },
        { id: "25", image_url: "/lovable-uploads/a6a7948c-8536-4a96-a73c-31af4cc2938e.png", caption: null, is_primary: false, display_order: 2 },
        { id: "26", image_url: "/lovable-uploads/c00631e6-b2ff-4eb2-80a0-4ef009b23f74.png", caption: null, is_primary: false, display_order: 3 }
      ],
      make: "Audi",
      model: "RS Q8 TFSI Quattro",
      year: 2024,
      features: ["4.0L Twin-Turbo V8", "591 Horsepower", "Quattro All-Wheel Drive", "8-Speed Tiptronic Transmission", "Carbon Ceramic Brakes", "RS Sport Suspension", "Bang & Olufsen 3D Sound", "Virtual Cockpit Plus"],
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      status: "available",
      location: "Canada",
      price: null,
      condition: "excellent",
      description: "Experience the ultimate Audi SUV with the RS Q8, where supercar performance meets everyday practicality. With its thunderous 591-horsepower twin-turbo V8, Quattro all-wheel drive, and aggressive styling, this high-performance SUV delivers exhilarating driving dynamics in a luxurious package."
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
