import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onboardingTour } from '@/data/onboardingTour';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import VoiceGreeting from '@/components/dashboard/student/voice/VoiceGreeting';

const WelcomeFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [animationClass, setAnimationClass] = useState('animate-fade-in');
  const [showStudyPlanDialog, setShowStudyPlanDialog] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  const totalSteps = onboardingTour.length;

  useEffect(() => {
    // Get user data from localStorage
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try {
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // Set flag that welcome flow has been shown
    localStorage.setItem('sawWelcomeSlider', 'true');
    
    // Auto proceed to next screen after set time
    const timer = setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        handleNext();
      } else {
        handleComplete();
      }
    }, 7000);

    return () => clearTimeout(timer);
  }, [currentStep, totalSteps]);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setAnimationClass('animate-slide-out');
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setAnimationClass('animate-slide-in');
      }, 500);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setAnimationClass('animate-slide-out-reverse');
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setAnimationClass('animate-slide-in-reverse');
      }, 500);
    }
  };

  const handleComplete = () => {
    // Set welcome tour as completed
    localStorage.setItem('sawWelcomeTour', 'true');
    
    // Check if study plan creation is needed
    const needsStudyPlan = localStorage.getItem('needs_study_plan_creation') === 'true';
    
    if (needsStudyPlan) {
      // Show study plan dialog
      setShowStudyPlanDialog(true);
      
      // Remove the flag as we're now displaying the dialog
      localStorage.removeItem('needs_study_plan_creation');
    } else {
      // Otherwise proceed to dashboard
      navigateToDashboard();
    }
  };
  
  const navigateToDashboard = () => {
    toast({
      title: "Welcome to PREPZR!",
      description: "Your personalized learning journey begins now.",
    });
    
    navigate('/dashboard/student');
  };
  
  const handleCreateStudyPlan = () => {
    // Navigate to study plan creation
    navigate('/dashboard/student/study-plan');
  };

  const currentContent = onboardingTour[currentStep];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <VoiceGreeting 
        isFirstTimeUser={true}
        userName={userData?.name || "New User"}
        language="hi" // Changed to Hindi as default
      />
      
      <div className={`max-w-3xl w-full text-center p-8 ${animationClass}`}>
        <h1 className="text-4xl font-bold mb-6 text-indigo-800">{currentContent.title}</h1>
        
        <div className="mb-8">
          {currentContent.image && (
            <img 
              src={currentContent.image}
              alt={currentContent.title}
              className="mx-auto w-64 h-64 object-contain mb-6"
            />
          )}
          <p className="text-lg text-gray-700">{currentContent.description}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handlePrev} 
            disabled={currentStep === 0}
            className="px-6"
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 w-2 rounded-full ${currentStep === idx ? 'bg-blue-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          
          <Button 
            onClick={currentStep < totalSteps - 1 ? handleNext : handleComplete}
            className="px-6"
          >
            {currentStep < totalSteps - 1 ? 'Next' : 'Get Started'}
          </Button>
        </div>
      </div>
      
      {/* Study Plan Creation Dialog */}
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
          
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={navigateToDashboard}>Skip for now</Button>
            <Button onClick={handleCreateStudyPlan}>Create Study Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WelcomeFlow;
