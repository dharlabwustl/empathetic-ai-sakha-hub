import React, { createContext, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
  step: number;
  totalSteps: number;
  formData: OnboardingFormData;
  setStep: (step: number) => void;
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

// Create the context provider component
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState(1);
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Function to go to the next step
  const nextStep = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, totalSteps));
  }, [totalSteps]);

  // Function to go to the previous step
  const prevStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1));
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

  // Initial state for the context
  const initialState: OnboardingContextState = {
    step: 1,
    totalSteps: 7,
    formData: {
      examType: "",
      examDate: undefined,
      studyHours: 4,
      studyTime: "morning",
      studyPace: "balanced",
      subjects: [],
      interests: [] as string[], // Fix the type error by explicitly typing as string[]
    },
    setStep: () => {},
    nextStep: () => {},
    prevStep: () => {},
    updateFormData: () => {},
    completeOnboarding: () => {},
    loading: false,
  };

  // Provide the context value
  return (
    <OnboardingContext.Provider
      value={{
        step,
        totalSteps,
        formData,
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
