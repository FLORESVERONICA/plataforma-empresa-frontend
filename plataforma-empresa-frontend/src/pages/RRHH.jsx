import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import RRHHNavbar from '../components/RRHHNavbar';
import ListaDeTrabajadores from './pagesrrhh/ListaDeTrabajadores';
import Calendar from './pagesrrhh/Calendar';
import './RRHH.css';

const RRHH = () => {
  const { user } = useContext(AuthContext);

  if (!user || (user.role !== 'RRHH' && user.role !== 'admin')) {
    return <Navigate to="/" />;
  }

  return (
    <div className="rrhh">
      <RRHHNavbar />
      <h1>Departamento RRHH</h1>
      <Routes>
        <Route path="/lista-trabajadores" element={<ListaDeTrabajadores />} />
        <Route path="/prl" element={<div>PRL</div>} />
        <Route path="/calendario-laboral" element={<Calendar />} />
        <Route path="/fichajes" element={<div>Fichajes</div>} />
      </Routes>
    </div>
  );
};

export default RRHH;
