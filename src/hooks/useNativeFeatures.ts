
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Share } from '@capacitor/share';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

export const useNativeFeatures = () => {
  const isNative = Capacitor.isNativePlatform();

  const takePicture = async () => {
    if (!isNative) return null;
    
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });
      return image.webPath;
    } catch (error) {
      console.error('Error taking picture:', error);
      return null;
    }
  };

  const getCurrentLocation = async () => {
    if (!isNative) return null;
    
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      return {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude
      };
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  };

  const shareContent = async (title: string, text: string, url?: string) => {
    if (!isNative) {
      // Fallback for web
      if (navigator.share) {
        await navigator.share({ title, text, url });
      }
      return;
    }
    
    try {
      await Share.share({
        title,
        text,
        url
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const requestNotificationPermission = async () => {
    if (!isNative) return false;
    
    try {
      const permission = await PushNotifications.requestPermissions();
      return permission.receive === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  return {
    isNative,
    takePicture,
    getCurrentLocation,
    shareContent,
    requestNotificationPermission
  };
};
