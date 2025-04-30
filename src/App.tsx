import { Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login";
import StudentDashboard from "@/pages/dashboard/student/StudentDashboard";
import StudyPlanCreation from "@/pages/StudyPlanCreation";
import Welcome from "@/pages/Welcome";
import EnhancedFlashcardPage from "@/pages/dashboard/student/flashcards/EnhancedFlashcardPage";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      
      {/* Post-signup flow */}
      <Route path="/study-plan-creation" element={<StudyPlanCreation />} />
      <Route path="/welcome" element={<Welcome />} />

      {/* Student Routes */}
      <Route path="/dashboard/student" element={<StudentDashboard />} />
      <Route path="/dashboard/student/:tab" element={<StudentDashboard />} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* Enhanced Flashcards */}
      <Route path="/flashcards/enhanced" element={<EnhancedFlashcardPage />} />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
