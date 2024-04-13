import React from 'react';
import './Navbar.css';
import GymIcon from '../img/icon.png';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                
                <a href="/"><img src={GymIcon} alt="Gym Icon" style={{ width: '30px', height: '30px', marginLeft: '10px', marginRight: '10px' }} /></a>
                HomeGym 
            </div>
            <ul className="nav-links">
                <li><a href="/table">Gyms</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/login" className="button">Sign In</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
