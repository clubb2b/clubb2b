
import VehicleGrid from "./VehicleGrid";
import ExportSection from "./ExportSection";

const LuxuryInventory = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            Elite Collection
          </h2>
          <p className="text-xl text-gray-300 font-light mb-8">
            Exquisite automobiles curated for discerning clients
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>

        {/* Vehicle Grid */}
        <VehicleGrid />

        {/* Export Services Section */}
        <ExportSection />
      </div>
    </section>
  );
};

export default LuxuryInventory;
