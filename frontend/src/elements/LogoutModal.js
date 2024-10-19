import React, { useContext } from "react";
import { toast } from "react-toastify";
import { clearUuidCookie, clearTokenCookie } from "../utils/cookiesGestion"; // Import pour supprimer le cookie
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ onClose }) => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('uuid'); // Supprimer l'UUID du local storage
    setIsLoggedIn(false);

    // Met à jour l'état d'authentification
    setIsLoggedIn(false);

    toast.success("Déconnexion réussie !");
    onClose(); // Fermer le pop-up

    // Redirection vers la page d'accueil
    navigate("/");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex justify-between bg-white p-6 rounded">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Déconnexion
        </button>
        <button
          onClick={onClose}
          className="text-gray-500 py-2 px-4 rounded hover:bg-gray-200"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
