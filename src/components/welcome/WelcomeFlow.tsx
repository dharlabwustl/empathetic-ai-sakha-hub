
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { StudyPlanCreationDialog } from './StudyPlanCreationDialog';
import { useToast } from '@/hooks/use-toast';

// Import any other components needed for the welcome flow

const WelcomeFlow = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showStudyPlanDialog, setShowStudyPlanDialog] = useState(false);
  const [tourCompleted, setTourCompleted] = useState(false);
  
  // Check if we need to show the study plan creation dialog
  useEffect(() => {
    // When the tour is completed, check if we need to show the study plan dialog
    if (tourCompleted) {
      const needsStudyPlan = localStorage.getItem('needs_study_plan_creation') === 'true';
      const isGoogleSignup = localStorage.getItem('google_signup') === 'true';
      
      if (needsStudyPlan || isGoogleSignup) {
        // Small delay to show the dialog after tour completion animation
        setTimeout(() => {
          setShowStudyPlanDialog(true);
        }, 800);
      } else {
        // If no study plan needed, redirect to dashboard
        navigateToDashboard();
      }
    }
  }, [tourCompleted]);
  
  const handleTourComplete = () => {
    setTourCompleted(true);
    
    toast({
      title: "Welcome Tour Completed",
      description: "Now let's create your personalized study plan",
    });
  };
  
  const handleCreateStudyPlan = (planData: any) => {
    console.log("Study plan created:", planData);
    
    // Clear the flags
    localStorage.removeItem('needs_study_plan_creation');
    localStorage.removeItem('google_signup');
    
    // Navigate to dashboard
    navigateToDashboard();
  };
  
  const handleSkipStudyPlan = () => {
    // Clear the flags
    localStorage.removeItem('needs_study_plan_creation');
    localStorage.removeItem('google_signup');
    
    toast({
      title: "Study Plan Skipped",
      description: "You can create a study plan later from your dashboard",
    });
    
    // Navigate to dashboard
    navigateToDashboard();
  };
  
  const navigateToDashboard = () => {
    navigate('/dashboard/student', { replace: true });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Your existing welcome tour components */}
      {/* For the sake of this example, we'll include a placeholder */}
      <div className="container mx-auto flex items-center justify-center min-h-screen">
        <div className="max-w-lg w-full text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to Your Learning Journey</h1>
          <p className="text-lg mb-8">Let's get you familiar with our platform.</p>
          
          {/* In a real implementation, this would be replaced with actual tour components */}
          <Button size="lg" onClick={handleTourComplete}>
            Complete Tour
          </Button>
        </div>
      </div>
      
      {/* Study Plan Creation Dialog */}
      <StudyPlanCreationDialog
        open={showStudyPlanDialog}
        onClose={handleSkipStudyPlan}
        onCreatePlan={handleCreateStudyPlan}
      />
    </div>
  );
};

export default WelcomeFlow;
