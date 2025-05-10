
import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import { AdminAuthProvider } from '@/contexts/auth/AdminAuthContext';
import SidebarLayout from './components/dashboard/SidebarLayout';
import { OnboardingProvider } from "./components/signup/OnboardingContext";
import authService from './services/auth/authService';

// Import pages and components
import Index from '@/pages/Index';
import SignUp from '@/pages/SignUp';
import Login from './pages/Login';
import NotFound from '@/pages/NotFound';
import LoadingScreen from '@/components/common/LoadingScreen';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await authService.verifyToken();
      if (!isAuthenticated) {
        // Redirect to login with return URL
        navigate(`/login?returnTo=${encodeURIComponent(location.pathname)}`, { replace: true });
      }
    };
    
    checkAuth();
  }, [navigate, location]);

  return authService.isAuthenticated() ? <>{children}</> : <LoadingScreen />;
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="prepzr-theme">
        <AuthProvider>
          <AdminAuthProvider>
            <OnboardingProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                
                {/* Protected dashboard routes */}
                <Route 
                  path="/dashboard/student/*" 
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<LoadingScreen />}>
                        <lazy(() => import('./routes/studentRoutes'))() />
                      </Suspense>
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<LoadingScreen />}>
                        <lazy(() => import('./pages/admin/AdminDashboard'))() />
                      </Suspense>
                    </ProtectedRoute>
                  } 
                />

                <Route path="/welcome-back" element={<Navigate to="/dashboard/student" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              <Toaster />
            </OnboardingProvider>
          </AdminAuthProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
