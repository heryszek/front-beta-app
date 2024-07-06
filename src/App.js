import React from 'react';
import MenuBar from './MenuBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tasks from './components/Tasks';
import AdverseEvents from './components/AdverseEvents';
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <div className="header">
                    <h1>System Zarządzania Jakością</h1>
                </div>
                <MenuBar />
                <Routes>
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/adverse-events" element={<AdverseEvents />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;


