import React, { useEffect, useState } from "react";

const Advertisements = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    details: "",
    location: "",
    salary: "",
    benefits: "",
    hours: "",
    contactEmail: "",
    companyId: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    const response = await fetch("http://localhost:5000/api/advertisements");
    const data = await response.json();
    setAdvertisements(data);
    setFilteredAds(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/advertisements/${id}`, { method: 'DELETE' });
    fetchAdvertisements();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = selectedAd ? 'PUT' : 'POST';
    const url = selectedAd ? `http://localhost:5000/api/advertisements/${selectedAd.id}` : 'http://localhost:5000/api/advertisements';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setFormData({
      title: "",
      description: "",
      details: "",
      location: "",
      salary: "",
      benefits: "",
      hours: "",
      contactEmail: "",
      companyId: "",
    });
    setSelectedAd(null);
    fetchAdvertisements();
  };

  const handleEdit = (ad) => {
    setSelectedAd(ad);
    setFormData(ad);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = advertisements.filter(ad => 
      ad.company.name.toLowerCase().includes(term) || ad.id.toString().includes(term)
    );

    setFilteredAds(filtered);
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Liste des annonces</h3>
      <input
        type="text"
        placeholder="Rechercher par entreprise ou ID"
        value={searchTerm}
        onChange={handleSearch}
        className="border border-gray-300 p-2 rounded mb-4 w-64"
      />
      <form onSubmit={handleSubmit} className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Titre"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="flex-grow border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          placeholder="ID de l'entreprise"
          value={formData.companyId}
          onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
          required
          className="flex-grow border border-gray-300 p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          className="flex-grow border border-gray-300 p-2 rounded"
        />
        <textarea
          placeholder="Détails"
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          required
          className="flex-grow border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          placeholder="Localisation"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
          className="flex-grow border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          placeholder="Salaire"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          required
          className="flex-grow border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          placeholder="Avantages"
          value={formData.benefits}
          onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
          required
          className="flex-grow border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          placeholder="Heures"
          value={formData.hours}
          onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
          required
          className="flex-grow border border-gray-300 p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email de contact"
          value={formData.contactEmail}
          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          required
          className="flex-grow border border-gray-300 p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
      </form>

      <div className="flex flex-wrap -mx-2">
        {filteredAds.map(ad => (
          <div key={ad.id} className="bg-white shadow-lg rounded-lg p-4 m-2 flex flex-col w-full md:w-1/3 lg:w-1/4">
            <h4 className="font-bold">{ad.title}</h4>
            <p><strong>ID Annonce:</strong> {ad.id}</p>
            <p>{ad.description}</p>
            <p><strong>Entreprise:</strong> {ad.company.name}</p>
            <p><strong>Candidatures:</strong> {ad.applications.length}</p>
            <div className="mt-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleEdit(ad)}>
                Modifier
              </button>
              <button onClick={() => handleDelete(ad.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advertisements;
