
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
import AdminLogin from "./pages/admin/AdminLogin";
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
import StudentDashboard from "./pages/dashboard/StudentDashboard";
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
import EnhancedProfilePage from "./pages/dashboard/student/EnhancedProfilePage";
import StudentSettingsPage from "./pages/dashboard/student/SettingsPage";
import FlashcardsPage from "./pages/dashboard/student/FlashcardsPage";
import ExamPreparationPage from "./pages/dashboard/student/ExamPreparationPage";
import StudyGroupsPage from "./pages/dashboard/student/StudyGroupsPage";

import FeaturesManagementPage from "./pages/admin/FeaturesManagementPage";
import BatchManagementPage from "./pages/admin/BatchManagementPage";

import ConceptsPage from "./pages/dashboard/student/ConceptsPage";
import ConceptCardDetailPage from "./pages/dashboard/student/ConceptCardDetailPage";
import AllConceptCardsPage from "./pages/dashboard/student/AllConceptCardsPage";
import FlashcardDetailsPage from "./pages/dashboard/student/FlashcardDetailsPage";
import ExamDetailPage from "./pages/dashboard/student/ExamDetailPage";
import FeelGoodCornerPage from "./pages/dashboard/student/FeelGoodCornerPage";
import StudentRoutes from "./routes/studentRoutes";
import StudyPlanView from "./components/dashboard/student/studyplan/StudyPlanView";
import TodaysPlanView from "./components/dashboard/student/todays-plan/TodaysPlanView";

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
                  
                  <Route element={<AdminRouteGuard />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/students" element={<StudentsPage />} />
                    <Route path="/admin/ai" element={<AIPersonalizationPage />} />
                    <Route path="/admin/content" element={<ContentPage />} />
                    <Route path="/admin/engagement" element={<EngagementPage />} />
                    <Route path="/admin/subscriptions" element={<SubscriptionsPage />} />
                    <Route path="/admin/system" element={<SystemMonitoringPage />} />
                    <Route path="/admin/analytics" element={<AnalyticsPage />} />
                    <Route path="/admin/issues" element={<IssuesPage />} />
                    <Route path="/admin/notifications" element={<NotificationsPage />} />
                    <Route path="/admin/documentation" element={<DocumentationPage />} />
                    <Route path="/admin/settings" element={<SettingsPage />} />
                    <Route path="/admin/features" element={<FeaturesManagementPage />} />
                    <Route path="/admin/batch" element={<BatchManagementPage />} />
                  </Route>
                  
                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard/student" element={<Navigate to="/dashboard/student/overview" replace />} />
                    <Route path="/dashboard/student/:tab" element={<StudentDashboard />} />
                    
                    <Route path="/dashboard/student/*" element={<StudentRoutes />} />
                    
                    <Route path="/dashboard/student/progress" element={<StudyProgress />} />
                    <Route path="/dashboard/student/settings" element={<StudentSettingsPage />} />
                    <Route path="/dashboard/student/wellness" element={<FeelGoodCornerPage />} />
                    <Route path="/dashboard/student/study-groups" element={<StudyGroupsPage />} />
                    <Route path="/dashboard/student/profile" element={<ProfilePage />} /> 
                    <Route path="/dashboard/student/enhanced-profile" element={<EnhancedProfilePage />} />
                    <Route path="/dashboard/student/studyplan" element={<StudyPlanView />} />
                    <Route path="/dashboard/student/todays-plan" element={<TodaysPlanView />} />
                    
                    <Route path="/dashboard/student/tutor" element={<AIChatTutor userProfile={{
                      id: "1",
                      name: "Student",
                      email: "student@example.com",
                      role: UserRole.Student,
                      goals: [{ id: "1", title: "JEE", progress: 65 }]
                    }} />} />
                    <Route path="/dashboard/student/academic" element={<AcademicAdvisor userProfile={{
                      examPreparation: "IIT-JEE"
                    }} />} />
                    
                    <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
                    <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
                    <Route path="/dashboard/founder" element={<FounderDashboard />} />
                  </Route>
                  
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
