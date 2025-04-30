
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth & General Pages
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Student Dashboard & Pages
const StudentDashboard = lazy(() => import('./pages/dashboard/StudentDashboard'));
const ConceptsPage = lazy(() => import('./pages/dashboard/student/ConceptsPage'));
const ConceptStudyPage = lazy(() => import('./pages/dashboard/student/ConceptStudyPage'));
const FlashcardsPage = lazy(() => import('./pages/dashboard/student/FlashcardsPage'));
const FlashcardDetailsPage = lazy(() => import('./pages/dashboard/student/FlashcardDetailsPage'));
const PracticeExamsList = lazy(() => import('./pages/dashboard/student/PracticeExamsList'));
const ExamStartPage = lazy(() => import('./pages/dashboard/student/ExamStartPage'));
const ExamReviewPage = lazy(() => import('./pages/dashboard/student/ExamReviewPage'));
const TutorView = lazy(() => import('./pages/dashboard/student/TutorView'));
const AcademicAdvisorView = lazy(() => import('./pages/dashboard/student/AcademicAdvisorView'));
const FeelGoodCornerView = lazy(() => import('./pages/dashboard/student/FeelGoodCornerView'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading...</div>}>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Student Dashboard Routes */}
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          
          {/* Student Content Routes */}
          <Route path="/dashboard/student/concepts" element={<ConceptsPage />} />
          <Route path="/dashboard/student/concepts/:conceptId" element={<ConceptStudyPage />} />
          <Route path="/dashboard/student/flashcards" element={<FlashcardsPage />} />
          <Route path="/dashboard/student/flashcards/:flashcardId" element={<FlashcardDetailsPage />} />
          <Route path="/dashboard/student/practice-exam" element={<PracticeExamsList />} />
          <Route path="/dashboard/student/exams/:id/start" element={<ExamStartPage />} />
          <Route path="/dashboard/student/exams/:id/review" element={<ExamReviewPage />} />
          <Route path="/dashboard/student/tutor" element={<TutorView />} />
          <Route path="/dashboard/student/academic" element={<AcademicAdvisorView />} />
          <Route path="/dashboard/student/wellness" element={<FeelGoodCornerView />} />
          
          {/* Default Routes */}
          <Route path="/" element={<Navigate to="/dashboard/student" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
