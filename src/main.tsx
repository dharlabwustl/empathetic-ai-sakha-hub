import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './components/theme-provider';

// Add mood-based theme styles
import './mood-themes.css';

// Register service worker for PWA functionality
if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('PWA Service worker registered:', registration);
      })
      .catch(error => {
        console.error('PWA Service worker registration failed:', error);
      });
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" attribute="class">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
