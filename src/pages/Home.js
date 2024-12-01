// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import './Home.css'; // Optional: Import CSS for styling

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Outpatient Management System</h1>
            <p>Please register or log in to continue.</p>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
        </div>
    );
};

export default Home;