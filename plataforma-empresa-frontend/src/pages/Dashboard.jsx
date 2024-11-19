import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Bienvenido al panel de administración</p>
      <div className="quick-access">
        <h2>Accesos Rápidos</h2>
        <nav className="quick-access-nav">
          <ul>
            <li><Link to="/rrhh">RRHH</Link></li>
            <li><Link to="/produccion">Producción</Link></li>
            <li><Link to="/logistica">Logística</Link></li>
            <li><Link to="/calidad">Calidad</Link></li>
            <li><Link to="/portal-emp">Portal de Empleado</Link></li>
          </ul>
        </nav>
      </div>
      <h2>Estadísticas</h2>
      <div className="stats">
        <div className="stat">
          <h3>RRHH</h3>
          <p>Empleados totales: 100</p>
          <p>Empleados activos: 80</p>
        </div>
        <div className="stat">
          <h3>Producción</h3>
          <p>Producción total: 1500 unidades</p>
        </div>
        <div className="stat">
          <h3>Logística</h3>
          <p>Pedidos entregados: 120</p>
        </div>
        <div className="stat">
          <h3>Calidad</h3>
          <p>Productos aprobados: 1400</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

