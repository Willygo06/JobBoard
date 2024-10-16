import React, { useEffect, useState } from "react";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // État pour le terme de recherche
  const [selectedApp, setSelectedApp] = useState(null);
  const [formData, setFormData] = useState({
    jobId: "",
    applicantId: "",
    message: "",
    state: "en attente",
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const response = await fetch("http://localhost:5000/api/applications");
    const data = await response.json();
    setApplications(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/applications/${id}`, { method: 'DELETE' });
    fetchApplications();
  };

  const handleEdit = (app) => {
    setSelectedApp(app);
    setFormData(app);
  };

  // Fonction pour filtrer les candidatures en fonction du terme de recherche
  const filteredApplications = applications.filter(app => {
    const applicantName = app.applicant ? `${app.applicant.firstName} ${app.applicant.lastName}` : "";
    const guestName = app.guestName || ""; // Supposons que guestName est un champ de votre application
    const uuid = app.uuid || ""; // Supposons que uuid est un champ de votre application
    return (
      applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uuid.toLowerCase().includes(searchTerm.toLowerCase()) // Recherche par UUID
    );
  });

  return (
    <div className="mx-4"> {/* Marges à gauche et à droite */}
      <h3 className="text-xl font-bold mb-4">Liste des candidatures</h3>
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Recherche par nom de candidat ou UUID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4 box-content w-56"
      />
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">ID Annonce</th> {/* Nouvelle colonne pour l'ID de l'annonce */}
            <th className="py-2 px-4 text-left">Annonce</th>
            <th className="py-2 px-4 text-left">Candidat</th>
            <th className="py-2 px-4 text-left">Guest Name</th>
            <th className="py-2 px-4 text-left">Date de candidature</th>
            <th className="py-2 px-4 text-left">Statut</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map(app => (
            <tr key={app.id} className="border-t">
              <td className="py-2 px-4">{app.advertisement.id}</td> {/* Affichage de l'ID de l'annonce */}
              <td className="py-2 px-4">{app.advertisement.title}</td>
              <td className="py-2 px-4">
                {app.applicant ? `${app.applicant.firstName} ${app.applicant.lastName}` : "Inconnu"}
              </td>
              <td className="py-2 px-4">{app.guestName || "Inconnu"}</td>
              <td className="py-2 px-4">{new Date(app.applicationDate).toLocaleDateString()}</td>
              <td className="py-2 px-4">{app.state}</td>
              <td className="py-2 px-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleEdit(app)}>
                  Modifier
                </button>
                <button onClick={() => handleDelete(app.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Applications;
