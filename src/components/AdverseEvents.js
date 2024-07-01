import React, { useState, useEffect } from 'react';
import api from '../axiosConfig'; // Upewnij się, że ścieżka jest poprawna

function AdverseEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    description: '',
    eventDate: '',
    severity: '',
    reportedBy: ''
  });

  useEffect(() => {
    api.get('/adverse-events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching adverse events!', error));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/adverse-events', form)
      .then(response => {
        setEvents([...events, response.data]);
        setForm({ description: '', eventDate: '', severity: '', reportedBy: '' });
      })
      .catch(error => console.error('Error submitting the adverse event!', error));
  };

  return (
    <div className="adverse-events">
      <h2>Zdarzenia niepożądane</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Opis" required />
        <input type="datetime-local" name="eventDate" value={form.eventDate} onChange={handleChange} required />
        <input type="text" name="severity" value={form.severity} onChange={handleChange} placeholder="Powaga" required />
        <input type="text" name="reportedBy" value={form.reportedBy} onChange={handleChange} placeholder="Zgłaszający" required />
        <button type="submit">Zgłoś zdarzenie</button>
      </form>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <p>{event.description}</p>
            <p>{new Date(event.eventDate).toLocaleString()}</p>
            <p>{event.severity}</p>
            <p>{event.reportedBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdverseEvents;
