
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Form data types
export interface OnboardingFormData {
  userType: 'student' | 'parent' | 'teacher' | '';
  goalId: string;
  goalTitle: string;
  name: string;
  email: string;
  password: string;
  gradeLevel?: string;
  school?: string;
  username?: string;
  studyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  studyPace?: 'slow' | 'moderate' | 'fast';
  studyHoursPerDay?: number;
  useGoogleSignup?: boolean;
}

// Context types
interface OnboardingContextType {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: OnboardingFormData;
  updateFormData: (data: Partial<OnboardingFormData>) => void;
  handleSubmit: () => Promise<void>;
  userType: string;
  goalId: string;
  goalTitle: string;
  isLoading: boolean;
}

// Create context
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Provider component
export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Define all steps in the onboarding process
  const steps = [
    'welcome',
    'user-type',
    'goal',
    'registration',
    'study-habits',
    'complete',
  ];
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initial form data
  const [formData, setFormData] = useState<OnboardingFormData>({
    userType: '',
    goalId: '',
    goalTitle: '',
    name: '',
    email: '',
    password: '',
    studyTime: 'afternoon',
    studyPace: 'moderate',
    studyHoursPerDay: 4,
    useGoogleSignup: false
  });
  
  // Update form data
  const updateFormData = (data: Partial<OnboardingFormData>) => {
    setFormData(prevData => ({ ...prevData, ...data }));
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // In a real app, we would make an API call here
      console.log('Form submitted with data:', formData);
      
      // Mock successful signup
      localStorage.setItem('userProfile', JSON.stringify({
        id: 'mock-user-id',
        name: formData.name,
        email: formData.email,
        userType: formData.userType,
        goals: [{
          id: formData.goalId,
          title: formData.goalTitle
        }],
        preferences: {
          studyTime: formData.studyTime,
          studyPace: formData.studyPace,
          studyHoursPerDay: formData.studyHoursPerDay
        },
        createdAt: new Date().toISOString(),
        isNewUser: true,
        loginCount: 1
      }));
      
      // Store auth token
      localStorage.setItem('authToken', 'mock-auth-token');
      
      toast({
        title: "Account created!",
        description: "You have successfully signed up.",
      });
      
      // The Welcome page redirect is now handled in SignupContent.tsx
      return Promise.resolve();
    } catch (error) {
      console.error('Error during signup:', error);
      toast({
        title: "Signup failed",
        description: "There was a problem creating your account.",
        variant: "destructive",
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const value = {
    steps,
    currentStep,
    setCurrentStep,
    formData,
    updateFormData,
    handleSubmit,
    userType: formData.userType,
    goalId: formData.goalId,
    goalTitle: formData.goalTitle,
    isLoading,
  };
  
  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Custom hook to use the context
export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboardingContext must be used within OnboardingProvider');
  }
  return context;
};
