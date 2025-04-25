
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import StudentDashboard from "./pages/dashboard/student/StudentDashboard";
import ConceptCardStudyPage from "./pages/student/ConceptCardStudyPage";
import ConceptCardsListPage from "./pages/dashboard/student/ConceptCardsListPage";
import ConceptCardPage from "./pages/student/ConceptCardPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProfilePage from "./pages/student/ProfilePage";
import { AuthProvider } from "./contexts/auth/AuthContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from "@/components/common/ProtectedRoute";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="sakha-theme">
      <AuthProvider>
        <AdminAuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard/student" element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard/student/:tab" element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              
              {/* Concept Card Routes */}
              <Route path="/dashboard/student/concepts" element={
                <ProtectedRoute>
                  <ConceptCardsListPage />
                </ProtectedRoute>
              } />
              
              <Route path="/study/concept-cards" element={
                <ProtectedRoute>
                  <ConceptCardPage />
                </ProtectedRoute>
              } />
              
              <Route path="/study/concept-cards/:filterType" element={
                <ProtectedRoute>
                  <ConceptCardPage />
                </ProtectedRoute>
              } />
              
              <Route path="/study/concept-card/:cardId" element={
                <ProtectedRoute>
                  <ConceptCardStudyPage />
                </ProtectedRoute>
              } />
              
              {/* Fallback routes */}
              <Route path="/dashboard" element={<Navigate to="/dashboard/student" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
          <Toaster />
        </AdminAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
