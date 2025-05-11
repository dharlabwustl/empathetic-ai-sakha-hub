
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import LoginPage from './pages/Login';
import Registration from './pages/Registration';
import AdminLogin from './pages/admin/AdminLogin';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFound from './pages/NotFound';
import Index from './pages/Index';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import AuthGuard from './components/auth/AuthGuard';
import AdminAuthGuard from './components/auth/AdminAuthGuard';
import authService from './services/auth/authService';
import { VoiceAssistantProvider } from './contexts/VoiceAssistantContext';

function App() {
  useEffect(() => {
    // Initialize auth state on app load
    authService.initializeAuth();
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <VoiceAssistantProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Registration />} />

            {/* Protected student routes */}
            <Route path="/dashboard/*" element={
              <AuthGuard>
                <UserDashboard />
              </AuthGuard>
            } />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={
              <AdminAuthGuard>
                <AdminDashboard />
              </AdminAuthGuard>
            } />

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </VoiceAssistantProvider>
    </ThemeProvider>
  );
}

export default App;
