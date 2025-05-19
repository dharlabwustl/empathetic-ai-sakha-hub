
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Handle admin login redirection with better error handling
const AdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Clear any student login data to prevent conflicts
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('new_user_signup');
    localStorage.removeItem('google_signup');
    
    // Set admin flag to indicate this is an admin login attempt
    localStorage.setItem('admin_login_attempt', 'true');
    
    // Notify the user that they're being redirected to admin login
    toast({
      title: "Admin Login",
      description: "Redirecting you to the admin login page..."
    });
    
    // Use setTimeout to ensure toast is displayed before redirect
    setTimeout(() => {
      // Direct redirect to admin login page with proper flags set
      navigate('/admin/login', { replace: true });
    }, 500);
    
    return () => {
      // Cleanup function if the component unmounts before redirect
    };
  }, [toast, navigate]);

  // Render a loading state while we're setting up the redirect
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center p-8 max-w-md">
        <div className="animate-pulse mb-4">
          <p className="text-xl font-medium">Preparing admin login...</p>
        </div>
        <p className="text-muted-foreground">You'll be redirected momentarily</p>
      </div>
    </div>
  );
};

export default AdminLogin;
