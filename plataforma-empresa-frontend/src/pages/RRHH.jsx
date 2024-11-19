import React from 'react'; 
import { Route, Routes } from 'react-router-dom'; 
import RRHHNavbar from '../components/RRHHNavbar'; 
import ListaDeTrabajadores from './pagesrrhh/ListaDeTrabajadores'; 
import './RRHH.css'; 
const RRHH = () => { 
    return ( 
    <div className="rrhh"> 
    <RRHHNavbar /> 
    <h1>Departamento RRHH</h1> 
    <Routes> 
        <Route path="/lista-trabajadores" element={<ListaDeTrabajadores />} /> 
        <Route path="/prl" element={<div>PRL</div>} /> 
        <Route path="/calendario-laboral" element={<div>Calendario Laboral</div>} /> 
        <Route path="/fichajes" element={<div>Fichajes</div>} /> 
        </Routes> </div> 
        ); 
    }; 
    export default RRHH;