
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import RedesignedTodaysPlan from '@/components/dashboard/student/today-plan/RedesignedTodaysPlan';
import ConceptDetailPage from '@/components/dashboard/student/concepts/ConceptDetailPage';
import ConceptsLandingPage from '@/components/dashboard/student/concepts/ConceptsLandingPage';
import FlashcardsLandingPage from '@/components/dashboard/student/flashcards/FlashcardsLandingPage';
import FlashcardInteractivePage from '@/components/dashboard/student/flashcards/FlashcardInteractivePage';
import PracticeExamLandingPage from '@/components/dashboard/student/practice-exam/PracticeExamLandingPage';
import ExamTakingPage from '@/components/dashboard/student/practice-exam/ExamTakingPage';
import ExamReviewPage from '@/components/dashboard/student/practice-exam/ExamReviewPage';
import NotificationsPage from '@/components/dashboard/student/notifications/NotificationsPage';

const StudentAppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentDashboard />} />
      <Route path="/today" element={<RedesignedTodaysPlan />} />
      <Route path="/concepts" element={<ConceptsLandingPage />} />
      <Route path="/concepts/:conceptId" element={<ConceptDetailPage />} />
      <Route path="/concept/:conceptId" element={<ConceptDetailPage />} />
      <Route path="/flashcards" element={<FlashcardsLandingPage />} />
      {/* CRITICAL FIX: Only interactive route for flashcards */}
      <Route path="/flashcards/:setId/interactive" element={<FlashcardInteractivePage />} />
      <Route path="/practice-exam" element={<PracticeExamLandingPage />} />
      <Route path="/practice-exam/:examId/start" element={<ExamTakingPage />} />
      <Route path="/practice-exam/:examId/review" element={<ExamReviewPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
    </Routes>
  );
};

export default StudentAppRoutes;
