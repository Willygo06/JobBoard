// BackToTopButton.js
import React from 'react';

const BackToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full w-6 h-8 flex items-center justify-center shadow-lg hover:bg-blue-600 transition duration-300"
      >
        <i className="fa-solid fa-arrow-up"></i> {/* Add the className to the icon */}
      </button>
  );
};

export default BackToTopButton;
