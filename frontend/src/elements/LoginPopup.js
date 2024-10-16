import React, { useState } from "react";
import { toast } from "react-toastify";

const LoginPopup = ({ onClose }) => {
  const [emailPeople, setEmailpeople] = useState("");
  const [passwordPeople, setPasswordPeople] = useState("");

  const handleConnection = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/people/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailPeople,
          password: passwordPeople,
        }),
      });
      const data = await response.json();

      if (data.result) {
        // Logique pour la connexion réussie
        toast.success("Connexion réussie !!");
        window.location.href = "/#"; // Redirection après connexion réussie
        setEmailpeople(""); // Réinitialiser le champ email
        setPasswordPeople(""); // Réinitialiser le champ mot de passe
      } else {
        toast.error(data.error || "Erreur de connexion", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
        });
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error("Une erreur inattendue s'est produite.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Se connecter</h2>
        <input
          type="email"
          className="border border-gray-300 p-2 mb-3 w-full"
          placeholder="Email..."
          value={emailPeople}
          onChange={(e) => setEmailpeople(e.target.value)}
        />
        <input
          type="password"
          className="border border-gray-300 p-2 mb-3 w-full"
          placeholder="Mot de passe"
          value={passwordPeople}
          onChange={(e) => setPasswordPeople(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleConnection}
        >
          Connexion
        </button>
        <p className="mt-4">
          Pas de compte ?{" "}
          <a href="/register" className="text-blue-500">
            Créez-en un
          </a>
        </p>
        <button className="mt-4 text-red-500" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
