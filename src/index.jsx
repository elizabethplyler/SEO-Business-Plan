import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Root element not found');
    document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: Root element not found</div>';
  } else {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('React app mounted successfully');
  }
} catch (error) {
  console.error('Error mounting React app:', error);
  document.body.innerHTML = `<div style="padding: 20px; color: red;">Error: ${error.message}</div>`;
}
