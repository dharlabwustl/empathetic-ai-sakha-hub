
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import TutorDashboard from "./pages/dashboard/TutorDashboard";
import ParentDashboard from "./pages/dashboard/ParentDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import EnhancedTutorView from "./pages/dashboard/student/EnhancedTutorView";

// Components
import AuthGuard from "@/components/auth/AuthGuard";
import Welcome from "@/pages/Welcome";

const queryClient = new QueryClient();

// Page transition wrapper
const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageTransition><Index /></PageTransition>} />
              <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
              <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
              <Route path="/welcome" element={<PageTransition><Welcome /></PageTransition>} />
              
              {/* Dashboard Routes */}
              <Route 
                path="/dashboard/student" 
                element={
                  <AuthGuard>
                    <PageTransition>
                      <StudentDashboard />
                    </PageTransition>
                  </AuthGuard>
                } 
              />
              
              {/* Enhanced AI Tutor Route */}
              <Route 
                path="/dashboard/student/tutor" 
                element={
                  <AuthGuard>
                    <PageTransition>
                      <EnhancedTutorView />
                    </PageTransition>
                  </AuthGuard>
                } 
              />
              
              <Route 
                path="/dashboard/tutor" 
                element={
                  <AuthGuard>
                    <PageTransition>
                      <TutorDashboard />
                    </PageTransition>
                  </AuthGuard>
                } 
              />
              
              <Route 
                path="/dashboard/parent" 
                element={
                  <AuthGuard>
                    <PageTransition>
                      <ParentDashboard />
                    </PageTransition>
                  </AuthGuard>
                } 
              />
              
              <Route 
                path="/dashboard/admin" 
                element={
                  <AuthGuard>
                    <PageTransition>
                      <AdminDashboard />
                    </PageTransition>
                  </AuthGuard>
                } 
              />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
