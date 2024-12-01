import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext"; // Assuming you have an AuthContext
import './Appointments.css';

const ScheduleAppointment = () => {
    const { user } = useContext(AuthContext); // Get the logged-in user details
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [message, setMessage] = useState("");

    // Fetch doctors on component load
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/doctors");
                setDoctors(response.data);
            } catch (error) {
                console.error("Error fetching doctors", error);
            }
        };
        fetchDoctors();
    }, []);

    const handleSchedule = async () => {
        const payload = {
            doctorName: selectedDoctor,
            username: user.username, // Use the logged-in user's username
            appointmentTime,
        };

        try {
            // Add Basic Authentication header
            const authHeader = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`, // Encode credentials in Base64
                },
            };

            const response = await axios.post(
                "http://localhost:8080/api/appointments/schedule",
                payload,
                authHeader
            );
            setMessage("Appointment scheduled successfully!");
        } catch (error) {
            console.error("Error scheduling appointment:", error);
            if (error.response && error.response.status === 401) {
                setMessage("Unauthorized. Please log in.");
            } else {
                setMessage("Failed to schedule appointment.");
            }
        }
    };

    return (
        <div className="schedule-appointment">
            <h2>Schedule Appointment</h2>
            <select onChange={(e) => setSelectedDoctor(e.target.value)} value={selectedDoctor}>
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>
                        {doctor.name}
                    </option>
                ))}
            </select>
            <input
                type="datetime-local"
                onChange={(e) => setAppointmentTime(e.target.value)}
                required
            />
            <button onClick={handleSchedule}>Schedule Appointment</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ScheduleAppointment;