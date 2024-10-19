import React, { useEffect, useState } from "react";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    location: "",
    website: "",
    contactEmail: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const response = await fetch("http://localhost:5000/api/companies");
    const data = await response.json();
    setCompanies(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/companies/${id}`, { method: 'DELETE' });
    fetchCompanies();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = selectedCompany ? 'PUT' : 'POST';
    const url = selectedCompany ? `http://localhost:5000/api/companies/${selectedCompany.id}` : 'http://localhost:5000/api/companies';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setFormData({
      name: "",
      industry: "",
      location: "",
      website: "",
      contactEmail: "",
    });
    setSelectedCompany(null);
    fetchCompanies();
  };

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setFormData(company);
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-sm mx-auto p-4">
      <h3 className="text-xl font-bold mb-4">Liste des entreprises</h3>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher par nom d'entreprise ou ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4 w-full"
      />
        <h2 className="text-s font-bold mb-2">Ajouter une entreprise</h2>
      <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nom de l'entreprise"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="border border-gray-300 p-3 rounded shadow-md"
        />
        <input
          type="text"
          placeholder="Secteur d'activité"
          value={formData.industry}
          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          required
          className="border border-gray-300 p-3 rounded shadow-md"
        />
        <input
          type="text"
          placeholder="Localisation"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
          className="border border-gray-300 p-3 rounded shadow-md"
        />
        <input
          type="text"
          placeholder="Site Internet"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          className="border border-gray-300 p-3 rounded shadow-md"
        />
        <input
          type="email"
          placeholder="Email de contact"
          value={formData.contactEmail}
          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          required
          className="border border-gray-300 p-3 rounded shadow-md"
        />
        <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded shadow-md">{selectedCompany ? "Modifier" : "Ajouter"}</button>
      </form>

            <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left py-4 px-6">ID</th>
            <th className="text-left py-4 px-6">Nom</th>
            <th className="text-left py-4 px-6">Secteur</th>
            <th className="text-left py-4 px-6">Emplacement</th>
            <th className="text-left py-4 px-6">Site Web</th>
            <th className="text-left py-4 px-6">Email de contact</th>
            <th className="text-left py-4 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.map((company, index) => (
            <tr key={company.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              <td className="py-3 px-6 border-b border-gray-300">{company.id}</td>
              <td className="py-3 px-6 border-b border-gray-300">{company.name}</td>
              <td className="py-3 px-6 border-b border-gray-300">{company.industry}</td>
              <td className="py-3 px-6 border-b border-gray-300">{company.location}</td>
              <td className="py-3 px-6 border-b border-gray-300">{company.website}</td>
              <td className="py-3 px-6 border-b border-gray-300">{company.contactEmail}</td>
              <td className="py-3 px-6 border-b border-gray-300">
                <div className="flex flex-col space-y-2">
                  <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleEdit(company)}
                  >
                    Modifier
                  </button>
                  <button 
                    onClick={() => handleDelete(company.id)} 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Companies;
