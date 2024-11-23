import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import RRHH from '../pages/RRHH';
import Produccion from '../pages/Produccion';
import WorkDetails from '../pages/WorkDetails';
import Calendar from '../pages/pagesrrhh/Calendar';
import Personal from '../pages/pagesProduccion/Personal';
import ListaDeTrabajadores from '../pages/pagesrrhh/ListaDeTrabajadores';
import Horarios from '../pages/pagesProduccion/Horarios';
import GestionPuestos from '../pages/pagesProduccion/GestionPuestos';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/rrhh/*' element={<RRHH />} />
        <Route path='/worker/:id' element={<WorkDetails />} />
        <Route path='/produccion/*' element={<Produccion />}>
          <Route path='personal/*' element={<Personal />}>
            <Route path='calendario-laboral' element={<Calendar />} />
            <Route path='lista-trabajadores' element={<ListaDeTrabajadores />} />
            <Route path='horarios' element={<Horarios />} />
            <Route path='gestion-puestos' element={<GestionPuestos />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
