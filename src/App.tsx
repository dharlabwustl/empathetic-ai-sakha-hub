
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";

// Lazy load components
const StudentDashboard = lazy(() => import("@/pages/dashboard/student/StudentDashboard"));
const TutorView = lazy(() => import("@/pages/dashboard/student/TutorView"));
const EnhancedTutorView = lazy(() => import("@/pages/dashboard/student/EnhancedTutorView"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Suspense fallback={<DashboardLoading />}>
            <Routes>
              <Route path="/dashboard/student" element={<StudentDashboard />} />
              <Route path="/dashboard/student/tutor" element={<EnhancedTutorView />} />
              <Route path="/" element={<Navigate to="/dashboard/student" replace />} />
            </Routes>
          </Suspense>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
