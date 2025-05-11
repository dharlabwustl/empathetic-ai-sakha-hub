
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import UniversalLayout from '@/layouts/UniversalLayout';
import AppLayout from '@/layouts/AppLayout';
import Loading from '@/components/Loading';

// Auth Pages
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ResetPassword from '@/pages/auth/ResetPassword';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import AuthLayout from '@/layouts/AuthLayout';
import WelcomeBack from '@/pages/auth/WelcomeBack';
import Welcome from '@/pages/auth/Welcome';
import Logout from '@/pages/auth/Logout';

// Student Dashboard
import StudentDashboard from '@/pages/dashboard/student/StudentDashboard';
import ProfilePage from '@/pages/dashboard/student/ProfilePage';
import AcademicAdvisorView from '@/pages/dashboard/student/AcademicAdvisorView';
import ConceptsPage from '@/pages/dashboard/student/ConceptsPage';
import FlashcardsPage from '@/pages/dashboard/student/FlashcardsPage';
import ConceptDetail from '@/components/dashboard/student/concepts/ConceptDetail';
import FormulaLab from '@/components/dashboard/student/concepts/FormulaLab';
import TodaysPlanView from '@/pages/dashboard/student/TodaysPlanView';
import PracticeExamPage from '@/pages/dashboard/student/PracticeExamPage';
import FeelGoodCorner from '@/components/dashboard/student/feel-good-corner/FeelGoodCorner';

// Admin Dashboard
import AdminLayout from '@/layouts/AdminLayout';
import AdminDashboard from '@/pages/admin/Dashboard';
import StudentsPage from '@/pages/admin/StudentsPage';

// Error Pages
import NotFoundPage from '@/pages/NotFoundPage';
import ErrorPage from '@/pages/ErrorPage';
import StudyPlanCreator from '@/pages/dashboard/student/StudyPlanCreator';
import ExamsPage from '@/pages/dashboard/student/ExamsPage';
import NotificationsView from '@/pages/dashboard/student/NotificationsView';

const LazyHome = React.lazy(() => import('@/pages/Home'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <UniversalLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<Loading />}>
            <LazyHome />
          </React.Suspense>
        ),
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          { index: true, element: <Navigate to="login" replace /> },
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'reset-password', element: <ResetPassword /> },
          { path: 'forgot-password', element: <ForgotPassword /> },
        ],
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'logout', element: <Logout /> },
      { path: 'welcome', element: <Welcome /> },
      { path: 'welcome-back', element: <WelcomeBack /> },
    ],
  },
  {
    path: '/dashboard/student',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <StudentDashboard /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'academic', element: <AcademicAdvisorView /> },
      { path: 'today', element: <TodaysPlanView /> },
      { path: 'feel-good-corner', element: <FeelGoodCorner /> },
      { path: 'create-study-plan', element: <StudyPlanCreator /> },
      { path: 'concepts', element: <ConceptsPage /> },
      { path: 'concepts/:conceptId', element: <Navigate to="overview" replace /> },
      { path: 'concepts/:conceptId/:activeTab', element: <ConceptDetail /> },
      { path: 'concepts/:conceptId/formula-lab', element: <FormulaLab /> },
      { path: 'flashcards', element: <FlashcardsPage /> },
      { path: 'practice-exam', element: <PracticeExamPage /> },
      { path: 'exams', element: <ExamsPage /> },
      { path: 'notifications', element: <NotificationsView /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'students', element: <StudentsPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
