import { Link } from 'react-router-dom'
import './ProducNavbar.css';

const ProducNavbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/produccion/productividad">Productividad</Link></li>
          <li><Link to="/produccion/personal">Personal</Link></li>
          <li><Link to="/produccion/pedidos">Pedidos</Link></li>
          <li><Link to="/produccion/almacenes">Almacenes</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default ProducNavbar;