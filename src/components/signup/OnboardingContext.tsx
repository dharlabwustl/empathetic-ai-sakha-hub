
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface OnboardingContextType {
  currentStep: number;
  formData: {
    name: string;
    email: string;
    password: string;
    examGoal: string;
    mobile?: string;
    agreeToTerms: boolean;
    [key: string]: any; // For additional data
  };
  updateFormData: (data: Partial<any>) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  submitForm: () => void;
  isSubmitting: boolean;
}

const defaultFormData = {
  name: '',
  email: '',
  password: '',
  examGoal: '',
  agreeToTerms: false,
};

const OnboardingContext = createContext<OnboardingContextType>({
  currentStep: 1,
  formData: defaultFormData,
  updateFormData: () => {},
  nextStep: () => {},
  prevStep: () => {},
  resetForm: () => {},
  submitForm: () => {},
  isSubmitting: false,
});

export const useOnboarding = () => useContext(OnboardingContext);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data });
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData(defaultFormData);
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      // Here you would typically call your API to register the user
      
      // Mock successful registration
      // Store user data in localStorage for demo
      localStorage.setItem('userData', JSON.stringify({
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        name: formData.name || 'New User',
        email: formData.email,
        role: 'student',
        examGoal: formData.examGoal || 'IIT-JEE',
        isActive: true,
        loginCount: 1,
        createdAt: new Date().toISOString()
      }));
      
      // Navigate directly to the study plan creation animation screen
      navigate('/study-plan-creation?new=true');
    } catch (error) {
      console.error('Error registering user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        formData,
        updateFormData,
        nextStep,
        prevStep,
        resetForm,
        submitForm,
        isSubmitting,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
