// BackToTopButton.js
import React from 'react';

const BackToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600 transition duration-300"
    >
      &#8593; {/* Up arrow symbol */}
    </button>
  );
};

export default BackToTopButton;
