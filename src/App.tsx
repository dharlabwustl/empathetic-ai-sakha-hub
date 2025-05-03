
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from '@/pages/Index';
import SignUp from '@/pages/SignUp';
import Login from '@/pages/auth/Login';
import AdminLogin from '@/pages/auth/AdminLogin';
import Signup from '@/pages/auth/Signup';
import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import FeelGoodCornerView from '@/pages/dashboard/student/FeelGoodCornerView';
import PlaygroundView from '@/pages/dashboard/student/PlaygroundView';
import SubscriptionPage from '@/pages/dashboard/student/SubscriptionPage';
import PostSignupWelcome from '@/components/signup/PostSignupWelcome';
import WelcomeToPrepr from '@/pages/signup/WelcomeToPrepr';
import PostSignupFlow from '@/pages/signup/PostSignupFlow';
import PostLoginWelcomeBack from '@/pages/dashboard/PostLoginWelcomeBack';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/welcome" element={<WelcomeToPrepr />} />
        <Route path="/welcome-steps" element={<PostSignupWelcome />} />
        <Route path="/study-plan" element={<PostSignupFlow />} />
        <Route path="/welcome-back" element={<PostLoginWelcomeBack />} />
        
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="admin-login" element={<AdminLogin />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/dashboard">
          <Route index element={<Navigate to="/dashboard/student" />} />
          <Route path="admin" element={<Navigate to="/admin/dashboard" />} />
          <Route path="student" element={<StudentDashboard />} />
        </Route>
        
        <Route path="/dashboard/student/feel-good" element={<FeelGoodCornerView />} />
        <Route path="/dashboard/student/playground" element={<PlaygroundView />} />
        <Route path="/dashboard/student/subscription" element={<SubscriptionPage />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
