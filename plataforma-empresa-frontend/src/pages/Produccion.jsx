import { Outlet } from 'react-router-dom'; 
import './Produccion.css'
import ProducNavbar from '../components/ProducNavbar';


const Produccion = () =>{
    return (
    <div className='Produccion'>    
        <ProducNavbar />
        <h1>Departamento de Producción</h1>
        <Outlet />
     </div>
    
    )
}

export default Produccion;



