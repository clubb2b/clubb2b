
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeCapacitorApp } from './capacitor-app'

// Initialize Capacitor app
initializeCapacitorApp();

createRoot(document.getElementById("root")!).render(<App />);
