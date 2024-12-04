import { useEffect, useState } from 'react';
import axios from 'axios';
import WorkerList from '../../components/WorkerList';
import WorkerForm from '../../components/WorkerForm';
import './ListaDeTrabajadores.css';

const ListaDeTrabajadores = () => {
  const [workers, setWorkers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/rrhh/employee')
      .then(response => setWorkers(response.data))
      .catch(error => console.error('Error obteniendo trabajadores', error));
  }, []);

  const handleAddWorker = () => {
    setSelectedWorker(null);
    setShowForm(true);
  };

  return (
    <div className="lista-de-trabajadores">
      <h1>Lista de Trabajadores</h1>
      <button onClick={handleAddWorker}>Agregar trabajador</button>
      {showForm && <WorkerForm setShowForm={setShowForm} selectedWorker={selectedWorker} setWorkers={setWorkers} />}
      <WorkerList workers={workers} setWorkers={setWorkers} setShowForm={setShowForm} setSelectedWorker={setSelectedWorker} />
    </div>
  );
};

export default ListaDeTrabajadores;
