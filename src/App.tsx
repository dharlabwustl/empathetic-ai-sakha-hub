
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import SignUp from '@/pages/SignUp';
import LoginPage from '@/pages/login/LoginPage';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import FeelGoodCornerView from '@/pages/dashboard/student/FeelGoodCornerView';
import { AdminAuthProvider } from '@/contexts/auth/AdminAuthContext';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminRouteGuard from '@/components/admin/AdminRouteGuard';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import TodaysPlanView from '@/pages/dashboard/student/TodaysPlanView';
import ConceptStudyPage from '@/pages/dashboard/student/ConceptStudyPage';
import FlashcardPracticePage from '@/pages/dashboard/student/flashcard/FlashcardPracticePage';
import LoadingScreen from '@/components/common/LoadingScreen';
import { ThemeProvider } from './components/theme-provider';
import AppRoutes from './components/dashboard/student/AppRoutes';
import ConceptCardDetailPage from './components/dashboard/student/concepts/ConceptCardDetailPage';
import ExamTakingPage from './components/dashboard/student/practice-exam/ExamTakingPage';
import ExamReviewPage from './components/dashboard/student/practice-exam/ExamReviewPage';
import FlashcardInteractivePage from './pages/dashboard/student/flashcard/FlashcardInteractivePage';
import PostLoginPrompt from './pages/dashboard/PostLoginPrompt';
import WelcomeScreen from './components/dashboard/student/WelcomeScreen';
import EnhancedFlashcardPage from './pages/dashboard/student/flashcards/EnhancedFlashcardPage';

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

              {/* Post-signup welcome screen */}
              <Route path="/welcome" element={<WelcomeScreen onComplete={() => window.location.href = '/dashboard/student'} />} />
              
              {/* Post-login prompt */}
              <Route path="/welcome-back" element={<PostLoginPrompt />} />

              {/* Student routes */}
              <Route path="/dashboard/student" element={<StudentDashboard />} />
              <Route path="/dashboard/student/:tab" element={<StudentDashboard />} />
              <Route path="/dashboard/student/today" element={<TodaysPlanView />} />
              <Route path="/dashboard/student/feel-good-corner" element={<FeelGoodCornerView />} />
              <Route path="/dashboard/student/concepts/card/:conceptId" element={<ConceptCardDetailPage />} />
              <Route path="/dashboard/student/concepts/study/:conceptId" element={<ConceptStudyPage />} />
              <Route path="/dashboard/student/flashcards/:deckId/interactive" element={<FlashcardInteractivePage />} />
              <Route path="/dashboard/student/flashcards/enhanced" element={<EnhancedFlashcardPage />} />
              <Route path="/dashboard/student/practice-exam/:examId/start" element={<ExamTakingPage />} />
              <Route path="/dashboard/student/practice-exam/:examId/review" element={<ExamReviewPage />} />

              {/* Additional student dashboard routes */}
              <Route path="/dashboard/student/*" element={<AppRoutes />} />

              {/* Admin routes - protected by AdminRouteGuard */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard/*" 
                element={
                  <AdminRouteGuard>
                    <Suspense fallback={<LoadingScreen />}>
                      <AdminDashboard />
                    </Suspense>
                  </AdminRouteGuard>
                }
              />

              {/* Fallback routes */}
              <Route path="/admin" element={<Navigate to="/admin/login" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminAuthProvider>
        </AuthProvider>
        
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
