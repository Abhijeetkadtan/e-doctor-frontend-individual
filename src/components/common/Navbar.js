// src/components/common/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'; // Import CSS file for styling

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            {/* <Link to="/verify-otp">Verify OTP</Link>
            <Link to="/patient-dashboard">Patient Dashboard</Link>
            <Link to="/doctor-dashboard">Doctor Dashboard</Link> */}
        </nav>
    );
};

export default Navbar;