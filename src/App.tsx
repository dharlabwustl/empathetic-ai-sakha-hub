
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "@/pages/SignUp";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import StudentDashboard from "@/pages/dashboard/student/StudentDashboard";
import ConceptsPage from "@/pages/dashboard/student/ConceptsPage";
import ConceptsAllPage from "@/pages/dashboard/student/ConceptsAllPage";
import FlashcardsPage from "@/pages/dashboard/student/FlashcardsPage";
import PracticeExamPage from "@/pages/dashboard/student/PracticeExamPage";
import ExamDetailPage from "@/pages/dashboard/student/ExamDetailPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AuthProvider from "@/components/auth/AuthProvider";
import AdminLogin from "@/pages/admin/AdminLogin";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/features" element={<div>Features Page</div>} />
        <Route path="/pricing" element={<div>Pricing Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Navigate to="student/overview" replace />} />
          <Route path="student" element={<Navigate to="overview" replace />} />
          <Route path="student/overview" element={<StudentDashboard />} />
          <Route path="student/concepts" element={<ConceptsPage />} />
          <Route path="student/concepts/all" element={<ConceptsAllPage />} />
          <Route path="student/concepts/:conceptId" element={<div>Concept Detail</div>} />
          <Route path="student/flashcards" element={<FlashcardsPage />} />
          <Route path="student/practice-exams" element={<PracticeExamPage />} />
          <Route path="student/exam/:examId" element={<ExamDetailPage />} />
          <Route path="student/exam/:examId/review" element={<ExamDetailPage />} />

          {/* Redirects */}
          <Route path="student/today" element={<Navigate to="/dashboard/student/concepts" replace />} />
          <Route path="student/week" element={<Navigate to="/dashboard/student/concepts" replace />} />
          <Route path="student/month" element={<Navigate to="/dashboard/student/concepts" replace />} />
        </Route>

        {/* 404 - Not Found */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
