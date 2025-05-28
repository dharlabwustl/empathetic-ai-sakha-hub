
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeSlider from '@/components/welcome/WelcomeSlider';
import AdaptiveDashboardPersonalization from '@/components/onboarding/AdaptiveDashboardPersonalization';
import WelcomeTour from '@/components/dashboard/student/WelcomeTour';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const PostLoginWelcomeBack = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>({});
  const [currentStep, setCurrentStep] = useState<'slider' | 'personalization' | 'tour' | 'complete'>('slider');
  const [dashboardPreferences, setDashboardPreferences] = useState<any>(null);
  const [userName, setUserName] = useState("Student");
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        
        if (parsedData.name) {
          setUserName(parsedData.name);
        }
        
        if (parsedData.isFirstTimeUser) {
          setIsFirstTimeUser(true);
        }
        
        // Check what step user should be on
        const hasSeenSlider = localStorage.getItem('sawWelcomeSlider') === 'true';
        const hasPersonalizedDashboard = localStorage.getItem('dashboardPersonalized') === 'true';
        const hasSeenTour = localStorage.getItem('sawWelcomeTour') === 'true';
        
        if (hasSeenSlider && hasPersonalizedDashboard && hasSeenTour) {
          // User has completed everything, go to dashboard
          navigate('/dashboard/student', { replace: true });
          return;
        } else if (hasSeenSlider && hasPersonalizedDashboard) {
          setCurrentStep('tour');
        } else if (hasSeenSlider) {
          setCurrentStep('personalization');
        }
        
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const handleSliderComplete = () => {
    localStorage.setItem('sawWelcomeSlider', 'true');
    setCurrentStep('personalization');
  };
  
  const handlePersonalizationComplete = (preferences: any) => {
    setDashboardPreferences(preferences);
    localStorage.setItem('dashboardPersonalized', 'true');
    localStorage.setItem('dashboardPreferences', JSON.stringify(preferences));
    setCurrentStep('tour');
  };
  
  const handleTourSkip = () => {
    setShowSkipDialog(true);
  };
  
  const confirmSkipTour = () => {
    localStorage.setItem('sawWelcomeTour', 'true');
    setShowSkipDialog(false);
    handleComplete();
  };
  
  const cancelSkipTour = () => {
    setShowSkipDialog(false);
  };
  
  const handleTourComplete = () => {
    localStorage.setItem('sawWelcomeTour', 'true');
    handleComplete();
  };

  const handleComplete = () => {
    // Set final flags
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user_plan', 'FREE_TRIAL');
    localStorage.setItem('trial_start_date', Date.now().toString());
    localStorage.setItem('trial_days', '7');
    
    // Show success message
    toast({
      title: "Welcome to PREPZR!",
      description: `Your personalized ${dashboardPreferences?.examGoal || 'exam'} preparation dashboard is ready!`,
    });
    
    // Navigate to dashboard with adaptive layout
    navigate('/dashboard/student?personalized=true', { replace: true });
  };

  // Stop any voice announcements when component unmounts
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'slider':
        return <WelcomeSlider onComplete={handleSliderComplete} userData={userData} />;
      
      case 'personalization':
        return (
          <AdaptiveDashboardPersonalization 
            userProfile={userData}
            onComplete={handlePersonalizationComplete}
          />
        );
      
      case 'tour':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-950/30">
            <WelcomeTour 
              open={true} 
              onOpenChange={() => {}} 
              onSkipTour={handleTourSkip} 
              onCompleteTour={handleTourComplete}
              isFirstTimeUser={true}
              loginCount={1}
            />
          </div>
        );
      
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse text-center">
              <p className="text-xl">Setting up your personalized dashboard...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {renderCurrentStep()}
      
      {/* Skip tour confirmation dialog */}
      <Dialog open={showSkipDialog} onOpenChange={setShowSkipDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Skip the dashboard tour?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 dark:text-gray-300 py-4">
            The tour shows you how to use your personalized dashboard effectively. 
            You can always access it later from the help menu.
          </p>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button variant="outline" onClick={cancelSkipTour}>
              Take Tour
            </Button>
            <Button onClick={confirmSkipTour}>
              Skip & Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostLoginWelcomeBack;
