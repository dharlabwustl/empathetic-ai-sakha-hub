
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
import ConceptStudyPage from '@/components/dashboard/student/concepts/ConceptStudyPage';
import FlashcardPracticePage from '@/components/dashboard/student/flashcards/FlashcardPracticePage';
import ExamAttemptPage from '@/components/dashboard/student/exams/ExamAttemptPage';
import ExamReviewPage from '@/components/dashboard/student/exams/ExamReviewPage';

export default function StudentRoutes() {
  return (
    <Routes>
      <Route path="/today" element={<TodaysPlanView />} />
      <Route path="/studyplan" element={<StudyPlanView />} />
      <Route path="/concepts/:subject?" element={<ConceptsView />} />
      <Route path="/flashcards/:subject?" element={<FlashcardsView />} />
      <Route path="/practice/:subject?" element={<PracticeView />} />
      <Route path="/backlog" element={<BacklogView />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/batch" element={<BatchManagementView />} />
      <Route path="/subscription" element={<SubscriptionPage />} />
      
      {/* Landing pages with topic-based routing */}
      <Route path="/concepts/study/:topicName" element={<ConceptStudyPage />} />
      <Route path="/flashcards/practice/:topicName" element={<FlashcardPracticePage />} />
      <Route path="/exams/attempt/:examId" element={<ExamAttemptPage />} />
      <Route path="/exams/review/:examId" element={<ExamReviewPage />} />
      
      {/* Feel Good Corner with enhanced sections */}
      <Route path="/wellness" element={<FeelGoodCornerPage />} />
    </Routes>
  );
}
