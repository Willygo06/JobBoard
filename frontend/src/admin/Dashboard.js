import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import Users from "./Users"; 
import Advertisements from "./Advertisements";
import Applications from "./Applications";
import Companies from "./Companies";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdvertisements, setTotalAdvertisements] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      toast.error("Accès refusé. Vous n'êtes pas administrateur.");
      navigate('/');
    }
    const fetchData = async () => {
      try {
        const userResponse = await fetch("http://localhost:5000/api/people");
        const users = await userResponse.json();
        setTotalUsers(users.length);

        const advertisementResponse = await fetch("http://localhost:5000/api/advertisements");
        const advertisements = await advertisementResponse.json();
        setTotalAdvertisements(advertisements.length);

        const applicationResponse = await fetch("http://localhost:5000/api/applications");
        const applications = await applicationResponse.json();
        setTotalApplications(applications.length);

        const companyResponse = await fetch("http://localhost:5000/api/companies");
        const companies = await companyResponse.json();
        setTotalCompanies(companies.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, [navigate]); // Le tableau vide [] signifie que cela ne s'exécutera qu'une seule fois lors du montage du composant

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Section des statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <a href="#users" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
          <h2 className="text-xl font-bold mb-2">Total Utilisateurs</h2>
          <p className="text-3xl font-semibold">{totalUsers}</p>
        </a>
        <a href="#advertisements" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
          <h2 className="text-xl font-bold mb-2">Total Annonces</h2>
          <p className="text-3xl font-semibold">{totalAdvertisements}</p>
        </a>
        <a href="#applications" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
          <h2 className="text-xl font-bold mb-2">Total Candidatures</h2>
          <p className="text-3xl font-semibold">{totalApplications}</p>
        </a>
        <a href="#companies" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
          <h2 className="text-xl font-bold mb-2">Total Entreprises</h2>
          <p className="text-3xl font-semibold">{totalCompanies}</p>
        </a>
      </div>

      {/* Section de gestion des utilisateurs */}
      <div id="users" className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h2>
        <Users /> {/* Affichage de la liste des utilisateurs */}
      </div>

      {/* Section de gestion des annonces */}
      <div id="advertisements" className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">Gestion des annonces</h2>
        <Advertisements /> {/* Affichage des annonces */}
      </div>

      {/* Section de gestion des candidatures */}
      <div id="applications" className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">Gestion des candidatures</h2>
        <Applications /> {/* Affichage des candidatures */}
      </div>

      {/* Section de gestion des entreprises */}
      <div id="companies" className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Gestion des entreprises</h2>
        <Companies /> {/* Affichage des entreprises */}
      </div>
    </div>
  );
};

export default Dashboard;