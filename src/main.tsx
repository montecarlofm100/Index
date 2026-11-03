import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Registrar Service Worker para habilitar instalación PWA en Chrome y Android
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.warn('SW registration skipped:', error);
    });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
