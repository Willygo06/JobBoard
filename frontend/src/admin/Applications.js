import React, { useEffect, useState } from "react";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = selectedApp ? 'PUT' : 'POST';
    const url = selectedApp
      ? `http://localhost:5000/api/applications/${selectedApp.id}`
      : 'http://localhost:5000/api/applications/';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setFormData({
      jobId: "",
      applicantId: "",
      message: "",
      state: "en attente",
    });
    setSelectedApp(null);
    fetchApplications();
  };

  const filteredApplications = applications.filter(app => {
    const applicantName = app.applicant ? `${app.applicant.firstName} ${app.applicant.lastName}` : "";
    const guestName = app.guestName || "";
    const uuid = app.uuid || "";
    return (
      applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uuid.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="mx-4">
      <h3 className="text-xl font-bold mb-4">Liste des candidatures</h3>

      {/* Formulaire d'ajout/modification */}
      <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="ID Annonce"
          value={formData.jobId}
          onChange={(e) => setFormData({ ...formData, jobId: e.target.value })}
          required
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          placeholder="ID Candidat"
          value={formData.applicantId}
          onChange={(e) => setFormData({ ...formData, applicantId: e.target.value })}
          required
          className="border border-gray-300 p-2 rounded"
        />
        <textarea
          placeholder="Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="border border-gray-300 p-2 rounded"
        />
        <select
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="en attente">En attente</option>
          <option value="acceptée">Acceptée</option>
          <option value="rejetée">Rejetée</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {selectedApp ? "Modifier" : "Ajouter"}
        </button>
      </form>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Recherche par nom de candidat ou UUID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4 box-content w-full"
      />

      {/* Tableau des candidatures */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">ID Annonce</th>
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
              <td className="py-2 px-4">{app.advertisement.id}</td>
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
