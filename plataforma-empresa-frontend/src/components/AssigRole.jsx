import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignRole = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleAssignRole = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_URL}/api/assign-role/${selectedUser}`, { role }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Rol asignado');
    } catch (error) {
      console.error('Error asignando rol:', error);
    }
  };

  return (
    <form onSubmit={handleAssignRole}>
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">Selecciona un usuario</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>{user.username}</option>
        ))}
      </select>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Selecciona un rol</option>
        <option value="Responsable RRHH">Responsable RRHH</option>
        <option value="Responsable Logistica">Responsable Logistica</option>
        <option value="Responsable Produccion">Responsable Produccion</option>
        <option value="Responsable Calidad">Responsable Calidad</option>
      </select>
      <button type="submit">Asignar Rol</button>
    </form>
  );
};

export default AssignRole;
