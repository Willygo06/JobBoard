import React, { useState, useEffect } from 'react';
import ApplyPopup from './elements/ApplyPopup';
import SearchBar from './elements/SearchBar';
import JobList from './elements/Joblist';

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [openJobId, setOpenJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/advertisements');
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du fetch des annonces:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(lowercasedTerm) ||
      job.description.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredJobs(filtered);
  };

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
      <SearchBar onSearch={handleSearch} />
      
      <JobList
        jobs={jobs}
        filteredJobs={filteredJobs}
        openJobId={openJobId}
        toggleMoreInfo={toggleMoreInfo}
        openApplyPopup={openApplyPopup}
      />

      {isPopupOpen && (
        <ApplyPopup job={selectedJob} onClose={closeApplyPopup} />
      )}
    </div>
  );
};

export default JobBoard;
