
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import Index from '@/pages/Index';
// Admin pages
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AIPersonalization from '@/pages/admin/AIPersonalization';
import ContentPage from '@/pages/admin/ContentPage';
import StudentsPage from '@/pages/admin/StudentsPage';
import SystemPage from '@/pages/admin/SystemPage';
import AdminDocumentation from '@/pages/admin/AdminDocumentation';
// Student pages
import StudentLogin from '@/pages/student/StudentLogin';
import StudentSignup from '@/pages/student/StudentSignup';
import StudentDashboard from '@/pages/student/StudentDashboard';
import Onboarding from '@/pages/student/Onboarding';

import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import { StudentAuthProvider } from '@/contexts/StudentAuthContext';
import { ToastProvider } from '@/components/providers/toast-provider';
import AdminRouteGuard from '@/components/admin/AdminRouteGuard';
import StudentRouteGuard from '@/components/student/StudentRouteGuard';
// New Android App page
import AndroidApp from '@/pages/AndroidApp';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="sakha-ui-theme">
      <ToastProvider>
        <Router>
          <AdminAuthProvider>
            <StudentAuthProvider>
              <Routes>
                {/* Public pages */}
                <Route path="/" element={<Index />} />
                <Route path="/android-app" element={<AndroidApp />} />

                {/* Admin pages */}
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
                  path="/admin/ai-personalization" 
                  element={
                    <AdminRouteGuard>
                      <AIPersonalization />
                    </AdminRouteGuard>
                  } 
                />
                <Route 
                  path="/admin/content" 
                  element={
                    <AdminRouteGuard>
                      <ContentPage />
                    </AdminRouteGuard>
                  } 
                />
                <Route 
                  path="/admin/students" 
                  element={
                    <AdminRouteGuard>
                      <StudentsPage />
                    </AdminRouteGuard>
                  } 
                />
                <Route 
                  path="/admin/system" 
                  element={
                    <AdminRouteGuard>
                      <SystemPage />
                    </AdminRouteGuard>
                  } 
                />
                <Route 
                  path="/admin/documentation" 
                  element={
                    <AdminRouteGuard>
                      <AdminDocumentation />
                    </AdminRouteGuard>
                  } 
                />

                {/* Student pages */}
                <Route path="/login" element={<StudentLogin />} />
                <Route path="/signup" element={<StudentSignup />} />
                <Route 
                  path="/dashboard/*" 
                  element={
                    <StudentRouteGuard>
                      <StudentDashboard />
                    </StudentRouteGuard>
                  } 
                />
                <Route path="/onboarding" element={<Onboarding />} />
              </Routes>
            </StudentAuthProvider>
          </AdminAuthProvider>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
