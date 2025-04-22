
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useAuth } from './contexts/AuthContext';

// Import components and pages
import Home from './pages/Index';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import ConceptCardStudyPage from "@/pages/dashboard/student/ConceptCardStudyPage";
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from './providers/ThemeProvider';

// Define a simple ErrorFallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
      <h2 className="text-lg font-semibold text-red-700">Something went wrong</h2>
      <p className="text-red-500">{error.message}</p>
      <button 
        className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </div>
  );
};

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
    path: "/signup",
    element: <SignUp />,
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
]);

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
