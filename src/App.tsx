
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminRoute from "@/components/auth/AdminRoute";
import AuthGuard from "@/components/auth/AuthGuard";

// Page imports
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import StudentDashboard from "./pages/dashboard/student/StudentDashboard";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import PostSignupWelcome from "@/components/signup/PostSignupWelcome";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            
            {/* Auth routes - redirect if already logged in */}
            <Route path="/signup" element={
              <AuthGuard requireAuth={false}>
                <SignUp />
              </AuthGuard>
            } />
            <Route path="/login" element={
              <AuthGuard requireAuth={false}>
                <Login />
              </AuthGuard>
            } />
            <Route path="/welcome-flow" element={
              <AuthGuard requireAuth={false}>
                <PostSignupWelcome />
              </AuthGuard>
            } />
            
            {/* Protected student routes */}
            <Route path="/dashboard/student" element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            
            {/* Protected admin routes */}
            <Route path="/dashboard/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
