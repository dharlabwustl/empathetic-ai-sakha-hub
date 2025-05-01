
import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import TodaysPlanView from '@/pages/dashboard/student/TodaysPlanView';
import ConceptCardsPage from '@/pages/dashboard/student/ConceptCardsPage';
import FlashcardsPage from '@/pages/dashboard/student/FlashcardsPage';
import FlashcardInteractivePage from '@/pages/dashboard/student/FlashcardInteractivePage';
import PracticeExamsPage from '@/pages/dashboard/student/PracticeExamsPage';
import NotificationsPage from '@/pages/dashboard/student/NotificationsPage';

const studentRoutes: RouteObject[] = [
  {
    path: 'student',
    element: <StudentDashboard />,
    children: []
  },
  {
    path: 'student/overview',
    element: <StudentDashboard />
  },
  {
    path: 'student/today',
    element: <TodaysPlanView />
  },
  {
    path: 'student/concepts',
    element: <ConceptCardsPage />
  },
  {
    path: 'student/concepts/card/:cardId',
    element: <div>Concept Card Detail Page</div>
  },
  {
    path: 'student/flashcards',
    element: <FlashcardsPage />
  },
  {
    path: 'student/flashcards/:deckId/interactive',
    element: <FlashcardInteractivePage />
  },
  {
    path: 'student/practice-exam',
    element: <PracticeExamsPage />
  },
  {
    path: 'student/practice-exam/:examId/start',
    element: <div>Practice Exam Start Page</div>
  },
  {
    path: 'student/practice-exam/:examId/review',
    element: <div>Practice Exam Review Page</div>
  },
  {
    path: 'student/notifications',
    element: <NotificationsPage />
  },
  {
    path: 'student/*',
    element: <Navigate to="/dashboard/student/overview" replace />
  }
];

export default studentRoutes;
