
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import CarsForSale from "./pages/CarsForSale";
import CarsCollection from "./pages/CarsCollection";
import ShippingProcess from "./pages/ShippingProcess";
import VIPMembership from "./pages/VIPMembership";
import VideoInspection from "./pages/VideoInspection";
import ImportExportServicesPage from "./pages/ImportExportServices";
import TechFeatures from "./pages/TechFeatures";
import Dashboard from "./pages/Dashboard";
import MobileFeatures from "./pages/MobileFeatures";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import PremiumSalesService from "./pages/PremiumSalesService";
import GlobalExportService from "./pages/GlobalExportService";
import QualityAssuranceService from "./pages/QualityAssuranceService";
import VIPService from "./pages/VIPService";
import AIPhotoStudioPage from "./pages/AIPhotoStudio";
import UserProfile from "./pages/UserProfile";
import LeadManagementPage from "./pages/LeadManagement";

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
            <Route path="/cars-collection" element={<CarsCollection />} />
            <Route path="/shipping-process" element={<ShippingProcess />} />
            <Route path="/vip-membership" element={<VIPMembership />} />
            <Route path="/video-inspection" element={<VideoInspection />} />
            <Route path="/import-export" element={<ImportExportServicesPage />} />
            <Route path="/tech-features" element={<TechFeatures />} />
            <Route path="/mobile-features" element={<MobileFeatures />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/premium-sales" element={<PremiumSalesService />} />
            <Route path="/global-export" element={<GlobalExportService />} />
            <Route path="/quality-assurance" element={<QualityAssuranceService />} />
            <Route path="/vip-service" element={<VIPService />} />
            <Route path="/ai-photo-studio" element={<AIPhotoStudioPage />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/leads" 
              element={
                <ProtectedRoute>
                  <LeadManagementPage />
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
