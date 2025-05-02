
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

// Public Pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";

// Student Pages
import StudentDashboard from "@/pages/dashboard/student/StudentDashboard";
import StudentToday from "@/pages/dashboard/student/StudentToday";
import StudentProfile from "@/pages/dashboard/student/StudentProfile";
import ExamStartPage from "@/pages/dashboard/student/ExamStartPage";
import ExamTaking from "@/pages/dashboard/student/practice-exam/ExamTaking";

// Admin Pages
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";

// Auth Provider
import { AuthProvider } from "@/contexts/auth/AuthContext";
import { AdminAuthProvider } from "@/contexts/auth/AdminAuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AdminAuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Student Dashboard Routes */}
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/student/today" element={<StudentToday />} />
            <Route path="/dashboard/student/profile" element={<StudentProfile />} />
            <Route path="/dashboard/student/exams/:id" element={<ExamStartPage />} />
            <Route path="/dashboard/student/practice-exam/:id" element={<ExamTaking />} />

            {/* Admin Dashboard Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </AdminAuthProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
