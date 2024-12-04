import React from "react";
import { Outlet } from "react-router-dom";
import RRHHNavbar from '../../components/RRHHNavbar';
import './RRHH.css';

const RRHH = () => {
  return (
    <div className="rrhh">
      <RRHHNavbar />
      <h1>Departamento RRHH</h1>
      <Outlet /> 
    </div>
  );
};

export default RRHH;

