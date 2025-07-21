
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'
import { initializeCapacitorApp } from './capacitor-app'

// Initialize Capacitor app
initializeCapacitorApp();

createRoot(document.getElementById("root")!).render(<App />);
