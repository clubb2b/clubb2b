import ImportExportServices from "@/components/ImportExportServices";
import CombinedFreightServices from "@/components/CombinedFreightServices";
import ExportTimeline from "@/components/ExportTimeline";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const ImportExportServicesPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-20">
        <ImportExportServices />
        <CombinedFreightServices />
        <ExportTimeline />
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default ImportExportServicesPage;