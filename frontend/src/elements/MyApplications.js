import React, { useEffect, useState } from 'react';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // État de chargement

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true); // Commence le chargement
      try {
        const response = await fetch('/api/applications/me'); // Vérifie si l'URL est correcte
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des candidatures');
        }
        const data = await response.json();
        setApplications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <div>Chargement...</div>; // Afficher un message de chargement
  }

  if (error) {
    return <div>Erreur : {error}</div>; // Afficher l'erreur si elle existe
  }

  return (
    <div>
      <h1>Mes Candidatures</h1>
      {applications.length > 0 ? (
        <ul>
          {applications.map(application => (
            <li key={application.id}>
              {application.advertisement.title} - {application.state}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune candidature trouvée.</p>
      )}
    </div>
  );
};

export default MyApplications;
