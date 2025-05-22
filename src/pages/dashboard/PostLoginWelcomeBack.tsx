
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeSlider from '@/components/welcome/WelcomeSlider';
import WelcomeTour from '@/components/dashboard/student/WelcomeTour';
import WelcomeDashboardPrompt from '@/components/dashboard/student/WelcomeDashboardPrompt';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PostLoginWelcomeBack = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>({});
  const [showSlider, setShowSlider] = useState(true);
  const [showDashboardPrompt, setShowDashboardPrompt] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showStudyPlanDialog, setShowStudyPlanDialog] = useState(false);
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  
  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem('userData');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      // If no user data, redirect to login
      navigate('/login');
      return;
    }
    
    // For new users (who came from signup), go directly to tour
    // This is because they would have gone through the welcome-flow already
    const isNewUser = localStorage.getItem('new_user_signup') === 'true';
    const isGoogleSignup = localStorage.getItem('google_signup') === 'true';
    const sawWelcomeSlider = localStorage.getItem('sawWelcomeSlider') === 'true';
    const hasSeenDashboardWelcome = localStorage.getItem('hasSeenDashboardWelcome') === 'true';
    const hasSeenTour = localStorage.getItem('hasSeenTour') === 'true';
    const needsStudyPlanCreation = localStorage.getItem('needs_study_plan_creation') === 'true';
    
    if (isNewUser || isGoogleSignup) {
      // For new users, show welcome slider if they haven't seen it
      if (sawWelcomeSlider) {
        setShowSlider(false);
        
        // Show tour if they haven't seen it, then go directly to dashboard
        if (!hasSeenTour) {
          setShowTour(true);
          setShowDashboardPrompt(false);
        } 
        // If they've seen both tour and welcome, redirect
        else {
          redirectToDashboard();
        }
      }
      
      // Ensure we've set the login flag
      localStorage.setItem('isLoggedIn', 'true');
      
      // For Google signup, set special flag to show study plan dialog after tour
      if (isGoogleSignup) {
        localStorage.setItem('needs_study_plan_creation', 'true');
      }
      return;
    }
    
    // For returning users who have seen everything, skip directly to dashboard
    if (sawWelcomeSlider && hasSeenDashboardWelcome && hasSeenTour) {
      // Check if study plan creation is needed
      if (needsStudyPlanCreation) {
        setShowStudyPlanDialog(true);
        localStorage.removeItem('needs_study_plan_creation');
      } else {
        // Redirect to app subdomain for dashboard
        redirectToDashboard();
      }
      return;
    }
    
    // If they've seen the slider but not tour, show tour
    if (sawWelcomeSlider && !hasSeenTour) {
      setShowSlider(false);
      setShowTour(true);
      setShowDashboardPrompt(false);
      return;
    }
    
    // Auto-redirect after 45 seconds if no action taken
    const timer = setTimeout(() => {
      // Before redirecting, ensure login flag is set
      localStorage.setItem('isLoggedIn', 'true');
      redirectToDashboard();
      toast({
        title: "Welcome back!",
        description: "You've been automatically redirected to your dashboard."
      });
    }, 45000);
    
    return () => {
      clearTimeout(timer);
      // Stop any voice announcements when component unmounts
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [navigate, toast]);
  
  // Handle slider completion
  const handleSliderComplete = () => {
    localStorage.setItem('sawWelcomeSlider', 'true');
    setShowSlider(false);
    setShowTour(true); // Show tour first
    setShowDashboardPrompt(false);
  };
  
  // Handle tour completion
  const handleTourComplete = () => {
    localStorage.setItem('hasSeenTour', 'true');
    // Mark dashboard welcome as seen too to avoid showing both
    localStorage.setItem('hasSeenDashboardWelcome', 'true');
    localStorage.setItem('suppress_additional_prompts', 'true');
    redirectToDashboard();
  };
  
  // Handle skip tour
  const handleSkipTour = () => {
    setShowSkipDialog(true);
  };
  
  // Confirm skipping tour
  const confirmSkipTour = () => {
    localStorage.setItem('hasSeenTour', 'true');
    // Mark dashboard welcome as seen too to avoid showing both
    localStorage.setItem('hasSeenDashboardWelcome', 'true');
    localStorage.setItem('suppress_additional_prompts', 'true');
    setShowSkipDialog(false);
    redirectToDashboard();
  };
  
  // Cancel skip tour
  const cancelSkipTour = () => {
    setShowSkipDialog(false);
  };
  
  // Handle dashboard prompt completion
  const handleDashboardPromptComplete = () => {
    localStorage.setItem('hasSeenDashboardWelcome', 'true');
    setShowDashboardPrompt(false);
    
    // Check if study plan creation is needed (for new/Google signup users)
    if (localStorage.getItem('needs_study_plan_creation') === 'true') {
      localStorage.removeItem('needs_study_plan_creation');
      setShowStudyPlanDialog(true);
    } else {
      redirectToDashboard();
    }
  };
  
  const redirectToDashboard = () => {
    // Stop any voice announcements when navigating
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Redirect to app subdomain for dashboard
    const isLocalhost = window.location.hostname.includes('localhost');
    const dashboardUrl = isLocalhost 
      ? '/dashboard/student' 
      : `${window.location.protocol}//app.${window.location.hostname.replace('www.', '')}/dashboard/student`;
    
    if (isLocalhost) {
      navigate(dashboardUrl);
    } else {
      window.location.href = dashboardUrl;
    }
  };
  
  const handleCreateStudyPlan = () => {
    // Navigate to study plan creation
    navigate('/dashboard/student/create-study-plan');
  };
  
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Welcome slider for new users */}
      {showSlider && (
        <div className="h-full w-full">
          <WelcomeSlider 
            userName={userData.name || "Student"} 
            onComplete={handleSliderComplete}
          />
        </div>
      )}
      
      {/* Tour guide after welcome slider */}
      {showTour && !showSlider && (
        <div className="h-full w-full">
          <WelcomeTour 
            open={showTour}
            onOpenChange={setShowTour}
            onSkipTour={handleSkipTour}
            onCompleteTour={handleTourComplete}
            isFirstTimeUser={true}
            lastActivity={null}
            suggestedNextAction={null}
            loginCount={1}
          />
        </div>
      )}
      
      {/* Skip tour confirmation dialog */}
      <Dialog open={showSkipDialog} onOpenChange={setShowSkipDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Skip the welcome tour?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 dark:text-gray-300 py-4">
            The welcome tour helps you understand key features of PREPZR. 
            You can always access it later from the help menu.
          </p>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button variant="outline" onClick={cancelSkipTour}>
              Continue Tour
            </Button>
            <Button onClick={confirmSkipTour}>
              Skip Tour
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Study Plan Creation Dialog for Google signup users */}
      <Dialog open={showStudyPlanDialog} onOpenChange={setShowStudyPlanDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Your Personalized Study Plan</DialogTitle>
            <DialogDescription>
              To get the most out of PREPZR, let's create a personalized study plan based on your learning goals.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p>A personalized study plan will help you:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Focus on your specific exam requirements</li>
              <li>Track your progress effectively</li>
              <li>Get AI-powered recommendations</li>
              <li>Optimize your study time</li>
            </ul>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={redirectToDashboard}>Skip for now</Button>
            <Button onClick={handleCreateStudyPlan}>Create Study Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostLoginWelcomeBack;
