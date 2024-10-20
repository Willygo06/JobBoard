import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import RegisterModal from './RegisterModal';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useContext(AuthContext); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    fetch("http://localhost:5000/api/people/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Une erreur s'est produite lors de la connexion.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); 

        if (data.result) {
          const { id: uuid, role } = data.data;
          console.log(data.result);
          localStorage.setItem('uuid', uuid);
          localStorage.setItem('role', role);
          console.log("UUID stocké :", localStorage.getItem('uuid')); 
          console.log("Rôle stocké :", localStorage.getItem('role'));

          toast.success("Connexion réussie !");
          login(role); 

          onClose();
          setEmail("");
          setPassword("");
        } else {
          toast.error(data.error);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion :", error);
        toast.error("Une erreur inattendue s'est produite.");
      });
  };

  const handleRegisterOpen = () => {
    setIsRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setIsRegisterOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl text-black font-bold mb-4">
          Se connecter à LFG
        </h2>
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
            onClick={handleRegisterOpen} // Ouvrir le RegisterModal
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            Créer un compte
          </button>
        </div>
      </div>

      {/* RegisterModal intégré ici */}
      <RegisterModal isOpen={isRegisterOpen} onClose={handleRegisterClose} />
    </div>
  );
};

export default LoginModal;
