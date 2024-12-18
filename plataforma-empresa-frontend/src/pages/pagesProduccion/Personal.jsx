
import { Link, Outlet } from 'react-router-dom';

const Personal = () => {

  return (
    <div>
      <h2>Personal</h2>
      <nav>
        <ul>
          <li><Link to="/calendario-laboral">Calendario Laboral</Link></li>
          <li><Link to="/listado-personal">Lista Personal</Link></li>
          <li><Link to="/horarios">Horarios</Link></li>
          <li><Link to="/gestion-puestos">Gestión de Puestos</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Personal;
