import React, { useState, useEffect } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Ajouter un écouteur d'événement pour détecter le scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {  // Afficher le bouton après avoir défilé de 300px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Fonction pour revenir en haut de la page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Défilement en douceur
    });
  };

  return (
    <button
      className={`fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-2 shadow-lg transition-opacity duration-400 hover:bg-blue-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={scrollToTop}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }} // Désactiver le clic quand invisible
    >
      <i className="text-xl fa-solid fa-arrow-up"></i>
    </button>
  );
};

export default BackToTop;
