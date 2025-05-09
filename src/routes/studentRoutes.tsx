
import React from 'react';
import { Route } from 'react-router-dom';

// Core dashboard pages
import TodaysPlanView from '@/pages/dashboard/student/TodaysPlanView';
import FeelGoodCornerView from '@/pages/dashboard/student/FeelGoodCornerView';
import StudyGroupsPage from '@/pages/dashboard/student/StudyGroupsPage';
import SubscriptionPage from '@/pages/subscription/SubscriptionPage';
import BatchManagementPage from '@/pages/admin/BatchManagementPage';
import EnhancedProfilePage from '@/pages/dashboard/student/EnhancedProfilePage';
import StudyPlanView from '@/pages/dashboard/student/StudyPlanView';
import TutorView from '@/pages/dashboard/student/TutorView';
import AcademicAdvisor from '@/pages/dashboard/student/AcademicAdvisor';

// Feature modules
import { conceptRoutes } from '@/features/concepts/routes';
import { flashcardRoutes } from '@/features/flashcards/routes';
import { practiceExamRoutes } from '@/features/practice-exams/routes';
import { formulaRoutes } from '@/features/formula/routes';
import { NotificationsView } from '@/components/dashboard/student/notifications/NotificationsView';
import ExamSyllabusPage from '@/pages/dashboard/student/ExamSyllabusPage';
import PreviousYearAnalysisPage from '@/pages/dashboard/student/PreviousYearAnalysisPage';

// Export studentRoutes as a JSX fragment containing all student routes
export const studentRoutes = (
  <>
    {/* Core pages */}
    <Route path="/dashboard/student/today" element={<TodaysPlanView />} />
    <Route path="/dashboard/student/feel-good-corner" element={<FeelGoodCornerView />} />
    <Route path="/dashboard/student/study-groups" element={<StudyGroupsPage />} />
    <Route path="/dashboard/student/subscription" element={<SubscriptionPage />} />
    <Route path="/dashboard/student/batch-management" element={<BatchManagementPage />} />
    <Route path="/dashboard/student/profile" element={<EnhancedProfilePage />} />
    <Route path="/dashboard/student/study-plan" element={<StudyPlanView />} />
    <Route path="/dashboard/student/tutor" element={<TutorView />} />
    <Route path="/dashboard/student/academic" element={<AcademicAdvisor />} />
    <Route path="/dashboard/student/notifications" element={<NotificationsView />} />
    
    {/* Syllabus and Previous Year Analysis routes */}
    <Route path="/dashboard/student/syllabus" element={<ExamSyllabusPage />} />
    <Route path="/dashboard/student/previous-year" element={<PreviousYearAnalysisPage />} />

    {/* Feature-specific routes from their respective modules */}
    {conceptRoutes}
    {flashcardRoutes}
    {practiceExamRoutes}
    {formulaRoutes}
  </>
);
