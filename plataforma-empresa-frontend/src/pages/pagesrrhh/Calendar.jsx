import { useState, useEffect } from 'react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, addDays, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import './Calendar.css';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [allHolidays, setAllHolidays] = useState([]);
  const [holidayDate, setHolidayDate] = useState('');
  const [holidayType, setHolidayType] = useState('local');
  const [restGroups, setRestGroups] = useState([]);

  const restSchedules = [
    { group: 'A', restDays: [1, 2] },  // Lunes, Martes
    { group: 'B', restDays: [3, 4] },  // Miércoles, Jueves
    { group: 'C', restDays: [5, 6] },  // Viernes, Sábado
    { group: 'D', restDays: [6, 0] },  // Sábado, Domingo
  ];

  // Obtener los días de descanso para todo el mes
  const getRestDaysForMonth = (date) => {
    const startOfMonthDate = startOfMonth(date);
    const endOfMonthDate = endOfMonth(date);
    const daysInMonth = eachDayOfInterval({ start: startOfMonthDate, end: endOfMonthDate });

    const restDaysForMonth = daysInMonth.map((day) => {
      const restGroupsForDay = restSchedules.filter((group) => {
        return group.restDays.includes(day.getDay());
        
      });

      return {
        date: day,
        groups: restGroupsForDay.map(group => group.group),
      };
    });

    setRestGroups(restDaysForMonth);
  };

  // Cargar festivos desde la API
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/rrhh/holidays');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAllHolidays(data);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };
    fetchHolidays();
  }, []);

  // Agregar un nuevo festivo a través de la API
  const addHoliday = async () => {
    if (!holidayDate) {
      alert('Por favor, selecciona una fecha');
      return;
    }

    const formattedDate = format(new Date(holidayDate), 'yyyy-MM-dd');
    if (allHolidays.find((holiday) => holiday.date === formattedDate)) {
      alert('El festivo ya está agregado.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/rrhh/holidays', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: formattedDate, type: holidayType }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newHoliday = await response.json();
      setAllHolidays((prev) => [...prev, newHoliday]);
    } catch (error) {
      console.error('Error al agregar el festivo:', error);
    }
    setHolidayDate('');
  };

  const deleteHoliday = async (holidayId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/rrhh/holidays/${holidayId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setAllHolidays((prev) => prev.filter((holiday) => holiday._id !== holidayId));
    } catch (error) {
      console.error('Error al eliminar el festivo:', error);
    }
  };

  useEffect(() => {
    getRestDaysForMonth(currentMonth);
  }, [currentMonth]);

  // Renderizar los días del mes
  const renderDays = () => {
    const days = eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    });

    return days.map((day, index) => {
      const formattedDate = format(day, 'yyyy-MM-dd');
      const holiday = allHolidays.find((h) => h.date === formattedDate);
      const restDay = restGroups.find((restGroup) => isSameDay(restGroup.date, day));

      return (
        <div
          key={index}
          className={`day ${holiday ? `${holiday.type}-holiday` : ''}`}
        >
          <span className="weekday">{format(day, 'EEEE', { locale: es })}</span>
          <span className="day-number">{format(day, 'd')}</span>
          {holiday && (
            <>
              <span className="holiday-type">{holiday.type}</span>
              <button onClick={() => deleteHoliday(holiday._id)}>Eliminar</button>
            </>
          )}
          {restDay && <span className="rest-day-label">{`Grupo ${restDay.groups.join(', ')}`}</span>}
        </div>
      );
    });
  };

  

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}>Mes Anterior</button>
        <h2>{format(currentMonth, 'MMMM yyyy', { locale: es })}</h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>Mes Siguiente</button>
      </div>
      <div className="month">{renderDays()}</div>
      <div className="add-holiday">
        <input
          type="date"
          value={holidayDate}
          onChange={(e) => setHolidayDate(e.target.value)}
        />
        <select
          value={holidayType}
          onChange={(e) => setHolidayType(e.target.value)}
        >
          <option value="local">Local</option>
          <option value="state">Estatal</option>
          <option value="autonomic">Autonómico</option>
        </select>
        <button onClick={addHoliday}>Agregar Festivo</button>
      </div>
    </div>
  );
};

export default Calendar;
