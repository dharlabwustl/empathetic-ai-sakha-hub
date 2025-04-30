
import React, { createContext, useState, useContext } from "react";
import { MoodType, UserRole } from "@/types/user/base";

export type OnboardingStep = "role" | "goal" | "demographics" | "personality" | "sentiment" | "signup";

interface OnboardingContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: string[];
  role: UserRole | string;
  setRole: (type: UserRole | string) => void;
  goalTitle: string;
  setGoalTitle: (goal: string) => void;
  examGoal: string;
  setExamGoal: (exam: string) => void;
  formData: any;
  updateFormData: (data: any) => void;
  onboardingData: any;
  handleSubmit: () => Promise<void>;
}

const defaultOnboardingContext: OnboardingContextType = {
  currentStep: 0,
  setCurrentStep: () => {},
  steps: ["welcome", "userType", "goal", "registration", "study", "complete"],
  role: "",
  setRole: () => {},
  goalTitle: "",
  setGoalTitle: () => {},
  examGoal: "",
  setExamGoal: () => {},
  formData: {},
  updateFormData: () => {},
  onboardingData: {},
  handleSubmit: async () => {},
};

const OnboardingContext = createContext<OnboardingContextType>(defaultOnboardingContext);

export const useOnboardingContext = () => useContext(OnboardingContext);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [role, setRole] = useState<UserRole | string>("");
  const [goalTitle, setGoalTitle] = useState("");
  const [examGoal, setExamGoal] = useState("");
  const [formData, setFormData] = useState<any>({});
  
  const steps = ["welcome", "userType", "goal", "registration", "study", "complete"];
  
  const updateFormData = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
  };
  
  const onboardingData = {
    role,
    goalTitle,
    examGoal,
    ...formData
  };

  const handleSubmit = async () => {
    // Mock submission - in a real app, this would send data to your API
    console.log("Submitting onboarding data:", onboardingData);
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Save to localStorage for demo purposes
        localStorage.setItem("userData", JSON.stringify({
          ...onboardingData,
          completedOnboarding: true,
          registerDate: new Date().toISOString(),
        }));
        
        resolve();
      }, 1000);
    });
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        steps,
        role,
        setRole,
        goalTitle,
        setGoalTitle,
        examGoal,
        setExamGoal,
        formData,
        updateFormData,
        onboardingData,
        handleSubmit,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
