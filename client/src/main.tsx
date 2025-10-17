import React from 'react';
import ReactDOM from 'react-dom/client';
import RootLayout from './RootLayout'; // Import the new component
import Home from "./Home";

import './globals.css'; // This replaces the Next.js './globals.css' for global styles

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootLayout>
      <Home />
    </RootLayout>
  </React.StrictMode>,
);