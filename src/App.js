import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CalendarComponent from './components/CalendarComponent';
import AdverseEvents from './components/AdverseEvents';
import Tasks from './components/Tasks';
import Surveys from './components/Surveys';
import Header from './components/Header'; 
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="app-body">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<CalendarComponent />} />
              <Route path="/adverse-events" element={<AdverseEvents />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/surveys" element={<Surveys />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

