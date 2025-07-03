import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, MapPin, QrCode, Bell, Download, Share, Wifi, WifiOff } from 'lucide-react';
import { toast } from 'sonner';
import { useNativeFeatures } from '@/hooks/useNativeFeatures';

const NativeFeaturesDemo = () => {
  const { 
    takePhoto, 
    getCurrentLocation, 
    sendNotification, 
    shareContent,
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
        'Order Update',
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
      await shareContent(content, 'https://your-app-url.com');
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
    // For web, we'll simulate QR scanning
    const simulatedData = `CB2B-${Date.now().toString().slice(-6)}`;
    setTrackingNumber(simulatedData);
    toast.success('QR Code scanned! (Simulated)');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mobile Features</h1>
          <p className="text-gray-600">Enhanced mobile capabilities for better user experience</p>
        </div>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <div className="flex items-center gap-2 text-green-600">
              <Wifi className="w-4 h-4" />
              <span className="text-sm">Online</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-600">
              <WifiOff className="w-4 h-4" />
              <span className="text-sm">Offline</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Camera Feature */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Camera Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Take photos of vehicles, documents, or damage reports
            </p>
            {photoUrl && (
              <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={photoUrl} 
                  alt="Captured" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <Button onClick={handleTakePhoto} className="w-full">
              <Camera className="w-4 h-4 mr-2" />
              Take Photo
            </Button>
          </CardContent>
        </Card>

        {/* GPS Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              GPS Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Get current location for delivery tracking and pickup coordination
            </p>
            {location && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm">
                  <strong>Lat:</strong> {location.latitude.toFixed(6)}
                </p>
                <p className="text-sm">
                  <strong>Lng:</strong> {location.longitude.toFixed(6)}
                </p>
                {location.accuracy && (
                  <p className="text-sm">
                    <strong>Accuracy:</strong> ±{location.accuracy.toFixed(0)}m
                  </p>
                )}
              </div>
            )}
            <Button onClick={handleGetLocation} className="w-full">
              <MapPin className="w-4 h-4 mr-2" />
              Get Location
            </Button>
          </CardContent>
        </Card>

        {/* QR Code Scanner */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              QR Code Scanner
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Scan QR codes for quick order tracking and vehicle identification
            </p>
            {trackingNumber && (
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm">
                  <strong>Scanned:</strong> {trackingNumber}
                </p>
              </div>
            )}
            <Button onClick={handleScanQR} className="w-full">
              <QrCode className="w-4 h-4 mr-2" />
              Scan QR Code
            </Button>
          </CardContent>
        </Card>

        {/* Push Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Push Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Send real-time updates about order status and delivery notifications
            </p>
            <Button onClick={handleSendNotification} className="w-full">
              <Bell className="w-4 h-4 mr-2" />
              Send Test Notification
            </Button>
          </CardContent>
        </Card>

        {/* File Download */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              File Downloads
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Download vehicle documents, shipping papers, and certificates
            </p>
            <Button onClick={handleDownload} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Sample
            </Button>
          </CardContent>
        </Card>

        {/* Share Functionality */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share className="w-5 h-5" />
              Share Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Share order tracking links and vehicle information with others
            </p>
            <Input
              placeholder="Enter tracking number..."
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <Button onClick={handleShare} className="w-full">
              <Share className="w-4 h-4 mr-2" />
              Share Tracking Info
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Offline Capabilities */}
      <Card>
        <CardHeader>
          <CardTitle>Offline Capabilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            This app includes offline capabilities to ensure you can access important information even without an internet connection:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>View previously loaded order information</li>
            <li>Access cached vehicle details and photos</li>
            <li>Save photos and notes locally (sync when online)</li>
            <li>Quick reference to tracking numbers and contact information</li>
          </ul>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm">
              <strong>Current Status:</strong> {isOnline ? 'Connected' : 'Working Offline'}
            </p>
            {!isOnline && (
              <p className="text-sm text-amber-600 mt-1">
                Some features may be limited while offline. Data will sync when connection is restored.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NativeFeaturesDemo;