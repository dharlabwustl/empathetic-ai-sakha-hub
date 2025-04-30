
import React, { createContext, useContext, useState } from "react";
import { MoodType, PersonalityType, UserRole } from "@/types/user/base";

export type OnboardingStep = "role" | "goal" | "demographics" | "personality" | "mood" | "habits" | "interests" | "signup";

export interface OnboardingData {
  role?: UserRole;
  examGoal?: string;
  demographics?: Record<string, string>;
  targetExamDate?: string;
  personalityType?: PersonalityType;
  mood?: MoodType;
  habits?: Record<string, string>;
  interests?: string;
}

interface OnboardingContextType {
  currentStep: OnboardingStep;
  onboardingData: OnboardingData;
  setOnboardingData: (data: OnboardingData) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("role");
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});

  const steps: OnboardingStep[] = [
    "role",
    "goal",
    "demographics",
    "personality",
    "mood",
    "habits",
    "interests",
    "signup",
  ];

  const goToNextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        onboardingData,
        setOnboardingData,
        goToNextStep,
        goToPreviousStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
