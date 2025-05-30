import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Index from './pages/Index';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Logout from '@/components/auth/Logout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import StudentDashboard from '@/pages/dashboard/student/StudentDashboard';
import AdminDashboard from '@/pages/dashboard/admin/AdminDashboard';
import AcademicSetup from '@/pages/dashboard/student/AcademicSetup';
import StudyPlan from '@/pages/dashboard/student/StudyPlan';
import Academic from '@/pages/dashboard/student/Academic';
import Today from '@/pages/dashboard/student/Today';
import Concepts from '@/pages/dashboard/student/Concepts';
import Flashcards from '@/pages/dashboard/student/Flashcards';
import PracticeExam from '@/pages/dashboard/student/PracticeExam';
import Settings from '@/pages/dashboard/Settings';
import Welcome from '@/pages/Welcome';
import AdminRoute from '@/components/auth/AdminRoute';
import Users from '@/pages/dashboard/admin/Users';
import Subscriptions from '@/pages/dashboard/admin/Subscriptions';
import Credits from '@/pages/dashboard/admin/Credits';
import Analytics from '@/pages/dashboard/admin/Analytics';
import Support from '@/pages/dashboard/admin/Support';
import PrepzrVoiceAssistant from '@/components/voice/PrepzrVoiceAssistant';

const queryClient = new QueryClient();

// Page transition wrapper component
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ 
      duration: 0.3, 
      ease: "easeInOut" 
    }}
    className="min-h-screen"
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<PageTransition><Index /></PageTransition>} />
            <Route path="/landing" element={<PageTransition><LandingPage /></PageTransition>} />
            <Route path="/signup-page" element={<PageTransition><SignupPage /></PageTransition>} />
            <Route path="/login-page" element={<PageTransition><LoginPage /></PageTransition>} />
            <Route path="/logout" element={<PageTransition><Logout /></PageTransition>} />
            
            {/* Student Routes */}
            <Route path="/dashboard/student" element={<ProtectedRoute><PageTransition><StudentDashboard /></PageTransition></ProtectedRoute>} />
            <Route path="/dashboard/student/academic-setup" element={<ProtectedRoute><PageTransition><AcademicSetup /></PageTransition></ProtectedRoute>} />
            <Route path="/dashboard/student/study-plan" element={<ProtectedRoute><PageTransition><StudyPlan /></PageTransition></ProtectedRoute>} />
            <Route path="/dashboard/student/academic" element={<ProtectedRoute><PageTransition><Academic /></PageTransition></ProtectedRoute>} />
            <Route path="/dashboard/student/today" element={<ProtectedRoute><PageTransition><Today /></PageTransition></ProtectedRoute>} />
            <Route path="/dashboard/student/concepts/:conceptName" element={<ProtectedRoute><PageTransition><Concepts /></PageTransition></ProtectedRoute>} />
            <Route path="/dashboard/student/flashcards/:flashcardId/:mode" element={<ProtectedRoute><PageTransition><Flashcards /></PageTransition></ProtectedRoute>} />
            <Route path="/dashboard/student/practice-exam/:examId/:mode" element={<ProtectedRoute><PageTransition><PracticeExam /></PageTransition></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="/dashboard/admin" element={<AdminRoute><PageTransition><AdminDashboard /></PageTransition></AdminRoute>} />
            <Route path="/dashboard/admin/users" element={<AdminRoute><PageTransition><Users /></PageTransition></AdminRoute>} />
            <Route path="/dashboard/admin/subscriptions" element={<AdminRoute><PageTransition><Subscriptions /></PageTransition></AdminRoute>} />
            <Route path="/dashboard/admin/credits" element={<AdminRoute><PageTransition><Credits /></PageTransition></AdminRoute>} />
            <Route path="/dashboard/admin/analytics" element={<AdminRoute><PageTransition><Analytics /></PageTransition></AdminRoute>} />
            <Route path="/dashboard/admin/support" element={<AdminRoute><PageTransition><Support /></PageTransition></AdminRoute>} />
            
            {/* Settings and Welcome Routes */}
            <Route path="/dashboard/settings" element={<ProtectedRoute><PageTransition><Settings /></PageTransition></ProtectedRoute>} />
            <Route path="/welcome" element={<ProtectedRoute><PageTransition><Welcome /></PageTransition></ProtectedRoute>} />
          </Routes>
        </AnimatePresence>
        <Toaster />
        <PrepzrVoiceAssistant />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
