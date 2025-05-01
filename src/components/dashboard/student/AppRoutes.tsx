
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FlashcardInteractive from '@/components/dashboard/student/flashcards/FlashcardInteractive';
import ExamTakingPage from '@/components/dashboard/student/practice-exam/ExamTakingPage';
import ExamReviewPage from '@/components/dashboard/student/practice-exam/ExamReviewPage';
import RedesignedTodaysPlan from '@/components/dashboard/student/todays-plan/RedesignedTodaysPlan';
import ConceptCardDetailPage from '@/components/dashboard/student/concepts/ConceptCardDetailPage';
import StudyPlanView from '@/pages/dashboard/student/StudyPlanView';
import NotificationsView from '@/pages/dashboard/student/NotificationsView';
import AcademicAdvisorView from '@/pages/dashboard/student/AcademicAdvisorView';
import ConceptCardsView from '@/pages/dashboard/student/ConceptCardsView';
import FlashcardsView from '@/pages/dashboard/student/FlashcardsView';
import PracticeExamsView from '@/pages/dashboard/student/PracticeExamsView';
import AiTutorView from '@/pages/dashboard/student/AiTutorView';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard/student/today" element={
        <SharedPageLayout title="Today's Plan" subtitle="Your personalized daily study schedule">
          <RedesignedTodaysPlan />
        </SharedPageLayout>
      } />
      <Route path="/dashboard/student/concepts" element={<ConceptCardsView />} />
      <Route path="/dashboard/student/concepts/card/:conceptId" element={<ConceptCardDetailPage />} />
      <Route path="/dashboard/student/flashcards" element={<FlashcardsView />} />
      <Route path="/dashboard/student/flashcards/:deckId/interactive" element={<FlashcardInteractive />} />
      <Route path="/dashboard/student/practice-exam" element={<PracticeExamsView />} />
      <Route path="/dashboard/student/practice-exam/:examId/start" element={<ExamTakingPage />} />
      <Route path="/dashboard/student/practice-exam/:examId/review" element={<ExamReviewPage />} />
      <Route path="/dashboard/student/feel-good-corner" element={
        <SharedPageLayout title="Feel Good Corner" subtitle="Take a break and recharge">
          <div className="p-4">
            <p className="text-muted-foreground">Content for Feel Good Corner will be displayed here.</p>
          </div>
        </SharedPageLayout>
      } />
      <Route path="/dashboard/student/study-plan" element={<StudyPlanView />} />
      <Route path="/dashboard/student/academic" element={<AcademicAdvisorView />} />
      <Route path="/dashboard/student/notifications" element={<NotificationsView />} />
      <Route path="/dashboard/student/tutor" element={<AiTutorView />} />
    </Routes>
  );
}
