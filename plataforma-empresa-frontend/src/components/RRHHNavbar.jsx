import React from 'react'; 
import { Link } from 'react-router-dom'; 
import './RRHHnavbar.css'; 
const RRHHNavbar = () => { 
    return ( 
    <nav className="rrhh-navbar"> 
    <ul> 
        <li><Link to="/lista-trabajadores">Lista de Trabajadores</Link></li> 
        <li><Link to="/prl">PRL</Link></li> 
        <li><Link to="/calendario-laboral">Calendario Laboral</Link></li> 
        <li><Link to="/fichajes">Fichajes</Link></li> 
        </ul> 
        </nav> 
        ); 
    }; 
    export default RRHHNavbar;