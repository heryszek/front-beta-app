import React from 'react';
import { Link } from 'react-router-dom';
import './MenuBar.css';

const MenuBar = () => {
    return (
        <div className="menu-bar">
            <nav>
                <ul>
                    <li><Link to="/tasks">Zadania</Link></li>
                    <li><Link to="/adverse-events">Zdarzenia Niepożądane</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default MenuBar;
