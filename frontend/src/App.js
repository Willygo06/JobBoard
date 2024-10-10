import React from 'react';
import Header from './header';
import JobBoard from './jobboard';
import Footer from './footer';
import BackToTop from './backtotopbutton'; // Ajout de l'import pour BackToTop

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <JobBoard />
      </div>
      <Footer />
      <BackToTop /> {/* Ajout du bouton BackToTop ici */}
    </div>
  );
}

export default App;
