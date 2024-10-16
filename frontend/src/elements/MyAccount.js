import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const MyAccount = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    zipcode: ""
  });

  // Ici je simule l'utilisateur connecté (On peut stocker les informations dans un state global, par exemple, avec Redux ou un contexte)
  const userId = 1; // ID utilisateur connecté

  useEffect(() => {
    // Récupérer les informations de l'utilisateur actuel
    fetch(`http://localhost:5000/api/people/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setUserData(data.data);
        } else {
          toast.error("Erreur lors de la récupération des informations utilisateur.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des informations utilisateur :", error);
      });
  }, []);

  const handleUpdate = () => {
    fetch(`http://localhost:5000/api/people/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          toast.success("Informations mises à jour avec succès.");
        } else {
          toast.error("Erreur lors de la mise à jour des informations.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour :", error);
        toast.error("Une erreur inattendue s'est produite.");
      });
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Mon compte</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Prénom</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Nom</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">E-mail</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Téléphone</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Adresse</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Code postal</label>
          <input
            type="text"
            name="zipcode"
            value={userData.zipcode}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
      </div>
      <button
        onClick={handleUpdate}
        className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 mt-6"
      >
        Mettre à jour
      </button>
    </div>
  );
};

export default MyAccount;
