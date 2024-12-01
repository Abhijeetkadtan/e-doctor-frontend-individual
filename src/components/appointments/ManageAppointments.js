// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";
// import './ManageAppointments.css';

// const ManageAppointments = () => {
//     const { user } = useContext(AuthContext);
//     const [appointments, setAppointments] = useState([]);
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         const fetchAppointments = async () => {
//             try {
//                 if (!user) {
//                     setMessage("User not logged in.");
//                     return;
//                 }

//                 let response;
//                 if (user.role === "DOCTOR") {
//                     response = await axios.get(
//                         `http://localhost:8080/api/appointments/doctor/${user.username}`,
//                         {
//                             headers: {
//                                 "Content-Type": "application/json",
//                                 Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
//                             },
//                         }
//                     );
//                 } else if (user.role === "PATIENT") {
//                     response = await axios.get(
//                         `http://localhost:8080/api/appointments/user/${user.username}`,
//                         {
//                             headers: {
//                                 "Content-Type": "application/json",
//                                 Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
//                             },
//                         }
//                     );
//                 }

//                 setAppointments(response.data);
//             } catch (error) {
//                 console.error("Error fetching appointments:", error);
//                 setMessage("Failed to fetch appointments.");
//             }
//         };

//         fetchAppointments();
//     }, [user]);

//     if (!user) {
//         return <p>Please log in to view appointments.</p>; // Render a fallback if user is undefined
//     }

//     return (
//         <div className="manage-appointments">
//             <h2>Your Appointments</h2>
//             {message && <p className="error">{message}</p>}
//             {appointments.length > 0 ? (
//                 <ul className="appointment-list">
//                     {appointments.map((appointment) => (
//                         <li key={appointment.id}>
//                             <strong>{user.role === "DOCTOR" ? "Patient:" : "Doctor:"}</strong>
//                             {user.role === "DOCTOR"
//                                 ? appointment.patient.username
//                                 : appointment.doctor.name} <br />
//                             <strong>Time:</strong> {new Date(appointment.appointmentTime).toLocaleString()}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No appointments available.</p>
//             )}
//         </div>
//     );
// };

// export default ManageAppointments;



import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import './ManageAppointments.css';

const ManageAppointments = () => {
    const { user } = useContext(AuthContext); // Access user from AuthContext
    const [appointments, setAppointments] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!user) {
                setMessage("User not logged in.");
                return;
            }

            try {
                let response;
                if (user.role === "DOCTOR") {
                    response = await axios.get(
                        `http://localhost:8080/api/appointments/doctor/${user.username}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
                            },
                        }
                    );
                } else if (user.role === "PATIENT") {
                    response = await axios.get(
                        `http://localhost:8080/api/appointments/user/${user.username}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
                            },
                        }
                    );
                }

                setAppointments(response.data || []); // Ensure the response is an array
            } catch (error) {
                console.error("Error fetching appointments:", error);
                setMessage("Failed to fetch appointments. Please try again later.");
            }
        };

        fetchAppointments();
    }, [user]);

    // Fallback UI if user is undefined
    if (!user) {
        return <p>Loading... Please log in to view appointments.</p>;
    }

    return (
        <div className="manage-appointments">
            <h2>Your Appointments</h2>
            {message && <p className="error">{message}</p>}
            {appointments.length > 0 ? (
                <ul className="appointment-list">
                    {appointments.map((appointment) => (
                        <li key={appointment.id}>
                            <strong>{user.role === "DOCTOR" ? "Patient:" : "Doctor:"}</strong>{" "}
                            {user.role === "DOCTOR"
                                ? appointment.patient?.username || "Unknown" // Handle missing patient field
                                : appointment.doctor?.name || "Unknown"} <br />
                            <strong>Time:</strong>{" "}
                            {appointment.appointmentTime
                                ? new Date(appointment.appointmentTime).toLocaleString()
                                : "No time provided"}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No appointments available.</p>
            )}
        </div>
    );
};

export default ManageAppointments;