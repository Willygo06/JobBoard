import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';



const ApplyPopup = ({ job, onClose }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isLoggedIn) return;

      const userId = localStorage.getItem('uuid'); // Récupère l'UUID de l'utilisateur depuis localStorage
      console.log("UUID récupéré depuis localStorage :", userId);

      if (!userId) {
        toast.error("Utilisateur non authentifié");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/people/me/me`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${userId}`,
          },
        });

        const data = await response.json();
        console.log(data);

        if (data.result) {
          setGuestName(`${data.data.firstName} ${data.data.lastName}`); // Combine le prénom et le nom
          setGuestEmail(data.data.email); // Récupère l'email de l'utilisateur
        } else {
          toast.error(data.error);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        toast.error("Une erreur est survenue lors de la récupération des données.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicantId = localStorage.getItem('uuid');
    const jobId = job.id;

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
      toast.success('Candidature envoyée avec succès !');
      onClose();
    } catch (error) {
      toast.error(`Erreur : ${error.message}`);
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
              placeholder="Nom complet"
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
              placeholder="Email"
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
              placeholder='Ecrivez votre message'
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
