
import React, { createContext, useContext, ReactNode, useState } from "react";
import { UserRole, MoodType, PersonalityType } from "@/types/user/base";

// Define types
export type UserGoal = string;

export interface OnboardingData {
  role?: UserRole;
  goal?: UserGoal;
  demographics?: Record<string, string>;
  personality?: PersonalityType;
  mood?: MoodType;
  habits?: Record<string, string>;
  interests?: string;
  targetExamDate?: string;
  name?: string;
  mobile?: string;
}

interface OnboardingContextType {
  onboardingData: OnboardingData;
  setOnboardingData: React.Dispatch<React.SetStateAction<OnboardingData>>;
  currentStep: string;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

// Define steps in order
const steps = ["role", "goal", "demographics", "personality", "mood", "habits", "interests", "signup"];

// Create the context
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Provider component
export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        onboardingData,
        setOnboardingData,
        currentStep: steps[currentStepIndex],
        goToNextStep,
        goToPrevStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

// Custom hook to use the context
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
