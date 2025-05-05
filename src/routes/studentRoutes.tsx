
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TodaysPlanView from '@/components/dashboard/student/todays-plan/TodaysPlanView';
import ConceptsLandingPage from '@/components/dashboard/student/concepts/ConceptsLandingPage';
import FlashcardsLandingPage from '@/components/dashboard/student/flashcards/FlashcardsLandingPage';
import PracticeExamLandingPage from '@/components/dashboard/student/practice-exam/PracticeExamLandingPage';
import NotificationsPage from '@/components/dashboard/student/notifications/NotificationsPage';
import BacklogView from '@/components/dashboard/student/backlog/BacklogView';
import StudyPlanView from '@/pages/dashboard/student/StudyPlanView';
import ProfilePage from '@/pages/student/ProfilePage';
import BatchManagementView from '@/pages/dashboard/student/BatchManagementView';
import SubscriptionView from '@/pages/dashboard/student/SubscriptionPage';
import ConceptCardDetailPage from '@/components/dashboard/student/concepts/ConceptCardDetailPage';
import ExamTakingPage from '@/components/dashboard/student/practice-exam/ExamTakingPage';
import ExamReviewPage from '@/components/dashboard/student/practice-exam/ExamReviewPage';
import TutorView from '@/pages/dashboard/student/TutorView';
import FeelGoodCornerView from '@/pages/dashboard/student/FeelGoodCornerView';
import { NotificationsView } from '@/components/dashboard/student/notifications/NotificationsView';
import ConceptCardsView from '@/components/dashboard/student/concepts/ConceptCardsView';
import FlashcardsView from '@/components/dashboard/student/flashcards/FlashcardsView';
import PracticeExamsView from '@/components/dashboard/student/practice-exam/PracticeExamsView';
import ConceptStudyLandingPage from '@/pages/dashboard/student/concept/ConceptStudyLandingPage';
import EnhancedFlashcardPractice from '@/components/dashboard/student/flashcards/EnhancedFlashcardPractice';
import FlashcardInteractive from '@/components/dashboard/student/flashcards/FlashcardInteractive';
import FlashcardDetailsPage from '@/pages/dashboard/student/FlashcardDetailsPage';
import InteractiveFlashcardBrowser from '@/components/flashcards/InteractiveFlashcardBrowser';
import StudentProfile from '@/pages/dashboard/student/StudentProfile';
import ConceptCardStudyPage from '@/pages/dashboard/student/concept/ConceptCardStudyPage';
import AcademicAdvisor from '@/pages/dashboard/student/AcademicAdvisor';
import PreviousYearAnalysisPage from '@/components/dashboard/student/previous-year-analysis/PreviousYearAnalysisPage';
import SyllabusPage from '@/components/dashboard/student/syllabus/SyllabusPage';

export default function StudentRoutes() {
  return (
    <Routes>
      <Route path="/today" element={<TodaysPlanView />} />
      <Route path="/studyplan" element={<StudyPlanView />} />
      <Route path="/study-plan" element={<StudyPlanView />} />
      <Route path="/profile" element={<StudentProfile />} />
      
      {/* Syllabus route */}
      <Route path="/syllabus" element={<SyllabusPage />} />
      
      {/* Concepts routes - Direct linking to concept card detail page */}
      <Route path="/concepts" element={<ConceptCardsView />} />
      <Route path="/concepts/landing" element={<ConceptsLandingPage />} />
      <Route path="/concepts/:subject?" element={<ConceptsLandingPage />} />
      <Route path="/concepts/card/:conceptId" element={<ConceptCardDetailPage />} />
      <Route path="/concepts/study-landing/:conceptId" element={<ConceptStudyLandingPage />} />
      <Route path="/concepts/:conceptId/study" element={<ConceptCardStudyPage />} />
      
      {/* Flashcards routes - simplified and direct */}
      <Route path="/flashcards" element={<FlashcardsView />} />
      <Route path="/flashcards/landing" element={<FlashcardsLandingPage />} />
      <Route path="/flashcards/:subject?" element={<FlashcardsLandingPage />} />
      <Route path="/flashcards/:flashcardId/interactive" element={<FlashcardInteractive />} />
      <Route path="/flashcards/:flashcardId" element={<FlashcardDetailsPage />} />
      <Route path="/flashcards/:flashcardId/browse" element={<InteractiveFlashcardBrowser />} />
      <Route path="/flashcards/:flashcardId/practice" element={<EnhancedFlashcardPractice />} />
      
      {/* Practice exam routes */}
      <Route path="/practice" element={<PracticeExamsView />} />
      <Route path="/practice/:subject?" element={<PracticeExamLandingPage />} />
      <Route path="/practice-exam/:examId/start" element={<ExamTakingPage />} />
      <Route path="/practice-exam/:examId/review" element={<ExamReviewPage />} />
      
      {/* Previous Year Analysis route */}
      <Route path="/previous-year-analysis" element={<PreviousYearAnalysisPage />} />
      
      {/* Other routes */}
      <Route path="/notifications" element={<NotificationsView />} />
      <Route path="/backlog" element={<BacklogView />} />
      <Route path="/batch" element={<BatchManagementView />} />
      <Route path="/subscription" element={<SubscriptionView />} />
      <Route path="/tutor" element={<TutorView />} />
      <Route path="/ai-tutor" element={<TutorView />} />
      <Route path="/academic" element={<AcademicAdvisor />} />
      <Route path="/wellness" element={<FeelGoodCornerView />} />
      <Route path="/feel-good-corner" element={<FeelGoodCornerView />} />
    </Routes>
  );
}
