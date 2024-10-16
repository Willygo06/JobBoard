import React, { useState } from "react"; // Importation des modules React et useState pour la gestion d'état
import { toast } from "react-toastify"; // Importation de la bibliothèque toast pour afficher des notifications

const RegisterModal = ({ isOpen, onClose }) => {
  // État local pour stocker les informations de l'utilisateur
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [phone, setPhone] = useState(""); 
  const [address, setAddress] = useState(""); 
  const [zipcode, setZipcode] = useState("");

  // Fonction pour gérer l'enregistrement de l'utilisateur
  const handleRegister = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    fetch("http://localhost:5000/api/people", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
        zipcode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          toast.success("Compte créé avec succès");
          // Réinitialiser les champs
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setPhone("");
          setAddress("");
          setZipcode("");
          onClose(); // Fermer le modal immédiatement après le succès
          setTimeout(() => {
            onClose(); // Fermer le modal
            toast.success("Merci d'avoir créé un compte !"); // Notification de remerciement
          }, 2000); // 2000 ms = 2 secondes
        } else {
          toast.error(data.error);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la création du compte:", error);
        toast.error("Une erreur inattendue s'est produite.");
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {/* Conteneur principal de la modal */}
      <div className="w-3/4 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl text-black font-bold mb-4">Créer un compte LFG</h2>
        <form onSubmit={handleRegister} className="text-black">
          {/* Champ pour le prénom */}
          <label htmlFor="firstName" className="text-gray-700">Prénom</label>
          <input
            type="text"
            id="firstName"
            placeholder="Jean"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          {/* Champ pour le nom */}
          <label htmlFor="lastName" className="text-gray-700">Nom</label>
          <input
            type="text"
            id="lastName"
            placeholder="De La Fontaine"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          {/* Champ pour l'e-mail */}
          <label htmlFor="email" className="text-gray-700">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="exemple@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          {/* Champ pour le mot de passe */}
          <label htmlFor="password" className="text-gray-700">Mot de passe</label>
          <input
            type="password"
            id="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black border p-2 mb-4 w-full"
          />
          {/* Champ pour le téléphone */}
          <label htmlFor="phone" className="text-gray-700">Téléphone</label>
          <input
            type="text"
            id="phone"
            placeholder="0612345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          {/* Champ pour l'adresse */}
          <label htmlFor="address" className="text-gray-700">Adresse</label>
          <input
            type="text"
            id="address"
            placeholder="6 Avenue Durant"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          {/* Champ pour le code postal */}
          <label htmlFor="zipcode" className="text-gray-700">Code Postal</label>
          <input
            type="text"
            id="zipcode"
            placeholder="00000"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <div className="flex justify-between">
            {/* Bouton pour soumettre le formulaire */}
            <button
              type="submit" // Déclenche la soumission du formulaire
              className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
            >
              Créer un compte
            </button>
            {/* Bouton pour fermer la modal sans soumettre */}
            <button
              type="button" // Empêche la soumission du formulaire
              onClick={onClose} // Appel de la fonction pour fermer la modal
              className="text-gray-500 py-2 px-4 rounded hover:bg-gray-200"
            >
              Fermer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal; // Exportation du composant pour l'utiliser ailleurs dans l'application
