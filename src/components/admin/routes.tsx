
import React from 'react';
import { RouteObject } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import AdminRouteGuard from './AdminRouteGuard';
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ComprehensiveAdminDashboard from "@/pages/admin/ComprehensiveAdminDashboard";
import { DocumentationPage } from "@/pages/admin/DocumentationPage";
import FlaskGuidePage from "@/pages/admin/FlaskGuidePage";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin/dashboard",
    element: <AdminRouteGuard><AdminDashboard /></AdminRouteGuard>,
  },
  {
    path: "/admin/comprehensive",
    element: <AdminRouteGuard><ComprehensiveAdminDashboard /></AdminRouteGuard>,
  },
  {
    path: "/admin/documentation",
    element: <AdminRouteGuard><DocumentationPage /></AdminRouteGuard>,
  },
  {
    path: "/admin/flask-guide",
    element: <AdminRouteGuard><FlaskGuidePage /></AdminRouteGuard>,
  },
  {
    path: "/admin",
    element: <Navigate to="/admin/comprehensive" replace />,
  },
  {
    path: "/admin/*",
    element: <Navigate to="/admin/comprehensive" replace />,
  }
];

export default adminRoutes;
