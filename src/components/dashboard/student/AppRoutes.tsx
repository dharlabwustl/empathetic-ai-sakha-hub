
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import RedesignedTodaysPlan from '@/components/dashboard/student/todays-plan/RedesignedTodaysPlan';
import ConceptDetailPage from '@/pages/dashboard/student/ConceptDetailPage';
import ConceptsLandingPage from '@/components/dashboard/student/concepts/ConceptsLandingPage';
import FlashcardsLandingPage from '@/components/dashboard/student/flashcards/FlashcardsLandingPage';
import PracticeExamLandingPage from '@/components/dashboard/student/practice-exam/PracticeExamLandingPage';
import NotificationsPage from '@/components/dashboard/student/notifications/NotificationsPage';

const StudentAppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentDashboard />} />
      <Route path="/today" element={<RedesignedTodaysPlan />} />
      <Route path="/concepts" element={<ConceptsLandingPage />} />
      <Route path="/concepts/:conceptId" element={<ConceptDetailPage />} />
      <Route path="/flashcards" element={<FlashcardsLandingPage />} />
      <Route path="/practice-exam" element={<PracticeExamLandingPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
    </Routes>
  );
};

export default StudentAppRoutes;
