
import { Routes, Route } from 'react-router-dom';
import TodaysPlanView from '@/components/dashboard/student/todays-plan/TodaysPlanView';
import FlashcardsView from '@/pages/dashboard/student/FlashcardsView';
import ConceptCardsView from '@/pages/dashboard/student/ConceptCardsView';
import AcademicAdvisorView from '@/pages/dashboard/student/AcademicAdvisorView';
import AiTutorView from '@/pages/dashboard/student/AiTutorView';
import ConceptCardDetailPage from '@/components/dashboard/student/concepts/ConceptCardDetailPage';
import FlashcardInteractivePage from '@/pages/dashboard/student/flashcard/FlashcardInteractivePage';
import ExamTakingPage from '@/components/dashboard/student/practice-exam/ExamTakingPage';
import ExamReviewPage from '@/components/dashboard/student/practice-exam/ExamReviewPage';
import NotificationsView from '@/components/dashboard/student/notifications/NotificationsView';
import BacklogView from '@/components/dashboard/student/backlog/BacklogView';
import StudyPlanView from '@/components/dashboard/student/studyplan/StudyPlanView';
import ProfileView from '@/pages/dashboard/student/ProfilePage';
import BatchManagementView from '@/pages/dashboard/student/BatchManagementView';
import SubscriptionView from '@/pages/dashboard/student/SubscriptionPage';
import PracticeExamsView from '@/pages/dashboard/student/PracticeExamsView';
import FeelGoodCornerView from '@/pages/dashboard/student/FeelGoodCornerView';

export default function StudentRoutes() {
  return (
    <Routes>
      <Route path="/today" element={<TodaysPlanView />} />
      <Route path="/studyplan" element={<StudyPlanView />} />
      
      <Route path="/concepts" element={<ConceptCardsView />} />
      <Route path="/concepts/:subject?" element={<ConceptCardsView />} />
      <Route path="/concepts/card/:conceptId" element={<ConceptCardDetailPage />} />
      
      <Route path="/flashcards" element={<FlashcardsView />} />
      <Route path="/flashcards/:subject?" element={<FlashcardsView />} />
      <Route path="/flashcards/:deckId/interactive" element={<FlashcardInteractivePage />} />
      
      <Route path="/practice" element={<PracticeExamsView />} />
      <Route path="/practice/:subject?" element={<PracticeExamsView />} />
      <Route path="/practice-exam/:examId/start" element={<ExamTakingPage />} />
      <Route path="/practice-exam/:examId/review" element={<ExamReviewPage />} />
      
      <Route path="/notifications" element={<NotificationsView />} />
      <Route path="/backlog" element={<BacklogView />} />
      <Route path="/profile" element={<ProfileView />} />
      <Route path="/batch" element={<BatchManagementView />} />
      <Route path="/subscription" element={<SubscriptionView />} />
      <Route path="/tutor" element={<AiTutorView />} />
      <Route path="/academic" element={<AcademicAdvisorView />} />
      <Route path="/wellness" element={<FeelGoodCornerView />} />
    </Routes>
  );
}
