
import React from "react";
import { Navigate } from "react-router-dom";

// Redirect to the actual admin login page
const AdminLogin = () => {
  return <Navigate to="/admin/login" replace />;
};

export default AdminLogin;
