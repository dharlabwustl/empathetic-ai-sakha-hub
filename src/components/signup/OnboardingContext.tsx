
import React, { createContext, useState, useContext } from "react";
import { MoodType, PersonalityType, UserRole } from "@/types/user/base";

export type OnboardingStep = "role" | "goal" | "examDate" | "studyHours" | "subjects" | "studyPace" | "studyTime" | "demographics" | "personality" | "sentiment" | "habits" | "interests" | "signup";

export type UserGoal = string;

export interface OnboardingData {
  role?: UserRole;
  goal?: UserGoal;
  examDate?: Date;
  studyHours?: number;
  strongSubjects?: string[];
  weakSubjects?: string[];
  studyPace?: string;
  studyTime?: string;
  demographics?: Record<string, string>;
  personalityType?: PersonalityType;
  mood?: MoodType;
  habits?: Record<string, string>;
  interests?: string[];
  name?: string;
  mobile?: string;
}

interface OnboardingContextType {
  onboardingData: OnboardingData;
  setOnboardingData: React.Dispatch<React.SetStateAction<OnboardingData>>;
  currentStep: OnboardingStep;
  setStep: (step: OnboardingStep) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const steps: OnboardingStep[] = [
  "role", 
  "goal", 
  "examDate", 
  "studyHours", 
  "subjects", 
  "studyPace", 
  "studyTime",
  "demographics", 
  "personality", 
  "sentiment", 
  "habits", 
  "interests", 
  "signup"
];

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("role");
  
  const setStep = (step: OnboardingStep) => {
    setCurrentStep(step);
  };
  
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
    <OnboardingContext.Provider value={{ 
      onboardingData, 
      setOnboardingData, 
      currentStep, 
      setStep, 
      goToNextStep, 
      goToPreviousStep 
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
