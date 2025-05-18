
import React from "react";
import { Navigate } from "react-router-dom";

// Redirect to the actual admin login page
const AdminLogin = () => {
  // Direct redirect to admin login page
  return <Navigate to="/admin/login" replace />;
};

export default AdminLogin;
