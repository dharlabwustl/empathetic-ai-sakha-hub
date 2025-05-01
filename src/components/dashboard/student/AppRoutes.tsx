
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FlashcardInteractive from '@/components/dashboard/student/flashcards/FlashcardInteractive';
import ExamTakingPage from '@/components/dashboard/student/practice-exam/ExamTakingPage';
import ExamReviewPage from '@/components/dashboard/student/practice-exam/ExamReviewPage';
import RedesignedTodaysPlan from '@/components/dashboard/student/todays-plan/RedesignedTodaysPlan';
import { useStudentDashboardData } from '@/hooks/useStudentDashboardData';
import ConceptCardDetailPage from '@/components/dashboard/student/concepts/ConceptCardDetailPage';
import ConceptCardsView from '@/components/dashboard/student/concepts/ConceptCardsView';
import FlashcardsView from '@/components/dashboard/student/flashcards/FlashcardsView';
import PracticeExamsView from '@/components/dashboard/student/practice-exam/PracticeExamsView';
import FeelGoodCornerView from '@/pages/dashboard/student/FeelGoodCornerView';
import StudyPlanView from '@/pages/dashboard/student/StudyPlanView';
import NotificationsView from '@/components/dashboard/student/notifications/NotificationsView';
import AcademicAdvisorView from '@/pages/dashboard/student/AcademicAdvisorView';
import TutorView from '@/pages/dashboard/student/TutorView';
import ConceptStudyLandingPage from '@/pages/dashboard/student/concept/ConceptStudyLandingPage';

export default function AppRoutes() {
  const { dashboardData } = useStudentDashboardData();
  
  return (
    <Routes>
      <Route path="/dashboard/student/today" element={<RedesignedTodaysPlan />} />
      <Route path="/dashboard/student/concepts" element={<ConceptCardsView />} />
      <Route path="/dashboard/student/concepts/card/:conceptId" element={<ConceptCardDetailPage />} />
      <Route path="/dashboard/student/concepts/study-landing/:conceptId" element={<ConceptStudyLandingPage />} />
      <Route path="/dashboard/student/flashcards" element={<FlashcardsView />} />
      <Route path="/dashboard/student/flashcards/:deckId/interactive" element={<FlashcardInteractive />} />
      <Route path="/dashboard/student/practice-exam" element={<PracticeExamsView />} />
      <Route path="/dashboard/student/practice-exam/:examId/start" element={<ExamTakingPage />} />
      <Route path="/dashboard/student/practice-exam/:examId/review" element={<ExamReviewPage />} />
      <Route path="/dashboard/student/feel-good-corner" element={<FeelGoodCornerView />} />
      <Route path="/dashboard/student/study-plan" element={<StudyPlanView />} />
      <Route path="/dashboard/student/academic" element={<AcademicAdvisorView />} />
      <Route path="/dashboard/student/notifications" element={<NotificationsView />} />
      <Route path="/dashboard/student/tutor" element={<TutorView />} />
    </Routes>
  );
}
