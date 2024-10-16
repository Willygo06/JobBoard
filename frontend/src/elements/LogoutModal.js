import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { clearTokenCookie } from "../utils/cookiesGestion";
import { AuthContext } from "../contexts/AuthContext";

const LogoutModal = ({ onClose }) => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogout = async () => {
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/people/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("Réponse de l'API :", data);

      if (data.result) {
        // Pour récupérer le cookie appelé "token"
        toast.success("Déconnexion réussie !!");
        clearTokenCookie();
        setIsLoggedIn(false);
        // const token = getCookie("token");
        onClose(); // Fermer le pop-up
        setEmail(""); // Réinitialiser le champ email
        setPassword(""); // Réinitialiser le champ mot de passe
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      toast.error("Une erreur inattendue s'est produite.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex justify-between">
        <button
          onClick={handleLogout}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
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
