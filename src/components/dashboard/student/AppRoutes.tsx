
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import EnhancedTodaysPlan from '@/components/dashboard/student/todays-plan/EnhancedTodaysPlan';
import ConceptDetailPage from '@/components/dashboard/student/concepts/ConceptDetailPage';
import ConceptsLandingPage from '@/components/dashboard/student/concepts/ConceptsLandingPage';
import FlashcardLandingPage from '@/components/dashboard/student/flashcards/FlashcardLandingPage';
import FlashcardInteractive from '@/components/dashboard/student/flashcards/FlashcardInteractive';
import PracticeExamLandingPage from '@/components/dashboard/student/practice-exam/PracticeExamLandingPage';
import ExamTakingPage from '@/components/dashboard/student/practice-exam/ExamTakingPage';
import ExamReviewPage from '@/components/dashboard/student/practice-exam/ExamReviewPage';
import NotificationsPage from '@/components/dashboard/student/notifications/NotificationsPage';

const StudentAppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentDashboard />} />
      <Route path="/today" element={<EnhancedTodaysPlan />} />
      <Route path="/concepts" element={<ConceptsLandingPage />} />
      <Route path="/concepts/:conceptId" element={<ConceptDetailPage />} />
      <Route path="/concept/:conceptId" element={<ConceptDetailPage />} />
      <Route path="/flashcards" element={<FlashcardLandingPage />} />
      <Route path="/flashcards/:setId/interactive" element={<FlashcardInteractive />} />
      <Route path="/practice-exam" element={<PracticeExamLandingPage />} />
      <Route path="/practice-exam/:examId/start" element={<ExamTakingPage />} />
      <Route path="/practice-exam/:examId/review" element={<ExamReviewPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
    </Routes>
  );
};

export default StudentAppRoutes;
