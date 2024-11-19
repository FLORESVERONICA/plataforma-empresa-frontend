import { useState, useEffect } from "react";
import axios from 'axios';

const WorkerForm = ({ setShowForm, selectedWorker, setWorkers }) => {
    const [worker, setWorker ] = useState({
        NombreCompleto: '',
        Estado: 'activo',
        dni: '',
        NumeroSS: '',
        email: '',
        Telefono: '',
        Direccion: '',
        TipodeContrato: '',
        CategoriaProfecional: '',
        Salario: 0,
        SuplementoSalarial: 0,
        Historialabsentismo: [],
        idEmpresa: 0,
        isActive: true,
        NumeroTarjeta: 0,
        GrupoDescanso: '',
        Departamento: '',
        Puesto: ''
  });
    const [absentismoDate, setAbsentismoDate] = useState('');

    useEffect(() => {
      if (selectedWorker) {
          setWorker(selectedWorker);
      }
  }, [selectedWorker]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setWorker({ ...worker, [name]: type === 'checkbox' ? checked : value  });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      if (selectedWorker) {
          // Actualizar trabajador
          
          axios.put(`http://localhost:5000/api/employees/${selectedWorker._id}`, worker)
              .then(response => {
                  alert('Trabajador actualizado');
                  setShowForm(false);
                  fetchWorkers(); // Actualizar la lista
              })
              .catch(error => {
                  console.error('Error al actualizar el trabajador', error);
                  alert('Hubo un error al actualizar el trabajador');
              });
      } else {
          // Agregar trabajador

          axios.post('http://localhost:5000/api/employees', worker)
              .then(response => {
                  alert('Trabajador agregado');
                  setShowForm(false);
                  fetchWorkers(); // Actualizar la lista
              })
              .catch(error => {
                  console.error('Error al agregar trabajador', error);
                  alert('Hubo un error al agregar el trabajador');
              });
      }
  };

  const handleAbsentismo = () => { 
    const newAbsentismo = { 
      reason: worker.Estado === 'baja_IT' ? 'Baja por enfermedad común' : worker.Estado === 'baja_AT' ? 'Baja por accidente laboral' : 'Alta',
      date: new Date(absentismoDate).toISOString()
    }; 
    setWorker({ 
      ...worker, 
      Historialabsentismo: [...worker.Historialabsentismo, newAbsentismo] 
    }); 
    setAbsentismoDate(''); 
  };


  const fetchWorkers = () => {
    axios.get('http://localhost:5000/api/employees')
        .then(response => {
            setWorkers(response.data);
        })
        .catch(error => console.error('Error al obtener trabajadores', error));
};



  
return (
    <form onSubmit={handleSubmit}>
        <label>
            Nombre Completo:
            <input
          type="text"
          name="NombreCompleto"
          value={worker.NombreCompleto}
          onChange={handleChange}
        
        />
        </label>
        <label>
            Estado:
        <select name="Estado" value={worker.Estado} onChange={handleChange}>
          <option value="activo">Activo</option>
          <option value="baja_IT">Baja IT</option>
          <option value="baja_AT">Baja AT</option>
          <option value="desvinculado">Desvinculado</option>
        </select>
      </label>

      <label>
        DNI:
        <input
          type="text"
          name="dni"
          value={worker.dni}
          onChange={handleChange}
      
        />
      </label>

      <label>
        Número SS:
        <input
          type="text"
          name="NumeroSS"
          value={worker.NumeroSS}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={worker.email}
          onChange={handleChange}
         
        />
      </label>

      <label>
        Teléfono:
        <input
          type="text"
          name="Telefono"
          value={worker.Telefono}
          onChange={handleChange}
        />
      </label>

      <label>
        Dirección:
        <input
          type="text"
          name="Direccion"
          value={worker.Direccion}
          onChange={handleChange}
        />
      </label>

      <label>
        Tipo de Contrato:
        <input
          type="text"
          name="TipodeContrato"
          value={worker.TipodeContrato}
          onChange={handleChange}
        />
      </label>

      <label>
        Categoría Profesional:
        <input
          type="text"
          name="CategoriaProfecional"
          value={worker.CategoriaProfecional}
          onChange={handleChange}
        />
      </label>


      <label>
        Suplemento Salarial:
        <input
          type="number"
          name="SuplementoSalarial"
          value={worker.SuplementoSalarial}
          onChange={handleChange}
        />
      </label>

      <label>
        ID Empresa:
        <input
          type="number"
          name="idEmpresa"
          value={worker.idEmpresa}
          onChange={handleChange}
          />
        </label>
        
      <label>
        Numero de Tarjeta:
        <input
          type="number"
          name="NumeroTarjeta"
          value={worker.NumeroTarjeta}
          onChange={handleChange}
        />
      </label>
      <label>
            Grupo de descanso:
        <select name="GrupoDescanso" value={worker.GrupoDescanso} onChange={handleChange}>
          <option value="grupoA">Grupo A</option>
          <option value="GrupoB">Grupo B</option>
          <option value="GrupoC">Grupo C</option>
          <option value="GrupoD">Grupo D</option>
        </select>
      </label>
      <label>
            Departamento:
        <select name="Departamento" value={worker.Departamento} onChange={handleChange}>
          <option value="Cocina">Cocina</option>
          <option value="Mep">MEP</option>
          <option value="Produccion">Producción</option>
          <option value="Envasado">Envasado</option>
        </select>
      </label>
      <label>
            Puesto:
        <select name="Puesto" value={worker.Puesto} onChange={handleChange}>
          <option value="Cocinadia">Cocina Dia</option>
          <option value="Arroz">Arroz</option>
          <option value="Rollos">Rollos</option>
          <option value="EnvasadoPlatosFrios">Platos Frios</option>
          <option value="EnvasadoPlatosCalientes">Calientes</option>
          <option value="Niguiris">Niguiris</option>
        </select>
      </label>

      <label>
                Situación:
                <input 
          type="checkbox" 
          name="isActive" 
          checked={worker.isActive} 
          onChange={handleChange}
           /> 
       </label>

       {(worker.Estado === 'baja_IT' || worker.Estado === 'baja_AT') && (
        <div> 
          <label htmlFor="absentismoDate">Fecha de baja: </label> 
          <input 
          type="date" 
          id="absentismoDate" 
          name="absentismoDate" 
          value={absentismoDate} 
          onChange={(e) => setAbsentismoDate(e.target.value)} 
          /> 
          <button type="button" onClick={handleAbsentismo}>Registrar Baja</button> 
          </div> 
        )}
       {worker.Estado === 'activo' && ( 
        <div> 
          <label htmlFor="absentismoDate">Fecha de alta:</label> 
          <input 
          type="date" 
          id="absentismoDate" 
          name="absentismoDate" 
          value={absentismoDate} 
          onChange={(e) => setAbsentismoDate(e.target.value)} 
          />
          <button type="button" onClick={handleAbsentismo}>Registrar Alta</button> 
          </div> 
        )}
      <button type="submit">{selectedWorker ? 'Actualizar' : 'Guardar'}</button>
    </form>
     
);
};

export default WorkerForm;