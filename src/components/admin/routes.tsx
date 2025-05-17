
import React from 'react';
import { RouteObject } from 'react-router-dom';
import AdminRouteGuard from './AdminRouteGuard';
import { DocumentationPage } from "@/pages/admin/DocumentationPage";
import FlaskGuidePage from "@/pages/admin/FlaskGuidePage";
import { Navigate } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import FeaturesManagementPage from "@/pages/admin/FeaturesManagementPage";
import AdminLogin from "@/pages/admin/AdminLogin";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminRouteGuard><AdminDashboard /></AdminRouteGuard>,
  },
  {
    path: "/admin/features",
    element: <AdminRouteGuard><FeaturesManagementPage /></AdminRouteGuard>,
  },
  {
    path: "/admin/documentation",
    element: <AdminRouteGuard><DocumentationPage /></AdminRouteGuard>,
  },
  {
    path: "/admin/flask-guide",
    element: <AdminRouteGuard><FlaskGuidePage /></AdminRouteGuard>,
  },
  // Add a fallback route to redirect to dashboard
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
