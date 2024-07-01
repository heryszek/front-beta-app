import React, { useState, useEffect } from 'react';
import api from '../axiosConfig'; // Upewnij się, że ścieżka jest poprawna

function Surveys() {
  const [surveys, setSurveys] = useState([]);
  const [form, setForm] = useState({
    patientEmail: '',
    feedback: '',
    rating: ''
  });

  useEffect(() => {
    api.get('/surveys')
      .then(response => setSurveys(response.data))
      .catch(error => console.error('Error fetching surveys!', error));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/surveys', form)
      .then(response => {
        setSurveys([...surveys, response.data]);
        setForm({ patientEmail: '', feedback: '', rating: '' });
      })
      .catch(error => console.error('Error submitting the survey!', error));
  };

  return (
    <div className="surveys">
      <h2>Ankiety</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="patientEmail" value={form.patientEmail} onChange={handleChange} placeholder="Email pacjenta" required />
        <textarea name="feedback" value={form.feedback} onChange={handleChange} placeholder="Opinia" required></textarea>
        <input type="number" name="rating" value={form.rating} onChange={handleChange} placeholder="Ocena" required />
        <button type="submit">Wyślij ankietę</button>
      </form>
      <ul>
        {surveys.map(survey => (
          <li key={survey.id}>
            <p>{survey.patientEmail}</p>
            <p>{survey.feedback}</p>
            <p>{survey.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Surveys;
