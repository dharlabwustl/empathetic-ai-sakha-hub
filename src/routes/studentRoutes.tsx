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
import ConceptDetailPage from '@/pages/dashboard/student/ConceptDetailPage';
import ConceptStudyPage from '@/pages/dashboard/student/ConceptStudyPage';
import SubscriptionPage from '@/pages/dashboard/student/SubscriptionPage';
import InteractiveFlashcard from '@/pages/dashboard/student/flashcards/InteractiveFlashcard';
import FormulaLabPageWrapper from '@/pages/dashboard/student/concepts/FormulaLabPage';
import ExamTakingPage from '@/components/dashboard/student/practice-exam/ExamTakingPage';
import ExamReviewPage from '@/components/dashboard/student/practice-exam/ExamReviewPage';
import Enhanced24x7TutorPage from '@/components/dashboard/student/Enhanced24x7TutorPage';
import ComprehensiveStudyPlanPage from '@/pages/dashboard/student/ComprehensiveStudyPlanPage';

const StudentRoutes = () => {
  console.log('🚨 STUDENT ROUTES - Component loaded');
  
  return (
    <Routes>
      <Route path="/" element={<StudentDashboard />} />
      <Route path="/comprehensive-study-plan" element={
        <SidebarLayout>
          <ComprehensiveStudyPlanPage />
        </SidebarLayout>
      } />
      <Route path="/today" element={
        <SidebarLayout>
          <TodaysPlanView />
        </SidebarLayout>
      } />
      <Route path="/academic" element={
        <SidebarLayout>
          <AcademicAdvisorView />
        </SidebarLayout>
      } />
      <Route path="/concepts" element={
        <SidebarLayout>
          <ConceptsPage />
        </SidebarLayout>
      } />
      <Route path="/concepts/card/:conceptId" element={
        <SidebarLayout>
          <ConceptDetailPage />
        </SidebarLayout>
      } />
      <Route path="/concept/:conceptId" element={
        <SidebarLayout>
          <ConceptDetailPage />
        </SidebarLayout>
      } />
      <Route path="/concepts/:conceptId" element={
        <SidebarLayout>
          <ConceptDetailPage />
        </SidebarLayout>
      } />
      <Route path="/concepts/:conceptId/formula-lab" element={
        <SidebarLayout>
          <FormulaLabPageWrapper />
        </SidebarLayout>
      } />
      <Route path="/concept-study/:conceptId" element={
        <SidebarLayout>
          <ConceptStudyPage />
        </SidebarLayout>
      } />
      <Route path="/flashcards" element={
        <SidebarLayout>
          <FlashcardsPage />
        </SidebarLayout>
      } />
      <Route path="/flashcards/1/interactive" element={
        <SidebarLayout>
          <InteractiveFlashcard />
        </SidebarLayout>
      } />
      <Route path="/flashcards/:id/interactive" element={
        <SidebarLayout>
          <InteractiveFlashcard />
        </SidebarLayout>
      } />
      <Route path="/practice-exam" element={
        <SidebarLayout>
          <PracticeExamsList />
        </SidebarLayout>
      } />
      <Route path="/practice-exam/:examId/start" element={
        <SidebarLayout>
          <ExamTakingPage />
        </SidebarLayout>
      } />
      <Route path="/practice-exam/:examId/review" element={
        <SidebarLayout>
          <ExamReviewPage />
        </SidebarLayout>
      } />
      <Route path="/syllabus" element={
        <SidebarLayout>
          <ExamSyllabusPage />
        </SidebarLayout>
      } />
      <Route path="/previous-year-analysis" element={
        <SidebarLayout>
          <PreviousYearAnalysisPage />
        </SidebarLayout>
      } />
      <Route path="/feel-good-corner" element={
        <SidebarLayout>
          <FeelGoodCornerPage />
        </SidebarLayout>
      } />
      <Route path="/tutor" element={
        <SidebarLayout>
          <Enhanced24x7TutorPage />
        </SidebarLayout>
      } />
      <Route path="/tutor-enhanced" element={
        <SidebarLayout>
          <Enhanced24x7TutorPage />
        </SidebarLayout>
      } />
      <Route path="/profile" element={
        <SidebarLayout>
          <StudentProfile />
        </SidebarLayout>
      } />
      <Route path="/subscription" element={
        <SidebarLayout>
          <SubscriptionPage />
        </SidebarLayout>
      } />
      <Route path="/loading" element={<DashboardLoading />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default StudentRoutes;
