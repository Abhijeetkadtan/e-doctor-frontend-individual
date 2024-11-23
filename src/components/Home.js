import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Home.css'; // Updated CSS for the landing page

function Home() {
    return (
        <body className="body">
            <div className="home-container">
                <header className="hero-section">
                    <div className="hero-content">
                        <h1> E-Doctor</h1>

                        <div className="hero-buttons">
                            <Link to="/register" className="btn">Register</Link>
                            <Link to="/login" className="btn btn-outline">Login</Link>
                        </div>
                    </div>
                </header>

            </div>
        </body>
    );
}

export default Home;
