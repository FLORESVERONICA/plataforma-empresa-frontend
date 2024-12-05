import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const WorkerList = ({ workers, setWorkers, setShowForm, setSelectedWorker }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filteredWorkers, setFilteredWorkers] = useState(workers);  

    useEffect(() => {
       
        setFilteredWorkers(
            workers.filter(worker => {
                const matchesSearch = worker.NombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    worker.idEmpresa.toString().includes(searchTerm);

                const matchesStatus = filterStatus === '' || worker.Estado === filterStatus;

                return matchesSearch && matchesStatus;
            })
        );
    }, [workers, searchTerm, filterStatus]);

    const handleEdit = (worker) => {
        setSelectedWorker(worker);
        setShowForm(true);
    };

   
    const activeWorkers = filteredWorkers.filter((worker) => worker.Estado !== 'desvinculado');
    const inactiveWorkers = filteredWorkers.filter((worker) => worker.Estado === 'desvinculado');

    return (
        <div>
            <h2>Lista de Trabajadores</h2>

            
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Buscar por nombre o ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{ padding: '5px' }}
                >
                    <option value="">Todos</option>
                    <option value="activo">Activos</option>
                    <option value="baja_IT">Baja por IT</option>
                    <option value="baja_AT">Baja por AT</option>
                    <option value="desvinculado">Desvinculados</option>
                </select>
            </div>

           
            <h3>Trabajadores Activos</h3>
            <ul>
                {activeWorkers.map((worker) => (
                    <li
                        key={worker._id}
                        style={{
                            color: worker.Estado === 'baja_IT' || worker.Estado === 'baja_AT' ? 'red' : 'black',
                        }}
                    >
                        <Link
                            to={`/worker/${worker._id}`}
                            style={{
                                color: worker.Estado === 'baja_IT' || worker.Estado === 'baja_AT' ? 'red' : 'inherit',
                            }}
                        >
                            {worker.NombreCompleto}
                        </Link>{' '}
                        - ID: {worker.idEmpresa}
                        <button onClick={() => handleEdit(worker)}>Editar</button>
                        
                    </li>
                ))}
            </ul>

           
            <h3>Trabajadores Desvinculados</h3>
            <ul>
                {inactiveWorkers.map((worker) => (
                    <li key={worker._id}>
                        <Link to={`/worker/${worker._id}`}>{worker.NombreCompleto}</Link> - ID: {worker.idEmpresa}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkerList;
