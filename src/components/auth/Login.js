// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";

// const Login = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
//     const { setUser } = useContext(AuthContext); // Save user in context
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:8080/api/users/login", {
//                 username,
//                 password,
//             });

//             // Save user credentials and role in context
//             setUser({ username, password, role: response.data.role });

//             // Redirect to the appropriate dashboard
//             if (response.data.role === "PATIENT") {
//                 navigate("/patient-dashboard");
//             } else if (response.data.role === "DOCTOR") {
//                 navigate("/doctor-dashboard");
//             }
//         } catch (error) {
//             console.error(error);
//             setErrorMessage("Invalid login credentials.");
//         }
//     };

//     return (
//         <div className="form-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Login</button>
//             </form>
//             {errorMessage && <p className="error">{errorMessage}</p>}
//         </div>
//     );
// };

// export default Login;



import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Mock login request for role (replace with actual backend endpoint)
            const response = await axios.post("http://localhost:8080/api/users/login", {
                username,
                password,
            });

            setUser({
                username,
                password,
                role: response.data.role, // Save the user's role (e.g., "DOCTOR")
            });

            // Redirect based on role
            if (response.data.role === "DOCTOR") {
                navigate("/doctor-dashboard");
            } else if (response.data.role === "PATIENT") {
                navigate("/patient-dashboard");
            }
        } catch (error) {
            console.error("Login failed:", error);
            setErrorMessage("Invalid credentials.");
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default Login;