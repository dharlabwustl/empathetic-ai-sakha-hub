
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import NotFound from "@/pages/NotFound";
import { ThemeProvider } from "@/providers/ThemeProvider";
import StudentDashboard from "@/pages/dashboard/StudentDashboard";
import EmployeeDashboard from "@/pages/dashboard/EmployeeDashboard";
import FounderDashboard from "@/pages/dashboard/FounderDashboard";
import DoctorDashboard from "@/pages/dashboard/DoctorDashboard";
import AdminDashboard from "@/pages/admin/Dashboard";
import AuthRoute from "@/components/auth/AuthRoute";
import AdminAuthRoute from "@/components/admin/AdminAuthRoute";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfilePage from "@/pages/dashboard/student/profile";
import SettingsPage from "@/pages/dashboard/settings";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard">
            <Route index element={<Navigate to="/dashboard/student" />} />
            
            {/* Student Dashboard */}
            <Route
              path="student"
              element={
                <AuthRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </AuthRoute>
              }
            />
            <Route
              path="student/:tab"
              element={
                <AuthRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </AuthRoute>
              }
            />
            
            {/* Student Profile */}
            <Route
              path="student/profile"
              element={
                <AuthRoute allowedRoles={["student"]}>
                  <ProfilePage />
                </AuthRoute>
              }
            />
            
            {/* Settings Page */}
            <Route
              path="settings"
              element={
                <AuthRoute>
                  <SettingsPage />
                </AuthRoute>
              }
            />
            
            {/* Employee Dashboard */}
            <Route
              path="employee"
              element={
                <AuthRoute allowedRoles={["employee"]}>
                  <EmployeeDashboard />
                </AuthRoute>
              }
            />
            <Route
              path="employee/:tab"
              element={
                <AuthRoute allowedRoles={["employee"]}>
                  <EmployeeDashboard />
                </AuthRoute>
              }
            />
            
            {/* Founder Dashboard */}
            <Route
              path="founder"
              element={
                <AuthRoute allowedRoles={["founder"]}>
                  <FounderDashboard />
                </AuthRoute>
              }
            />
            <Route
              path="founder/:tab"
              element={
                <AuthRoute allowedRoles={["founder"]}>
                  <FounderDashboard />
                </AuthRoute>
              }
            />
            
            {/* Doctor Dashboard */}
            <Route
              path="doctor"
              element={
                <AuthRoute allowedRoles={["doctor"]}>
                  <DoctorDashboard />
                </AuthRoute>
              }
            />
            <Route
              path="doctor/:tab"
              element={
                <AuthRoute allowedRoles={["doctor"]}>
                  <DoctorDashboard />
                </AuthRoute>
              }
            />
          </Route>
          
          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminAuthRoute>
                <AdminDashboard />
              </AdminAuthRoute>
            }
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
