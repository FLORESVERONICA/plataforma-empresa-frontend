
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const LoggedInUser = () => {
    const { userInfo, loading, setUserInfo } = useContext(AuthContext);

    const handleLogout = async (e) => { 
        e.preventDefault(); 
        try { await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, {}, { withCredentials: true }); 
        localStorage.removeItem('token'); 
        setUserInfo(null); window.location.href = '/login'; 
    } catch (error) { console.error('Error cerrando sesión:', error); 
        alert('Error al cerrar sesión'); 
    } 
}; 
if (loading) return <p>Cargando...</p>; 
if (!userInfo) return <p>No estás logueado</p>; 

return ( 
<div> 
    <h3>Bienvenido, {userInfo.email}</h3> 
    <p>Rol: {userInfo.role}</p> 
    <button onClick={handleLogout}>Cerrar sesión</button> 
    </div> 
    ); 
}; 

export default LoggedInUser;