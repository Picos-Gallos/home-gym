import React from 'react';
import './About.css'; // Ensure you link to your CSS correctly

const About = () => {
    return (
        <div className="about-container">
            <div className="left-panel">
                <h1>About HomeGym</h1>
                <p>HomeGym connects the community by enabling people to rent out private, home-based gyms, making the start of a fitness journey easy and inviting.</p>

                <h2>Our Idea</h2>
                <p>Whether you're a beginner or a fitness enthusiast, HomeGym tailors home gym experiences to fit individual preferences based on a detailed user survey. Gyms are picked to enhance your fitness experience in a personalized, stress-free environment.</p>

            </div>

            <div className="right-panel">
                <h2>Our Demographic</h2>
                <p>HomeGym serves all fitness levels, focusing on local community engagement and promoting inclusivity
                    among residents by connecting them with local home gyms.</p>


                <h2>What’s Next for HomeGym?</h2>
                <p>Plans to evolve into a full marketplace include secure transactions for gym time reservations,
                    calendar invites to ensure you don’t miss your session, and promoting local fitness groups for
                    broader community engagement.</p>
            </div>
        </div>
    );
};

export default About;
// Path: src/components/Navbar.js