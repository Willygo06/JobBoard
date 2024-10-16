import React, { useState } from "react";
import { toast } from "react-toastify";

const LoginModal = ({ isOpen, onClose, onLogin, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/people/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("Réponse de l'API :", data);

      
      if (data.result) {
        onLogin(data.data); // Appel de la fonction onLogin fournie par Header
        toast.success("Connexion réussie !");
        onClose(); // Fermer le pop-up
        setEmail(""); // Réinitialiser le champ email
        setPassword(""); // Réinitialiser le champ mot de passe
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error("Une erreur inattendue s'est produite.");
    }
  };

  if (!isOpen) return null; // Ne rien afficher si le pop-up n'est pas ouvert

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl text-black font-bold mb-4">Se connecter à LFG</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-black border p-2 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-black border p-2 mb-4 w-full"
        />
        <div className="flex justify-between">
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
        <div className="mt-4 text-sm">
          <p className="text-gray-500">Pas encore de compte?</p>
          <button
            onClick={onRegister}
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            Créer un compte
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
