
import React from 'react';
import { OnboardingStep } from './OnboardingContext';

interface SignupProgressBarProps {
  currentStep: OnboardingStep;
}

const steps: { key: OnboardingStep; label: string }[] = [
  { key: 'role', label: 'Role' },
  { key: 'goal', label: 'Goal' },
  { key: 'demographics', label: 'Details' },
  { key: 'personality', label: 'Learning Style' },
  { key: 'sentiment', label: 'Mood' },
  { key: 'habits', label: 'Habits' },
  { key: 'interests', label: 'Interests' },
  { key: 'signup', label: 'Account' },
];

const SignupProgressBar: React.FC<SignupProgressBarProps> = ({ currentStep }) => {
  // Find the current step index
  const currentIndex = steps.findIndex(step => step.key === currentStep);
  
  // Calculate progress
  const progress = ((currentIndex + 1) / steps.length) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600 dark:text-gray-400">Step {currentIndex + 1} of {steps.length}</span>
        <span className="text-blue-600 dark:text-blue-400 font-medium">{steps[currentIndex]?.label || 'Complete'}</span>
      </div>
      
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between mt-2 text-xs">
        <span className="text-gray-400">Getting Started</span>
        <span className="text-gray-400">Complete Profile</span>
      </div>
    </div>
  );
};

export default SignupProgressBar;
