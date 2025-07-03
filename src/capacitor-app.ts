
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';

export const initializeCapacitorApp = async () => {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

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
};
