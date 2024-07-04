import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tasks.css'; // Import the CSS file

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    try {
      const newTask = { description, dueDate, assignedTo };
      await axios.post('http://localhost:8080/api/tasks', newTask);
      fetchTasks();
      resetForm();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async () => {
    try {
      const updatedTask = { description, dueDate, assignedTo };
      await axios.put(`http://localhost:8080/api/tasks/${editingTask.id}`, updatedTask);
      fetchTasks();
      resetForm();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const editTask = (task) => {
    setEditingTask(task);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setAssignedTo(task.assignedTo);
  };

  const removeTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  const resetForm = () => {
    setDescription('');
    setDueDate('');
    setAssignedTo('');
    setEditingTask(null);
  };

  return (
    <div>
      <h2>Zadania</h2>
      <input
        type="text"
        placeholder="Opis zadania"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Przydzielone do"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />
      <button onClick={editingTask ? updateTask : addTask}>
        {editingTask ? 'Zaktualizuj zadanie' : 'Dodaj zadanie'}
      </button>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Opis</th>
            <th>Termin</th>
            <th>Przydzielone do</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.description}</td>
              <td>{new Date(task.dueDate).toLocaleString()}</td>
              <td>{task.assignedTo}</td>
              <td>
                <button onClick={() => editTask(task)}>Edit</button>
                <button onClick={() => removeTask(task.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;

