import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import { AdminAuthProvider } from '@/contexts/auth/AdminAuthContext';
import SidebarLayout from './components/dashboard/SidebarLayout';
import { useAuth } from '@/hooks/useAuth';

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

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem('userData') ? 
    JSON.parse(localStorage.getItem('userData') || '{}').isAuthenticated === true : false;
    
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
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

              {/* Student dashboard - Protected */}
              <Route path="/dashboard/student" element={
                <ProtectedRoute>
                  <SidebarLayout>
                    <StudentDashboard />
                  </SidebarLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard/student/:tab" element={
                <ProtectedRoute>
                  <SidebarLayout>
                    <StudentDashboard />
                  </SidebarLayout>
                </ProtectedRoute>
              } />
              
              {/* Apply SidebarLayout to all student dashboard pages - Protected */}
              <Route path="/dashboard/student/today" element={
                <ProtectedRoute>
                  <SidebarLayout>
                    <TodaysPlanView />
                  </SidebarLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard/student/feel-good-corner" element={
                <ProtectedRoute>
                  <SidebarLayout>
                    <FeelGoodCornerView />
                  </SidebarLayout>
                </ProtectedRoute>
              } />
              
              {/* Apply protection to all student routes */}
              <Route path="/dashboard/student/*" element={
                <ProtectedRoute>
                  <SidebarLayout>
                    <Routes>
                      {/* All other student routes */}
                      <Route path="/study-groups" element={<StudyGroupsPage />} />
                      <Route path="/subscription" element={<SubscriptionPage />} />
                      <Route path="/batch-management" element={<BatchManagementPage />} />
                      <Route path="/profile" element={<EnhancedProfilePage />} />
                      <Route path="/tutor" element={<TutorView />} />
                      <Route path="/concepts" element={<ConceptsLandingPage />} />
                      <Route path="/flashcards" element={<FlashcardsLandingPage />} />
                      <Route path="/notifications" element={<NotificationsView />} />
                      <Route path="/academic" element={<AcademicAdvisor />} />
                      <Route path="/study-plan" element={<StudyPlanView />} />
                      <Route path="/syllabus" element={<ExamSyllabusPage />} />
                      <Route path="/previous-year-analysis" element={<PreviousYearAnalysisPage />} />
                      <Route path="/practice-exam" element={<PracticeExamsSection />} />
                    </Routes>
                  </SidebarLayout>
                </ProtectedRoute>
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

// Import all the necessary components that are used above
import Login from './pages/Login';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import adminRoutes from './components/admin/routes';
import PublicFlaskGuidePage from './pages/admin/PublicFlaskGuidePage';
import WelcomeToPrepr from './pages/signup/WelcomeToPrepr';
import PostLoginWelcome from '@/components/login/PostLoginWelcome';
import PostSignupWelcome from '@/components/signup/PostSignupWelcome';
import WelcomeFlow from '@/pages/welcome-flow';
import FlaskGuidePage from '@/pages/admin/FlaskGuidePage';
import DatabaseSchemaCSVPage from '@/pages/database/DatabaseSchemaCSVPage';
import StudyGroupsPage from '@/pages/dashboard/student/StudyGroupsPage';
import SubscriptionPage from './pages/subscription/SubscriptionPage';
import BatchManagementPage from '@/pages/admin/BatchManagementPage';
import EnhancedProfilePage from '@/pages/dashboard/student/EnhancedProfilePage';
import TutorView from '@/pages/dashboard/student/TutorView';
import ConceptsLandingPage from './components/dashboard/student/concepts/ConceptsLandingPage';
import FlashcardsLandingPage from './components/dashboard/student/flashcards/FlashcardsLandingPage';
import { NotificationsView } from '@/components/dashboard/student/notifications/NotificationsView';
import AcademicAdvisor from '@/pages/dashboard/student/AcademicAdvisor';
import StudyPlanView from '@/pages/dashboard/student/StudyPlanView';
import ExamSyllabusPage from '@/pages/dashboard/student/ExamSyllabusPage';
import PreviousYearAnalysisPage from '@/pages/dashboard/student/PreviousYearAnalysisPage';
import PracticeExamsSection from '@/components/dashboard/student/practice-exam/PracticeExamsSection';

export default App;
