
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AdminAuthProvider } from "@/contexts/auth/AdminAuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DatabaseExplorer from "./components/admin/database/DatabaseExplorer";
import StudentRoutes from "./routes/studentRoutes";
import LoadingScreen from "./components/common/LoadingScreen";
import WelcomeToPrepr from "./pages/signup/WelcomeToPrepr";
import PostLoginWelcomeBack from "./pages/PostLoginWelcomeBack";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <AdminAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/database" element={<DatabaseExplorer />} />
                <Route path="/dashboard/student/*" element={<StudentRoutes />} />
                <Route path="/welcome-flow" element={<WelcomeToPrepr />} />
                <Route path="/welcome-back" element={<PostLoginWelcomeBack />} />
              </Routes>
            </Suspense>
          </TooltipProvider>
        </AdminAuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
