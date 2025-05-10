import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { useToast } from "@/hooks/use-toast";

// Import routes
import { teacherRoutes } from "@/routes/teacher";
import { adminRoutes } from "@/routes/admin";
import { studentRoutes } from "@/routes/student";
import { authRoutes } from "@/routes/auth";
import { landingRoutes } from "@/routes/landing";
import { errorRoutes } from "@/routes/error";

// Import test routes
import { notificationRoutes } from "@/routes/notification";

// Import auth context providers
import { AuthProvider } from "@/contexts/auth/AuthContext";
import { AdminAuthProvider } from "@/contexts/auth/AdminAuthContext";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const { toast } = useToast();
  
  // Create a new QueryClient instance
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  // Create routes array by spreading imported route arrays
  const routes = [
    ...studentRoutes,
    ...adminRoutes,
    ...teacherRoutes,
    ...authRoutes,
    ...landingRoutes,
    ...errorRoutes,
    ...notificationRoutes,
  ];

  // Additional routes for our new pages
  const additionalRoutes = [
    {
      path: "/dashboard/student/feel-good-corner",
      element: (
        <AuthProvider>
          <React.Suspense fallback={<div>Loading...</div>}>
            {React.createElement(React.lazy(() => import('@/pages/dashboard/student/feel-good-corner/FeelGoodCornerPage')))}
          </React.Suspense>
        </AuthProvider>
      ),
    },
    {
      path: "/dashboard/student/formula-practice-lab",
      element: (
        <AuthProvider>
          <React.Suspense fallback={<div>Loading...</div>}>
            {React.createElement(React.lazy(() => import('@/pages/dashboard/student/concepts/FormulaLabPage')))}
          </React.Suspense>
        </AuthProvider>
      ),
    },
    {
      path: "/dashboard/student/concepts/:conceptId/formula-lab",
      element: (
        <AuthProvider>
          <React.Suspense fallback={<div>Loading...</div>}>
            {React.createElement(React.lazy(() => import('@/pages/dashboard/student/concepts/formula-lab/FormulaLabIndexPage')))}
          </React.Suspense>
        </AuthProvider>
      ),
    },
    {
      path: "/dashboard/student/concepts/:conceptId/interactive-cards",
      element: (
        <AuthProvider>
          <React.Suspense fallback={<div>Loading...</div>}>
            {(() => <div>Interactive Cards Page (Coming Soon)</div>)()}
          </React.Suspense>
        </AuthProvider>
      ),
    },
    {
      path: "/dashboard/student/concepts/:conceptId/exams",
      element: (
        <AuthProvider>
          <React.Suspense fallback={<div>Loading...</div>}>
            {(() => <div>Exam Cards Page (Coming Soon)</div>)()}
          </React.Suspense>
        </AuthProvider>
      ),
    }
  ];

  // Combine all routes
  const allRoutes = [...routes, ...additionalRoutes];

  // Create browser router with combined routes
  const router = createBrowserRouter(allRoutes);

  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <AuthProvider>
          <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </AdminAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
