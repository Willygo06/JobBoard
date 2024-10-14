import React, { useState } from "react";
import { toast } from "react-toastify";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch("http://localhost:5000/api/people", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          onLogin(data.data); // Appel de la fonction onLogin fournie par Header
          onClose(); // Fermer le pop-up
          setEmail(""); // Réinitialiser le champ email
          setPassword(""); // Réinitialiser le champ mot de passe
        } else {
          toast.error(data.error);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion :", error);
        toast.error("Une erreur inattendue s'est produite.");
      });
  };

  const handleCreateAccount = () => {
    // Logique pour rediriger vers la page de création de compte
    console.log("Redirection vers la création de compte");
    // Exemple: rediriger vers une page de création de compte
    window.location.href = "/create-account"; // Remplacez par votre route de création de compte
  };

  if (!isOpen) return null; // Ne rien afficher si le pop-up n'est pas ouvert

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl text-black font-bold mb-4 text-center">Se connecter à LFG</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <div className="flex justify-between mb-4">
          <button
            onClick={handleLogin}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Connexion
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 py-2 px-4 rounded hover:bg-gray-200"
          >
            Fermer
          </button>
        </div>
        <div className="text-bold text-center text-black py-6">-- Si vous n'êtes pas membre --</div>
        <button
          onClick={handleCreateAccount}
          className="w-full text-indigo-600 py-2 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white"
        >
          Créer un compte
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
