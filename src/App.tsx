import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Index from './pages/Index'; // Changed from LandingPage to Index
import ProtectedRoute from './components/common/ProtectedRoute';
import { Toaster } from '@/components/ui/toaster';
import AdminRouteGuard from './components/admin/AdminRouteGuard';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import EmployeeDashboard from './pages/dashboard/EmployeeDashboard';
import DoctorDashboard from './pages/dashboard/DoctorDashboard';
import FounderDashboard from './pages/dashboard/FounderDashboard';
import ProfilePage from './pages/student/ProfilePage'; // Fixed path
import StudyProgress from './pages/dashboard/StudyProgress';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          
          {/* Admin routes */}
          <Route 
            path="/dashboard/admin/*" 
            element={
              <AdminRouteGuard>
                {/* Placeholder for admin dashboard until it's implemented */}
                <div>Admin Dashboard</div>
              </AdminRouteGuard>
            } 
          />
          
          {/* Student routes */}
          <Route 
            path="/dashboard/student" 
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/student/:tab" 
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/dashboard/student/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/dashboard/student/progress" 
            element={
              <ProtectedRoute>
                <StudyProgress />
              </ProtectedRoute>
            }
          />
          
          {/* Other user type routes */}
          <Route 
            path="/dashboard/employee" 
            element={
              <ProtectedRoute>
                <EmployeeDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/doctor" 
            element={
              <ProtectedRoute>
                <DoctorDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/founder" 
            element={
              <ProtectedRoute>
                <FounderDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Not found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
