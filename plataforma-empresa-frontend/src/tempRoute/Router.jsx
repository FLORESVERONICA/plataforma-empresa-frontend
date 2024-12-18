import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from '../pages/pagesHome/Home';
import Dashboard from "../pages/Dashboard";
import RRHH from "../pages/pagesrrhh/RRHH";
import Produccion from "../pages/pagesProduccion/Produccion";
import ListaDeTrabajadores from "../pages/pagesrrhh/ListaDeTrabajadores";
import WorkDetails from "../pages/pagesrrhh/WorkDetails";
import Calendar from "../pages/pagesrrhh/Calendar";
import Personal from "../pages/pagesProduccion/Personal";
import GestionPuestos from "../pages/pagesProduccion/GestionPuestos";
import ListadoPersonal from '../pages/pagesProduccion/ListadoPersonal'
import RoleAssignment from "../components/AssigRole"; 
import Login from "../components/Login";
import Register from "../components/Register"; 
import PortalEmpleado from "../pages/PortalEmpleado";
import LoggedInUser from "../components/LoggedInUser"; 

const AppRouter = () => {

  const role = localStorage.getItem('role') || '';

 return ( 
  <div>
    <LoggedInUser />
 <Routes> 
  <Route path="/" element={<Home />} /> 
  <Route path="/dashboard" element={role === 'admin' ? <Dashboard /> : <Navigate to="/home/login" />} /> 
  <Route path="/dashboard/rrhh" element={role === 'admin' || role === 'Responsable RRHH' ? <RRHH /> : <Navigate to="/home/login" />} /> 
  <Route path="/lista-trabajadores" element={role === 'admin' || role === 'Responsable RRHH' ? <ListaDeTrabajadores /> : <Navigate to="/home/login" />} /> 
  <Route path="/worker/:id" element={role === 'admin' || role === 'Responsable RRHH' ? <WorkDetails /> : <Navigate to="/home/login" />} /> 
  <Route path="/calendario-laboral" element={role === 'admin' || role === 'Responsable RRHH' ? <Calendar /> : <Navigate to="/home/login" />} /> 
  <Route path="/assign-role" element={role === 'admin' ? <RoleAssignment /> : <Navigate to="/home/login" />} /> 
  <Route path="/dashboard/produccion" element={role === 'admin' ? <Produccion /> : <Navigate to="/home/login" />} /> 
  <Route path="/personal" element={role === 'admin' ? <Personal /> : <Navigate to="/home/login" />} /> 
  <Route path="/gestion-puestos" element={role === 'admin' ? <GestionPuestos /> : <Navigate to="/home/login" />} /> 
  <Route path="/listado-personal" element={role === 'admin' ? <ListadoPersonal /> : <Navigate to="/home/login" />} />
  <Route path="/login" element={<Login />} /> 
  <Route path="/register" element={<Register />} />
  <Route path="/home" element={<Home />} /> 
  <Route path="/employee-portal" element={role === 'worker' ? <PortalEmpleado /> : <Navigate to="/home/login" />} /> 
  </Routes> 
  </div>
  );
};

export default AppRouter;




