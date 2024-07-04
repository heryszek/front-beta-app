import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Tasks from './components/Tasks';
import AdverseEvents from './components/AdverseEvents';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>System Zarządzania Jakością</h1>
        </header>
        <nav>
          <ul>
            <li><Link to="/tasks">Zadania</Link></li>
            <li><Link to="/adverse-events">Zdarzenia Niepożądane</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/adverse-events" element={<AdverseEvents />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

