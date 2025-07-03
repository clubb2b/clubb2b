
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, MapPin, Share2, Bell } from 'lucide-react';
import { useNativeFeatures } from '@/hooks/useNativeFeatures';

const NativeFeaturesShowcase = () => {
  const { isNative, takePicture, getCurrentLocation, shareContent, requestNotificationPermission } = useNativeFeatures();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const handleTakePhoto = async () => {
    const photoUrl = await takePicture();
    if (photoUrl) {
      setPhoto(photoUrl);
    }
  };

  const handleGetLocation = async () => {
    const coords = await getCurrentLocation();
    if (coords) {
      setLocation(coords);
    }
  };

  const handleShare = async () => {
    await shareContent(
      'CLUB B2B PERFORMANCE',
      'Check out this luxury vehicle export service!',
      window.location.href
    );
  };

  const handleNotifications = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      console.log('Notification permission granted');
    }
  };

  if (!isNative) {
    return (
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 mb-8">
        <h3 className="text-xl font-light text-white mb-4">📱 Mobile App Features</h3>
        <p className="text-gray-300 text-sm">
          Download our mobile app for enhanced features including camera integration, GPS tracking, and push notifications.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 mb-8">
      <h3 className="text-xl font-light text-white mb-6">📱 Mobile App Features</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={handleTakePhoto}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          size="sm"
        >
          <Camera size={16} />
          Take Photo
        </Button>

        <Button
          onClick={handleGetLocation}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          size="sm"
        >
          <MapPin size={16} />
          Get Location
        </Button>

        <Button
          onClick={handleShare}
          className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
          size="sm"
        >
          <Share2 size={16} />
          Share App
        </Button>

        <Button
          onClick={handleNotifications}
          className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2"
          size="sm"
        >
          <Bell size={16} />
          Notifications
        </Button>
      </div>

      {photo && (
        <div className="mt-4">
          <p className="text-gray-300 text-sm mb-2">Last photo taken:</p>
          <img src={photo} alt="Captured" className="w-full h-32 object-cover rounded" />
        </div>
      )}

      {location && (
        <div className="mt-4 p-3 bg-gray-700 rounded">
          <p className="text-gray-300 text-sm">
            Location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </p>
        </div>
      )}
    </div>
  );
};

export default NativeFeaturesShowcase;
