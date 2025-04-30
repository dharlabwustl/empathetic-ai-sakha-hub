
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface SignupProgressBarProps {
  currentStep: string;
}

const SignupProgressBar: React.FC<SignupProgressBarProps> = ({ currentStep }) => {
  const steps = ['role', 'goal', 'demographics', 'personality', 'mood', 'habits', 'interests', 'signup'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progressPercentage = Math.min(Math.max((currentStepIndex / (steps.length - 1)) * 100, 0), 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-xs text-gray-500">
        <span>{currentStepIndex + 1}/{steps.length}</span>
        <span>{Math.round(progressPercentage)}% Complete</span>
      </div>
      <Progress value={progressPercentage} className="h-1" />
    </div>
  );
};

export default SignupProgressBar;
