import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import SignUp from '@/pages/SignUp';
import NotFound from '@/pages/NotFound';
import StudentDashboard from '@/pages/dashboard/StudentDashboard';
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
import WelcomeToPrepr from './pages/signup/WelcomeToPrepr';
import Login from './pages/Login';
import EnhancedFlashcardPage from './pages/dashboard/student/flashcards/EnhancedFlashcardPage';
import ProfilePage from './pages/student/ProfilePage';
import StudentProfile from './pages/dashboard/student/StudentProfile';
import StudyPlanView from './pages/dashboard/student/StudyPlanView';
import TutorView from './pages/dashboard/student/TutorView';
import AcademicAdvisorView from './pages/dashboard/student/AcademicAdvisorView';
import FlashcardPracticeLandingPage from './pages/dashboard/student/flashcard/FlashcardPracticeLandingPage';
import ConceptStudyLandingPage from './pages/dashboard/student/concept/ConceptStudyLandingPage';
import ConceptsLandingPage from './components/dashboard/student/concepts/ConceptsLandingPage';
import FlashcardsLandingPage from './components/dashboard/student/flashcards/FlashcardsLandingPage';
import EnhancedFlashcardPractice from './components/dashboard/student/flashcards/EnhancedFlashcardPractice';
import FlashcardInteractive from './components/dashboard/student/flashcards/FlashcardInteractive';
import FlashcardDetailsPage from './pages/dashboard/student/FlashcardDetailsPage';
import InteractiveFlashcardBrowser from './components/flashcards/InteractiveFlashcardBrowser';
import { NotificationsView } from './components/dashboard/student/notifications/NotificationsView';
import EnhancedProfilePage from './pages/dashboard/student/EnhancedProfilePage';
import PracticeExamsSection from './components/dashboard/student/practice-exam/PracticeExamsSection';
import PostLoginWelcome from './components/login/PostLoginWelcome';
import PostLoginWelcomeBack from './pages/dashboard/PostLoginWelcomeBack';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import FlaskDeveloperGuide from './pages/admin/FlaskDeveloperGuide';
import StudyGroupsPage from './pages/dashboard/student/StudyGroupsPage';
import BatchManagementPage from './pages/admin/BatchManagementPage';
import DatabaseSchemaCSVPage from './pages/database/DatabaseSchemaCSVPage';
import SubscriptionPage from './pages/dashboard/student/SubscriptionPage';
import PostSignupWelcome from './components/signup/PostSignupWelcome';
import WelcomeFlow from './pages/welcome-flow';
import AuthGuard from './components/auth/AuthGuard';

// Lazy load the admin dashboard
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));

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
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/admin/flask-guide" element={<FlaskDeveloperGuide />} />
              <Route path="/database/schema" element={<DatabaseSchemaCSVPage />} />

              {/* Post-signup flow - Welcome flow */}
              <Route path="/welcome" element={
                <AuthGuard requireAuth={true}>
                  <WelcomeToPrepr />
                </AuthGuard>
              } />
              <Route path="/post-signup" element={
                <AuthGuard requireAuth={true}>
                  <PostSignupWelcome />
                </AuthGuard>
              } />
              <Route path="/welcome-flow" element={
                <AuthGuard requireAuth={true}>
                  <WelcomeFlow />
                </AuthGuard>
              } />
              
              {/* Post-login welcome back screen */}
              <Route path="/welcome-back" element={
                <AuthGuard requireAuth={true}>
                  <PostLoginWelcomeBack />
                </AuthGuard>
              } />

              {/* Student routes - all protected */}
              <Route path="/dashboard/student" element={
                <AuthGuard requireAuth={true}>
                  <StudentDashboard />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/:tab" element={
                <AuthGuard requireAuth={true}>
                  <StudentDashboard />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/today" element={
                <AuthGuard requireAuth={true}>
                  <TodaysPlanView />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/feel-good-corner" element={
                <AuthGuard requireAuth={true}>
                  <FeelGoodCornerView />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/study-groups" element={
                <AuthGuard requireAuth={true}>
                  <StudyGroupsPage />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/subscription" element={
                <AuthGuard requireAuth={true}>
                  <SubscriptionPage />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/batch-management" element={
                <AuthGuard requireAuth={true}>
                  <BatchManagementPage />
                </AuthGuard>
              } />
              
              {/* Profile routes */}
              <Route path="/dashboard/student/profile" element={
                <AuthGuard requireAuth={true}>
                  <EnhancedProfilePage />
                </AuthGuard>
              } />
              <Route path="/student/profile" element={<ProfilePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              
              {/* AI Tutor route */}
              <Route path="/dashboard/student/tutor" element={<TutorView />} />
              
              {/* Concept routes */}
              <Route path="/dashboard/student/concepts/card/:conceptId" element={
                <AuthGuard requireAuth={true}>
                  <ConceptCardDetailPage />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/concepts/study/:conceptId" element={
                <AuthGuard requireAuth={true}>
                  <ConceptStudyPage />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/concepts/:conceptId/study" element={
                <AuthGuard requireAuth={true}>
                  <ConceptStudyPage />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/concepts/study-landing/:conceptId" element={
                <AuthGuard requireAuth={true}>
                  <ConceptStudyLandingPage />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/concepts/landing" element={
                <AuthGuard requireAuth={true}>
                  <ConceptsLandingPage />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/concepts" element={
                <AuthGuard requireAuth={true}>
                  <ConceptsLandingPage />
                </AuthGuard>
              } />
              
              {/* Direct Flashcard routes */}
              <Route path="/dashboard/student/flashcards/:flashcardId/interactive" element={
                <AuthGuard requireAuth={true}>
                  <FlashcardInteractive />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/flashcards/:flashcardId" element={
                <AuthGuard requireAuth={true}>
                  <FlashcardDetailsPage />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/flashcards/:flashcardId/browse" element={
                <AuthGuard requireAuth={true}>
                  <InteractiveFlashcardBrowser />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/flashcards/:flashcardId/practice" element={
                <AuthGuard requireAuth={true}>
                  <EnhancedFlashcardPractice />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/flashcards" element={
                <AuthGuard requireAuth={true}>
                  <FlashcardsLandingPage />
                </AuthGuard>
              } />
              
              {/* Practice exam routes */}
              <Route path="/dashboard/student/practice-exam" element={
                <AuthGuard requireAuth={true}>
                  <PracticeExamsSection />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/practice-exam/:examId/start" element={
                <AuthGuard requireAuth={true}>
                  <ExamTakingPage />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/practice-exam/:examId/review" element={
                <AuthGuard requireAuth={true}>
                  <ExamReviewPage />
                </AuthGuard>
              } />
              
              {/* Other routes */}
              <Route path="/dashboard/student/notifications" element={
                <AuthGuard requireAuth={true}>
                  <NotificationsView />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/academic" element={
                <AuthGuard requireAuth={true}>
                  <AcademicAdvisorView />
                </AuthGuard>
              } />
              <Route path="/dashboard/student/study-plan" element={
                <AuthGuard requireAuth={true}>
                  <StudyPlanView />
                </AuthGuard>
              } />
              
              {/* Admin routes */}
              <Route path="/admin" element={
                <AuthGuard requireAuth={true} adminOnly={true}>
                  <Suspense fallback={<LoadingScreen />}>
                    <AdminDashboard />
                  </Suspense>
                </AuthGuard>
              } />
              <Route path="/admin/*" element={
                <AuthGuard requireAuth={true} adminOnly={true}>
                  <Suspense fallback={<LoadingScreen />}>
                    <AdminDashboard />
                  </Suspense>
                </AuthGuard>
              } />
              <Route path="/admin/dashboard" element={
                <AuthGuard requireAuth={true} adminOnly={true}>
                  <Suspense fallback={<LoadingScreen />}>
                    <AdminDashboard />
                  </Suspense>
                </AuthGuard>
              } />
              
              {/* 404 */}
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
