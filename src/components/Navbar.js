import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">HomeGym</div>
            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/gyms">Gyms</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/login" className="button">Sign In</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
