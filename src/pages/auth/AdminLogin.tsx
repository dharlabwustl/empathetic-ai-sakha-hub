
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Enhanced AdminLogin component to properly handle admin login
const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Set admin login flag
    localStorage.setItem('admin_logged_in', 'true');
    
    // Clear any student auth flags
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('new_user_signup');
    localStorage.removeItem('google_signup');
    
    // Create basic admin user object
    const adminUser = {
      id: "admin-" + Date.now(),
      name: "Administrator",
      email: "admin@example.com",
      role: "admin"
    };
    
    // Store admin user data
    localStorage.setItem('adminUser', JSON.stringify(adminUser));
    
    // Show toast notification
    toast({
      title: "Admin Login Successful",
      description: "Redirecting to admin dashboard..."
    });
    
    // Dispatch auth state change event
    window.dispatchEvent(new Event('auth-state-changed'));
    
    // Redirect to admin dashboard
    setTimeout(() => {
      navigate('/admin/dashboard', { replace: true });
    }, 500);
  }, [navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <p className="mb-4">Authenticating as administrator...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    </div>
  );
};

export default AdminLogin;
