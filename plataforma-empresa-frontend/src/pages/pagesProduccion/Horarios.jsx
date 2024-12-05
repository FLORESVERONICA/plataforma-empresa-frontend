import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import './Horarios.css';

const Horarios = () => {
  const [fecha, setFecha] = useState(new Date());
  const [horarios, setHorarios] = useState({});
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetchWorkers();
  }, []);

  useEffect(() => {
    generarHorarios();
  }, [fecha, workers]);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/rrhh/employees`);
      setWorkers(response.data);
    } catch (error) {
      console.error('Error obteniendo trabajadores:', error);
    }
  };

  const generarHorarios = () => {
    const diaSemana = format(fecha, 'EEEE', { locale: es }).toLowerCase();
    const nuevosHorarios = {};

    workers.forEach(worker => {
      if (worker.estado === 'activo' && !worker.diasDescanso.includes(diaSemana)) {
        if (!nuevosHorarios[worker.departamento]) {
          nuevosHorarios[worker.departamento] = [];
        }
        nuevosHorarios[worker.departamento].push({
          nombre: worker.nombre,
          puesto: worker.puesto,
        });
      }
    });

    setHorarios(nuevosHorarios);
  };

  const cambiarFecha = (dias) => {
    setFecha(new Date(fecha.setDate(fecha.getDate() + dias)));
  };

  return (
    <div className="horarios">
      <h2>Horarios</h2>
      <div className="fecha">
        <button onClick={() => cambiarFecha(-1)}>Día Anterior</button>
        <span>{format(fecha, 'dd/MM/yyyy', { locale: es })}</span>
        <button onClick={() => cambiarFecha(1)}>Día Siguiente</button>
      </div>

      <div className="horarios-lista">
        {Object.keys(horarios).map((departamento) => (
          <div key={departamento} className="departamento">
            <h3>{departamento}</h3>
            <ul>
              {horarios[departamento].map((trabajador, index) => (
                <li key={index}>
                  {trabajador.nombre} - {trabajador.puesto}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Horarios;
