import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import { AdminAuthProvider } from '@/contexts/auth/AdminAuthContext';
import SidebarLayout from './components/dashboard/SidebarLayout';

// Import pages and components
import Index from '@/pages/Index';
import SignUp from '@/pages/SignUp';
import NotFound from '@/pages/NotFound';
import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import FeelGoodCornerView from '@/pages/dashboard/student/FeelGoodCornerView';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminRouteGuard from '@/components/admin/AdminRouteGuard';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import TodaysPlanView from '@/pages/dashboard/student/TodaysPlanView';
import FlashcardPracticePage from '@/pages/dashboard/student/flashcard/FlashcardPracticePage';
import LoadingScreen from '@/components/common/LoadingScreen';
import AppRoutes from './components/dashboard/student/AppRoutes';
import ConceptCardDetailPage from './components/dashboard/student/concepts/ConceptCardDetailPage';
import ExamTakingPage from './components/dashboard/student/practice-exam/ExamTakingPage';
import ExamReviewPage from './components/dashboard/student/practice-exam/ExamReviewPage';
import WelcomeToPrepr from './pages/signup/WelcomeToPrepr';
import Login from './pages/Login';
import EnhancedFlashcardPage from '@/pages/dashboard/student/flashcards/EnhancedFlashcardPage';
import ProfilePage from '@/pages/student/ProfilePage';
import StudentProfile from '@/pages/dashboard/student/StudentProfile';
import StudyPlanView from '@/pages/dashboard/student/StudyPlanView';
import TutorView from '@/pages/dashboard/student/TutorView';
import FlashcardPracticeLandingPage from '@/pages/dashboard/student/flashcard/FlashcardPracticeLandingPage';
import ConceptStudyLandingPage from '@/pages/dashboard/student/concept/ConceptStudyLandingPage';
import ConceptsLandingPage from './components/dashboard/student/concepts/ConceptsLandingPage';
import FlashcardsLandingPage from './components/dashboard/student/flashcards/FlashcardsLandingPage';
import EnhancedFlashcardPractice from './components/dashboard/student/flashcards/EnhancedFlashcardPractice';
import FlashcardInteractive from './components/dashboard/student/flashcards/FlashcardInteractive';
import FlashcardDetailsPage from '@/pages/dashboard/student/FlashcardDetailsPage';
import InteractiveFlashcardBrowser from '@/components/flashcards/InteractiveFlashcardBrowser';
import { NotificationsView } from '@/components/dashboard/student/notifications/NotificationsView';
import EnhancedProfilePage from '@/pages/dashboard/student/EnhancedProfilePage';
import PracticeExamsSection from '@/components/dashboard/student/practice-exam/PracticeExamsSection';
import PostLoginWelcome from '@/components/login/PostLoginWelcome';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import FlaskDeveloperGuide from '@/pages/admin/FlaskDeveloperGuide';
import FlaskGuidePage from '@/pages/admin/FlaskGuidePage';
import StudyGroupsPage from '@/pages/dashboard/student/StudyGroupsPage';
import BatchManagementPage from '@/pages/admin/BatchManagementPage';
import DatabaseSchemaCSVPage from '@/pages/database/DatabaseSchemaCSVPage';
import PostSignupWelcome from '@/components/signup/PostSignupWelcome';
import WelcomeFlow from '@/pages/welcome-flow';
import adminRoutes from './components/admin/routes';
import PublicFlaskGuidePage from './pages/admin/PublicFlaskGuidePage';
import SubscriptionPage from './pages/subscription/SubscriptionPage';
import ConceptCardStudyPage from '@/pages/dashboard/student/concept/ConceptCardStudyPage';
import AcademicAdvisor from '@/pages/dashboard/student/AcademicAdvisor';
import SyllabusPage from '@/pages/dashboard/student/SyllabusPage';
import PreviousYearAnalysisPage from '@/pages/dashboard/student/PreviousYearAnalysisPage';
import ExamSyllabusPage from '@/pages/dashboard/student/ExamSyllabusPage';
import FormulaPracticeLab from '@/pages/dashboard/student/FormulaPracticeLab';
import ConceptDetailPage from '@/pages/dashboard/student/ConceptDetailPage';

// Wrap a component with SidebarLayout
const WithSidebar = ({ Component }: { Component: React.ComponentType<any> }) => {
  return (
    <SidebarLayout>
      <Component />
    </SidebarLayout>
  );
};

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
              <Route path="/database/schema" element={<DatabaseSchemaCSVPage />} />
              
              {/* Public Flask Guide route - explicitly defined outside of admin routes */}
              <Route path="/flask-guide" element={<PublicFlaskGuidePage />} />

              {/* Admin routes */}
              <Route path="/admin/dashboard" element={
                <AdminRouteGuard>
                  <AdminDashboard />
                </AdminRouteGuard>
              } />
              
              {/* Add other admin routes */}
              {adminRoutes.map((route, index) => (
                <Route 
                  key={index} 
                  path={route.path} 
                  element={
                    <AdminRouteGuard>
                      {route.element}
                    </AdminRouteGuard>
                  } 
                />
              ))}

              {/* Legacy route for compatibility */}
              <Route path="/admin/flask-guide" element={
                <AdminRouteGuard>
                  <FlaskGuidePage />
                </AdminRouteGuard>
              } />
              
              {/* Post-signup flow - Welcome flow */}
              <Route path="/welcome" element={<WelcomeToPrepr />} />
              <Route path="/post-signup" element={<PostSignupWelcome />} />
              <Route path="/welcome-flow" element={<WelcomeFlow />} />
              
              {/* Post-login welcome back screen */}
              <Route path="/welcome-back" element={<PostLoginWelcome />} />

              {/* Student dashboard */}
              <Route path="/dashboard/student" element={<WithSidebar Component={StudentDashboard} />} />
              <Route path="/dashboard/student/:tab" element={<WithSidebar Component={StudentDashboard} />} />
              
              {/* Apply SidebarLayout to all student dashboard pages */}
              <Route path="/dashboard/student/today" element={<WithSidebar Component={TodaysPlanView} />} />
              <Route path="/dashboard/student/feel-good-corner" element={<WithSidebar Component={FeelGoodCornerView} />} />
              <Route path="/dashboard/student/study-groups" element={<WithSidebar Component={StudyGroupsPage} />} />
              <Route path="/dashboard/student/subscription" element={<WithSidebar Component={SubscriptionPage} />} />
              <Route path="/dashboard/student/batch-management" element={<WithSidebar Component={BatchManagementPage} />} />
              
              {/* Profile routes */}
              <Route path="/dashboard/student/profile" element={<WithSidebar Component={EnhancedProfilePage} />} />
              <Route path="/student/profile" element={<WithSidebar Component={ProfilePage} />} />
              <Route path="/profile" element={<WithSidebar Component={ProfilePage} />} />
              
              {/* AI Tutor route */}
              <Route path="/dashboard/student/tutor" element={<WithSidebar Component={TutorView} />} />
              
              {/* Concept routes */}
              <Route path="/dashboard/student/concepts/card/:conceptId" element={<WithSidebar Component={ConceptCardDetailPage} />} />
              <Route path="/dashboard/student/concepts/:conceptId" element={<WithSidebar Component={ConceptDetailPage} />} />
              <Route path="/dashboard/student/concepts/study/:conceptId" element={<WithSidebar Component={ConceptCardStudyPage} />} />
              <Route path="/dashboard/student/concepts/:conceptId/study" element={<WithSidebar Component={ConceptCardStudyPage} />} />
              <Route path="/dashboard/student/concepts/study-landing/:conceptId" element={<WithSidebar Component={ConceptStudyLandingPage} />} />
              <Route path="/dashboard/student/concepts/landing" element={<WithSidebar Component={ConceptsLandingPage} />} />
              <Route path="/dashboard/student/concepts" element={<WithSidebar Component={ConceptsLandingPage} />} />
              
              {/* Direct Flashcard routes */}
              <Route path="/dashboard/student/flashcards/:flashcardId/interactive" element={<WithSidebar Component={FlashcardInteractive} />} />
              <Route path="/dashboard/student/flashcards/:flashcardId" element={<WithSidebar Component={FlashcardDetailsPage} />} />
              <Route path="/dashboard/student/flashcards/:flashcardId/browse" element={<WithSidebar Component={InteractiveFlashcardBrowser} />} />
              <Route path="/dashboard/student/flashcards/:flashcardId/practice" element={<WithSidebar Component={EnhancedFlashcardPractice} />} />
              <Route path="/dashboard/student/flashcards" element={<WithSidebar Component={FlashcardsLandingPage} />} />
              
              {/* Practice exam routes */}
              <Route path="/dashboard/student/practice-exam" element={<WithSidebar Component={PracticeExamsSection} />} />
              <Route path="/dashboard/student/practice-exam/:examId/start" element={<WithSidebar Component={ExamTakingPage} />} />
              <Route path="/dashboard/student/practice-exam/:examId/review" element={<WithSidebar Component={ExamReviewPage} />} />
              
              {/* Formula Practice Lab route */}
              <Route path="/dashboard/student/formula-practice-lab" element={<WithSidebar Component={FormulaPracticeLab} />} />
              
              {/* Other routes */}
              <Route path="/dashboard/student/notifications" element={<WithSidebar Component={NotificationsView} />} />
              <Route path="/dashboard/student/academic" element={<WithSidebar Component={AcademicAdvisor} />} />
              <Route path="/dashboard/student/study-plan" element={<WithSidebar Component={StudyPlanView} />} />
              
              {/* Syllabus and Previous Year Analysis routes */}
              <Route path="/dashboard/student/syllabus" element={<WithSidebar Component={ExamSyllabusPage} />} />
              <Route path="/dashboard/student/previous-year-analysis" element={<WithSidebar Component={PreviousYearAnalysisPage} />} />
              <Route path="/dashboard/student/previous-year" element={<WithSidebar Component={PreviousYearAnalysisPage} />} />
              
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
