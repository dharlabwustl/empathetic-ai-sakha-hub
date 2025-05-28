
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const PostLoginWelcomeBack = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem('userData');
    
    if (!storedData) {
      navigate('/login');
      return;
    }

    try {
      const parsedData = JSON.parse(storedData);
      
      // Check if it's a new user from signup
      const isNewUser = localStorage.getItem('new_user_signup') === 'true';
      
      if (isNewUser) {
        // For new users, go to dashboard with new flag
        navigate('/dashboard/student?new=true', { replace: true });
        toast({
          title: "Welcome to PREPZR!",
          description: "Let's set up your personalized dashboard.",
        });
      } else {
        // For returning users, go directly to dashboard
        navigate('/dashboard/student', { replace: true });
        toast({
          title: "Welcome back!",
          description: "Your personalized dashboard is ready.",
        });
      }
      
      // Set login flag
      localStorage.setItem('isLoggedIn', 'true');
      
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate('/login');
    }
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="animate-pulse text-center">
        <div className="h-12 w-12 bg-primary/20 rounded-full mx-auto mb-4 animate-bounce"></div>
        <p className="text-xl text-muted-foreground">Preparing your personalized experience...</p>
      </div>
    </div>
  );
};

export default PostLoginWelcomeBack;
