
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import { AdminAuthProvider } from '@/contexts/auth/AdminAuthContext';

// Import pages and components
import Index from '@/pages/Index';
import SignUp from '@/pages/SignUp';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';

// Admin and Auth related components
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminRouteGuard from '@/components/admin/AdminRouteGuard';
import adminRoutes from '@/components/admin/routes';
import PublicFlaskGuidePage from '@/pages/admin/PublicFlaskGuidePage';
import FlaskGuidePage from '@/pages/admin/FlaskGuidePage';
import DatabaseSchemaCSVPage from '@/pages/database/DatabaseSchemaCSVPage';

// Student dashboard related imports
import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import { studentRoutes } from './studentRoutes';
import WelcomeToPrepr from '@/pages/signup/WelcomeToPrepr';
import PostSignupWelcome from '@/components/signup/PostSignupWelcome';
import WelcomeFlow from '@/pages/welcome-flow';
import PostLoginWelcome from '@/components/login/PostLoginWelcome';

const AppRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/database/schema" element={<DatabaseSchemaCSVPage />} />
          
          {/* Public Flask Guide route */}
          <Route path="/flask-guide" element={<PublicFlaskGuidePage />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Welcome flow routes */}
          <Route path="/welcome" element={<WelcomeToPrepr />} />
          <Route path="/post-signup" element={<PostSignupWelcome />} />
          <Route path="/welcome-flow" element={<WelcomeFlow />} />
          <Route path="/welcome-back" element={<PostLoginWelcome />} />

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={
            <AdminRouteGuard>
              <AdminDashboard />
            </AdminRouteGuard>
          } />
          
          {/* Map remaining admin routes */}
          {adminRoutes.map((route, index) => (
            <Route 
              key={index} 
              path={route.path} 
              element={
                <AdminRouteGuard>
                  {route.element}
                </AdminRouteGuard>
              } 
            />
          ))}

          {/* Legacy route for compatibility */}
          <Route path="/admin/flask-guide" element={
            <AdminRouteGuard>
              <FlaskGuidePage />
            </AdminRouteGuard>
          } />
          
          {/* Student dashboard base route */}
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/student/:tab" element={<StudentDashboard />} />
          
          {/* Nested student routes from consolidated file */}
          {studentRoutes}
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AdminAuthProvider>
    </AuthProvider>
  );
};

export default AppRoutes;
