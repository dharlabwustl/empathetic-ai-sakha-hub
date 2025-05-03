
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import WelcomeFlow from '@/components/signup/WelcomeFlow';
import WelcomeTour from '@/components/dashboard/student/WelcomeTour';

const WelcomeFlowPage = () => {
  const navigate = useNavigate();
  const [showTour, setShowTour] = useState(false);
  const [searchParams] = useSearchParams();
  const completedOnboarding = searchParams.get('completedOnboarding') === 'true';

  useEffect(() => {
    // If user completes the welcome flow, show the tour
    if (completedOnboarding) {
      setShowTour(true);
    }

    // Check if this is the first time user is visiting after signup
    const isNewUser = localStorage.getItem('new_user_signup') === 'true';
    
    // If it's not a new user and not explicitly redirected after onboarding, go to dashboard
    if (!isNewUser && !completedOnboarding) {
      navigate('/dashboard/student');
    }
  }, [completedOnboarding, navigate]);

  const handleSkipTour = () => {
    setShowTour(false);
    // Remove the new user flag
    localStorage.removeItem('new_user_signup');
    // Navigate to dashboard
    navigate('/dashboard/student');
  };

  const handleCompleteTour = () => {
    setShowTour(false);
    // Remove the new user flag
    localStorage.removeItem('new_user_signup');
    // Navigate to dashboard
    navigate('/dashboard/student');
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
