
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoginPage from '@/pages/login/LoginPage';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { useToast } from '@/hooks/use-toast';
import VoiceGreeting from '@/components/dashboard/student/voice/VoiceGreeting';
import AdminLoginRedirect from '@/pages/login/forms/AdminLoginRedirect';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is already logged in
  useEffect(() => {
    console.log("Checking login status in Login.tsx");
    
    // Check admin auth first
    if (localStorage.getItem('admin_logged_in') === 'true') {
      console.log("Admin already logged in, redirecting to admin dashboard");
      navigate('/admin/dashboard', { replace: true });
      return;
    }
    
    // Then check student auth
    const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isUserLoggedIn) {
      console.log("Student already logged in, redirecting to student dashboard");
      navigate('/dashboard/student', { replace: true });
      return;
    }
  }, [navigate]);
  
  const handleLoginError = (error: string) => {
    toast({
      title: "Login failed",
      description: error,
      variant: "destructive"
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/70 via-blue-50/50 to-indigo-100/60 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <VoiceGreeting 
        isFirstTimeUser={false}
        userName="User"
        language="en"
      />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <PrepzrLogo width={240} height="auto" />
          </Link>
          <h1 className="mt-4 text-4xl font-display font-bold gradient-text">Welcome Back</h1>
          <p className="mt-2 text-blue-700 dark:text-blue-300">Login to continue your learning journey</p>
        </div>
        
        <Card className="shadow-xl border-blue-200 dark:border-blue-800/30 overflow-hidden animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
            <CardDescription className="text-blue-100">
              Choose your account type below to continue
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 bg-white/90 dark:bg-blue-950/20">
            <div className="flex flex-col space-y-6">
              {/* Student login form */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-blue-800 dark:text-blue-200">Student Login</h3>
                <LoginPage onError={handleLoginError} />
              </div>
              
              {/* Admin login redirect */}
              <div className="border-t border-blue-200 dark:border-blue-800/30 pt-6">
                <h3 className="text-lg font-medium mb-4 text-blue-800 dark:text-blue-200">Administrator Login</h3>
                <AdminLoginRedirect />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center border-t border-blue-200 dark:border-blue-800/30 pt-6 bg-blue-50/80 dark:bg-blue-950/20">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center text-sm text-blue-600 dark:text-blue-400">
          <p>Need help? <a href="#" className="text-blue-700 dark:text-blue-300 hover:underline">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
