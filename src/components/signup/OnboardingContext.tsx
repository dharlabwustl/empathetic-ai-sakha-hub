
import React, { createContext, useContext, useState } from 'react';

// Define the form data interface
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  goal: string;
  grade: string;
  school: string;
  subjects: string[];
}

// Define the context interface
interface OnboardingContextType {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  resetFormData: () => void;
}

// Create the context
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Default form data
const defaultFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  goal: 'NEET',
  grade: '',
  school: '',
  subjects: []
};

// Provider component
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prevData => ({ ...prevData, ...updates }));
  };

  const resetFormData = () => {
    setFormData(defaultFormData);
  };

  return (
    <OnboardingContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Custom hook to use the onboarding context
export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboardingContext must be used within an OnboardingProvider');
  }
  return context;
};
