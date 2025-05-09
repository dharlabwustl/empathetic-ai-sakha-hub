
import React from 'react';

// This is a placeholder for admin routes
// In a real application, you would import actual admin components
const adminRoutes = [
  {
    path: "/admin/users",
    element: <div>User Management</div>,
    name: "Users"
  },
  {
    path: "/admin/content",
    element: <div>Content Management</div>,
    name: "Content"
  },
  {
    path: "/admin/settings",
    element: <div>Settings</div>,
    name: "Settings"
  }
];

export default adminRoutes;
