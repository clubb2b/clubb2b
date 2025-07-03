
import { Capacitor } from '@capacitor/core';

export const useNativeFeatures = () => {
  const isNative = Capacitor.isNativePlatform();

  const takePicture = async () => {
    if (!isNative) return null;
    
    try {
      const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera');
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
      const { Geolocation } = await import('@capacitor/geolocation');
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
      const { Share } = await import('@capacitor/share');
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
      const { PushNotifications } = await import('@capacitor/push-notifications');
      const permission = await PushNotifications.requestPermissions();
      return permission.receive === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const takePhoto = async (): Promise<string | null> => {
    return takePicture();
  };

  const sendNotification = async (title: string, body: string, data?: any): Promise<void> => {
    await requestNotificationPermission();
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, data });
    }
  };

  const downloadFile = async (url: string, filename: string): Promise<void> => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isOnline = navigator.onLine;

  return {
    isNative,
    takePicture,
    takePhoto,
    getCurrentLocation,
    shareContent,
    requestNotificationPermission,
    sendNotification,
    downloadFile,
    isOnline
  };
};
