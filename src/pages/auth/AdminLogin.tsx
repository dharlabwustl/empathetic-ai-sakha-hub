
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Handle admin login redirection with better error handling
const AdminLogin = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Set admin flag to indicate this is an admin login attempt
    localStorage.setItem('admin_login_attempt', 'true');
    localStorage.setItem('admin_logged_in', 'true');
    
    // Clear any student login data to prevent conflicts
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('new_user_signup');
    localStorage.removeItem('google_signup');
    
    // Notify the user that they're being redirected to admin dashboard
    toast({
      title: "Admin Access Granted",
      description: "Redirecting you to the admin dashboard..."
    });
  }, [toast]);

  // Direct redirect to admin dashboard
  return <Navigate to="/admin/dashboard" replace />;
};

export default AdminLogin;
