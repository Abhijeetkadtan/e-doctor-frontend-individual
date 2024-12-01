// src/components/auth/OtpVerification.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
    const [username, setUsername] = useState("");
    const [otp, setOtp] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/api/users/verify-otp/${username}`, { otp });
            navigate("/login"); // Redirect to login page
        } catch (err) {
            console.error(err);
            setErrorMessage("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="form-container">
            <h2>OTP Verification</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <button type="submit">Verify OTP</button>
            </form>
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
};

export default OtpVerification;