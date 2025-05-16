
import React, { createContext, useContext, useState } from 'react';

export interface OnboardingData {
  // Personal details
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;

  // Education details
  educationLevel: string;
  targetExam: string;
  otherExam?: string;
  grade: string;
  schoolInstitute?: string; // Added school/institute field

  // Subject preferences
  selectedSubjects: string[];
  weakSubjects: string[];

  // Study preferences
  studyTime: string;
  studyHabit: string;
  studyGoal: string;

  // AI preferences
  useVoiceAssistant: boolean;
  dailyNotifications: boolean;
  languagePreference: string;
}

export interface OnboardingStepProps {
  data: OnboardingData;
  updateData: (update: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep?: () => void;
  onComplete?: () => void;
  isSubmitting?: boolean;
}

interface OnboardingContextProps {
  data: OnboardingData;
  updateData: (update: Partial<OnboardingData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  totalSteps: number;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}

const defaultData: OnboardingData = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  educationLevel: '',
  targetExam: '',
  grade: '',
  schoolInstitute: '', // Default empty string for school/institute
  selectedSubjects: [],
  weakSubjects: [],
  studyTime: '',
  studyHabit: '',
  studyGoal: '',
  useVoiceAssistant: true,
  dailyNotifications: true,
  languagePreference: 'english',
};

const OnboardingContext = createContext<OnboardingContextProps | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<OnboardingData>(defaultData);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const totalSteps = 5;

  const updateData = (update: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...update }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        data,
        updateData,
        currentStep,
        setCurrentStep,
        nextStep,
        prevStep,
        totalSteps,
        isSubmitting,
        setIsSubmitting,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
