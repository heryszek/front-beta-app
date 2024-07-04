import React from 'react';
import { Link } from 'react-router-dom';
import '/Users/user/Documents/quality-managment-app/quality-management-system/src/components/menuBar.css'; // Make sure to import the CSS file

const MenuBar = () => {
  return (
    <div className="menu-bar">
      <Link to="/tasks" className="menu-item">Zadania</Link>
      <Link to="/adverse-events" className="menu-item">Zdarzenia Niepożądane</Link>
    </div>
  );
};

export default MenuBar;
