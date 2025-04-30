
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login";
import StudentDashboard from "@/pages/dashboard/student/StudentDashboard";
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import MagicLink from "@/pages/auth/MagicLink";
import ResetPassword from "@/pages/auth/ResetPassword";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ExamPrep from "@/pages/ExamPrep";
import StudyMaterial from "@/pages/content/StudyMaterial";
import ConceptCardStudy from "@/pages/content/ConceptCardStudy";

import StudyPlanCreation from "@/pages/StudyPlanCreation";
import Welcome from "@/pages/Welcome";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/magic-link" element={<MagicLink />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/exam-prep/:examType" element={<ExamPrep />} />

      {/* Post-signup flow */}
      <Route path="/study-plan-creation" element={<StudyPlanCreation />} />
      <Route path="/welcome" element={<Welcome />} />

      {/* Student Routes */}
      <Route path="/dashboard/student" element={<StudentDashboard />} />
      <Route path="/dashboard/student/:tab" element={<StudentDashboard />} />
      
      {/* Content Routes */}
      <Route path="/study/:contentType/:id" element={<StudyMaterial />} />
      <Route path="/concept-card/:id" element={<ConceptCardStudy />} />

      {/* Admin Routes */}
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/admin/:tab" element={<AdminDashboard />} />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
