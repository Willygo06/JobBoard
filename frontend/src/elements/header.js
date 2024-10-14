// Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <a href="/" className="hover:text-blue-500 transition duration-200">LFG</a>
        </div>
        <nav className="space-x-6">
          <a href="#about" className="hover:text-blue-500 transition duration-200">À propos</a>
          <a href="#jobs" className="hover:text-blue-500 transition duration-200">Offres d'emploi</a>
          <a href="#contact" className="hover:text-blue-500 transition duration-200">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
