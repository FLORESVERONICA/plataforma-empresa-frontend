import { Link } from 'react-router-dom';

const Navbar = () => {
 return (
    <nav>
        <ul>
            <li><Link to= '/'>Home</Link></li>
            <li><Link to= '/dashboard'>Dashboard</Link></li>
            <li><Link to= '/rrhh'>RRHH</Link></li>
            <li><Link to="/produccion">Producción</Link></li>
            <li><Link to="/logistica">Logística</Link></li>
            <li><Link to="/calidad">Calidad</Link></li>
            <li><Link to="/portal-emp">Portal de Empleado</Link></li>
        </ul>
    </nav>
 )
};

export default Navbar;