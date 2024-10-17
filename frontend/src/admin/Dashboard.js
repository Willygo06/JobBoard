import React, { useEffect, useState } from "react";

// Composants pour chaque section (Statistiques, Utilisateurs, etc.)
import Users from "./Users"; // Section pour la gestion des utilisateurs
import Advertisements from "./Advertisements"; // Section pour la gestion des annonces
import Applications from "./Applications"; // Section pour la gestion des candidatures
import Companies from "./Companies"; // Importer le module Companies

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdvertisements, setTotalAdvertisements] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch("http://localhost:5000/api/people");
        const users = await userResponse.json();
        setTotalUsers(users.length); // Compter le nombre d'utilisateurs

        const advertisementResponse = await fetch("http://localhost:5000/api/advertisements");
        const advertisements = await advertisementResponse.json();
        setTotalAdvertisements(advertisements.length); // Compter le nombre d'annonces

        const applicationResponse = await fetch("http://localhost:5000/api/applications");
        const applications = await applicationResponse.json();
        setTotalApplications(applications.length); // Compter le nombre de candidatures

        const companyResponse = await fetch("http://localhost:5000/api/companies");
        const companies = await companyResponse.json();
        setTotalCompanies(companies.length); // Compter le nombre d'entreprises
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []); // Le tableau vide [] signifie que cela ne s'exécutera qu'une seule fois lors du montage du composant

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Section des statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Total Utilisateurs</h2>
          <p className="text-3xl font-semibold">{totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Total Annonces</h2>
          <p className="text-3xl font-semibold">{totalAdvertisements}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Total Candidatures</h2>
          <p className="text-3xl font-semibold">{totalApplications}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Total Entreprises</h2>
          <p className="text-3xl font-semibold">{totalCompanies}</p>
        </div>
      </div>

      {/* Section de gestion des utilisateurs */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h2>
        <Users /> {/* Affichage de la liste des utilisateurs */}
      </div>

      {/* Section de gestion des annonces */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">Gestion des annonces</h2>
        <Advertisements /> {/* Affichage des annonces */}
      </div>

      {/* Section de gestion des candidatures */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">Gestion des candidatures</h2>
        <Applications /> {/* Affichage des candidatures */}
      </div>

      {/* Section de gestion des entreprises */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Gestion des entreprises</h2>
        <Companies /> {/* Affichage des entreprises */}
      </div>
    </div>
  );
};

export default Dashboard;
