import { Routes, Route } from 'react-router-dom';
import { TodaysPlanView } from '@/components/dashboard/student/TabContentViews';
import ConceptStudyPage from '@/pages/dashboard/student/ConceptStudyPage';
import FlashcardStudyPage from '@/pages/dashboard/student/FlashcardStudyPage';
import ExamStartPage from '@/pages/dashboard/student/exam/ExamStartPage';
import ExamReviewPage from '@/pages/dashboard/student/exam/ExamReviewPage';

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
