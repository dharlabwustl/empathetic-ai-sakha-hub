import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { UserRole } from "./types/user/base";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import ProfilePage from "./pages/student/ProfilePage";
import AcademicAdvisorPage from "./pages/student/AcademicAdvisorPage";
import TutorPage from "./pages/student/TutorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/student/profile" element={<ProfilePage />} />
        <Route path="/dashboard/student/academic" element={<AcademicAdvisorPage />} />
        <Route path="/dashboard/student/tutor" element={<TutorPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
