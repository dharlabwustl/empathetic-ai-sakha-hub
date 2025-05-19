
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const AdminLoginRedirect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleAdminLogin = () => {
    // Set admin flag to indicate this is an admin login attempt
    localStorage.setItem('admin_login_attempt', 'true');
    
    // Clear any student login data to prevent conflicts
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('new_user_signup');
    localStorage.removeItem('google_signup');
    
    // Notify the user that they're being redirected
    toast({
      title: "Admin Login",
      description: "Redirecting you to the admin login page..."
    });
    
    // Navigate to admin login
    navigate('/admin/login', { replace: true });
  };
  
  return (
    <Card className="border-2 border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Shield className="h-5 w-5 mr-2 text-indigo-500" />
          Admin Login
        </CardTitle>
        <CardDescription>
          For PREPZR staff and administrators only
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-4">
          Please note that this area is restricted to authorized personnel only. 
          You will be redirected to a secure login portal.
        </p>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleAdminLogin} 
          variant="outline" 
          className="w-full border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 dark:border-indigo-900 dark:hover:border-indigo-800 dark:hover:bg-indigo-950"
        >
          <span>Continue to Admin Portal</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminLoginRedirect;
