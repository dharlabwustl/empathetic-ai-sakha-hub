
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentDashboard from '@/pages/dashboard/student/StudentDashboard';
import PremiumTodaysPlan from '@/pages/dashboard/student/redesigned/PremiumTodaysPlan';
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
import { VoiceManagerProvider } from '@/components/dashboard/student/voice/UnifiedVoiceManager';
import ContextAwareVoiceAssistant from '@/components/voice/ContextAwareVoiceAssistant';
import EnhancedFloatingVoiceIcon from '@/components/voice/EnhancedFloatingVoiceIcon';

interface PageWrapperProps {
  children: React.ReactNode;
  pageType?: 'academic' | 'concepts' | 'today' | 'flashcards' | 'formula';
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, pageType }) => {
  return (
    <VoiceManagerProvider>
      <SidebarLayout>
        {children}
        <ContextAwareVoiceAssistant pageType={pageType} />
        <EnhancedFloatingVoiceIcon />
      </SidebarLayout>
    </VoiceManagerProvider>
  );
};

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentDashboard />} />
      <Route path="/today" element={
        <PageWrapper pageType="today">
          <PremiumTodaysPlan />
        </PageWrapper>
      } />
      <Route path="/academic" element={
        <PageWrapper pageType="academic">
          <AcademicAdvisorView />
        </PageWrapper>
      } />
      <Route path="/concepts" element={
        <PageWrapper pageType="concepts">
          <ConceptsPage />
        </PageWrapper>
      } />
      <Route path="/concepts/card/:conceptId" element={
        <PageWrapper pageType="concepts">
          <ConceptDetailPage />
        </PageWrapper>
      } />
      <Route path="/concept/:conceptId" element={
        <PageWrapper pageType="concepts">
          <ConceptDetailPage />
        </PageWrapper>
      } />
      <Route path="/concepts/:conceptId" element={
        <PageWrapper pageType="concepts">
          <ConceptDetailPage />
        </PageWrapper>
      } />
      <Route path="/concepts/:conceptId/formula-lab" element={
        <PageWrapper pageType="formula">
          <FormulaLabPageWrapper />
        </PageWrapper>
      } />
      <Route path="/concept-study/:conceptId" element={
        <PageWrapper pageType="concepts">
          <ConceptStudyPage />
        </PageWrapper>
      } />
      <Route path="/flashcards" element={
        <PageWrapper pageType="flashcards">
          <FlashcardsPage />
        </PageWrapper>
      } />
      <Route path="/flashcards/:id/interactive" element={
        <PageWrapper pageType="flashcards">
          <InteractiveFlashcard />
        </PageWrapper>
      } />
      <Route path="/practice-exam" element={
        <PageWrapper>
          <PracticeExamsList />
        </PageWrapper>
      } />
      <Route path="/syllabus" element={
        <PageWrapper>
          <ExamSyllabusPage />
        </PageWrapper>
      } />
      <Route path="/previous-year-analysis" element={
        <PageWrapper>
          <PreviousYearAnalysisPage />
        </PageWrapper>
      } />
      <Route path="/feel-good-corner" element={
        <PageWrapper>
          <FeelGoodCornerPage />
        </PageWrapper>
      } />
      <Route path="/tutor" element={
        <PageWrapper>
          <TutorView />
        </PageWrapper>
      } />
      <Route path="/profile" element={
        <PageWrapper>
          <StudentProfile />
        </PageWrapper>
      } />
      <Route path="/subscription" element={
        <PageWrapper>
          <SubscriptionPage />
        </PageWrapper>
      } />
      <Route path="/loading" element={<DashboardLoading />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default StudentRoutes;
