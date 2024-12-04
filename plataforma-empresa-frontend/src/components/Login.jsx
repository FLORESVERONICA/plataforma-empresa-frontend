import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      alert('Inicio de sesión exitoso');

      // Redirigir según el rol del usuario
      if (role === 'admin') { 
        navigate('/dashboard');
     } else if (role === 'worker') { 
        navigate('/employee-portal'); 
     }   else if (role === 'Responsable RRHH') { 
            navigate('/rrhh'); 
    } else { 
        navigate('/'); 
    } 
} catch (error) { 
    if (error.response && error.response.data && error.response.data.message) { 
        setError(error.response.data.message);  
    } else { 
        setError('Error iniciando sesión'); } }
};

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" autoComplete="email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" autoComplete="current-password" />
      <button type="submit">Iniciar Sesión</button>
      
</form>
  );
};

export default Login;










