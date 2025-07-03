import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-20">
        <AnalyticsDashboard />
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Dashboard;