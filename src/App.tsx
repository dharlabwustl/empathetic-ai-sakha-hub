
"use client";

import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { AuthProvider } from "@/contexts/auth/AuthContext";
import AdminRouteGuard from "@/components/admin/AdminRouteGuard";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import LoginPage from "./pages/login/LoginPage"; // Import the new login page
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentsPage from "./pages/admin/StudentsPage";
import ContentPage from "./pages/admin/ContentPage";
import SettingsPage from "./pages/admin/SettingsPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import SystemMonitoringPage from "./pages/admin/SystemMonitoringPage";
import EngagementPage from "./pages/admin/EngagementPage";
import SubscriptionsPage from "./pages/admin/SubscriptionsPage";
import AIPersonalizationPage from "./pages/admin/AIPersonalizationPage";
import IssuesPage from "./pages/admin/IssuesPage";
import NotificationsPage from "./pages/admin/NotificationsPage";
import DocumentationPage from "./pages/admin/DocumentationPage";
import StudentDashboard from "./pages/dashboard/student/StudentDashboard";
import EmployeeDashboard from "./pages/dashboard/EmployeeDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import FounderDashboard from "./pages/dashboard/FounderDashboard";
import StudyProgress from "./pages/dashboard/StudyProgress"; 
import NotFound from "./pages/NotFound";
import "./styles/animations.css";

// Create a new QueryClient instance properly
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AuthProvider>
            <AdminAuthProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<LoginPage />} /> {/* Using the improved login page */}
                  <Route path="/login/old" element={<Login />} /> {/* Keep the old login for reference */}
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={
                    <AdminRouteGuard>
                      <AdminDashboard />
                    </AdminRouteGuard>
                  } />
                  <Route path="/admin/students" element={
                    <AdminRouteGuard>
                      <StudentsPage />
                    </AdminRouteGuard>
                  } />
                  <Route path="/admin/ai" element={
                    <AdminRouteGuard>
                      <AIPersonalizationPage />
                    </AdminRouteGuard>
                  } />
                  <Route path="/admin/content" element={
                    <AdminRouteGuard>
                      <ContentPage />
                    </AdminRouteGuard>
                  } />
                  <Route path="/admin/engagement" element={
                    <AdminRouteGuard>
                      <EngagementPage />
                    </AdminRouteGuard>
                  } />
                  <Route path="/admin/subscriptions" element={
                    <AdminRouteGuard>
                      <SubscriptionsPage />
                    </AdminRouteGuard>
                  } />
                  <Route path="/admin/system" element={
                    <AdminRouteGuard>
                      <SystemMonitoringPage />
                    </AdminRouteGuard>
                  } />
                  <Route path="/admin/analytics" element={
                    <AdminRouteGuard>
                      <AnalyticsPage />
                    </AdminRouteGuard>
                  } />
                  <Route path="/admin/issues" element={
                    <AdminRouteGuard>
                      <IssuesPage />
                    </AdminRouteGuard>
                  } />
                  <Route path="/admin/notifications" element={
                    <AdminRouteGuard>
                      <NotificationsPage />
                    </AdminRouteGuard>
                  } />
                  <Route path="/admin/documentation" element={
                    <AdminRouteGuard>
                      <DocumentationPage />
                    </AdminRouteGuard>
                  } />
                  <Route path="/admin/settings" element={
                    <AdminRouteGuard>
                      <SettingsPage />
                    </AdminRouteGuard>
                  } />
                  
                  {/* Student Dashboard Routes - Protected */}
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
                  
                  {/* Study Progress Route - Protected */}
                  <Route path="/dashboard/student/progress" element={
                    <ProtectedRoute>
                      <StudyProgress />
                    </ProtectedRoute>
                  } />
                  
                  {/* Employee Dashboard Routes - Protected */}
                  <Route path="/dashboard/employee" element={
                    <ProtectedRoute>
                      <EmployeeDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/employee/:tab" element={
                    <ProtectedRoute>
                      <EmployeeDashboard />
                    </ProtectedRoute>
                  } />
                  
                  {/* Doctor Dashboard Routes - Protected */}
                  <Route path="/dashboard/doctor" element={
                    <ProtectedRoute>
                      <DoctorDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/doctor/:tab" element={
                    <ProtectedRoute>
                      <DoctorDashboard />
                    </ProtectedRoute>
                  } />
                  
                  {/* Founder Dashboard Routes - Protected */}
                  <Route path="/dashboard/founder" element={
                    <ProtectedRoute>
                      <FounderDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/founder/:tab" element={
                    <ProtectedRoute>
                      <FounderDashboard />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AdminAuthProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
