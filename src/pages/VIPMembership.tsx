import VIPMembershipPlans from "@/components/VIPMembershipPlans";
import VIPServices from "@/components/VIPServices";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const VIPMembership = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-20">
        <VIPMembershipPlans />
        <VIPServices />
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default VIPMembership;