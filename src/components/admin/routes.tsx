
import React from 'react';
import { RouteObject } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import AdminRouteGuard from './AdminRouteGuard';
import AdminDashboard from "@/pages/admin/AdminDashboard";
import DocumentationPage from "@/pages/admin/DocumentationPage";
import FlaskGuidePage from "@/pages/admin/FlaskGuidePage";

// All protected admin routes
const adminRoutes: RouteObject[] = [
  {
    path: "/admin/dashboard",
    element: <AdminRouteGuard><AdminDashboard /></AdminRouteGuard>,
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
    element: <Navigate to="/admin/dashboard" replace />,
  },
  {
    path: "/admin/*",
    element: <Navigate to="/admin/dashboard" replace />,
  }
];

export default adminRoutes;
