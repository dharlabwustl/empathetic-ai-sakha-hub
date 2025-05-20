
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
    const needsStudyPlanCreation = localStorage.getItem('needs_study_plan_creation') === 'true';
    
    if (isNewUser || isGoogleSignup) {
      // For new users, show welcome slider if they haven't seen it
      if (sawWelcomeSlider) {
        setShowSlider(false);
        // Show dashboard prompt if they haven't seen it
        if (hasSeenDashboardWelcome) {
          setShowDashboardPrompt(false);
          setShowTour(true);
        } else {
          setShowDashboardPrompt(true);
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
    
    // For returning users who have seen both, skip directly to dashboard
    const sawWelcomeTour = localStorage.getItem('sawWelcomeTour') === 'true';
    
    if (sawWelcomeSlider && hasSeenDashboardWelcome && sawWelcomeTour) {
      // Check if study plan creation is needed
      if (needsStudyPlanCreation) {
        setShowStudyPlanDialog(true);
        localStorage.removeItem('needs_study_plan_creation');
      } else {
        navigate('/dashboard/student');
      }
      return;
    }
    
    // If they've seen the slider but not the dashboard welcome, show dashboard welcome
    if (sawWelcomeSlider && !hasSeenDashboardWelcome) {
      setShowSlider(false);
      setShowDashboardPrompt(true);
      return;
    }
    
    // If they've seen the slider and dashboard welcome but not the tour, show tour
    if (sawWelcomeSlider && hasSeenDashboardWelcome && !sawWelcomeTour) {
      setShowSlider(false);
      setShowDashboardPrompt(false);
      setShowTour(true);
      return;
    }
    
    // Auto-redirect after 45 seconds if no action taken
    const timer = setTimeout(() => {
      // Before redirecting, ensure login flag is set
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard/student');
      toast({
        title: "Welcome back!",
        description: "You've been automatically redirected to your dashboard."
      });
    }, 45000);
    
    return () => clearTimeout(timer);
  }, [navigate, toast]);
  
  // Handle slider completion
  const handleSliderComplete = () => {
    localStorage.setItem('sawWelcomeSlider', 'true');
    setShowSlider(false);
    setShowDashboardPrompt(true);
  };
  
  // Handle dashboard prompt completion
  const handleDashboardPromptComplete = () => {
    localStorage.setItem('hasSeenDashboardWelcome', 'true');
    setShowDashboardPrompt(false);
    setShowTour(true);
  };
  
  // Handle tour completion
  const handleTourComplete = () => {
    localStorage.setItem('sawWelcomeTour', 'true');
    setShowTour(false);
    
    // Check if study plan creation is needed (for new/Google signup users)
    if (localStorage.getItem('needs_study_plan_creation') === 'true') {
      localStorage.removeItem('needs_study_plan_creation');
      setShowStudyPlanDialog(true);
    } else {
      navigateToDashboard();
    }
  };
  
  const navigateToDashboard = () => {
    navigate('/dashboard/student');
  };
  
  const handleCreateStudyPlan = () => {
    // Navigate to study plan creation
    navigate('/dashboard/student/create-study-plan');
  };
  
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Welcome slider for new users */}
      {showSlider && (
        <div className="h-full w-full">
          <WelcomeSlider 
            userName={userData.name || "Student"} 
            onComplete={handleSliderComplete}
          />
        </div>
      )}
      
      {/* Dashboard welcome prompt after slider */}
      {showDashboardPrompt && (
        <WelcomeDashboardPrompt 
          userName={userData.name || "Student"}
          onComplete={handleDashboardPromptComplete}
        />
      )}
      
      {/* Tour guide after dashboard welcome */}
      {showTour && (
        <div className="h-full w-full">
          <WelcomeTour 
            open={showTour}
            onOpenChange={setShowTour}
            onSkipTour={handleTourComplete}
            onCompleteTour={handleTourComplete}
            isFirstTimeUser={true}
            lastActivity={null}
            suggestedNextAction={null}
            loginCount={1}
          />
        </div>
      )}
      
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
            <Button variant="outline" onClick={navigateToDashboard}>Skip for now</Button>
            <Button onClick={handleCreateStudyPlan}>Create Study Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostLoginWelcomeBack;
