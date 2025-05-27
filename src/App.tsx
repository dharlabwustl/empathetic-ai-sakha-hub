
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ui/theme-provider";

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Dashboard pages
import StudentDashboard from './pages/dashboard/StudentDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

// Student specific pages
import AcademicAdvisorView from './pages/dashboard/student/AcademicAdvisorView';
import TodaysPlanView from './pages/dashboard/student/TodaysPlanView';
import ExamSyllabusView from './pages/dashboard/student/ExamSyllabusView';
import PreviousYearAnalysisView from './pages/dashboard/student/PreviousYearAnalysisView';
import ConceptsView from './components/dashboard/student/concepts/ConceptsView';
import ConceptDetailView from './pages/dashboard/student/ConceptDetailView';
import FlashcardsView from './pages/dashboard/student/FlashcardsView';
import PracticeExamView from './pages/dashboard/student/PracticeExamView';
import FormulaPracticeView from './pages/dashboard/student/FormulaPracticeView';
import FeelGoodCornerView from './pages/dashboard/student/FeelGoodCornerView';
import TutorView from './pages/dashboard/student/TutorView';
import ProfileView from './pages/dashboard/student/ProfileView';
import NotificationsView from './pages/dashboard/student/NotificationsView';

// Landing page
import LandingPage from './pages/LandingPage';

// Route guards
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRouteGuard from './components/admin/AdminRouteGuard';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AuthProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                
                {/* Protected student routes */}
                <Route path="/dashboard/student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/student/academic" element={<ProtectedRoute><AcademicAdvisorView /></ProtectedRoute>} />
                <Route path="/dashboard/student/today" element={<ProtectedRoute><TodaysPlanView /></ProtectedRoute>} />
                <Route path="/dashboard/student/syllabus" element={<ProtectedRoute><ExamSyllabusView /></ProtectedRoute>} />
                <Route path="/dashboard/student/previous-year-analysis" element={<ProtectedRoute><PreviousYearAnalysisView /></ProtectedRoute>} />
                <Route path="/dashboard/student/concepts" element={<ProtectedRoute><ConceptsView /></ProtectedRoute>} />
                <Route path="/dashboard/student/concepts/*" element={<ProtectedRoute><ConceptsView /></ProtectedRoute>} />
                <Route path="/dashboard/student/concepts/card/:id" element={<ProtectedRoute><ConceptDetailView /></ProtectedRoute>} />
                <Route path="/dashboard/student/flashcards" element={<ProtectedRoute><FlashcardsView /></ProtectedRoute>} />
                <Route path="/dashboard/student/practice-exam" element={<ProtectedRoute><PracticeExamView /></ProtectedRoute>} />
                <Route path="/dashboard/student/formula-practice" element={<ProtectedRoute><FormulaPracticeView /></ProtectedRoute>} />
                <Route path="/dashboard/student/feel-good-corner" element={<ProtectedRoute><FeelGoodCornerView /></ProtectedRoute>} />
                <Route path="/dashboard/student/tutor" element={<ProtectedRoute><TutorView /></ProtectedRoute>} />
                <Route path="/dashboard/student/profile" element={<ProtectedRoute><ProfileView /></ProtectedRoute>} />
                <Route path="/dashboard/student/notifications" element={<ProtectedRoute><NotificationsView /></ProtectedRoute>} />
                
                {/* Protected admin routes */}
                <Route path="/dashboard/admin" element={<ProtectedRoute><AdminRouteGuard><AdminDashboard /></AdminRouteGuard></ProtectedRoute>} />
                
                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
