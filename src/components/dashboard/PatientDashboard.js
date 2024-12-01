// src/components/dashboard/PatientDashboard.js
import React from "react";
import { Link } from "react-router-dom";
import './Dashboard.css'; // Import CSS for styling

const PatientDashboard = () => {
    return (
        <div className="dashboard">
            <h1>Patient Dashboard</h1>
            <Link to="/doctors">View All Doctors</Link>
            <Link to="/appointments/schedule">Schedule Appointment</Link>
            <Link to="/appointments/manage">Manage Appointments</Link>
            <Link to="/profile">Edit Profile</Link>
        </div>
    );
};

export default PatientDashboard;