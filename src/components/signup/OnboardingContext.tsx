
import React, { createContext, useContext, useState } from 'react';
import { MoodType, PersonalityType, UserRole } from '@/types/user/base';

export type OnboardingStep = 
  | "role" 
  | "goal" 
  | "demographics" 
  | "personality" 
  | "sentiment"
  | "habits" 
  | "interests" 
  | "signup";

export { UserRole };

export type UserGoal = 
  | 'IIT-JEE' 
  | 'NEET' 
  | 'UPSC' 
  | 'JEE-Main' 
  | 'GATE' 
  | 'CAT' 
  | 'Banking' 
  | 'SSC' 
  | 'State-PCS'
  | 'Other';

interface OnboardingContextType {
  currentStep: OnboardingStep;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setStep: (step: OnboardingStep) => void;
  onboardingData: any;
  setOnboardingData: React.Dispatch<React.SetStateAction<any>>;
}

const OnboardingContext = createContext<OnboardingContextType>({
  currentStep: "role",
  goToNextStep: () => {},
  goToPreviousStep: () => {},
  setStep: () => {},
  onboardingData: {},
  setOnboardingData: () => {},
});

const STEPS: OnboardingStep[] = [
  "role", 
  "goal", 
  "demographics", 
  "personality", 
  "sentiment", 
  "habits", 
  "interests", 
  "signup"
];

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("role");
  const [onboardingData, setOnboardingData] = useState<any>({});

  const goToNextStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  };

  const setStep = (step: OnboardingStep) => {
    setCurrentStep(step);
  };

  return (
    <OnboardingContext.Provider 
      value={{ 
        currentStep, 
        goToNextStep, 
        goToPreviousStep, 
        setStep,
        onboardingData,
        setOnboardingData
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);
