
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
  | "complete";

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
}

interface OnboardingContextType {
  step: OnboardingStep;
  setStep: React.Dispatch<React.SetStateAction<OnboardingStep>>;
  onboardingData: OnboardingData;
  setOnboardingData: React.Dispatch<React.SetStateAction<OnboardingData>>;
  messages: { content: string; isBot: boolean }[];
  setMessages: React.Dispatch<React.SetStateAction<{ content: string; isBot: boolean }[]>>;
  validateFieldNotEmpty: (field: keyof OnboardingData) => boolean;
  clearDuplicateEntries: () => void;
  completeOnboarding: () => void;
}

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<OnboardingStep>("role");
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});
  const [messages, setMessages] = useState([
    { content: "Hi, I'm Sakha – your personal AI companion for learning, growth, and well-being. What best describes you?", isBot: true }
  ]);

  // Helper function to validate if a field is empty
  const validateFieldNotEmpty = (field: keyof OnboardingData) => {
    const value = onboardingData[field];
    return value !== undefined && value !== null && value !== "";
  };

  // Helper function to clear duplicate entries by removing whitespace and normalizing
  const clearDuplicateEntries = () => {
    const cleanData = { ...onboardingData };
    
    // Clean text fields (trim whitespace)
    Object.keys(cleanData).forEach(key => {
      const fieldKey = key as keyof OnboardingData;
      if (typeof cleanData[fieldKey] === 'string') {
        cleanData[fieldKey] = (cleanData[fieldKey] as string).trim();
      }
    });
    
    // Clean arrays (remove duplicates)
    if (cleanData.interests && Array.isArray(cleanData.interests)) {
      cleanData.interests = Array.from(new Set(cleanData.interests.map(item => item.trim())));
    } else if (cleanData.interests && typeof cleanData.interests === 'string') {
      // Convert string to array of strings if needed
      cleanData.interests = Array.from(new Set([(cleanData.interests as unknown as string).trim()]));
    }
    
    setOnboardingData(cleanData);
  };
  
  // Function to mark onboarding as complete
  const completeOnboarding = () => {
    clearDuplicateEntries();
    setOnboardingData({...onboardingData, completedOnboarding: true});
    setStep("complete");
    
    // Store in localStorage for persistence
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      localStorage.setItem("userData", JSON.stringify({
        ...parsedData,
        ...onboardingData,
        completedOnboarding: true
      }));
    } else {
      localStorage.setItem("userData", JSON.stringify({
        ...onboardingData,
        completedOnboarding: true
      }));
    }
  };

  return (
    <OnboardingContext.Provider value={{
      step,
      setStep,
      onboardingData,
      setOnboardingData,
      messages,
      setMessages,
      validateFieldNotEmpty,
      clearDuplicateEntries,
      completeOnboarding
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
