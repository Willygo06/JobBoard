import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ApplyPopup = ({ job, onClose }) => {
  const [message, setMessage] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page

    const applicantId = null; // Supposons que l'utilisateur n'est pas connecté
    const jobId = job.id; // ID de l'emploi

    try {
      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          applicantId,
          message,
          guestName,
          guestEmail,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de la candidature');
      }

      const result = await response.json();
      console.log('Candidature envoyée:', result);
      toast.success('Candidature envoyée avec succès !'); // Notification de succès
      onClose(); // Ferme le popup après succès
    } catch (error) {
      toast.error(`Erreur : ${error.message}`); // Notification d'erreur
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Postuler pour {job.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nom :</label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email :</label>
            <input
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="border-2 rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Message :</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border-2 rounded w-full py-2 px-2"
              rows="4"
              required
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
            Envoyer la candidature
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyPopup;
