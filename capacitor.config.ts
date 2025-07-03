
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1d3558bb04fa47c1bea047a6c24584d6',
  appName: 'clubb2b',
  webDir: 'dist',
  server: {
    url: 'https://1d3558bb-04fa-47c1-bea0-47a6c24584d6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#000000',
      showSpinner: false
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#000000'
    }
  }
};

export default config;
