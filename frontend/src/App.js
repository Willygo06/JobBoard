import React from 'react';
import JobBoard from './jobboard';
import Footer from './footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
      <JobBoard />
      </div>
      <Footer />
    </div>
  );
}

export default App;
