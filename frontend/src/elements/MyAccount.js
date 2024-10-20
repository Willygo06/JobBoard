import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    zipcode: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isLoggedIn) return;
  
      // Récupérer l'UUID de l'utilisateur à partir du local storage
      const userId = localStorage.getItem('uuid');
      console.log("UUID récupéré depuis localStorage :", userId);

      if (!userId) {
        toast.error("Utilisateur non authentifié");
        setIsLoading(false);
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:5000/api/people/me/me`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${userId}`,
          },
        });
  
        const data = await response.json();
        console.log(data);
  
        if (data.result) {
          setUserData(data.data); // Mettre à jour les données de l'utilisateur
        } else {
          toast.error(data.error);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        toast.error("Une erreur est survenue lors de la récupération des données.");
      } finally {
        setIsLoading(false); // Mettre à jour l'état de chargement dans tous les cas
      }
    };
  
    fetchUserData();
  }, [isLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Récupérer l'UUID de l'utilisateur depuis le local storage
    const userId = localStorage.getItem('uuid');
    
    if (!userId) {
      toast.error("Utilisateur non authentifié.");
      return;
    }
  
    const { password, ...userUpdateData } = userData;

    try {
      const response = await fetch("http://localhost:5000/api/people/update", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${userId}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userUpdateData),
      });
  
      // Vérifie le statut de la réponse avant de convertir en JSON
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la mise à jour des données.");
      }
  
      const data = await response.json();
      if (data.result) {
        toast.success("Informations mises à jour avec succès !");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données :", error);
      toast.error(error.message); // Affiche le message d'erreur spécifique
    }
  };
    

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mon Compte</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            Prénom
          </label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Nom
          </label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Téléphone
          </label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Adresse
          </label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zipcode">
            Code postal
          </label>
          <input
            type="text"
            name="zipcode"
            value={userData.zipcode}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Mettre à jour
        </button>
      </form>

      {/* Bouton pour accéder aux candidatures en attente */}
      <button
        onClick={() => navigate('/applications/me')}
        className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Voir mes candidatures en attente
      </button>
    </div>
  );
};

export default MyAccount;
