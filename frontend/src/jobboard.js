import React, { useState, useEffect } from 'react';
import ApplyPopup from './ApplyPopup'; // Assure-toi d'importer le composant ApplyPopup

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [openJobId, setOpenJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    // Récupérer les annonces depuis l'API
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/advertisements'); // URL de l'API des annonces
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du fetch des annonces:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const toggleMoreInfo = (id) => {
    setOpenJobId(openJobId === id ? null : id);
  };

  const openApplyPopup = (job) => {
    setSelectedJob(job);
    setIsPopupOpen(true);
  };

  const closeApplyPopup = () => {
    setIsPopupOpen(false);
    setSelectedJob(null);
  };

  if (loading) {
    return <div className="p-8 max-w-3xl"><p>Chargement des offres d'emploi...</p></div>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto text-center scroll-smooth">
      <h1 className="text-2xl font-bold mb-6">Offres d'emploi</h1>
      <div className="space-y-6">
        {jobs.map((job) => (
          <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300" key={job.id}>
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="mt-2 text-gray-600">{job.description}</p>
            
            <button
              onClick={() => toggleMoreInfo(job.id)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              {openJobId === job.id ? 'Réduire' : 'En savoir plus'}
            </button>

            {openJobId === job.id && (
              <div className="mt-4 p-4 bg-gray-100 rounded text-left">
                <p className="text-gray-800"><strong>Description du poste :</strong> {job.details}</p>
                <p className="text-gray-800 mt-2"><strong>Localisation :</strong> {job.location}</p>
                <p className="text-gray-800 mt-2"><strong>Salaire :</strong> {job.salary}</p>
                <p className="text-gray-800 mt-2"><strong>Heures :</strong> {job.hours}</p>
                <p className="text-gray-800 mt-2"><strong>Avantages :</strong> {job.benefits}</p>
                <p className="text-gray-800 mt-2"><strong>Contact :</strong> {job.contactEmail}</p>
                <button
                  onClick={() => openApplyPopup(job)}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
                >
                  Postuler
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {isPopupOpen && <ApplyPopup job={selectedJob} onClose={closeApplyPopup} />}
    </div>
  );
};

export default JobBoard;
