import React from 'react';
import BackToTopButton from './backtotopbutton';

const jobs = [
  {
    id: 1,
    title: 'Développeur Front-End',
    description: 'Rejoignez notre équipe dynamique pour développer des applications web modernes.',
  },
  {
    id: 2,
    title: 'Développeur Back-End',
    description: 'Travaillez sur des API robustes et des systèmes de gestion de base de données.',
  },
  {
    id: 3,
    title: 'Designer UI/UX',
    description: 'Concevez des expériences utilisateur intuitives et engageantes.',
  },
  {
    id: 1,
    title: 'Développeur Front-End',
    description: 'Rejoignez notre équipe dynamique pour développer des applications web modernes.',
  },
  {
    id: 2,
    title: 'Développeur Back-End',
    description: 'Travaillez sur des API robustes et des systèmes de gestion de base de données.',
  },
  {
    id: 3,
    title: 'Designer UI/UX',
    description: 'Concevez des expériences utilisateur intuitives et engageantes.',
  },
  {
    id: 1,
    title: 'Développeur Front-End',
    description: 'Rejoignez notre équipe dynamique pour développer des applications web modernes.',
  },
  {
    id: 2,
    title: 'Développeur Back-End',
    description: 'Travaillez sur des API robustes et des systèmes de gestion de base de données.',
  },
  {
    id: 3,
    title: 'Designer UI/UX',
    description: 'Concevez des expériences utilisateur intuitives et engageantes.',
  },

  // Ajoutez d'autres offres ici
];

const JobBoard = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-6">Offres d'emploi</h1>
      <div className="space-y-6">
        {jobs.map((job) => (
          <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300" key={job.id}>
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="mt-2 text-gray-600">{job.description}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
              En savoir plus
            </button>
          </div>
        ))}
      <BackToTopButton /> {/* Include the Back to Top button */}
      </div>
    </div>
  );
};

export default JobBoard;
