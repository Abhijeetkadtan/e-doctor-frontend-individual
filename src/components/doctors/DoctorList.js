// src/components/doctors/DoctorList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);

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

    return (
        <div>
            <h2>Available Doctors</h2>
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorList;