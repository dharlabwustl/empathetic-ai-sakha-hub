
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FlashcardInteractive from '@/components/dashboard/student/flashcards/FlashcardInteractive';
import ExamTakingPage from '@/components/dashboard/student/practice-exam/ExamTakingPage';
import ExamReviewPage from '@/components/dashboard/student/practice-exam/ExamReviewPage';
import RedesignedTodaysPlan from '@/components/dashboard/student/todays-plan/RedesignedTodaysPlan';
import { useStudentDashboardData } from '@/hooks/useStudentDashboardData';

export default function AppRoutes() {
  const { dashboardData } = useStudentDashboardData();
  
  return (
    <Routes>
      <Route path="/dashboard/student/today" element={<RedesignedTodaysPlan userProfile={dashboardData?.userProfile} />} />
      <Route path="/dashboard/student/flashcards/:deckId/interactive" element={<FlashcardInteractive />} />
      <Route path="/dashboard/student/practice-exam/:examId/start" element={<ExamTakingPage />} />
      <Route path="/dashboard/student/practice-exam/:examId/review" element={<ExamReviewPage />} />
    </Routes>
  );
}
