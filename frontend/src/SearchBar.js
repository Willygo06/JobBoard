import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Rechercher une offre d'emploi..."
        className="border rounded p-2 w-full"
      />
    </div>
  );
};

export default SearchBar;
