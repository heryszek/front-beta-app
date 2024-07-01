import React, { useState, useEffect } from 'react';
import api from '../axiosConfig'; // Upewnij się, że ścieżka jest poprawna
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get('/adverse-events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching adverse events!', error));

    api.get('/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks!', error));
  }, []);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const eventDates = events.map(event => new Date(event.eventDate).toDateString());
      const taskDates = tasks.map(task => new Date(task.dueDate).toDateString());
      if (eventDates.includes(date.toDateString())) {
        return <p>Zdarzenie niepożądane</p>;
      }
      if (taskDates.includes(date.toDateString())) {
        return <p>Zadanie</p>;
      }
    }
  };

  return (
    <div className="calendar">
      <h2>Terminarz</h2>
      <Calendar tileContent={tileContent} />
    </div>
  );
}

export default CalendarComponent;

