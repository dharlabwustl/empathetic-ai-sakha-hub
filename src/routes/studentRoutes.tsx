
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentDashboard from '@/pages/dashboard/student/StudentDashboard';
import TodaysPlanView from '@/pages/dashboard/student/TodaysPlanView';
import AcademicAdvisorView from '@/pages/dashboard/student/AcademicAdvisorView';
import ConceptsPage from '@/pages/dashboard/student/ConceptsPage';
import FlashcardsPage from '@/pages/dashboard/student/FlashcardsPage';
import PracticeExamsList from '@/pages/dashboard/student/PracticeExamsList';
import FeelGoodCornerPage from '@/pages/dashboard/student/FeelGoodCornerPage';
import TutorView from '@/pages/dashboard/student/TutorView';
import StudentProfile from '@/pages/dashboard/student/StudentProfile';
import ExamSyllabusPage from '@/pages/dashboard/student/ExamSyllabusPage';
import PreviousYearAnalysisPage from '@/pages/dashboard/student/PreviousYearAnalysisPage';
import SidebarLayout from '@/components/dashboard/SidebarLayout';
import { DashboardLoading } from '@/pages/dashboard/student/DashboardLoading';
import NotFoundPage from '@/pages/NotFound';
import { NotificationsView } from '@/components/dashboard/student/notifications/NotificationsView';
import ConceptsLandingPage from '@/components/dashboard/student/concepts/ConceptsLandingPage';
import FlashcardsLandingPage from '@/components/dashboard/student/flashcards/FlashcardsLandingPage';
import ConceptDetailPage from '@/pages/dashboard/student/ConceptDetailPage';
import { useAuth } from '@/contexts/auth/AuthContext';
import { Navigate } from 'react-router-dom';

// Protected Route component to ensure authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return <DashboardLoading />;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <SidebarLayout>
            <StudentDashboard />
          </SidebarLayout>
        </ProtectedRoute>
      } />
      <Route path="/today" element={
        <ProtectedRoute>
          <SidebarLayout>
            <TodaysPlanView />
          </SidebarLayout>
        </ProtectedRoute>
      } />
      <Route path="/academic" element={
        <ProtectedRoute>
          <SidebarLayout>
            <AcademicAdvisorView />
          </SidebarLayout>
        </ProtectedRoute>
      } />
      <Route path="/concepts" element={
        <ProtectedRoute>
          <SidebarLayout>
            <ConceptsLandingPage />
          </SidebarLayout>
        </ProtectedRoute>
      } />
      <Route path="/concepts/:conceptId" element={
        <ProtectedRoute>
          <SidebarLayout>
            <ConceptDetailPage />
          </SidebarLayout>
        </ProtectedRoute>
      } />
      <Route path="/flashcards" element={
        <ProtectedRoute>
          <SidebarLayout>
            <FlashcardsLandingPage />
          </SidebarLayout>
        </ProtectedRoute>
      } />
      <Route path="/practice-exam" element={
        <ProtectedRoute>
          <SidebarLayout>
            <PracticeExamsList />
          </SidebarLayout>
        </ProtectedRoute>
      } />
      <Route path="/syllabus" element={
        <ProtectedRoute>
          <SidebarLayout>
            <ExamSyllabusPage />
          </SidebarLayout>
        </ProtectedRoute>
      } />
      <Route path="/previous-year-analysis" element={
        <ProtectedRoute>
          <SidebarLayout>
            <PreviousYearAnalysisPage />
          </SidebarLayout>
        </ProtectedRoute>
      } />
      <Route path="/feel-good-corner" element={
        <ProtectedRoute>
          <SidebarLayout>
            <FeelGoodCornerPage />
          </SidebarLayout>
        </ProtectedRoute>
      } />
      <Route path="/tutor" element={
        <ProtectedRoute>
          <SidebarLayout>
            <TutorView />
          </SidebarLayout>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <SidebarLayout>
            <StudentProfile />
          </SidebarLayout>
        </ProtectedRoute>
      } />
      <Route path="/notifications" element={
        <ProtectedRoute>
          <SidebarLayout>
            <NotificationsView />
          </SidebarLayout>
        </ProtectedRoute>
      } />
      <Route path="/loading" element={<DashboardLoading />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default StudentRoutes;
