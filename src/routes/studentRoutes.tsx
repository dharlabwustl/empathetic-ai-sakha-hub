
import { Routes, Route } from 'react-router-dom';
import TodaysPlanView from '@/components/dashboard/student/todays-plan/TodaysPlanView';
import ConceptsView from '@/components/dashboard/student/concepts/ConceptsView';
import FlashcardsView from '@/components/dashboard/student/flashcards/FlashcardsView';
import PracticeView from '@/components/dashboard/student/practice/PracticeView';
import BacklogView from '@/components/dashboard/student/backlog/BacklogView';
import StudyPlanView from '@/components/dashboard/student/studyplan/StudyPlanView';
import ProfilePage from '@/pages/dashboard/student/ProfilePage';
import BatchManagementView from '@/pages/dashboard/student/BatchManagementView';
import SubscriptionPage from '@/pages/dashboard/student/SubscriptionPage';
import FeelGoodCornerPage from '@/pages/dashboard/student/FeelGoodCornerPage';
import ConceptStudyPage from '@/pages/dashboard/student/concepts/ConceptStudyPage';
import FlashcardPracticePage from '@/components/dashboard/student/flashcards/FlashcardPracticePage';
import ExamAttemptPage from '@/components/dashboard/student/exams/ExamAttemptPage';
import ExamReviewPage from '@/pages/dashboard/student/exam/ExamReviewPage';
import FlashcardStudyPage from '@/components/dashboard/student/flashcards/FlashcardStudyPage';
import ExamStartPage from '@/pages/dashboard/student/exam/ExamStartPage';

export default function StudentRoutes() {
  return (
    <Routes>
      <Route path="/today" element={<TodaysPlanView />} />
      <Route path="/studyplan" element={<StudyPlanView />} />
      <Route path="/concepts" element={<ConceptsView />} />
      <Route path="/concepts/:subject" element={<ConceptsView />} />
      <Route path="/concepts/study/:conceptId" element={<ConceptStudyPage />} />
      
      <Route path="/flashcards" element={<FlashcardsView />} />
      <Route path="/flashcards/:subject" element={<FlashcardsView />} />
      <Route path="/flashcards/practice/:cardId" element={<FlashcardPracticePage />} />
      <Route path="/flashcards/study/:deckId" element={<FlashcardStudyPage />} />
      
      <Route path="/practice" element={<PracticeView />} />
      <Route path="/practice/:subject" element={<PracticeView />} />
      <Route path="/practice-exam" element={<PracticeView />} />
      <Route path="/exams/attempt/:examId" element={<ExamAttemptPage />} />
      <Route path="/exams/review/:examId" element={<ExamReviewPage />} />
      <Route path="/exams/start/:examId" element={<ExamStartPage />} />
      
      <Route path="/backlog" element={<BacklogView />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/batch" element={<BatchManagementView />} />
      <Route path="/subscription" element={<SubscriptionPage />} />
      <Route path="/wellness" element={<FeelGoodCornerPage />} />
    </Routes>
  );
}
