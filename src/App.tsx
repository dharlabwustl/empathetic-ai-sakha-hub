
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from '@/pages/Index';
import SignUp from '@/pages/SignUp';
import TesterSignUp from '@/components/signup/TesterSignUp';
import Login from '@/pages/auth/Login';
import AuthLayout from '@/pages/auth/AuthLayout';
import AdminLogin from '@/pages/auth/AdminLogin';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResetPassword from '@/pages/auth/ResetPassword';
import Signup from '@/pages/auth/Signup';
import Dashboard from '@/pages/Dashboard';
import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import AdminDashboard from '@/pages/dashboard/AdminDashboard';
import DashboardOverview from '@/pages/dashboard/student/DashboardOverview';
import TodayPlanView from '@/pages/dashboard/student/TodayPlanView';
import AcademicAdvisorView from '@/pages/dashboard/student/AcademicAdvisorView';
import FlashcardsView from '@/pages/dashboard/student/FlashcardsView';
import PracticeExamView from '@/pages/dashboard/student/PracticeExamView';
import NotificationsView from '@/pages/dashboard/student/NotificationsView';
import ProfileView from '@/pages/dashboard/student/ProfileView';
import SettingsView from '@/pages/dashboard/student/SettingsView';
import ConceptCardsView from '@/pages/dashboard/student/ConceptCardsView';
import FeelGoodCornerView from '@/pages/dashboard/student/FeelGoodCornerView';
import DialogsPreviewView from '@/pages/dashboard/student/DialogsPreviewView';
import LeaderboardView from '@/pages/dashboard/student/LeaderboardView';
import BadgesView from '@/pages/dashboard/student/BadgesView';
import Error404 from '@/pages/Error404';
import WelcomeToPrepr from '@/pages/signup/WelcomeToPrepr';
import PostSignupFlow from '@/pages/signup/PostSignupFlow';
import PostLoginWelcomeBack from '@/pages/dashboard/PostLoginWelcomeBack';
import PlaygroundView from '@/pages/dashboard/student/PlaygroundView';
import SubscriptionPage from '@/pages/dashboard/student/SubscriptionPage';
import PostSignupWelcome from '@/components/signup/PostSignupWelcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/welcome" element={<WelcomeToPrepr />} />
        <Route path="/welcome-steps" element={<PostSignupWelcome />} />
        <Route path="/study-plan" element={<PostSignupFlow />} />
        <Route path="/welcome-back" element={<PostLoginWelcomeBack />} />
        
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="admin-login" element={<AdminLogin />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="tester-signup" element={<TesterSignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
        
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="/dashboard/student" />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="student" element={<StudentDashboard />} />
        </Route>
        
        <Route path="/dashboard/student/overview" element={<DashboardOverview />} />
        <Route path="/dashboard/student/today" element={<TodayPlanView />} />
        <Route path="/dashboard/student/academic" element={<AcademicAdvisorView />} />
        <Route path="/dashboard/student/concepts" element={<ConceptCardsView />} />
        <Route path="/dashboard/student/flashcards" element={<FlashcardsView />} />
        <Route path="/dashboard/student/practice-exam" element={<PracticeExamView />} />
        <Route path="/dashboard/student/notifications" element={<NotificationsView />} />
        <Route path="/dashboard/student/profile" element={<ProfileView />} />
        <Route path="/dashboard/student/settings" element={<SettingsView />} />
        <Route path="/dashboard/student/feel-good" element={<FeelGoodCornerView />} />
        <Route path="/dashboard/student/dialogs" element={<DialogsPreviewView />} />
        <Route path="/dashboard/student/leaderboard" element={<LeaderboardView />} />
        <Route path="/dashboard/student/badges" element={<BadgesView />} />
        <Route path="/dashboard/student/playground" element={<PlaygroundView />} />
        <Route path="/dashboard/student/subscription" element={<SubscriptionPage />} />
        
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
