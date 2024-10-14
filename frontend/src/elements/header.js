// Header.js
import React, { useState } from "react";
import LoginModal from "./LoginModal"; // Assurez-vous d'importer le composant LoginModal

function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // État pour le pop-up de connexion

  const handleLoginSuccess = (userData) => {
    // Gérer les données de l'utilisateur connecté
    console.log("Utilisateur connecté :", userData);
    // Vous pouvez ici ajouter une logique supplémentaire pour gérer l'utilisateur
  };

  return (
    <header className="w-full bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <a href="/" className="hover:text-blue-500 transition duration-200">
            LFG
          </a>
        </div>
        <nav className="space-x-6">
          <button
            className="uppercase font-bold mx-auto shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded"
            onClick={() => setIsLoginModalOpen(true)} // Ouvrir le pop-up
          >
            Se connecter
          </button>
          <a href="#jobs" className="hover:text-blue-500 transition duration-200">
            Offres d'emploi
          </a>
          
        </nav>
      </div>
      {/* Afficher le pop-up de connexion */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)} // Fermer le pop-up
        onLogin={handleLoginSuccess} // Passer la fonction de succès de connexion
      />
    </header>
  );
}

export default Header;
