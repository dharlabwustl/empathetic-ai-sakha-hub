import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import AdminRouteGuard from '@/components/admin/AdminRouteGuard';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import StudentDashboard from '@/pages/dashboard/student/StudentDashboard';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminLogin from '@/pages/admin/AdminLogin';
import Students from '@/pages/admin/Students';
import Content from '@/pages/admin/Content';
import Settings from '@/pages/admin/Settings';
import Analytics from '@/pages/admin/Analytics';
import Notifications from '@/pages/admin/Notifications';
import SystemLogs from '@/pages/admin/SystemLogs';
import Signup from '@/pages/signup/Signup';
import ApiTest from "./pages/ApiTest";

const App = () => {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate to="/dashboard/student" />} />
            
            {/* Student Routes */}
            <Route 
              path="/dashboard/student" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <AdminRouteGuard>
                  <AdminDashboard />
                </AdminRouteGuard>
              } 
            />
            <Route 
              path="/admin/students" 
              element={
                <AdminRouteGuard requiredPermission="view_students">
                  <Students />
                </AdminRouteGuard>
              } 
            />
            <Route 
              path="/admin/content" 
              element={
                <AdminRouteGuard requiredPermission="view_content">
                  <Content />
                </AdminRouteGuard>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <AdminRouteGuard requiredPermission="edit_settings">
                  <Settings />
                </AdminRouteGuard>
              } 
            />
            <Route 
              path="/admin/analytics" 
              element={
                <AdminRouteGuard requiredPermission="view_analytics">
                  <Analytics />
                </AdminRouteGuard>
              } 
            />
            <Route 
              path="/admin/notifications" 
              element={
                <AdminRouteGuard requiredPermission="manage_notifications">
                  <Notifications />
                </AdminRouteGuard>
              } 
            />
            <Route 
              path="/admin/system-logs" 
              element={
                <AdminRouteGuard requiredPermission="view_logs">
                  <SystemLogs />
                </AdminRouteGuard>
              } 
            />

            {/* API Testing Route */}
            <Route path="/api-test" element={<ApiTest />} />
          </Routes>
        </Router>
      </AdminAuthProvider>
    </AuthProvider>
  );
};

export default App;
