// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 py-1 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="mb-4 sm:mb-2">
            <h1 className="text-2xl font-bold">LFG</h1>
            <p className="text-gray-400 mt-2">&copy; 2024 LFG. Tous droits réservés.</p>
          </div>
          <div>
            <nav className="space-x-6">
              <a href="#about" className="hover:text-blue-500 transition duration-200 whitespace-pre-wrap">À propos</a>
              <a href="#jobs" className="hover:text-blue-500 transition duration-200 whitespace-pre-wrap">Offres d'emploi</a>
              <a href="#contact" className="hover:text-blue-500 transition duration-200">Contact</a>
            </nav>
          </div>
        </div>
        <div className="mt-3 text-center text-gray-400">
          <p>Suivez-nous sur:</p>
          <div className="flex justify-center space-x-4 mt-1">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-lg hover:text-blue-500 transition duration-200"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-lg hover:text-blue-500 transition duration-200"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-lg hover:text-blue-500 transition duration-200"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
