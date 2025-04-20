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
import LoginPage from "./pages/login/LoginPage";
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
import AIChatTutor from "./pages/dashboard/student/AIChatTutor";
import AcademicAdvisor from "./pages/dashboard/student/AcademicAdvisor";
import SubscriptionPage from "./pages/dashboard/student/SubscriptionPage";
import NotFound from "./pages/NotFound";
import "./styles/animations.css";
import { UserRole } from "./types/user/base";

import StudentProfilePage from "./pages/dashboard/student/ProfilePage";
import StudentSettingsPage from "./pages/dashboard/student/SettingsPage";
import FlashcardsPage from "./pages/dashboard/student/FlashcardsPage";
import ExamPreparationPage from "./pages/dashboard/student/ExamPreparationPage";

import FeaturesManagementPage from "./pages/admin/FeaturesManagementPage";

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
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/login/old" element={<Login />} />
                  
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
                  
                  <Route path="/dashboard/student/profile" element={
                    <ProtectedRoute>
                      <StudentProfilePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/student/settings" element={
                    <ProtectedRoute>
                      <StudentSettingsPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/student/subscription" element={
                    <ProtectedRoute>
                      <SubscriptionPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/student/flashcards" element={
                    <ProtectedRoute>
                      <FlashcardsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/student/exams" element={
                    <ProtectedRoute>
                      <ExamPreparationPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/student/tutor" element={
                    <ProtectedRoute>
                      <AIChatTutor userProfile={{
                        id: "1",
                        name: "Student",
                        email: "student@example.com",
                        role: UserRole.Student,
                        goals: [{ id: "1", title: "JEE", progress: 65 }]
                      }} />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/student/academic" element={
                    <ProtectedRoute>
                      <AcademicAdvisor userProfile={{
                        examPreparation: "IIT-JEE"
                      }} />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/student/progress" element={
                    <ProtectedRoute>
                      <StudyProgress />
                    </ProtectedRoute>
                  } />
                  
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
                  
                  <Route path="/admin/features" element={
                    <AdminRouteGuard>
                      <FeaturesManagementPage />
                    </AdminRouteGuard>
                  } />
                  
                  <Route path="/dashboard/student/checkout" element={
                    <ProtectedRoute>
                      <CheckoutPage />
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
