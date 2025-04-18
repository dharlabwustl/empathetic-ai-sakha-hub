
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { UserRole } from "./types/user/base";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import ProfilePage from "./pages/student/ProfilePage";
import AcademicAdvisorPage from "./pages/student/AcademicAdvisorPage";
import TutorPage from "./pages/student/TutorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
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
