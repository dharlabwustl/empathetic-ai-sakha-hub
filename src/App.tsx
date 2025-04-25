import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import DoctorDashboard from './pages/dashboard/DoctorDashboard';
import EmployeeDashboard from './pages/dashboard/EmployeeDashboard';
import FounderDashboard from './pages/dashboard/FounderDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminRouteGuard from './components/auth/AdminRouteGuard';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentsPage from './pages/admin/StudentsPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import ContentPage from './pages/admin/ContentPage';
import FeaturesManagementPage from './pages/admin/FeaturesManagementPage';
import AIPersonalizationPage from './pages/admin/AIPersonalizationPage';
import SubscriptionsPage from './pages/admin/SubscriptionsPage';
import NotificationsPage from './pages/admin/NotificationsPage';
import SettingsPage from './pages/admin/SettingsPage';
import DocumentationPage from './pages/admin/DocumentationPage';
import IssuesPage from './pages/admin/IssuesPage';
import SystemMonitoringPage from './pages/admin/SystemMonitoringPage';
import EngagementPage from './pages/admin/EngagementPage';
import StudyProgress from './pages/dashboard/StudyProgress';
import BatchManagementPage from './pages/admin/BatchManagementPage';
import ConceptCardDetailPage from './pages/dashboard/student/ConceptCardDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminRouteGuard />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<StudentsPage />} />
          <Route path="/admin/analytics" element={<AnalyticsPage />} />
          <Route path="/admin/content" element={<ContentPage />} />
          <Route path="/admin/features" element={<FeaturesManagementPage />} />
          <Route path="/admin/ai" element={<AIPersonalizationPage />} />
          <Route path="/admin/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/admin/notifications" element={<NotificationsPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="/admin/docs" element={<DocumentationPage />} />
          <Route path="/admin/issues" element={<IssuesPage />} />
          <Route path="/admin/system" element={<SystemMonitoringPage />} />
          <Route path="/admin/engagement" element={<EngagementPage />} />
        </Route>
        
        {/* Protected user routes */}
        <Route element={<ProtectedRoute />}>
          {/* Student routes */}
          <Route path="/dashboard/student" element={<Navigate to="/dashboard/student/overview" replace />} />
          <Route path="/dashboard/student/:tab" element={<StudentDashboard />} />
          <Route path="/dashboard/student/concepts/:conceptId" element={<ConceptCardDetailPage />} />
          <Route path="/dashboard/student/progress" element={<StudyProgress />} />
          <Route path="/dashboard/student/batch" element={<BatchManagementPage />} />
          
          {/* Doctor dashboard */}
          <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
          
          {/* Employee dashboard */}
          <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
          
          {/* Founder dashboard */}
          <Route path="/dashboard/founder" element={<FounderDashboard />} />
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
