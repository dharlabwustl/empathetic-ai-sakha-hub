
import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "@/pages/auth/SignupPage";
import LoginPage from "@/pages/auth/LoginPage";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import PricingPage from "@/pages/PricingPage";
import ContactPage from "@/pages/ContactPage";
import FeaturesPage from "@/pages/FeaturesPage";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import StudentDashboard from "@/pages/dashboard/student/StudentDashboard";
import ConceptsPage from "@/pages/dashboard/student/ConceptsPage";
import ConceptsAllPage from "@/pages/dashboard/student/ConceptsAllPage";
import FlashcardsPage from "@/pages/dashboard/student/FlashcardsPage";
import PracticeExamPage from "@/pages/dashboard/student/PracticeExamPage";
import ExamDetailPage from "@/pages/dashboard/student/ExamDetailPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ConceptDetailPage from "@/pages/dashboard/student/ConceptDetailPage";
import AuthProvider from "@/components/auth/AuthProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardContextProvider from "@/contexts/DashboardContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardContextProvider>
                <DashboardLayout />
              </DashboardContextProvider>
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Navigate to="student/overview" replace />} />
          <Route path="student" element={<Navigate to="overview" replace />} />
          <Route path="student/overview" element={<StudentDashboard />} />
          <Route path="student/concepts" element={<ConceptsPage />} />
          <Route path="student/concepts/all" element={<ConceptsAllPage />} />
          <Route path="student/concepts/:conceptId" element={<ConceptDetailPage />} />
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
