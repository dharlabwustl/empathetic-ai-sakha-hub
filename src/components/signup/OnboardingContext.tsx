
import React, { createContext, useContext, useState } from 'react';

// Define the types of steps in the onboarding process
export type OnboardingStep = 'role' | 'goal' | 'demographics' | 'personality' | 'sentiment' | 'habits' | 'interests' | 'signup' | 'welcome';

// Define the user roles
export enum UserRole {
  Student = 'Student',
  Professional = 'Professional',
  Researcher = 'Researcher',
  Entrepreneur = 'Entrepreneur',
  Teacher = 'Teacher',
}

// Define goal types
export type UserGoal = 'NEET' | 'IIT-JEE' | 'UPSC' | 'CAT' | 'SSC' | 'Banking' | 'GATE' | 'CLAT' | 'Defense' | 'Other';

// Define personality types
export enum PersonalityType {
  Analytical = 'Analytical',
  Creative = 'Creative',
  Practical = 'Practical',
  Social = 'Social',
  Reflective = 'Reflective',
}

interface OnboardingContextType {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  formData: any;
  setFormData: (data: any) => void;
  updateFormData: (update: Partial<any>) => void;
  isGoogleSignUp: boolean;
  setIsGoogleSignUp: (value: boolean) => void;
  skipOnboarding: boolean;
  setSkipOnboarding: (value: boolean) => void;
  shouldPromptStudyPlan: boolean;
  setShouldPromptStudyPlan: (value: boolean) => void;
  onboardingData: any;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export const OnboardingProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [onboardingData, setOnboardingData] = useState({});
  const [isGoogleSignUp, setIsGoogleSignUp] = useState(false);
  const [skipOnboarding, setSkipOnboarding] = useState(false);
  const [shouldPromptStudyPlan, setShouldPromptStudyPlan] = useState(false);

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => (prev > 1 ? prev - 1 : prev));
  };

  const updateFormData = (update: Partial<any>) => {
    setFormData(prev => ({ ...prev, ...update }));
    setOnboardingData(prev => ({ ...prev, ...update }));
  };

  return (
    <OnboardingContext.Provider
      value={{
        step,
        nextStep,
        prevStep,
        setStep,
        formData,
        setFormData,
        updateFormData,
        isGoogleSignUp,
        setIsGoogleSignUp,
        skipOnboarding,
        setSkipOnboarding,
        shouldPromptStudyPlan,
        setShouldPromptStudyPlan,
        onboardingData
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
