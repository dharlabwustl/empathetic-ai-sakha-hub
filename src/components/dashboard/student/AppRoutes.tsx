
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentDashboard from '@/pages/dashboard/student/StudentDashboard';
import ConceptCardsView from '@/pages/dashboard/student/ConceptCardsView';
import FlashcardsView from '@/pages/dashboard/student/FlashcardsView';
import PracticeExamsView from '@/pages/dashboard/student/PracticeExamsView';
import NotificationsView from '@/components/dashboard/student/notifications/NotificationsView';
import AcademicAdvisorView from '@/pages/dashboard/student/AcademicAdvisorView';
import AiTutorView from '@/pages/dashboard/student/AiTutorView';
import FlashcardInteractivePage from '@/pages/dashboard/student/flashcard/FlashcardInteractivePage';
import ConceptDetailPage from '@/pages/dashboard/student/ConceptDetailPage';
import FeelGoodCornerView from '@/pages/dashboard/student/FeelGoodCornerView';
import ConceptStudyPage from '@/pages/dashboard/student/ConceptStudyPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main dashboard routes */}
      <Route path="/dashboard/student" element={<StudentDashboard />} />
      <Route path="/dashboard/student/:tab" element={<StudentDashboard />} />
      
      {/* Feature-specific routes */}
      <Route path="/dashboard/student/concepts" element={<ConceptCardsView />} />
      <Route path="/dashboard/student/concepts/:subject" element={<ConceptCardsView />} />
      <Route path="/dashboard/student/concepts/card/:id" element={<ConceptDetailPage />} />
      <Route path="/dashboard/student/concepts/study/:conceptId" element={<ConceptStudyPage />} />
      
      <Route path="/dashboard/student/flashcards" element={<FlashcardsView />} />
      <Route path="/dashboard/student/flashcards/:deckId/interactive" element={<FlashcardInteractivePage />} />
      
      <Route path="/dashboard/student/practice" element={<PracticeExamsView />} />
      <Route path="/dashboard/student/notifications" element={<NotificationsView />} />
      <Route path="/dashboard/student/academic" element={<AcademicAdvisorView />} />
      <Route path="/dashboard/student/tutor" element={<AiTutorView />} />
      <Route path="/dashboard/student/wellness" element={<FeelGoodCornerView />} />
    </Routes>
  );
};

export default AppRoutes;
