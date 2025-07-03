
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, MapPin, QrCode, Bell, Download, Share, Wifi, WifiOff, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useNativeFeatures } from '@/hooks/useNativeFeatures';
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const MobileFeatures = () => {
  const { 
    takePhoto, 
    getCurrentLocation, 
    shareContent,
    sendNotification,
    downloadFile,
    isOnline 
  } = useNativeFeatures();
  
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [location, setLocation] = useState<any>(null);
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTakePhoto = async () => {
    try {
      const photo = await takePhoto();
      if (photo) {
        setPhotoUrl(photo);
        toast.success('Photo captured successfully!');
      }
    } catch (error) {
      toast.error('Failed to take photo. Make sure you have camera permissions.');
    }
  };

  const handleGetLocation = async () => {
    try {
      const pos = await getCurrentLocation();
      if (pos) {
        setLocation(pos);
        toast.success('Location obtained successfully!');
      }
    } catch (error) {
      toast.error('Failed to get location. Make sure you have location permissions.');
    }
  };

  const handleSendNotification = async () => {
    try {
      await sendNotification(
        'Club B2B Update',
        'Your vehicle shipment status has been updated!',
        { orderId: '12345' }
      );
      toast.success('Notification sent!');
    } catch (error) {
      toast.error('Failed to send notification.');
    }
  };

  const handleShare = async () => {
    const content = trackingNumber 
      ? `Track my order: ${trackingNumber} on Club B2B Performance`
      : 'Check out Club B2B Performance for luxury vehicle exports!';
      
    try {
      await shareContent('Club B2B Performance', content, window.location.href);
      toast.success('Content shared successfully!');
    } catch (error) {
      toast.error('Failed to share content.');
    }
  };

  const handleDownload = async () => {
    try {
      const sampleUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
      await downloadFile(sampleUrl, 'sample-document.pdf');
      toast.success('Download started!');
    } catch (error) {
      toast.error('Failed to start download.');
    }
  };

  const handleScanQR = () => {
    const simulatedData = `CB2B-${Date.now().toString().slice(-6)}`;
    setTrackingNumber(simulatedData);
    toast.success('QR Code scanned! (Simulated)');
  };

  const handleCallSupport = () => {
    window.location.href = 'tel:+15185077243';
  };

  const handleEmailSupport = () => {
    window.location.href = 'mailto:info@clubb2bperformance.com';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-light text-white mb-4">Mobile Features</h1>
              <p className="text-gray-300">Enhanced mobile capabilities for better user experience</p>
            </div>
            <div className="flex items-center gap-2">
              {isOnline ? (
                <div className="flex items-center gap-2 text-green-400">
                  <Wifi className="w-4 h-4" />
                  <span className="text-sm">Online</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-400">
                  <WifiOff className="w-4 h-4" />
                  <span className="text-sm">Offline</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Camera Feature */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Camera className="w-5 h-5 text-blue-400" />
                  Camera Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-300">
                  Take photos of vehicles, documents, or damage reports
                </p>
                {photoUrl && (
                  <div className="w-full h-40 bg-gray-800 rounded-lg overflow-hidden">
                    <img 
                      src={photoUrl} 
                      alt="Captured" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <Button onClick={handleTakePhoto} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </CardContent>
            </Card>

            {/* GPS Location */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MapPin className="w-5 h-5 text-green-400" />
                  GPS Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-300">
                  Get current location for delivery tracking and pickup coordination
                </p>
                {location && (
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-300">
                      <strong>Lat:</strong> {location.latitude.toFixed(6)}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Lng:</strong> {location.longitude.toFixed(6)}
                    </p>
                  </div>
                )}
                <Button onClick={handleGetLocation} className="w-full bg-green-600 hover:bg-green-700">
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Location
                </Button>
              </CardContent>
            </Card>

            {/* QR Code Scanner */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <QrCode className="w-5 h-5 text-purple-400" />
                  QR Code Scanner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-300">
                  Scan QR codes for quick order tracking and vehicle identification
                </p>
                {trackingNumber && (
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-300">
                      <strong>Scanned:</strong> {trackingNumber}
                    </p>
                  </div>
                )}
                <Button onClick={handleScanQR} className="w-full bg-purple-600 hover:bg-purple-700">
                  <QrCode className="w-4 h-4 mr-2" />
                  Scan QR Code
                </Button>
              </CardContent>
            </Card>

            {/* Push Notifications */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Bell className="w-5 h-5 text-orange-400" />
                  Push Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-300">
                  Send real-time updates about order status and delivery notifications
                </p>
                <Button onClick={handleSendNotification} className="w-full bg-orange-600 hover:bg-orange-700">
                  <Bell className="w-4 h-4 mr-2" />
                  Send Test Notification
                </Button>
              </CardContent>
            </Card>

            {/* File Download */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Download className="w-5 h-5 text-cyan-400" />
                  File Downloads
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-300">
                  Download vehicle documents, shipping papers, and certificates
                </p>
                <Button onClick={handleDownload} className="w-full bg-cyan-600 hover:bg-cyan-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Sample
                </Button>
              </CardContent>
            </Card>

            {/* Share Functionality */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Share className="w-5 h-5 text-pink-400" />
                  Share Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-300">
                  Share order tracking links and vehicle information with others
                </p>
                <Input
                  placeholder="Enter tracking number..."
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                <Button onClick={handleShare} className="w-full bg-pink-600 hover:bg-pink-700">
                  <Share className="w-4 h-4 mr-2" />
                  Share Tracking Info
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Contact Section */}
          <Card className="bg-gray-900 border-gray-700 mb-12">
            <CardHeader>
              <CardTitle className="text-white">Quick Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">Get instant support for your mobile app experience</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleCallSupport} className="flex-1 bg-green-600 hover:bg-green-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Support
                </Button>
                <Button onClick={handleEmailSupport} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Offline Capabilities */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Offline Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                This app includes offline capabilities to ensure you can access important information even without an internet connection:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
                <li>View previously loaded order information</li>
                <li>Access cached vehicle details and photos</li>
                <li>Save photos and notes locally (sync when online)</li>
                <li>Quick reference to tracking numbers and contact information</li>
              </ul>
              <div className="p-3 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-300">
                  <strong>Current Status:</strong> {isOnline ? 'Connected' : 'Working Offline'}
                </p>
                {!isOnline && (
                  <p className="text-sm text-amber-400 mt-1">
                    Some features may be limited while offline. Data will sync when connection is restored.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default MobileFeatures;
