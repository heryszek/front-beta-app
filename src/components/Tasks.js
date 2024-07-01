import React, { useState, useEffect } from 'react';
import api from '../axiosConfig'; // Upewnij się, że ścieżka jest poprawna

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    description: '',
    dueDate: '',
    assignedTo: ''
  });

  useEffect(() => {
    api.get('/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks!', error));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/tasks', form)
      .then(response => {
        setTasks([...tasks, response.data]);
        setForm({ description: '', dueDate: '', assignedTo: '' });
      })
      .catch(error => console.error('Error submitting the task!', error));
  };

  return (
    <div className="tasks">
      <h2>Zadania</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Opis zadania" required />
        <input type="datetime-local" name="dueDate" value={form.dueDate} onChange={handleChange} required />
        <input type="text" name="assignedTo" value={form.assignedTo} onChange={handleChange} placeholder="Przypisane do" required />
        <button type="submit">Dodaj zadanie</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <p>{task.description}</p>
            <p>{new Date(task.dueDate).toLocaleString()}</p>
            <p>{task.assignedTo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
