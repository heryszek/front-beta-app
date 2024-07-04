import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdverseEvents.css';

const AdverseEvents = () => {
  const [events, setEvents] = useState([]);
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [severity, setSeverity] = useState('niski');
  const [reportedBy, setReportedBy] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/adverse-events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const addEvent = async () => {
    try {
      const newEvent = { description, eventDate, severity, reportedBy };
      await axios.post('http://localhost:8080/api/adverse-events', newEvent);
      fetchEvents();
      resetForm();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const updateEvent = async () => {
    try {
      const updatedEvent = { description, eventDate, severity, reportedBy };
      await axios.put(`http://localhost:8080/api/adverse-events/${editingEvent.id}`, updatedEvent);
      fetchEvents();
      resetForm();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const editEvent = (event) => {
    setEditingEvent(event);
    setDescription(event.description);
    setEventDate(event.eventDate);
    setSeverity(event.severity);
    setReportedBy(event.reportedBy);
  };

  const removeEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/adverse-events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error('Error removing event:', error);
    }
  };

  const resetForm = () => {
    setDescription('');
    setEventDate('');
    setSeverity('niski');
    setReportedBy('');
    setEditingEvent(null);
  };

  return (
    <div>
      <h2>Zdarzenia Niepożądane</h2>
      <input
        type="text"
        placeholder="Opis zdarzenia"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="datetime-local"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />
      <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
        <option value="niski">niski</option>
        <option value="sredni">sredni</option>
        <option value="wysoki">wysoki</option>
      </select>
      <input
        type="text"
        placeholder="Zgłoszone przez"
        value={reportedBy}
        onChange={(e) => setReportedBy(e.target.value)}
      />
      <button onClick={editingEvent ? updateEvent : addEvent}>
        {editingEvent ? 'Zaktualizuj zdarzenie' : 'Dodaj zdarzenie'}
      </button>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Opis</th>
            <th>Data zdarzenia</th>
            <th>Poziom zagrożenia</th>
            <th>Zgłoszone przez</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.description}</td>
              <td>{new Date(event.eventDate).toLocaleString()}</td>
              <td>{event.severity}</td>
              <td>{event.reportedBy}</td>
              <td>
                <button onClick={() => editEvent(event)}>Edytuj</button>
                <button onClick={() => removeEvent(event.id)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdverseEvents;
