import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router, Routes, and Route
import Home from "./pages/Home"; // Import Home page
import Register from "./components/auth/Register"; // Import Register component
import OtpVerification from "./components/auth/OtpVerification"; // Import OTP Verification
import Login from "./components/auth/Login"; // Import Login component
import PatientDashboardPage from "./pages/PatientDashboardPage"; // Import Patient Dashboard Page
import DoctorDashboardPage from "./pages/DoctorDashboardPage"; // Import Doctor Dashboard Page
import ScheduleAppointment from "./components/appointments/ScheduleAppointment"; // Import Schedule Appointment
import ManageAppointments from "./components/appointments/ManageAppointments"; // Import Manage Appointments
import DoctorList from "./components/doctors/DoctorList"; // Import Doctor List
import Profile from "./components/dashboard/Profile"; // Import Profile component
import SetAvailability from "./components/doctors/SetAvailability"; // Import Set Availability
import ProtectedRoute from "./components/common/ProtectedRoute"; // Import Protected Route for role-based access
import Navbar from "./components/common/Navbar"; // Import Navbar for navigation
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider for user context
import ForgotPassword from "./components/auth/ForgotPassword"; // Import ForgotPassword
import ResetPassword from "./components/auth/ResetPassword";
import "./styles/Global.css"; // Import global styling

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          <Route
            path="/patient-dashboard"
            element={
              <ProtectedRoute allowedRoles={["PATIENT"]}>
                <PatientDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor-dashboard"
            element={
              <ProtectedRoute allowedRoles={["DOCTOR"]}>
                <DoctorDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments/schedule"
            element={
              <ProtectedRoute allowedRoles={["PATIENT"]}>
                <ScheduleAppointment />
              </ProtectedRoute>
            }
          />
          <Route path="/appointments/manage" element={
            <ProtectedRoute allowedRoles={["DOCTOR", "PATIENT"]}>
              <ManageAppointments />
            </ProtectedRoute>
          } />
          <Route
            path="/doctors"
            element={
              <ProtectedRoute allowedRoles={["PATIENT"]}>
                <DoctorList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/availability"
            element={
              <ProtectedRoute allowedRoles={["DOCTOR"]}>
                <SetAvailability />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;