
import { Routes, Route } from 'react-router-dom';
import TodaysPlanView from '@/components/dashboard/student/todays-plan/TodaysPlanView';
import ConceptsLandingPage from '@/components/dashboard/student/concepts/ConceptsLandingPage';
import FlashcardsLandingPage from '@/components/dashboard/student/flashcards/FlashcardsLandingPage';
import PracticeExamLandingPage from '@/components/dashboard/student/practice-exam/PracticeExamLandingPage';
import NotificationsPage from '@/components/dashboard/student/notifications/NotificationsPage';
import BacklogView from '@/components/dashboard/student/backlog/BacklogView';
import StudyPlanView from '@/components/dashboard/student/studyplan/StudyPlanView';
import ProfileView from '@/pages/dashboard/student/ProfilePage';
import BatchManagementView from '@/pages/dashboard/student/BatchManagementView';
import SubscriptionView from '@/pages/dashboard/student/SubscriptionPage';
import ConceptCardDetailPage from '@/components/dashboard/student/concepts/ConceptCardDetailPage';
import FlashcardInteractivePage from '@/pages/dashboard/student/flashcard/FlashcardInteractivePage';
import ExamTakingPage from '@/components/dashboard/student/practice-exam/ExamTakingPage';
import ExamReviewPage from '@/components/dashboard/student/practice-exam/ExamReviewPage';
import TutorView from '@/pages/dashboard/student/TutorView';
import AcademicAdvisorView from '@/pages/dashboard/student/AcademicAdvisorView';
import FeelGoodCornerView from '@/pages/dashboard/student/FeelGoodCornerView';

export default function StudentRoutes() {
  return (
    <Routes>
      <Route path="/today" element={<TodaysPlanView />} />
      <Route path="/studyplan" element={<StudyPlanView />} />
      <Route path="/concepts" element={<ConceptsLandingPage />} />
      <Route path="/concepts/:subject?" element={<ConceptsLandingPage />} />
      <Route path="/concepts/card/:conceptId" element={<ConceptCardDetailPage />} />
      <Route path="/flashcards" element={<FlashcardsLandingPage />} />
      <Route path="/flashcards/:subject?" element={<FlashcardsLandingPage />} />
      <Route path="/flashcards/:deckId/interactive" element={<FlashcardInteractivePage />} />
      <Route path="/practice" element={<PracticeExamLandingPage />} />
      <Route path="/practice/:subject?" element={<PracticeExamLandingPage />} />
      <Route path="/practice-exam/:examId/start" element={<ExamTakingPage />} />
      <Route path="/practice-exam/:examId/review" element={<ExamReviewPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/backlog" element={<BacklogView />} />
      <Route path="/profile" element={<ProfileView />} />
      <Route path="/batch" element={<BatchManagementView />} />
      <Route path="/subscription" element={<SubscriptionView />} />
      <Route path="/tutor" element={<TutorView />} />
      <Route path="/academic" element={<AcademicAdvisorView />} />
      <Route path="/wellness" element={<FeelGoodCornerView />} />
    </Routes>
  );
}
