import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";
import RegisterModal from "./RegisterModal";
import { AuthContext } from "../contexts/AuthContext";

function Header() {
  const { isLoggedIn, userRole } = useContext(AuthContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleLoginSuccess = (userData) => {
    console.log("Utilisateur connecté :", userData);
  };

  return (
    <header className="w-full bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-xl sm:text-2xl font-bold">
          <Link to="/" className="hover:text-blue-500 transition duration-200">
            LFG
          </Link>
        </div>

        <nav className="flex flex-col sm:flex-row space-y-4 sm:space-x-6 sm:space-y-0 items-center">
          {!isLoggedIn ? (
            <>
              <button
                className="uppercase font-bold mx-auto shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-xs sm:text-sm py-2 sm:py-3 px-6 sm:px-10 rounded"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Se connecter
              </button>
              <button
                className="uppercase font-bold mx-auto shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-xs sm:text-sm py-2 sm:py-3 px-6 sm:px-10 rounded"
                onClick={() => setIsRegisterModalOpen(true)}
              >
                S'inscrire
              </button>
            </>
          ) : (
            <>
              <Link to="/people/me">
                <button
                  className="uppercase font-bold mx-auto shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-xs sm:text-sm py-2 sm:py-3 px-6 sm:px-10 rounded"
                >
                  Mon profil
                </button>
              </Link>

              <button
                className="uppercase font-bold mx-auto shadow bg-red-600 hover:bg-red-500 focus:shadow-outline focus:outline-none text-xs sm:text-sm py-2 sm:py-3 px-6 sm:px-10 rounded"
                onClick={() => setIsLogoutModalOpen(true)}
              >
                Se déconnecter
              </button>
            </>
          )}

          <Link
            to="/"
            className="hover:text-blue-500 transition duration-200 text-xs sm:text-sm"
          >
            Offres d'emploi
          </Link>

          {/* Afficher le bouton Admin Tool uniquement pour les admins */}
          {isLoggedIn && userRole === "admin" && (
            <Link to="/admin/dashboard">
              <button
                className="uppercase font-bold mx-auto shadow bg-green-600 hover:bg-green-500 focus:shadow-outline focus:outline-none text-xs sm:text-sm py-2 sm:py-3 px-6 sm:px-10 rounded"
              >
                Admin Tool
              </button>
            </Link>
          )}
        </nav>
      </div>

      {/* Afficher le pop-up de connexion seulement si isLoginModalOpen est true */}
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLoginSuccess}
          onRegister={() => {
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(true);
          }}
        />
      )}
      
      {/* Afficher le pop-up de création de compte seulement si isRegisterModalOpen est true */}
      {isRegisterModalOpen && (
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
        />
      )}
      
      {/* Afficher le pop-up de déconnexion seulement si isLogoutModalOpen est true */}
      {isLogoutModalOpen && (
        <LogoutModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
        />
      )}
    </header>
  );
}

export default Header;
