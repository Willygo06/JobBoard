import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Import Tailwind CSS
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify'; // Import du ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import du CSS de Toastify

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
      <ToastContainer
        position="top-right" // Position des notifications
        autoClose={5000} // Durée d'affichage des notifications
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="light" // Thème de notification
      />
  </React.StrictMode>
);

reportWebVitals();
