
import { Routes, Route } from 'react-router-dom';
import TodaysPlanView from '@/components/dashboard/student/todays-plan/TodaysPlanView';
import ConceptsLandingPage from '@/components/dashboard/student/concepts/ConceptsLandingPage';
import FlashcardsLandingPage from '@/components/dashboard/student/flashcards/FlashcardsLandingPage';
import PracticeExamLandingPage from '@/components/dashboard/student/practice-exam/PracticeExamLandingPage';
import NotificationsPage from '@/components/dashboard/student/notifications/NotificationsPage';
import BacklogView from '@/components/dashboard/student/backlog/BacklogView';
import StudyPlanView from '@/pages/dashboard/student/StudyPlanView';
import ProfileView from '@/pages/dashboard/student/ProfilePage';
import BatchManagementView from '@/pages/dashboard/student/BatchManagementView';
import SubscriptionView from '@/pages/dashboard/student/SubscriptionPage';
import ConceptCardDetailPage from '@/components/dashboard/student/concepts/ConceptCardDetailPage';
import FlashcardInteractivePage from '@/pages/dashboard/student/flashcard/FlashcardInteractivePage';
import FlashcardPracticeLandingPage from '@/pages/dashboard/student/flashcard/FlashcardPracticeLandingPage';
import ExamTakingPage from '@/components/dashboard/student/practice-exam/ExamTakingPage';
import ExamReviewPage from '@/components/dashboard/student/practice-exam/ExamReviewPage';
import TutorView from '@/pages/dashboard/student/TutorView';
import AcademicAdvisorView from '@/pages/dashboard/student/AcademicAdvisorView';
import FeelGoodCornerView from '@/pages/dashboard/student/FeelGoodCornerView';
import NotificationsView from '@/components/dashboard/student/notifications/NotificationsView';
import ConceptCardsView from '@/components/dashboard/student/concepts/ConceptCardsView';
import FlashcardsView from '@/components/dashboard/student/flashcards/FlashcardsView';
import PracticeExamsView from '@/components/dashboard/student/practice-exam/PracticeExamsView';
import ConceptStudyLandingPage from '@/pages/dashboard/student/concept/ConceptStudyLandingPage';
import EnhancedFlashcardPractice from '@/components/dashboard/student/flashcards/EnhancedFlashcardPractice';
import ConceptStudyPage from '@/components/dashboard/student/concepts/ConceptStudyPage';

export default function StudentRoutes() {
  return (
    <Routes>
      <Route path="/today" element={<TodaysPlanView />} />
      <Route path="/studyplan" element={<StudyPlanView />} />
      <Route path="/study-plan" element={<StudyPlanView />} />
      
      {/* Concepts routes */}
      <Route path="/concepts" element={<ConceptCardsView />} />
      <Route path="/concepts/landing" element={<ConceptsLandingPage />} />
      <Route path="/concepts/:subject?" element={<ConceptsLandingPage />} />
      <Route path="/concepts/card/:conceptId" element={<ConceptCardDetailPage />} />
      <Route path="/concepts/study-landing/:conceptId" element={<ConceptStudyLandingPage />} />
      <Route path="/concepts/:conceptId/study" element={<ConceptStudyPage />} />
      
      {/* Flashcards routes */}
      <Route path="/flashcards" element={<FlashcardsView />} />
      <Route path="/flashcards/landing" element={<FlashcardsLandingPage />} />
      <Route path="/flashcards/:subject?" element={<FlashcardsLandingPage />} />
      <Route path="/flashcards/:deckId/interactive" element={<FlashcardInteractivePage />} />
      <Route path="/flashcards/practice" element={<FlashcardPracticeLandingPage />} />
      <Route path="/flashcards/:flashcardId/practice" element={<EnhancedFlashcardPractice />} />
      
      {/* Practice exam routes */}
      <Route path="/practice" element={<PracticeExamsView />} />
      <Route path="/practice/:subject?" element={<PracticeExamLandingPage />} />
      <Route path="/practice-exam/:examId/start" element={<ExamTakingPage />} />
      <Route path="/practice-exam/:examId/review" element={<ExamReviewPage />} />
      
      {/* Other routes */}
      <Route path="/notifications" element={<NotificationsView />} />
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
