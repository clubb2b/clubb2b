
import { Button } from "@/components/ui/button";

const ContactCTA = () => {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700 text-center">
      <h3 className="text-2xl font-light text-white mb-4 tracking-wide">Ready to Start?</h3>
      <p className="text-gray-300 mb-6 font-light">
        Join our exclusive network and access premium automotive opportunities.
      </p>
      <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 font-light tracking-wider transition-all duration-300">
        Join VIP Club
      </Button>
    </div>
  );
};

export default ContactCTA;
