
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import SignUp from '@/pages/SignUp';
import NotFound from '@/pages/NotFound';
import StudentDashboard from '@/pages/dashboard/student/StudentDashboard';
import FeelGoodCornerView from '@/pages/dashboard/student/FeelGoodCornerView';
import { AdminAuthProvider } from '@/contexts/auth/AdminAuthContext';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminRouteGuard from '@/components/admin/AdminRouteGuard';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import TodaysPlanView from '@/pages/dashboard/student/TodaysPlanView';
import ConceptStudyPage from '@/pages/dashboard/student/concept/ConceptStudyPage';
import FlashcardPracticePage from '@/pages/dashboard/student/flashcard/FlashcardPracticePage';
import LoadingScreen from '@/components/common/LoadingScreen';
import { ThemeProvider } from './components/theme-provider';
import AppRoutes from './components/dashboard/student/AppRoutes';
import ConceptCardDetailPage from './components/dashboard/student/concepts/ConceptCardDetailPage';
import ExamTakingPage from './components/dashboard/student/practice-exam/ExamTakingPage';
import ExamReviewPage from './components/dashboard/student/practice-exam/ExamReviewPage';
import FlashcardInteractivePage from './pages/dashboard/student/flashcard/FlashcardInteractivePage';
import PostLoginPrompt from './pages/dashboard/PostLoginPrompt';
import StudyPlanCreation from './pages/StudyPlanCreation';
import ConceptCardStudyPage from './pages/dashboard/student/concept/ConceptCardStudyPage';
import Login from './pages/Login';
import EnhancedFlashcardPage from './pages/dashboard/student/flashcards/EnhancedFlashcardPage';
import WelcomeToPrepr from './pages/signup/WelcomeToPrepr';
import ProfilePage from './pages/student/ProfilePage';
import StudyPlanView from './pages/dashboard/student/StudyPlanView';
import TutorView from './pages/dashboard/student/TutorView';
import AcademicAdvisorView from './pages/dashboard/student/AcademicAdvisorView';
import FlashcardPracticeLandingPage from './pages/dashboard/student/flashcard/FlashcardPracticeLandingPage';
import ConceptStudyLandingPage from './pages/dashboard/student/concept/ConceptStudyLandingPage';
import ConceptsLandingPage from './components/dashboard/student/concepts/ConceptsLandingPage';
import FlashcardsLandingPage from './components/dashboard/student/flashcards/FlashcardsLandingPage';
import EnhancedFlashcardPractice from './components/dashboard/student/flashcards/EnhancedFlashcardPractice';

const AdminDashboard = React.lazy(() => import('@/pages/admin/AdminDashboard'));

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="prepzr-ui-theme">
      <BrowserRouter>
        <AuthProvider>
          <AdminAuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />

              {/* Post-signup flow */}
              <Route path="/welcome" element={<WelcomeToPrepr />} />
              <Route path="/study-plan-creation" element={<StudyPlanCreation />} />
              <Route path="/welcome-back" element={<PostLoginPrompt />} />

              {/* Student routes */}
              <Route path="/dashboard/student" element={<StudentDashboard />} />
              <Route path="/dashboard/student/:tab" element={<StudentDashboard />} />
              <Route path="/dashboard/student/today" element={<TodaysPlanView />} />
              <Route path="/dashboard/student/feel-good-corner" element={<FeelGoodCornerView />} />
              <Route path="/dashboard/student/profile" element={<ProfilePage />} />
              
              {/* Concept routes */}
              <Route path="/dashboard/student/concepts/card/:conceptId" element={<ConceptCardDetailPage />} />
              <Route path="/dashboard/student/concepts/study/:conceptId" element={<ConceptStudyPage />} />
              <Route path="/dashboard/student/concepts/:conceptId/study" element={<ConceptStudyPage />} />
              <Route path="/dashboard/student/concepts/study-landing/:conceptId" element={<ConceptStudyLandingPage />} />
              <Route path="/dashboard/student/concepts/landing" element={<ConceptsLandingPage />} />
              
              {/* Flashcard routes */}
              <Route path="/dashboard/student/flashcards/:deckId/interactive" element={<FlashcardInteractivePage />} />
              <Route path="/dashboard/student/flashcards/enhanced" element={<EnhancedFlashcardPage />} />
              <Route path="/dashboard/student/flashcards/practice" element={<FlashcardPracticeLandingPage />} />
              <Route path="/dashboard/student/flashcards/:flashcardId/practice" element={<EnhancedFlashcardPractice />} />
              <Route path="/dashboard/student/flashcards/landing" element={<FlashcardsLandingPage />} />
              
              {/* Practice exam routes */}
              <Route path="/dashboard/student/practice-exam/:examId/start" element={<ExamTakingPage />} />
              <Route path="/dashboard/student/practice-exam/:examId/review" element={<ExamReviewPage />} />
              
              {/* Other routes */}
              <Route path="/dashboard/student/profile" element={<ProfilePage />} />
              <Route path="/dashboard/student/studyplan" element={<StudyPlanView />} />
              <Route path="/dashboard/student/tutor" element={<TutorView />} />
              <Route path="/dashboard/student/academic" element={<AcademicAdvisorView />} />

              {/* Additional student dashboard routes */}
              <Route path="/dashboard/student/*" element={<AppRoutes />} />

              {/* Admin routes - protected by AdminRouteGuard */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard/*" element={
                <AdminRouteGuard>
                  <Suspense fallback={<LoadingScreen />}>
                    <AdminDashboard />
                  </Suspense>
                </AdminRouteGuard>
              } />

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </AdminAuthProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
