import React, { useEffect, useState } from 'react';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/applications/me');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des candidatures');
        }
        const data = await response.json();
        setApplications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <div>Chargement...</div>; 
  }

  if (error) {
    return <div>Erreur : {error}</div>; 
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
