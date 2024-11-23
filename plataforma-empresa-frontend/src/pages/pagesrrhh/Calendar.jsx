import { useState } from 'react';
import { format, addDays, startOfMonth, endOfMonth, addMonths, eachDayOfInterval, getDay, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import './Calendar.css';

const holidays = [
  '2025-01-01',
  '2025-01-05'
];

const groups = [
  { name: 'Grupo A', days: ['lunes', 'martes'] },
  { name: 'Grupo B', days: ['miércoles', 'jueves'] },
  { name: 'Grupo C', days: ['viernes', 'sábado'] },
  { name: 'Grupo D', days: ['sábado', 'domingo'] },
];

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [localHolidays, setLocalHolidays] = useState([]);
  const [stateHolidays, setStateHolidays] = useState([]);
  const [autonomicHolidays, setAutonomicHolidays] = useState([]);
  const [holidayDate, setHolidayDate] = useState('');
  const [holidayType, setHolidayType] = useState('local');

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const addHoliday = () => {
    const formattedDate = format(new Date(holidayDate), 'yyyy-MM-dd');
    if (holidayType === 'local') {
      setLocalHolidays([...localHolidays, formattedDate]);
    } else if (holidayType === 'state') {
      setStateHolidays([...stateHolidays, formattedDate]);
    } else if (holidayType === 'autonomic') {
      setAutonomicHolidays([...autonomicHolidays, formattedDate]);
    }
    setHolidayDate('');
  };

  const renderDays = () => {
    const days = eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth)
    });

    return days.map((day, index) => {
      const formattedDate = format(day, 'yyyy-MM-dd');
      const isHoliday = holidays.includes(formattedDate);
      const isLocalHoliday = localHolidays.includes(formattedDate);
      const isStateHoliday = stateHolidays.includes(formattedDate);
      const isAutonomicHoliday = autonomicHolidays.includes(formattedDate);
      const group = groups.find(g => g.days.includes(format(day, 'EEEE', { locale: es })));

      return (
        <div
          key={index}
          className={`day ${isHoliday ? 'holiday' : ''} ${isLocalHoliday ? 'local-holiday' : ''} ${isStateHoliday ? 'state-holiday' : ''} ${isAutonomicHoliday ? 'autonomic-holiday' : ''} ${group ? group.name : ''}`}
        >
          <span className="weekday">{format(day, 'EEEE', { locale: es })}</span>
          <span className="day-number">{format(day, 'd')}</span>
          {group && <span className="group-name">{group.name}</span>}
        </div>
      );
    });
  };

  return (
    <div className='calendar'>
      <div className='calendar-header'>
        <button onClick={prevMonth}>Mes Anterior</button>
        <h2>{format(currentMonth, 'MMMM yyyy', { locale: es })}</h2>
        <button onClick={nextMonth}>Mes Siguiente</button>
      </div>
      <div className='month'>{renderDays()}</div>
      <div className='add-holiday'>
        <input
          type='date'
          value={holidayDate}
          onChange={(e) => setHolidayDate(e.target.value)}
        />
        <select value={holidayType} onChange={(e) => setHolidayType(e.target.value)}>
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
