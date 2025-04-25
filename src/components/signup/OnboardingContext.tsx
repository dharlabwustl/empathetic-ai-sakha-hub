
import React, { createContext, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { MoodType, PersonalityType, UserRole } from "@/types/user/base";

// Export UserRole type for use in other components
export { UserRole };

// Define types for the step management
export type OnboardingStep = 
  | "role"
  | "goal"
  | "demographics" 
  | "personality" 
  | "sentiment" 
  | "habits" 
  | "interests" 
  | "signup";

// Define the type for user goals
export type UserGoal = string;

// Define the types for the form data
export interface OnboardingFormData {
  examType: string;
  examDate: Date | undefined;
  studyHours: number;
  studyTime: string;
  studyPace: string;
  subjects: string[];
  interests: string[];
}

// Define the context state type
export interface OnboardingContextState {
  step: OnboardingStep; // Changed from number to OnboardingStep
  totalSteps: number;
  formData: OnboardingFormData;
  // Additional properties needed by components
  onboardingData: any;
  setOnboardingData: (data: any) => void;
  messages: { content: string; isBot: boolean }[];
  setMessages: (messages: { content: string; isBot: boolean }[]) => void;
  setStep: (step: OnboardingStep) => void; // Changed from number to OnboardingStep
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<OnboardingFormData>) => void;
  completeOnboarding: () => void;
  loading: boolean;
}

// Create the context with a default value
const OnboardingContext = createContext<OnboardingContextState | undefined>(
  undefined
);

// Custom hook to use the onboarding context
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      "useOnboarding must be used within a OnboardingContextProvider"
    );
  }
  return context;
};

// Map numeric step to OnboardingStep type
const stepMap: Record<number, OnboardingStep> = {
  1: "role",
  2: "goal",
  3: "demographics",
  4: "personality",
  5: "sentiment",
  6: "habits",
  7: "interests",
  8: "signup"
};

// Map OnboardingStep type to numeric value
const stepNumberMap: Record<OnboardingStep, number> = {
  role: 1,
  goal: 2,
  demographics: 3,
  personality: 4,
  sentiment: 5,
  habits: 6,
  interests: 7,
  signup: 8
};

// Create the context provider component
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const step = stepMap[currentStep] as OnboardingStep;
  const totalSteps = 7;
  
  const [formData, setFormData] = useState<OnboardingFormData>({
    examType: "",
    examDate: undefined,
    studyHours: 4,
    studyTime: "morning",
    studyPace: "balanced",
    subjects: [],
    interests: [],
  });
  
  // Add additional state for onboarding data and messages
  const [onboardingData, setOnboardingData] = useState<any>({});
  const [messages, setMessages] = useState<{ content: string; isBot: boolean }[]>([
    { content: "Hi! I'm Sakha AI. Let's set up your personalized learning experience. What best describes you?", isBot: true }
  ]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Function to set step by OnboardingStep type
  const setStep = useCallback((newStep: OnboardingStep) => {
    setCurrentStep(stepNumberMap[newStep]);
  }, []);

  // Function to go to the next step
  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  }, [totalSteps]);

  // Function to go to the previous step
  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  // Function to update the form data
  const updateFormData = useCallback(
    (data: Partial<OnboardingFormData>) => {
      setFormData((prev) => ({ ...prev, ...data }));
    },
    []
  );

  // Function to complete the onboarding process
  const completeOnboarding = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store data in local storage
      localStorage.setItem("onboardingData", JSON.stringify(formData));

      // Show success message
      toast({
        title: "Onboarding Complete!",
        description: "Your preferences have been saved.",
      });

      // Redirect to dashboard
      navigate("/dashboard/student");
    } catch (error) {
      console.error("Onboarding failed:", error);
      toast({
        title: "Error",
        description: "Failed to complete onboarding.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [formData, navigate, toast]);

  // Provide the context value
  return (
    <OnboardingContext.Provider
      value={{
        step,
        totalSteps,
        formData,
        onboardingData,
        setOnboardingData,
        messages,
        setMessages,
        setStep,
        nextStep,
        prevStep,
        updateFormData,
        completeOnboarding,
        loading,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
