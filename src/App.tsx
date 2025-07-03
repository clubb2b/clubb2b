
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import CarsForSale from "./pages/CarsForSale";
import VIPMembership from "./pages/VIPMembership";
import VideoInspection from "./pages/VideoInspection";
import ImportExportServicesPage from "./pages/ImportExportServices";
import TechFeatures from "./pages/TechFeatures";
import Dashboard from "./pages/Dashboard";
import MobileFeatures from "./pages/MobileFeatures";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/cars-for-sale" element={<CarsForSale />} />
            <Route path="/vip-membership" element={<VIPMembership />} />
            <Route path="/video-inspection" element={<VideoInspection />} />
            <Route path="/import-export" element={<ImportExportServicesPage />} />
            <Route path="/tech-features" element={<TechFeatures />} />
            <Route path="/mobile-features" element={<MobileFeatures />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
