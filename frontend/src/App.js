import React from 'react';
import Header from './header';
import JobBoard from './jobboard';
import Footer from './footer';
import BackToTop from './backtotopbutton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify (pour les notifs)

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <JobBoard />
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
