
import { Capacitor } from '@capacitor/core';

export const initializeCapacitorApp = async () => {
  if (!Capacitor.isNativePlatform()) {
    console.log('Running on web platform - Capacitor features disabled');
    return;
  }

  try {
    // Dynamically import Capacitor plugins only when on native platform
    const { App } = await import('@capacitor/app');
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    const { SplashScreen } = await import('@capacitor/splash-screen');

    // Set status bar style
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#000000' });

    // Hide splash screen after app loads
    await SplashScreen.hide();

    // Handle back button on Android
    App.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        App.exitApp();
      } else {
        window.history.back();
      }
    });

    // Handle app state changes
    App.addListener('appStateChange', ({ isActive }) => {
      console.log('App state changed. Is active?', isActive);
    });

    console.log('Capacitor app initialized');
  } catch (error) {
    console.warn('Failed to initialize Capacitor features:', error);
  }
};
