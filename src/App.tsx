import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { useAuth } from './contexts/AuthContext';
import { ChakraProvider } from '@chakra-ui/react'

// Import components and pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Contact from './pages/Contact';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Features from './pages/Features';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import ConceptCardStudyPage from "@/pages/dashboard/student/ConceptCardStudyPage";
import AcademicPerformance from './pages/admin/AcademicPerformance';
import UserManagement from './pages/admin/UserManagement';
import ContentManagement from './pages/admin/ContentManagement';
import AnalyticsDashboard from './pages/admin/AnalyticsDashboard';
import AdminLogin from './pages/AdminLogin';
import { DashboardGate } from './components/auth/DashboardGate';
import { AdminGate } from './components/auth/AdminGate';
import { StudentGate } from './components/auth/StudentGate';
import { Academic } from './pages/dashboard/student/Academic';
import { FeelGood } from './pages/dashboard/student/FeelGood';
import { Tutor } from './pages/dashboard/student/Tutor';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';

// Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/features",
    element: <Features />,
  },
  {
    path: "/dashboard",
    element: <DashboardGate />,
  },
  {
    path: "/dashboard/student",
    element: <StudentDashboard />,
  },
  {
    path: "/dashboard/student/:tab",
    element: <StudentDashboard />,
  },
  {
    path: "/dashboard/student/concepts",
    element: <ConceptCardStudyPage />,
  },
  {
    path: "/dashboard/student/concepts/:subject",
    element: <ConceptCardStudyPage />,
  },
  {
    path: "/dashboard/student/concepts/:subject/:topic",
    element: <ConceptCardStudyPage />,
  },
  {
    path: "/dashboard/student/academic",
    element: <Academic />,
  },
  {
    path: "/dashboard/student/feel-good",
    element: <FeelGood />,
  },
  {
    path: "/dashboard/student/tutor",
    element: <Tutor />,
  },
  {
    path: "/dashboard/admin",
    element: <AdminGate><AdminDashboard /></AdminGate>,
  },
  {
    path: "/dashboard/admin/academic-performance",
    element: <AdminGate><AcademicPerformance /></AdminGate>,
  },
  {
    path: "/dashboard/admin/user-management",
    element: <AdminGate><UserManagement /></AdminGate>,
  },
  {
    path: "/dashboard/admin/content-management",
    element: <AdminGate><ContentManagement /></AdminGate>,
  },
  {
    path: "/dashboard/admin/analytics",
    element: <AdminGate><AnalyticsDashboard /></AdminGate>,
  },
]);

function App() {
  return (
    <ChakraProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;
