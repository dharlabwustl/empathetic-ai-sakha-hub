
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import WelcomeFlow from '@/components/signup/WelcomeFlow';
import WelcomeTour from '@/components/dashboard/student/WelcomeTour';
import { useToast } from "@/hooks/use-toast";

const WelcomeFlowPage = () => {
  const navigate = useNavigate();
  const [showTour, setShowTour] = useState(false);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const completedOnboarding = searchParams.get('completedOnboarding') === 'true';
  const isNewUser = searchParams.get('new') === 'true';

  useEffect(() => {
    // If user completes the welcome flow, show the tour
    if (completedOnboarding) {
      setShowTour(true);
      // Mark that this user has seen the onboarding
      const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") || "{}") : {};
      localStorage.setItem("userData", JSON.stringify({
        ...userData,
        completedOnboarding: true
      }));
    }

    // Check if this is the first time user is visiting after signup
    const isFirstTimeUser = localStorage.getItem('new_user_signup') === 'true' || isNewUser;
    
    // If it's not a new user and not explicitly redirected after onboarding, go to dashboard
    if (!isFirstTimeUser && !completedOnboarding) {
      navigate('/dashboard/student');
    }
  }, [completedOnboarding, navigate, isNewUser]);

  const handleSkipTour = () => {
    setShowTour(false);
    // Remove the new user flag
    localStorage.removeItem('new_user_signup');
    // Navigate to dashboard
    navigate('/dashboard/student');
    toast({
      title: "Welcome to your dashboard!",
      description: "You can always access the tour again from the navigation menu."
    });
  };

  const handleCompleteTour = () => {
    setShowTour(false);
    // Remove the new user flag
    localStorage.removeItem('new_user_signup');
    // Mark that the user has seen the welcome tour
    const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") || "{}") : {};
    localStorage.setItem("userData", JSON.stringify({
      ...userData,
      sawWelcomeTour: true
    }));
    // Navigate to dashboard
    navigate('/dashboard/student');
    toast({
      title: "Tour Completed!",
      description: "You're all set to start using PREPZR. Happy studying!"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30">
      {!showTour ? (
        <WelcomeFlow />
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <WelcomeTour 
            onSkipTour={handleSkipTour}
            onCompleteTour={handleCompleteTour}
            isFirstTimeUser={true}
            lastActivity={null}
            suggestedNextAction="Go to your dashboard to see your study plan and start learning"
            open={showTour}
            onOpenChange={setShowTour}
          />
        </div>
      )}
    </div>
  );
};

export default WelcomeFlowPage;
