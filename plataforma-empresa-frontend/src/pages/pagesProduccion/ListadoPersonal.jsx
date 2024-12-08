import React, { useState, useEffect } from 'react';
import './ListadoPersonal.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalActive, setModalActive] = useState(false); 
  const [employeeData, setEmployeeData] = useState({
    Estado: '',
    GrupoDescanso: '',
    Puesto: '',
    Departamento: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const apiBaseUrl = import.meta.env.VITE_API_URL; 

  useEffect(() => { 
    fetch(`${apiBaseUrl}/api/rrhh/employee`) 
    .then((res) => res.json()) 
    .then((data) => {  
      const activeEmployees = data.filter(employee => employee.isActive); 
      setEmployees(activeEmployees); 
    }) 
    .catch((error) => console.error('Error al cargar empleados:', error)); 
  }, [apiBaseUrl]);


  const handleEmployeeClick = (_id) => {
    fetch(`${apiBaseUrl}/api/rrhh/employee/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedEmployee(data);
        setEmployeeData({
          Estado: data.Estado,
          GrupoDescanso: data.GrupoDescanso,
          Puesto: data.Puesto,
          Departamento: data.Departamento
        });
        setModalActive(true);
      })
      .catch((error) => console.error('Error al cargar detalles del empleado:', error));
  };

  
  const handleSave = () => {
    fetch(`${apiBaseUrl}/api/rrhh/employee/${selectedEmployee._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employeeData), 
    })
      .then((res) => res.json())
      .then((updatedEmployee) => {
      
        setEmployees((prev) =>
          prev.map((emp) => (emp._id === updatedEmployee.updatedEmployee._id ? updatedEmployee.updatedEmployee : emp))
        );
        setSelectedEmployee(null);
        setModalActive(false);
      })
      .catch((error) => {
        console.error('Error al guardar cambios:', error);
        setErrorMessage('Error al guardar cambios. Por favor, inténtalo de nuevo más tarde.');
      });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

 
  const closeModal = () => {
    setModalActive(false);
    setSelectedEmployee(null);
  };

  return (
    <div>
      <div id="personal-list-container">
        <h1>Listado de Personal</h1>
        <ul id="personal-list">
          {employees.map(employee => (
            <li key={employee._id} onClick={() => handleEmployeeClick(employee._id)}>
              {employee.NombreCompleto}
            </li>
          ))}
        </ul>
      </div>

      
      <div id="modal-overlay" className={modalActive ? 'active' : ''} onClick={closeModal}></div>

   
      <div id="employee-modal" className={modalActive ? 'active' : ''}>
        <h2>Editar Empleado</h2>
        <label>Estado</label>
        <select name="Estado" value={employeeData.Estado} onChange={handleChange}>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        <label>Grupo de Descanso</label>
        <input
          type="text"
          name="GrupoDescanso"
          value={employeeData.GrupoDescanso}
          onChange={handleChange}
        />

        <label>Puesto</label>
        <input
          type="text"
          name="Puesto"
          value={employeeData.Puesto}
          onChange={handleChange}
        />

        <label>Departamento</label>
        <input
          type="text"
          name="Departamento"
          value={employeeData.Departamento}
          onChange={handleChange}
        />

        <div className="modal-buttons">
          <button className="save-btn" onClick={handleSave}>Guardar</button>
          <button className="cancel-btn" onClick={closeModal}>Cancelar</button>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default EmployeeList;
