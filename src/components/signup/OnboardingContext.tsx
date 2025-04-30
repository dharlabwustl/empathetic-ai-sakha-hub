
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MoodType, PersonalityType, UserRole } from '@/types/user/base';

export type UserGoal = string;

export interface OnboardingData {
  role?: UserRole;
  goal?: UserGoal;
  demographics?: Record<string, string>;
  personality?: PersonalityType;
  mood?: MoodType;
  habits?: Record<string, string>;
  interests?: string;
  name?: string;
  mobile?: string;
}

interface OnboardingContextProps {
  onboardingData: OnboardingData;
  setOnboardingData: (data: OnboardingData) => void;
  currentStep: string;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: string) => void;
}

const OnboardingContext = createContext<OnboardingContextProps | undefined>(undefined);

export const useOnboarding = (): OnboardingContextProps => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

interface OnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});
  
  // Define the steps in the onboarding flow
  const steps = ['role', 'goal', 'demographics', 'personality', 'mood', 'habits', 'interests', 'signup'];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  const goToStep = (step: string) => {
    const stepIndex = steps.indexOf(step);
    if (stepIndex !== -1) {
      setCurrentStepIndex(stepIndex);
    }
  };
  
  return (
    <OnboardingContext.Provider
      value={{
        onboardingData,
        setOnboardingData,
        currentStep: steps[currentStepIndex],
        goToNextStep,
        goToPreviousStep,
        goToStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

// Explicitly export UserRole to fix import error in CreateStudyPlanWizard
export { UserRole };
