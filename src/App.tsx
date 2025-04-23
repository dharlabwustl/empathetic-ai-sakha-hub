
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import AdminLoginPage from "./pages/auth/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { AuthProvider } from "./contexts/auth/AuthContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import StudentDashboard from "./pages/dashboard/student/StudentDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProfilePage from "./pages/dashboard/student/ProfilePage";
import SubscriptionPlansPage from "./pages/subscription/SubscriptionPlansPage";
import AdminStudentsPage from "./pages/admin/AdminStudentsPage";
import AdminTeachersPage from "./pages/admin/AdminTeachersPage";
import AdminContentPage from "./pages/admin/AdminContentPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ConceptCardStudyPage from "./pages/student/ConceptCardStudyPage";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="sakha-theme">
      <AuthProvider>
        <AdminAuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              
              {/* Student routes */}
              <Route 
                path="/dashboard/student" 
                element={
                  <ProtectedRoute>
                    <StudentDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/subscription/plans" 
                element={
                  <ProtectedRoute>
                    <SubscriptionPlansPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/study/concept-card" 
                element={
                  <ProtectedRoute>
                    <ConceptCardStudyPage />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/study/concept-card/:cardId" 
                element={
                  <ProtectedRoute>
                    <ConceptCardStudyPage />
                  </ProtectedRoute>
                }
              />
              
              {/* Admin routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute adminRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/admin/students" 
                element={
                  <ProtectedRoute adminRoute>
                    <AdminStudentsPage />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/admin/teachers" 
                element={
                  <ProtectedRoute adminRoute>
                    <AdminTeachersPage />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/admin/content" 
                element={
                  <ProtectedRoute adminRoute>
                    <AdminContentPage />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/admin/settings" 
                element={
                  <ProtectedRoute adminRoute>
                    <AdminSettingsPage />
                  </ProtectedRoute>
                }
              />
              
              {/* Fallback routes */}
              <Route path="/dashboard" element={<Navigate to="/dashboard/student" replace />} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
          <Toaster />
        </AdminAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
