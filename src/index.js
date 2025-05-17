import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import AppRoutes from './Routes';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
// Remove the reportWebVitals() line completely