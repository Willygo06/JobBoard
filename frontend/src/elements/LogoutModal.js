import React, { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ onClose }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('uuid');
    logout();
    onClose();

    toast.success("Déconnexion réussie !");
    onClose();

    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-black text-lg font-semibold mb-4">Déconnexion</h2>
        <p className="mb-6 text-black">Êtes-vous sûr de vouloir vous déconnecter ?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded"
          >
            Annuler
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;