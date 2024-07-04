import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tasks from './components/Tasks';
import AdverseEvents from './components/AdverseEvents';
import MenuBar from './components/menuBar';

const App = () => {
  return (
    <Router>
      <MenuBar />
      <Routes>
        <Route path="/components/tasks" element={<Tasks />} />
        <Route path="/components/adverse-events" element={<AdverseEvents />} />
      </Routes>
    </Router>
  );
};

export default App;

