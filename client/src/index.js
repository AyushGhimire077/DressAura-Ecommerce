import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/authContext';
import { Toaster } from "react-hot-toast";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#0F0F0F",
          color: "white",
          fontFamily: "'Outfit', sans-serif",
          borderRadius: "8px",
          padding: "10px",
          fontSize: "14px",
          maxWidth: "100%",
          boxShadow: "0px 0px 20px rgba(235, 230, 230, 0.1)",
        },
      }}
    />
    <App />
  </AuthProvider>
);
