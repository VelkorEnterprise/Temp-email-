import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './contexts/LanguageContext.tsx';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </React.StrictMode>
    );
  } catch (error: any) {
    console.error('React Mount Error:', error);
    const overlay = document.getElementById('error-overlay');
    if (overlay) {
      overlay.style.display = 'block';
      overlay.innerHTML = `<h1>Mounting Error</h1><p>${error.message}</p>`;
    }
  }
} else {
  console.error('Critical Error: #root element not found in DOM.');
}
