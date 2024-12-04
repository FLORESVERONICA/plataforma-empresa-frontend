import { Link } from 'react-router-dom'
import './ProducNavbar.css';

const ProducNavbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/productividad">Productividad</Link></li>
          <li><Link to="/personal">Personal</Link></li>
          <li><Link to="/pedidos">Pedidos</Link></li>
          <li><Link to="/almacenes">Almacenes</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default ProducNavbar;