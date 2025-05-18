
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Handle admin login redirection with better error handling
const AdminLogin = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Set admin flag to indicate this is an admin login attempt
    localStorage.setItem('admin_login_attempt', 'true');
    
    // Clear any student login data to prevent conflicts
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('new_user_signup');
    localStorage.removeItem('google_signup');
  }, []);

  // Direct redirect to admin login page with proper flags set
  return <Navigate to="/admin/login" replace />;
};

export default AdminLogin;
