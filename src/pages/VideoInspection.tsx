import LiveVideoInspection from "@/components/LiveVideoInspection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const VideoInspection = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-20">
        <LiveVideoInspection />
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default VideoInspection;