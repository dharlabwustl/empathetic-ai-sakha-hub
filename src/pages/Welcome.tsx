
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeFlow from '@/components/signup/WelcomeFlow';
import { useToast } from '@/hooks/use-toast';

const Welcome: React.FC = () => {
  const [showWelcomeTour, setShowWelcomeTour] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleWelcomeComplete = () => {
    setShowWelcomeTour(false);
    
    // Store in localStorage that user has seen welcome flow
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.seenWelcomeFlow = true;
        localStorage.setItem('userData', JSON.stringify(parsedData));
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
    
    // Show toast and navigate to dashboard
    toast({
      title: "Welcome to PREPZR!",
      description: "Your personalized dashboard is ready.",
    });
    
    // Navigate to dashboard with query param to show tour
    navigate("/dashboard/student?tour=true");
  };
  
  // Check if user has already seen welcome flow
  useEffect(() => {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        if (parsedData.seenWelcomeFlow) {
          // User has already seen welcome flow, go to dashboard
          navigate("/dashboard/student");
        }
      }
    } catch (error) {
      console.error('Error checking welcome flow status:', error);
    }
  }, [navigate]);

  if (!showWelcomeTour) {
    return null; // Will navigate away
  }

  return <WelcomeFlow onComplete={handleWelcomeComplete} />;
};

export default Welcome;
