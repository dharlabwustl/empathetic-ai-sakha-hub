
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import LandingPage from '@/pages/LandingPage';
import SignupPage from '@/pages/SignupPage';
import LoginPage from '@/pages/LoginPage';
import StudentDashboard from '@/pages/dashboard/student/StudentDashboard';
import ChatAssistant from '@/components/dashboard/ChatAssistant';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/premium-dashboard.css';

const queryClient = new QueryClient();

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
    scale: 1.02
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
};

// Animated page wrapper component
const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  <AnimatedPage>
                    <LandingPage />
                  </AnimatedPage>
                } 
              />
              <Route 
                path="/signup" 
                element={
                  <AnimatedPage>
                    <SignupPage />
                  </AnimatedPage>
                } 
              />
              <Route 
                path="/login" 
                element={
                  <AnimatedPage>
                    <LoginPage />
                  </AnimatedPage>
                } 
              />
              <Route 
                path="/dashboard/student/*" 
                element={
                  <AnimatedPage>
                    <StudentDashboard />
                  </AnimatedPage>
                } 
              />
            </Routes>
          </AnimatePresence>
          <ChatAssistant userType="student" />
          <Toaster />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
