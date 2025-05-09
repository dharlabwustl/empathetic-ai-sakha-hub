
import React from 'react';
import { Route } from 'react-router-dom';
import PracticeExamsSection from '@/components/dashboard/student/practice-exam/PracticeExamsSection';
import ExamTakingPage from '@/components/dashboard/student/practice-exam/ExamTakingPage';
import ExamReviewPage from '@/components/dashboard/student/practice-exam/ExamReviewPage';

export const practiceExamRoutes = (
  <>
    {/* Practice exam routes */}
    <Route path="/dashboard/student/practice-exam" element={<PracticeExamsSection />} />
    <Route path="/dashboard/student/practice-exam/:examId/start" element={<ExamTakingPage />} />
    <Route path="/dashboard/student/practice-exam/:examId/review" element={<ExamReviewPage />} />
  </>
);
