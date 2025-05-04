
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SignupForm from './SignupForm';
import WelcomeTourPrompt from './WelcomeTourPrompt';
import VoiceAssistantSetup from './VoiceAssistantSetup';
import { useOnboarding } from './OnboardingContext';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const SignupContent = () => {
  const navigate = useNavigate();
  const { userDetails, step, setStep } = useOnboarding();
  const [signupComplete, setSignupComplete] = useState(false);

  // Steps in order: signup form -> tour guide prompt -> voice assistant setup -> dashboard
  const handleSignupCompleted = () => {
    setSignupComplete(true);
    setStep('tour-prompt');
  };

  const handleTourPromptCompleted = (shouldShowTour: boolean) => {
    // Store user preference about showing the tour
    localStorage.setItem('showWelcomeTour', shouldShowTour ? 'true' : 'false');
    setStep('voice-setup');
  };

  const handleVoiceSetupCompleted = () => {
    // Mark the user as a new signup for welcome experiences
    localStorage.setItem('new_user_signup', 'true');
    // Navigate to dashboard with new=true parameter to trigger welcome experiences
    navigate('/dashboard/student?new=true');
  };

  const renderStep = () => {
    switch (step) {
      case 'signup-form':
        return <SignupForm onCompleted={handleSignupCompleted} />;
      case 'tour-prompt':
        return <WelcomeTourPrompt onCompleted={handleTourPromptCompleted} />;
      case 'voice-setup':
        return <VoiceAssistantSetup onCompleted={handleVoiceSetupCompleted} />;
      default:
        return <SignupForm onCompleted={handleSignupCompleted} />;
    }
  };

  return (
    <TooltipProvider>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        {renderStep()}
      </div>
    </TooltipProvider>
  );
};

export default SignupContent;
