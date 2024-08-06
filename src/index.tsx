import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <h1 className="text-4xl font-bold text-center mt-8">Vite + React + Tailwind CSS</h1>
    <App />
  </React.StrictMode>,
);
