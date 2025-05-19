
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Handle admin login redirection with better error handling
const AdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set admin flag to indicate this is an admin login attempt
    localStorage.setItem('admin_login_attempt', 'true');
    
    // Clear any student login data to prevent conflicts
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('new_user_signup');
    localStorage.removeItem('google_signup');
    
    // Notify the user that they're being redirected to admin login
    toast({
      title: "Admin Login",
      description: "Redirecting you to the admin login page..."
    });

    // Use navigate instead of direct redirect to ensure proper routing
    const timer = setTimeout(() => {
      navigate('/admin/login', { replace: true });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [navigate, toast]);

  // Show loading state while preparing redirect
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/90">
      <div className="text-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-lg font-medium">Preparing admin portal...</p>
      </div>
    </div>
  );
};

export default AdminLogin;
