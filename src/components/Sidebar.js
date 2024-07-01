import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li><Link to="/">Terminarz</Link></li>
        <li><Link to="/adverse-events">Zdarzenia niepożądane</Link></li>
        <li><Link to="/tasks">Zadania</Link></li>
        <li><Link to="/surveys">Ankiety</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
