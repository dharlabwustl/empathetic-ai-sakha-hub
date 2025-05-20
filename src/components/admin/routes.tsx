
import React from 'react';
import { Route } from 'react-router-dom';
import AdminRouteGuard from './AdminRouteGuard';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminFlashcardManager from '@/pages/admin/AdminFlashcardManager';
import AdminContentManager from '@/pages/admin/AdminContentManager';
import AdminStudentManager from '@/pages/admin/AdminStudentManager';
import AdminSubscriptionManager from '@/pages/admin/AdminSubscriptionManager';
import AdminSystemSettings from '@/pages/admin/AdminSystemSettings';
import AdminAnalytics from '@/pages/admin/AdminAnalytics';
import AdminBatchManager from '@/pages/admin/AdminBatchManager';
import FlaskGuidePage from '@/pages/admin/FlaskGuidePage';
import BatchManagementPage from '@/pages/admin/BatchManagementPage';
import DatabaseSchemaCSVPage from '@/pages/database/DatabaseSchemaCSVPage';
import AdminProfile from '@/pages/admin/AdminProfile';
import DomainManagementPage from '@/components/dashboard/admin/routes/DomainManagementPage';

// Define admin routes with proper guards
const adminRoutes = [
  <Route 
    key="admin-dashboard" 
    path="/admin/dashboard" 
    element={<AdminRouteGuard><AdminDashboard /></AdminRouteGuard>}
  />,
  <Route 
    key="admin-flashcards" 
    path="/admin/flashcards" 
    element={<AdminRouteGuard><AdminFlashcardManager /></AdminRouteGuard>}
  />,
  <Route 
    key="admin-content" 
    path="/admin/content" 
    element={<AdminRouteGuard><AdminContentManager /></AdminRouteGuard>}
  />,
  <Route 
    key="admin-students" 
    path="/admin/students" 
    element={<AdminRouteGuard><AdminStudentManager /></AdminRouteGuard>}
  />,
  <Route 
    key="admin-subscriptions" 
    path="/admin/subscriptions" 
    element={<AdminRouteGuard><AdminSubscriptionManager /></AdminRouteGuard>}
  />,
  <Route 
    key="admin-settings" 
    path="/admin/settings" 
    element={<AdminRouteGuard><AdminSystemSettings /></AdminRouteGuard>}
  />,
  <Route 
    key="admin-analytics" 
    path="/admin/analytics" 
    element={<AdminRouteGuard><AdminAnalytics /></AdminRouteGuard>}
  />,
  <Route 
    key="admin-batch" 
    path="/admin/batch" 
    element={<AdminRouteGuard><AdminBatchManager /></AdminRouteGuard>}
  />,
  <Route 
    key="admin-flask-guide" 
    path="/admin/flask-guide" 
    element={<AdminRouteGuard><FlaskGuidePage /></AdminRouteGuard>}
  />,
  <Route 
    key="admin-batch-management" 
    path="/admin/batch-management" 
    element={<AdminRouteGuard><BatchManagementPage /></AdminRouteGuard>}
  />,
  <Route 
    key="admin-profile" 
    path="/admin/profile" 
    element={<AdminRouteGuard><AdminProfile /></AdminRouteGuard>}
  />,
  <Route 
    key="admin-domains" 
    path="/admin/domains" 
    element={<AdminRouteGuard><DomainManagementPage /></AdminRouteGuard>}
  />,
  <Route 
    key="database-schema" 
    path="/database/schema" 
    element={<DatabaseSchemaCSVPage />}
  />
];

export default adminRoutes;
