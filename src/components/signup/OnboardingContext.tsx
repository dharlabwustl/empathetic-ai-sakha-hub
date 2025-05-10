
import React, { createContext, useContext, useState } from 'react';

interface OnboardingContextType {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  formData: any;
  setFormData: (data: any) => void;
  updateFormData: (update: Partial<any>) => void;
  isGoogleSignUp: boolean;
  setIsGoogleSignUp: (value: boolean) => void;
  skipOnboarding: boolean;
  setSkipOnboarding: (value: boolean) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export const OnboardingProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isGoogleSignUp, setIsGoogleSignUp] = useState(false);
  const [skipOnboarding, setSkipOnboarding] = useState(false);

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => (prev > 1 ? prev - 1 : prev));
  };

  const updateFormData = (update: Partial<any>) => {
    setFormData(prev => ({ ...prev, ...update }));
  };

  return (
    <OnboardingContext.Provider
      value={{
        step,
        nextStep,
        prevStep,
        setStep,
        formData,
        setFormData,
        updateFormData,
        isGoogleSignUp,
        setIsGoogleSignUp,
        skipOnboarding,
        setSkipOnboarding
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
