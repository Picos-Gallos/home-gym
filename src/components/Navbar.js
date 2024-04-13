import React, { useState, useEffect } from 'react';
import './Navbar.css';
import GymIcon from '../img/icon.png';
import { signOut } from "firebase/auth"; // Import signOut function
import { auth } from "../Firebase"; // Import auth instance

import { useNavigate } from 'react-router-dom';  // If you are using React Router for navigation
import { onAuthStateChanged } from "firebase/auth";


function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();  // Use this to programmatically navigate

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();  // Clean up the subscription
    }, []);

    const handleSignIn = () => {
        navigate('/');  // Assuming '/login' is your route to the login page
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out");
                navigate('/');  // Optionally navigate to homepage or elsewhere
            })
            .catch((error) => {
                console.error("Error signing out: ", error);
            });
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={GymIcon} alt="Gym Icon" style={{ width: '30px', height: '30px', marginLeft: '10px', marginRight: '10px' }} />
                HomeGym
            </div>
            <ul className="nav-links">
                <li><a href="/table">Gyms</a></li>
                <li><a href="/about">About</a></li>
                {user ? (
                    <li><button href="/" onClick={handleSignOut}>Sign Out</button></li>
                ) : (
                    <li><button href="/" onClick={handleSignIn}>Sign In</button></li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
