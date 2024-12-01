// src/components/dashboard/Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/users/current"); // Adjust API endpoint as needed
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user profile", error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/users/${user.id}`, user); // Adjust API endpoint as needed
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile", error);
        }
    };

    if (!user) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <div>
            <h2>Your Profile</h2>
            <form onSubmit={handleUpdateProfile}>
                <input
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;