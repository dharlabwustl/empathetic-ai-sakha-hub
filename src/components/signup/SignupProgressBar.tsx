
import React from "react";
import { OnboardingStep } from "./OnboardingContext";

interface SignupProgressBarProps {
  currentStep: OnboardingStep;
}

const SignupProgressBar: React.FC<SignupProgressBarProps> = ({ currentStep }) => {
  const steps: OnboardingStep[] = [
    "role",
    "goal",
    "demographics",
    "personality",
    "sentiment",
    "studyTime",
    "studyPace",
    "studyHours",
    "habits",
    "interests",
    "signup"
  ];

  const currentIndex = steps.indexOf(currentStep);
  const progress = Math.round(((currentIndex + 1) / steps.length) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
          Step {currentIndex + 1} of {steps.length}
        </span>
        <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
          {progress}% Complete
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className="h-2 bg-indigo-600 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SignupProgressBar;
