
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Index from "./pages/Index";
import About from "./pages/About";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import EmployeeDashboard from "./pages/dashboard/EmployeeDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import FounderDashboard from "./pages/dashboard/FounderDashboard";
import StudyProgress from "./pages/dashboard/StudyProgress"; // Add this import
import NotFound from "./pages/NotFound";
import "./styles/animations.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            
            {/* Student Dashboard Routes */}
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/student/:tab" element={<StudentDashboard />} />
            
            {/* New Study Progress Route */}
            <Route path="/dashboard/student/progress" element={<StudyProgress />} />
            
            {/* Employee Dashboard Routes */}
            <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
            <Route path="/dashboard/employee/:tab" element={<EmployeeDashboard />} />
            
            {/* Doctor Dashboard Routes */}
            <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
            <Route path="/dashboard/doctor/:tab" element={<DoctorDashboard />} />
            
            {/* Founder Dashboard Routes */}
            <Route path="/dashboard/founder" element={<FounderDashboard />} />
            <Route path="/dashboard/founder/:tab" element={<FounderDashboard />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
