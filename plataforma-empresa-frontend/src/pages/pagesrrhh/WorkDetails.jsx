import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {estadoLabels, grupoDescansoLabels, departamentoLabels, puestoLabels  } from "../../components/WorkerForm"

const WorkDetails = () => {
    const { id } = useParams();
    const [worker, setWorker] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/employees/${id}`)
        .then(response => setWorker(response.data))
        .catch(error => console.error('Error obteniendo detalles del trabajador', error));
    }, [id]);

    if(!worker) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
          <h2>Detalles del Trabajador</h2>
          <p><strong>Nombre Completo:</strong> {worker.NombreCompleto}</p>
          <p><strong>Estado:</strong> {estadoLabels[worker.Estado] || worker.Estado}</p>
          <p><strong>DNI:</strong> {worker.dni}</p>
          <p><strong>Número SS:</strong> {worker.NumeroSS}</p>
          <p><strong>Email:</strong> {worker.email}</p>
          <p><strong>Antigüedad:</strong> {worker.Antiguedad ? new Date(worker.Antiguedad).toLocaleDateString() : 'No especificada'}</p>
          <p><strong>Teléfono:</strong> {worker.Telefono}</p>
          <p><strong>Dirección:</strong> {worker.Direccion}</p>
          <p><strong>Tipo de Contrato:</strong> {worker.TipodeContrato}</p>
          <p><strong>Categoría Profesional:</strong> {worker.CategoriaProfecional}</p>
          <p><strong>Salario:</strong> {worker.Salario}</p>
          <p><strong>Suplemento Salarial:</strong> {worker.SuplementoSalarial}</p>
          <p><strong>ID Empresa:</strong> {worker.idEmpresa}</p>
          <p><strong>Numero de Tarjeta:</strong> {worker.NumeroTarjeta}</p>
          <p><strong>Grupo de Descanso:</strong> {grupoDescansoLabels[worker.GrupoDescanso] || worker.GrupoDescanso}</p>
          <p><strong>Departamento:</strong> {departamentoLabels[worker.Departamento] || worker.Departamento}</p>
          <p><strong>Puesto:</strong> { puestoLabels[worker.Puesto] || worker.Puesto}</p>
          
    
          <h3>Historial de Absentismo</h3>
          {worker.Historialabsentismo.length > 0 ? ( 
            <ul> 
              {worker.Historialabsentismo.map((absentismo, index) => ( 
                <li key={index}> 
                {absentismo.reason} - {new Date(absentismo.date).toLocaleDateString()} 
                </li> 
                ))} 
                </ul>
          ) : (
            <p>No hay registros de absentismo.</p>
          )}
        </div>
      );
    };
    
    export default WorkDetails;