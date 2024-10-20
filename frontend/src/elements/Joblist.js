import React from 'react';

const JobList = ({ jobs, filteredJobs, openJobId, toggleMoreInfo, openApplyPopup }) => {
  return (
    <div className="space-y-6">
      {filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
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
                {/* Ajout du bouton Postuler ici */}
                <button
                  onClick={() => openApplyPopup(job)}
                  className="mt-4 ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
                >
                  Postuler
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600">Aucune offre ne correspond à votre recherche.</p>
      )}
    </div>
  );
};

export default JobList;
