import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    zipcode: "",
    role: "user",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:5000/api/people/");
    const data = await response.json();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/people/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = selectedUser ? 'PUT' : 'POST';
    const url = selectedUser ? `http://localhost:5000/api/people/${selectedUser.id}` : 'http://localhost:5000/api/people/';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      zipcode: "",
      role: "user",
    });
    setSelectedUser(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData(user);
  };

    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const filteredUsers = users.filter(user =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toString().includes(searchTerm)
    );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-1">Rechercher</h2>
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher par nom ou ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4 w-full"
      />
      <h3 className="text-xl font-bold mb-4">Liste des utilisateurs</h3>

      <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Prénom"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          required
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          placeholder="Nom"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          required
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          placeholder="Téléphone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          placeholder="Adresse"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          placeholder="Code postal"
          value={formData.zipcode}
          onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
          className="border border-gray-300 p-2 rounded"
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="border border-gray-300 p-2 rounded">
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{selectedUser ? "Modifier" : "Ajouter"}</button>
      </form>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left py-2 px-4">ID</th>
            <th className="text-left py-2 px-4">Prénom</th>
            <th className="text-left py-2 px-4">Nom</th>
            <th className="text-left py-2 px-4">Email</th>
            <th className="text-left py-2 px-4">Rôle</th>
            <th className="text-left py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b border-gray-300">{user.id}</td>
              <td className="py-2 px-4 border-b border-gray-300">{user.firstName}</td>
              <td className="py-2 px-4 border-b border-gray-300">{user.lastName}</td>
              <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
              <td className="py-2 px-4 border-b border-gray-300">{user.role}</td>
              <td className="py-2 px-4 border-b border-gray-300">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleEdit(user)}>
                  Modifier
                </button>
                <button onClick={() => handleDelete(user.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
