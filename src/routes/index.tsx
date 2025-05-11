import { Routes, Route, Navigate } from 'react-router-dom';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminLogin from '@/pages/admin/AdminLogin';
import WelcomeFlow from '@/pages/WelcomeFlow';
import FlaskGuide from '@/pages/FlaskGuide';
import DocumentationHubPage from '@/pages/documentation/DocumentationHubPage';
import SignupDatabaseMappingPage from '@/pages/documentation/SignupDatabaseMappingPage';
import PagewiseDatabaseMappingPage from '@/pages/documentation/PagewiseDatabaseMappingPage';
import ConceptDetailPage from '@/pages/dashboard/student/ConceptDetailPage';
import DocumentationRoutes from './documentationRoutes';
import { AuthGuard } from '@/guards/AuthGuard';
import { AdminGuard } from '@/guards/AdminGuard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      {/* Main Documentation Routes */}
      <Route path="/documentation/*" element={<DocumentationRoutes />} />
      <Route path="/docs" element={<Navigate to="/documentation" replace />} /> {/* Alias */}
      <Route path="/documentation" element={<DocumentationHubPage />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/welcome-flow" element={<WelcomeFlow />} />
      <Route path="/flask-guide" element={<FlaskGuide />} />
      
      {/* Student Dashboard Routes - Protected */}
      <Route path="/dashboard/student/*" element={
        <AuthGuard roles={['student']}>
          <StudentDashboard />
        </AuthGuard>
      } />
      
      {/* Admin Routes - Protected */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={
        <AdminGuard>
          <AdminDashboard />
        </AdminGuard>
      } />
      
      {/* Static Documentation Routes - Public */}
      <Route path="/documentation/signup-database-mapping" element={<SignupDatabaseMappingPage />} />
      <Route path="/documentation/pagewise-mapping" element={<PagewiseDatabaseMappingPage />} />
      
      {/* Concept Detail Page - Public for now, consider protecting later */}
      <Route path="/dashboard/student/concepts/card/:id" element={<ConceptDetailPage />} />
    </Routes>
  );
};

export default AppRoutes;
