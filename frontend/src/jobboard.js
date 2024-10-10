import React, { useState } from 'react';

const jobs = [
    {
      id: 1,
      title: 'Développeur Front-End',
      description: 'Rejoignez notre équipe dynamique pour développer des applications web modernes.',
      moreInfo: {
        details: 'Nous recherchons un développeur front-end passionné pour construire des interfaces utilisateur avec React et Tailwind. Vous travaillerez avec une équipe talentueuse dans un environnement Agile.',
        salary: '35,000€ - 45,000€ par an',
        hours: '35 heures par semaine',
        benefits: 'Télétravail, RTT, Mutuelle'
      }
    },
    {
      id: 2,
      title: 'Développeur Back-End',
      description: 'Travaillez sur des API robustes et des systèmes de gestion de base de données.',
      moreInfo: {
        details: "Nous avons besoin d'un développeur back-end capable de travailler avec Node.js et des bases de données SQL. Vous participerez à la conception et à la maintenance de nos systèmes internes.",
        salary: '40,000€ - 50,000€ par an',
        hours: '40 heures par semaine',
        benefits: 'Tickets restaurant, Transport, Mutuelle'
      }
    },
    {
      id: 3,
      title: 'Designer UI/UX',
      description: 'Concevez des expériences utilisateur intuitives et engageantes.',
      moreInfo: {
        details: 'Votre travail consistera à créer des interfaces élégantes et fonctionnelles pour des utilisateurs finaux. Vous devez avoir une bonne compréhension des tendances actuelles en matière de design.',
        salary: '40,000€ - 50,000€ par an',
        hours: '35 heures par semaine',
        benefits: 'Télétravail, Formation continue, Mutuelle d\'entreprise'
      }
    },
    {
      id: 4,
      title: 'Chef de Projet IT',
      description: 'Gérez une équipe de développeurs pour assurer la bonne mise en œuvre des projets IT.',
      moreInfo: {
        details: 'En tant que Chef de Projet IT, vous superviserez la planification, le suivi et la mise en œuvre des projets technologiques de l\'entreprise.',
        salary: '50,000€ - 60,000€ par an',
        hours: '39 heures par semaine',
        benefits: 'Voiture de fonction, Bonus annuel, Télétravail'
      }
    },
    {
      id: 5,
      title: 'Ingénieur Sécurité',
      description: 'Assurez la sécurité de nos systèmes d\'informations et protégez nos données sensibles.',
      moreInfo: {
        details: 'Vous serez responsable de la mise en œuvre de politiques de sécurité, d\'audits et de la protection des infrastructures IT.',
        salary: '55,000€ - 65,000€ par an',
        hours: '38 heures par semaine',
        benefits: 'Formations, Mutuelle, Prévoyance'
      }
    }
  ];
  // Vous pouvez ajouter d'autres offres avec plus d'informations ici

const JobBoard = () => {
  const [openJobId, setOpenJobId] = useState(null); // État pour suivre l'offre ouverte

  const toggleMoreInfo = (id) => {
    setOpenJobId(openJobId === id ? null : id);
  };

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

            {/* Si l'ID de l'offre correspond à celui de l'état, on affiche plus d'infos */}
            {openJobId === job.id && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <p className="text-gray-800"><strong>Description du poste :</strong> {job.moreInfo.details}</p>
                <p className="text-gray-800 mt-2"><strong>Salaire :</strong> {job.moreInfo.salary}</p>
                <p className="text-gray-800 mt-2"><strong>Heures :</strong> {job.moreInfo.hours}</p>
                <p className="text-gray-800 mt-2"><strong>Avantages :</strong> {job.moreInfo.benefits}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBoard;
