
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingContext } from './OnboardingContext';
import WelcomeStep from './steps/WelcomeStep';
import RegistrationStep from './steps/RegistrationStep';
import UserTypeStep from './steps/UserTypeStep';
import GoalSelectionStep from './steps/GoalSelectionStep';
import StudyHabitsStep from './steps/StudyHabitsStep';
import ProfileCompleteStep from './steps/ProfileCompleteStep';
import ProgressIndicator from './ProgressIndicator';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

const SignupContent = () => {
  const { 
    currentStep, 
    setCurrentStep, 
    steps, 
    userType, 
    goalTitle,
    formData,
    updateFormData,
    handleSubmit
  } = useOnboardingContext();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle next step
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // On final step completion
      handleFinalSubmit();
    }
  };

  // Function to handle going back to previous step
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle final form submission
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      await handleSubmit();
      // Redirect to welcome screen instead of dashboard
      navigate('/welcome');
    } catch (error) {
      console.error('Error during signup:', error);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the current step's content
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={goToNextStep} />;
      case 1:
        return <UserTypeStep onNext={goToNextStep} />;
      case 2:
        return <GoalSelectionStep onNext={goToNextStep} />;
      case 3:
        return <RegistrationStep onNext={goToNextStep} />;
      case 4:
        return <StudyHabitsStep onNext={goToNextStep} />;
      case 5:
        return <ProfileCompleteStep onComplete={handleFinalSubmit} isSubmitting={isSubmitting} />;
      default:
        return <WelcomeStep onNext={goToNextStep} />;
    }
  };

  // Generate the correct step title
  const getStepTitle = () => {
    switch (currentStep) {
      case 0:
        return "Welcome to Prepzr";
      case 1:
        return "I am a...";
      case 2:
        return "What's your goal?";
      case 3:
        return "Create Your Account";
      case 4:
        return "Your Study Habits";
      case 5:
        return "Almost Done!";
      default:
        return "Sign Up";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            {currentStep > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 px-2 h-8"
                onClick={goToPreviousStep}
                disabled={isSubmitting}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
          </div>
          <div className="text-center flex-1">
            <h2 className="font-semibold text-lg">{getStepTitle()}</h2>
          </div>
          <div className="w-12"></div> {/* Spacer for alignment */}
        </div>

        {/* Progress indicator */}
        <ProgressIndicator currentStep={currentStep} totalSteps={steps.length} />

        {/* Current Step Content */}
        <div className="my-6">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default SignupContent;
