import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import { AdminAuthProvider } from '@/contexts/auth/AdminAuthContext';
import SidebarLayout from './components/dashboard/SidebarLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Import pages and components
import Index from '@/pages/Index';
import SignUp from '@/pages/SignUp';
import NotFound from '@/pages/NotFound';
import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import FeelGoodCornerView from '@/pages/dashboard/student/FeelGoodCornerView';
import AdminRouteGuard from '@/components/admin/AdminRouteGuard';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import TodaysPlanView from '@/pages/dashboard/student/TodaysPlanView';
import LoadingScreen from '@/components/common/LoadingScreen';
import AppRoutes from './components/dashboard/student/AppRoutes';
import ConceptCardDetail from './components/dashboard/student/concept-cards/ConceptCardDetail';
import ExamTakingPage from './components/dashboard/student/practice-exam/ExamTakingPage';
import ExamReviewPage from './components/dashboard/student/practice-exam/ExamReviewPage';
import WelcomeToPrepr from './pages/signup/WelcomeToPrepr';
import Login from './pages/Login';
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
import FormulaPracticePage from '@/pages/dashboard/student/FormulaPracticePage';
import AdminLogin from '@/pages/admin/AdminLogin';
// Import auth pages
import AdminLoginPage from '@/pages/auth/AdminLogin';
import Signup from '@/pages/auth/Signup';
import LoginPage from '@/pages/auth/Login';
import PostLoginWelcomeBack from '@/pages/dashboard/PostLoginWelcomeBack';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import AdminForgotPassword from '@/pages/admin/ForgotPassword';

// Import new footer pages
import About from '@/pages/About';
import Features from '@/pages/Features';
import Blog from '@/pages/Blog';
import Help from '@/pages/Help';
import FAQ from '@/pages/FAQ';
import Contact from '@/pages/Contact';
import Careers from '@/pages/Careers';
import Sustainability from '@/pages/Sustainability';

// Wrap a component with SidebarLayout and protection
const ProtectedSidebarRoute = ({ Component }: { Component: React.ComponentType<any> }) => {
  return (
    <ProtectedRoute>
      <SidebarLayout>
        <Component />
      </SidebarLayout>
    </ProtectedRoute>
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
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
              {/* Redirect old admin login routes to the new path */}
              <Route path="/login/admin" element={<Navigate to="/admin/login" replace />} />
              <Route path="/register" element={<SignUp />} />
              
              {/* Footer pages */}
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/help" element={<Help />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              
              <Route path="/database/schema" element={<DatabaseSchemaCSVPage />} />
              
              {/* Auth-specific routes */}
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/admin-login" element={<AdminLoginPage />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              
              {/* Public Flask Guide route - explicitly defined outside of admin routes */}
              <Route path="/flask-guide" element={<PublicFlaskGuidePage />} />

              {/* Admin routes */}
              <Route path="/admin/dashboard" element={
                <AdminRouteGuard>
                  <AdminDashboard />
                </AdminRouteGuard>
              } />
              
              {/* Add other admin routes */}
              {adminRoutes.map((route) => (
                <Route 
                  key={route.key} 
                  path={route.props.path} 
                  element={route.props.element}
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
              <Route path="/welcome-back" element={<PostLoginWelcomeBack />} />

              {/* Student dashboard - Protected with the combined wrapper */}
              <Route path="/dashboard/student" element={<ProtectedSidebarRoute Component={StudentDashboard} />} />
              <Route path="/dashboard/student/:tab" element={<ProtectedSidebarRoute Component={StudentDashboard} />} />
              
              {/* Apply ProtectedSidebarLayout to all student dashboard pages */}
              <Route path="/dashboard/student/today" element={<ProtectedSidebarRoute Component={TodaysPlanView} />} />
              <Route path="/dashboard/student/feel-good-corner" element={<ProtectedSidebarRoute Component={FeelGoodCornerView} />} />
              <Route path="/dashboard/student/study-groups" element={<ProtectedSidebarRoute Component={StudyGroupsPage} />} />
              <Route path="/dashboard/student/subscription" element={<ProtectedSidebarRoute Component={SubscriptionPage} />} />
              <Route path="/dashboard/student/batch-management" element={<ProtectedSidebarRoute Component={BatchManagementPage} />} />
              <Route path="/dashboard/student/formula-practice" element={<ProtectedSidebarRoute Component={FormulaPracticePage} />} />
              
              {/* Profile routes */}
              <Route path="/dashboard/student/profile" element={<ProtectedSidebarRoute Component={EnhancedProfilePage} />} />
              <Route path="/student/profile" element={<ProtectedSidebarRoute Component={ProfilePage} />} />
              <Route path="/profile" element={<ProtectedSidebarRoute Component={ProfilePage} />} />
              
              {/* AI Tutor route */}
              <Route path="/dashboard/student/tutor" element={<ProtectedSidebarRoute Component={TutorView} />} />
              
              {/* Concept routes - Updated for direct linking */}
              <Route path="/dashboard/student/concepts/card/:id" element={<ProtectedSidebarRoute Component={ConceptCardDetail} />} />
              <Route path="/dashboard/student/concepts/:conceptId" element={<ProtectedSidebarRoute Component={ConceptDetailPage} />} />
              <Route path="/dashboard/student/concepts/study/:conceptId" element={<ProtectedSidebarRoute Component={ConceptCardStudyPage} />} />
              <Route path="/dashboard/student/concepts/:conceptId/study" element={<ProtectedSidebarRoute Component={ConceptCardStudyPage} />} />
              <Route path="/dashboard/student/concepts/:conceptId/formula-lab" element={<ProtectedSidebarRoute Component={FormulaPracticeLab} />} />
              <Route path="/dashboard/student/concepts/study-landing/:conceptId" element={<ProtectedSidebarRoute Component={ConceptStudyLandingPage} />} />
              <Route path="/dashboard/student/concepts/landing" element={<ProtectedSidebarRoute Component={ConceptsLandingPage} />} />
              <Route path="/dashboard/student/concepts" element={<ProtectedSidebarRoute Component={ConceptsLandingPage} />} />
              
              {/* Direct Flashcard routes */}
              <Route path="/dashboard/student/flashcards/:flashcardId/interactive" element={<ProtectedSidebarRoute Component={FlashcardInteractive} />} />
              <Route path="/dashboard/student/flashcards/:flashcardId" element={<ProtectedSidebarRoute Component={FlashcardDetailsPage} />} />
              <Route path="/dashboard/student/flashcards/:flashcardId/browse" element={<ProtectedSidebarRoute Component={InteractiveFlashcardBrowser} />} />
              <Route path="/dashboard/student/flashcards/:flashcardId/practice" element={<ProtectedSidebarRoute Component={EnhancedFlashcardPractice} />} />
              <Route path="/dashboard/student/flashcards" element={<ProtectedSidebarRoute Component={FlashcardsLandingPage} />} />
              
              {/* Other routes - all converted to protected */}
              <Route path="/dashboard/student/practice-exam" element={<ProtectedSidebarRoute Component={PracticeExamsSection} />} />
              <Route path="/dashboard/student/practice-exam/:examId/start" element={<ProtectedSidebarRoute Component={ExamTakingPage} />} />
              <Route path="/dashboard/student/practice-exam/:examId/review" element={<ProtectedSidebarRoute Component={ExamReviewPage} />} />
              <Route path="/dashboard/student/formula-practice-lab" element={<ProtectedSidebarRoute Component={FormulaPracticeLab} />} />
              <Route path="/dashboard/student/notifications" element={<ProtectedSidebarRoute Component={NotificationsView} />} />
              <Route path="/dashboard/student/academic" element={<ProtectedSidebarRoute Component={AcademicAdvisor} />} />
              <Route path="/dashboard/student/study-plan" element={<ProtectedSidebarRoute Component={StudyPlanView} />} />
              <Route path="/dashboard/student/syllabus" element={<ProtectedSidebarRoute Component={ExamSyllabusPage} />} />
              <Route path="/dashboard/student/previous-year-analysis" element={<ProtectedSidebarRoute Component={PreviousYearAnalysisPage} />} />
              <Route path="/dashboard/student/previous-year" element={<ProtectedSidebarRoute Component={PreviousYearAnalysisPage} />} />
              
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
