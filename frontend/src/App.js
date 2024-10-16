import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './elements/header';
import JobBoard from './jobboard';
import Footer from './elements/footer';
import BackToTop from './elements/backtotopbutton';
import AdminPage from './admin/Dashboard'; // Ajout de la route pour l'admin dashboard

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header /> 
        <div className="flex-grow">
          <Routes>
            {/* Route pour le JobBoard (page principale) */}
            <Route path="/" element={<JobBoard />} />

            {/* Route pour l'admin dashboard */}
            <Route path="/admin/dashboard" element={<AdminPage />} />

            {/* Autres routes??? */}
          </Routes>
        </div>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
