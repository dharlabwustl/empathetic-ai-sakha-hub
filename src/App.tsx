
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import { AdminAuthProvider } from '@/contexts/auth/AdminAuthContext';
import SidebarLayout from './components/dashboard/SidebarLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Import pages and components
import Index from '@/pages/Index';
import SignUp from '@/pages/SignUp';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import FeelGoodCornerView from '@/pages/dashboard/student/FeelGoodCornerView';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import TodaysPlanView from '@/pages/dashboard/student/TodaysPlanView';
import LoadingScreen from '@/components/common/LoadingScreen';
import AppRoutes from './components/dashboard/student/AppRoutes';
import WelcomeToPrepr from './pages/signup/WelcomeToPrepr';
import ProfilePage from '@/pages/student/ProfilePage';
import StudentProfile from '@/pages/dashboard/student/StudentProfile';
import StudyPlanView from '@/pages/dashboard/student/StudyPlanView';
import TutorView from '@/pages/dashboard/student/TutorView';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="prepzr-ui-theme">
      <BrowserRouter>
        <AuthProvider>
          <AdminAuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/welcome" element={<WelcomeToPrepr />} />
              <Route path="/welcome-flow" element={<WelcomeToPrepr />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Student Dashboard */}
              <Route path="/dashboard/student" element={
                <ProtectedRoute>
                  <SidebarLayout>
                    <StudentDashboard />
                  </SidebarLayout>
                </ProtectedRoute>
              } />
              
              {/* Student Dashboard routes with sidebar layout */}
              <Route path="/dashboard/student" element={
                <ProtectedRoute>
                  <SidebarLayout>
                    <Suspense fallback={<LoadingScreen />}>
                      <Routes>
                        <Route path="/" element={<StudentDashboard />} />
                        <Route path="feel-good-corner" element={<FeelGoodCornerView />} />
                        <Route path="today" element={<TodaysPlanView />} />
                        <Route path="profile" element={<StudentProfile />} />
                        <Route path="study-plan" element={<StudyPlanView />} />
                        <Route path="tutor" element={<TutorView />} />
                        <Route path="*" element={<AppRoutes />} />
                      </Routes>
                    </Suspense>
                  </SidebarLayout>
                </ProtectedRoute>
              } />
              
              {/* Admin Dashboard */}
              <Route path="/dashboard/admin" element={
                <ProtectedRoute redirectTo='/admin/login'>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminAuthProvider>
        </AuthProvider>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
