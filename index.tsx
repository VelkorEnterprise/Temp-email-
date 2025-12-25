import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './LanguageContext.tsx';

const initializeApp = () => {
  const container = document.getElementById('root');
  if (!container) {
    console.error('Fatal: Root container not found');
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </React.StrictMode>
    );
    console.log('Anonymity Engine: Mounted Successfully');
    // Signal to index.html that the app is ready to hide the loader
    window.dispatchEvent(new Event('app-ready'));
  } catch (error) {
    console.error('Critical Initialization Failure:', error);
    container.innerHTML = `
      <div style="color: white; padding: 40px; text-align: center; font-family: sans-serif;">
        <h1 style="color: #6366f1;">System Connection Interrupted</h1>
        <p style="opacity: 0.7;">An error occurred while initializing the secure environment.</p>
        <button onclick="window.location.reload()" style="background: #6366f1; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold; margin-top: 20px;">
          Retry Secure Connection
        </button>
      </div>
    `;
  }
};

// Ensure execution happens after DOM is fully interactive
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initializeApp();
} else {
  document.addEventListener('DOMContentLoaded', initializeApp);
}