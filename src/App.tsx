
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import Index from '@/pages/Index';
import AuthPage from '@/pages/AuthPage';
import AdminDashboard from '@/pages/dashboard/AdminDashboard';
import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import TermsOfService from '@/pages/TermsOfService';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import studentRoutes from '@/routes/studentRoutes';
import adminRoutes from '@/routes/adminRoutes';
import EnhancedTutorView from '@/pages/dashboard/student/EnhancedTutorView';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import '@/styles/premium-dashboard.css';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <div className="App page-transition">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/dashboard/admin/*" element={adminRoutes} />
            <Route path="/dashboard/student/*" element={studentRoutes} />
            <Route path="/dashboard/student/tutor" element={<EnhancedTutorView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
