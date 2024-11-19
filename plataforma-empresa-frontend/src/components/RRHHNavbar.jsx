import React from 'react'; 
import { Link } from 'react-router-dom'; 
import './RRHHNavbar.css'; 
const RRHHNavbar = () => { 
    return ( 
    <nav className="rrhh-navbar"> 
    <ul> 
        <li><Link to="/rrhh/lista-trabajadores">Lista de Trabajadores</Link></li> 
        <li><Link to="/rrhh/prl">PRL</Link></li> 
        <li><Link to="/rrhh/calendario-laboral">Calendario Laboral</Link></li> 
        <li><Link to="/rrhh/fichajes">Fichajes</Link></li> 
        </ul> 
        </nav> 
        ); 
    }; 
    export default RRHHNavbar;