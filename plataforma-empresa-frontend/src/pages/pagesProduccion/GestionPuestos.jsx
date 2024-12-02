import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GestionPuestos.css';

const GestionPuestos = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [nuevoDepartamento, setNuevoDepartamento] = useState('');
  const [loading, setLoading] = useState(false);
  const [puestos, setPuestos] = useState({});

  useEffect(() => {
    fetchDepartamentos();
  }, []);

  const fetchDepartamentos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/produccion/departamentos');
      setDepartamentos(response.data);
    } catch (error) {
      console.error('Error obteniendo departamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const agregarDepartamento = async (e) => {
    e.preventDefault();
    if (!nuevoDepartamento.trim()) {
      return alert('El nombre del departamento es obligatorio.');
    }
    try {
      const response = await axios.post('http://localhost:5000/api/produccion/departamentos', {
        nombre: nuevoDepartamento,
        puestos: [],
      });
    
      setDepartamentos(prevDepartamentos => [...departamentos, response.data]);
      fetchDepartamentos();
      setNuevoDepartamento('');

    } catch (error) {
      console.error('Error agregando departamento:', error);
    }
  };

  const agregarPuesto = async (departamentoId) => {
    const puesto = puestos[departamentoId] || {};
    if (!puesto?.nombre.trim() || !puesto?.inicio.trim() || !puesto?.fin.trim()) {
      return alert('Todos los campos son obligatorios.');
    }

    try {
      const horarioArray = [{ inicio: puesto.inicio, fin: puesto.fin }];
      const response = await axios.post(`http://localhost:5000/api/produccion/departamentos/${departamentoId}/puestos`, {
        nombre: puesto.nombre,
        horario: horarioArray,
      });

      setDepartamentos(departamentos.map(dep =>
        dep._id === departamentoId ? { ...dep, puestos: [...dep.puestos, response.data] } : dep

      ));
      await fetchDepartamentos();
      
      setPuestos({ ...puestos, [departamentoId]: { nombre: '', inicio: '', fin: '' } });
    } catch (error) {
      console.error('Error agregando puesto:', error);
    }
  };

  const eliminarDepartamento = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/produccion/departamentos/${id}`);

      if (response.status === 200) {
        setDepartamentos(departamentos.filter(departamento => departamento._id !== id));
      } else {
        alert('Hubo un error al eliminar el departamento');
      }
    } catch (error) {
      console.error('Error eliminando departamento:', error);
    }
  };

  const eliminarPuesto = async (departamentoId, puestoId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/produccion/departamentos/${departamentoId}/puestos/${puestoId}`);

      if (response.status === 200) {
        setDepartamentos(departamentos.map(departamento =>
          departamento._id === departamentoId
            ? {
                ...departamento,
                puestos: departamento.puestos.filter(puesto => puesto._id !== puestoId),
              }
            : departamento
        ));
      } else {
        alert('Hubo un error al eliminar el puesto');
      }
    } catch (error) {
      console.error('Error eliminando puesto:', error);
    }
  };

  const handlePuestoChange = (departamentoId, field, value) => {
    setPuestos({
      ...puestos,
      [departamentoId]: {
        ...puestos[departamentoId],
        [field]: value,
      },
    });
  };
  return ( 
  <div className="gestion-puestos"> 
  <h2>Gestión de Puestos y Departamentos</h2> 
  <form onSubmit={agregarDepartamento}> 
    <div className="nuevo-departamento"> 
      <input 
      type="text" 
      value={nuevoDepartamento} 
      onChange={(e) => setNuevoDepartamento(e.target.value)} 
      placeholder="Nuevo Departamento" 
      /> 
      <button type="submit">Agregar Departamento</button> 
      </div> 
      </form> 
      
      {loading ? ( 
        <p>Cargando departamentos...</p> 
      ) : ( 
        Array.isArray(departamentos) && departamentos.map(departamento => ( 
        <div key={departamento._id} className="departamento"> 
        <h3>{departamento.nombre}</h3> 
        <button onClick={() => eliminarDepartamento(departamento._id)}> 
          Eliminar Departamento 
          </button> 
          <div className="nuevo-puesto"> 
            <input 
            type="text" 
            value={puestos[departamento._id]?.nombre || ''} 
            onChange={(e) => 
              handlePuestoChange(departamento._id, 'nombre', e.target.value) 
            } 
            placeholder="Nombre del Puesto" 
            /> 
            <input 
            type="text" 
            value={puestos[departamento._id]?.inicio || ''} 
            onChange={(e) => 
              handlePuestoChange(departamento._id, 'inicio', e.target.value) 
            } 
            placeholder="Hora de Inicio (e.g., 09:00)" 
            /> 
            <input 
            type="text" 
            value={puestos[departamento._id]?.fin || ''} 
            onChange={(e) => 
              handlePuestoChange(departamento._id, 'fin', e.target.value) 
            } 
            placeholder="Hora de Fin (e.g., 17:00)" 
            /> 
            <button onClick={() => agregarPuesto(departamento._id)}> 
              Agregar Puesto 
              </button> 
              </div> 
              <ul className="puestos-lista"> 
              {Array.isArray(departamento.puestos) && departamento.puestos.map((puesto) => ( 
                <li key={puesto._id}> 
                  <strong>{puesto.nombre}</strong> -{' '} 
                  {Array.isArray(puesto.horario) && puesto.horario.map((h, index) => ( 
                    <span key={`${puesto._id}-${index}`}> 
                      {h.inicio} - {h.fin} 
                      {index < puesto.horario.length - 1 && ', '} 
                    </span>
                  ))} 
                  <button onClick={() => eliminarPuesto(departamento._id, puesto._id)}> 
                    Eliminar Puesto 
                  </button> 
                </li> 
              ))} 
            </ul>
      
              </div> 
            )) 
          )} 
        </div> 
      ); 
    };

export default GestionPuestos;
