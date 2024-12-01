// src/components/dashboard/DoctorDashboard.js
import React from "react";
import { Link } from "react-router-dom";
import './Dashboard.css'; // Import CSS for styling

const DoctorDashboard = () => {
    return (
        <div className="dashboard">
            <h1>Doctor Dashboard</h1>
            <Link to="/profile">Edit Profile</Link>
            <Link to="/availability">Set Availability</Link>
            <Link to="/appointments/manage">Manage Appointments</Link>
        </div>
    );
};

export default DoctorDashboard;