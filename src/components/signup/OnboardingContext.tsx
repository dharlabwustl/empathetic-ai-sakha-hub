
import React, { createContext, useContext, useState } from "react";
import { PersonalityType, MoodType, UserRole } from "@/types/user/base";

// Re-export UserRole from base.ts
export { UserRole };
export type UserGoal = string;
export type OnboardingStep = 
  | "role"
  | "goal"
  | "demographics"
  | "personality"
  | "sentiment"
  | "habits"
  | "interests"
  | "signup"
  | "completed";  // Added "completed" step

export interface OnboardingData {
  role?: UserRole;
  goal?: string;
  age?: string;
  grade?: string;
  location?: string;
  jobRole?: string;
  seniorityLevel?: string;
  domain?: string;
  specialization?: string;
  institution?: string;
  research?: string;
  startupStage?: string;
  teamSize?: string;
  industry?: string;
  personalityType?: PersonalityType;
  mood?: MoodType;
  sleepPattern?: string;
  dailyRoutine?: string;
  stressManagement?: string;
  focusDuration?: string;
  studyPreference?: string;
  interests?: string[];
  completedOnboarding?: boolean;
  
  // Added missing properties
  name?: string;
  phoneNumber?: string;
}

interface OnboardingContextType {
  step: OnboardingStep;
  setStep: React.Dispatch<React.SetStateAction<OnboardingStep>>;
  onboardingData: OnboardingData;
  setOnboardingData: React.Dispatch<React.SetStateAction<OnboardingData>>;
  messages: { content: string; isBot: boolean }[];
  setMessages: React.Dispatch<React.SetStateAction<{ content: string; isBot: boolean }[]>>;
}

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<OnboardingStep>("role");
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});
  const [messages, setMessages] = useState([
    { content: "Hi, I'm Sakha – your personal AI companion for learning, growth, and well-being. What best describes you?", isBot: true }
  ]);

  return (
    <OnboardingContext.Provider value={{
      step,
      setStep,
      onboardingData,
      setOnboardingData,
      messages,
      setMessages
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
