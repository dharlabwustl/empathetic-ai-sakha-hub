
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { PremiumProvider } from '@/contexts/PremiumContext';
import { motion, AnimatePresence } from 'framer-motion';

// Page imports
import Index from '@/pages/Index';
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';
import WelcomeFlow from '@/pages/welcome/WelcomeFlow';
import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import AdminDashboard from '@/pages/dashboard/AdminDashboard';
import ConceptsLibrary from '@/pages/dashboard/student/ConceptsLibrary';
import FlashcardsPage from '@/pages/dashboard/student/FlashcardsPage';
import PracticeExamPage from '@/pages/dashboard/student/PracticeExamPage';
import PracticeExamDetail from '@/pages/dashboard/student/PracticeExamDetail';
import ConceptDetail from '@/pages/dashboard/student/ConceptDetail';
import TodayPlan from '@/pages/dashboard/student/TodayPlan';
import Analytics from '@/pages/dashboard/student/Analytics';
import StudyPlan from '@/pages/dashboard/student/StudyPlan';
import AcademicAdvisor from '@/pages/dashboard/student/AcademicAdvisor';
import AICoach from '@/pages/dashboard/student/AICoach';
import Payment from '@/pages/Payment';
import PaymentSuccess from '@/pages/PaymentSuccess';
import PaymentCancel from '@/pages/PaymentCancel';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 0.98
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
};

// Animated page wrapper
const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

// Routes component to handle animations
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Index /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/signup" element={<AnimatedPage><Signup /></AnimatedPage>} />
        <Route path="/welcome" element={<AnimatedPage><WelcomeFlow /></AnimatedPage>} />
        <Route path="/welcome-flow" element={<AnimatedPage><WelcomeFlow /></AnimatedPage>} />
        
        {/* Student Dashboard Routes */}
        <Route path="/dashboard/student" element={<AnimatedPage><StudentDashboard /></AnimatedPage>} />
        <Route path="/dashboard/student/today" element={<AnimatedPage><TodayPlan /></AnimatedPage>} />
        <Route path="/dashboard/student/concepts" element={<AnimatedPage><ConceptsLibrary /></AnimatedPage>} />
        <Route path="/dashboard/student/concepts/:subject" element={<AnimatedPage><ConceptsLibrary /></AnimatedPage>} />
        <Route path="/dashboard/student/concept/:id" element={<AnimatedPage><ConceptDetail /></AnimatedPage>} />
        <Route path="/dashboard/student/flashcards" element={<AnimatedPage><FlashcardsPage /></AnimatedPage>} />
        <Route path="/dashboard/student/practice-exam" element={<AnimatedPage><PracticeExamPage /></AnimatedPage>} />
        <Route path="/dashboard/student/practice-exam/:id" element={<AnimatedPage><PracticeExamDetail /></AnimatedPage>} />
        <Route path="/dashboard/student/practice-exam/:id/start" element={<AnimatedPage><PracticeExamDetail /></AnimatedPage>} />
        <Route path="/dashboard/student/analytics" element={<AnimatedPage><Analytics /></AnimatedPage>} />
        <Route path="/dashboard/student/study-plan" element={<AnimatedPage><StudyPlan /></AnimatedPage>} />
        <Route path="/dashboard/student/academic" element={<AnimatedPage><AcademicAdvisor /></AnimatedPage>} />
        <Route path="/dashboard/student/academic-advisor" element={<AnimatedPage><AcademicAdvisor /></AnimatedPage>} />
        <Route path="/dashboard/student/ai-coach" element={<AnimatedPage><AICoach /></AnimatedPage>} />
        
        {/* Admin Dashboard Routes */}
        <Route path="/dashboard/admin" element={<AnimatedPage><AdminDashboard /></AnimatedPage>} />
        
        {/* Payment Routes */}
        <Route path="/payment" element={<AnimatedPage><Payment /></AnimatedPage>} />
        <Route path="/payment/success" element={<AnimatedPage><PaymentSuccess /></AnimatedPage>} />
        <Route path="/payment/cancel" element={<AnimatedPage><PaymentCancel /></AnimatedPage>} />
        
        {/* 404 Route */}
        <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="prepzr-ui-theme">
        <AuthProvider>
          <AdminProvider>
            <PremiumProvider>
              <Router>
                <div className="min-h-screen bg-background">
                  <AnimatedRoutes />
                  <Toaster />
                </div>
              </Router>
            </PremiumProvider>
          </AdminProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
