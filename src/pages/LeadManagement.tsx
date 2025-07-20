import LeadManagement from "@/components/LeadManagement";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const LeadManagementPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20">
        <LeadManagement />
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default LeadManagementPage;