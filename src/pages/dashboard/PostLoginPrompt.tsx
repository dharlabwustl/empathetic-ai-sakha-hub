
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PrepzrLogo from '@/components/common/PrepzrLogo';

const PostLoginPrompt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(3);
  const [destination, setDestination] = useState('/dashboard/student');
  
  // Parse the returnTo parameter from the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const returnTo = params.get('returnTo');
    
    if (returnTo) {
      // Validate that the returnTo is a legitimate path
      const safePaths = ['dashboard/student', 'dashboard/teacher', 'lastPage'];
      
      if (returnTo === 'lastPage') {
        // Get last visited page from localStorage or default to dashboard
        const lastPage = localStorage.getItem('lastVisitedPage') || '/dashboard/student';
        setDestination(lastPage);
      } else if (safePaths.includes(returnTo)) {
        setDestination(`/${returnTo}`);
      }
    }
  }, [location]);
  
  // Countdown and redirect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        navigate(destination);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown, navigate, destination]);
  
  const handleSelectDashboard = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
        <div className="flex flex-col items-center mb-6">
          <PrepzrLogo width={80} height={80} />
          <h1 className="text-2xl font-bold mt-4">Welcome Back!</h1>
          <p className="text-gray-600 text-center mt-2">
            You've been successfully logged in. Where would you like to go?
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => handleSelectDashboard('/dashboard/student')}
          >
            Go to Student Dashboard
          </Button>
          
          <Button 
            variant="outline"
            className="w-full"
            onClick={() => handleSelectDashboard('/dashboard/student/today')}
          >
            View Today's Study Plan
          </Button>
          
          <Button 
            variant="outline"
            className="w-full"
            onClick={() => handleSelectDashboard('/dashboard/student/concepts')}
          >
            Browse Concept Library
          </Button>
        </div>
        
        <div className="mt-6 text-center text-gray-500 text-sm">
          Redirecting to dashboard in {countdown} seconds...
        </div>
      </div>
    </div>
  );
};

export default PostLoginPrompt;
