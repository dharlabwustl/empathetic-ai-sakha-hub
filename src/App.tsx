
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import LandingPage from '@/pages/LandingPage';
import SignupPage from '@/pages/SignupPage';
import LoginPage from '@/pages/LoginPage';
import ConceptsPage from '@/pages/dashboard/student/ConceptsPage';
import FlashcardsPage from '@/pages/dashboard/student/FlashcardsPage';
import PracticeExamPage from '@/pages/dashboard/student/PracticeExamPage';
import PracticeExamStartPage from '@/pages/dashboard/student/PracticeExamStartPage';
import PracticeExamReviewPage from '@/pages/dashboard/student/PracticeExamReviewPage';
import ProfilePage from '@/pages/dashboard/student/ProfilePage';
import StudyPlanPage from '@/pages/dashboard/student/StudyPlanPage';
import FeelGoodCornerPage from '@/pages/dashboard/student/FeelGoodCornerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Student Dashboard Routes */}
        <Route path="/dashboard/student/:tab?" element={<StudentDashboard />} />
        <Route path="/dashboard/student/concepts" element={<ConceptsPage />} />
        <Route path="/dashboard/student/concepts/all" element={<ConceptsPage />} />
        <Route path="/dashboard/student/concepts/:conceptId" element={<div>Concept Detail Page</div>} />
        <Route path="/dashboard/student/concepts/analytics" element={<div>Concept Analytics Page</div>} />
        
        <Route path="/dashboard/student/flashcards" element={<FlashcardsPage />} />
        <Route path="/dashboard/student/flashcards/:flashcardId" element={<div>Flashcard Detail Page</div>} />
        <Route path="/dashboard/student/flashcards/analytics" element={<div>Flashcard Analytics Page</div>} />
        
        <Route path="/dashboard/student/practice-exam" element={<PracticeExamPage />} />
        <Route path="/dashboard/student/practice-exam/:examId/start" element={<PracticeExamStartPage />} />
        <Route path="/dashboard/student/practice-exam/:examId/review" element={<PracticeExamReviewPage />} />
        <Route path="/dashboard/student/practice-exam/analytics" element={<div>Practice Exam Analytics Page</div>} />
        
        <Route path="/dashboard/student/study-plan" element={<StudyPlanPage />} />
        <Route path="/dashboard/student/profile" element={<ProfilePage />} />
        <Route path="/dashboard/student/wellness" element={<FeelGoodCornerPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/*" element={<div>Admin Dashboard</div>} />
        
        {/* 404 Page */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
