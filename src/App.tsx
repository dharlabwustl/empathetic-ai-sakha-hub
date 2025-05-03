
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login";
import StudentDashboard from "@/pages/dashboard/student/StudentDashboard";
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import AppRoutes from "@/components/dashboard/student/AppRoutes";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { Toaster } from "@/components/ui/toaster";
import Welcome from "@/pages/Welcome";
import { SharedNavigationProvider } from "@/contexts/SharedNavigationContext";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="prepzr-ui-theme">
      <SidebarProvider>
        <SharedNavigationProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/welcome" element={<Welcome />} />
              
              {/* Student Dashboard Routes */}
              <Route path="/dashboard/student" element={<StudentDashboard />}>
                <Route path="/dashboard/student/*" element={<StudentDashboard />} />
              </Route>
              
              {/* Student Dashboard Nested Routes */}
              <Route path="/dashboard/student/*" element={<AppRoutes />} />
              
              {/* Admin Dashboard Routes */}
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
              <Route path="/dashboard/admin/*" element={<AdminDashboard />} />
              
              {/* Fallback Route */}
              <Route path="*" element={<Index />} />
            </Routes>
          </Router>
          <Toaster />
        </SharedNavigationProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
