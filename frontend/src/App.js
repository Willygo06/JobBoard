import React from 'react';

import Header from './elements/header';
import JobBoard from './jobboard';
import Footer from './elements/footer';
import BackToTop from './elements/backtotopbutton';

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
