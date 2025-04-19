
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from '@/components/common/ProtectedRoute';
import AdminRouteGuard from '@/components/admin/AdminRouteGuard';
import { TooltipProvider } from '@/components/ui/tooltip';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import AboutUsPage from './pages/AboutUsPage';
import SubscriptionPage from './pages/SubscriptionPage';
import ExamPreparationPage from './pages/dashboard/ExamPreparationPage';
import StressTestPage from './pages/dashboard/StressTestPage';
import DocumentationPage from './pages/admin/DocumentationPage';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import CheckoutPage from './pages/subscription/CheckoutPage';
import BatchManagement from './pages/profile/BatchManagement';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <AdminAuthProvider>
              <BrowserRouter>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/about-us" element={<AboutUsPage />} />
                  <Route path="/subscription" element={<SubscriptionPage />} />
                  
                  {/* Student Dashboard Routes */}
                  <Route path="/dashboard/student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
                  <Route path="/dashboard/student/exams" element={<ProtectedRoute><ExamPreparationPage /></ProtectedRoute>} />
                  <Route path="/dashboard/student/stress-test" element={<ProtectedRoute><StressTestPage /></ProtectedRoute>} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="/admin/dashboard" element={<AdminRouteGuard><AdminDashboard /></AdminRouteGuard>} />
                  <Route path="/admin/documentation" element={<AdminRouteGuard><DocumentationPage /></AdminRouteGuard>} />
                  
                  {/* Subscription Routes */}
                  <Route path="/subscription/checkout" element={<CheckoutPage />} />
                  
                  {/* Profile Routes */}
                  <Route path="/dashboard/profile" element={<ProtectedRoute><BatchManagement /></ProtectedRoute>} />
                  
                  {/* Fallback Route */}
                  <Route path="*" element={<Navigate to="/dashboard/student" replace />} />
                </Routes>
                
                <Toaster />
              </BrowserRouter>
            </AdminAuthProvider>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
