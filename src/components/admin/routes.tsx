
import React from 'react';
import { Route } from 'react-router-dom';
import AdminRouteGuard from './AdminRouteGuard';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import DatabaseSchemaCSVPage from '@/pages/database/DatabaseSchemaCSVPage';
import FlaskGuidePage from '@/pages/admin/FlaskGuidePage';
import BatchManagementPage from '@/pages/admin/BatchManagementPage';
import DomainManagementPage from '@/components/dashboard/admin/routes/DomainManagementPage';

// Define admin routes with proper guards
const adminRoutes = [
  <Route 
    key="admin-dashboard" 
    path="/admin/dashboard" 
    element={<AdminRouteGuard><AdminDashboard /></AdminRouteGuard>}
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
