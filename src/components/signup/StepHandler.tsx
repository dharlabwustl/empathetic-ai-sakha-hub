
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { OnboardingStep } from "./OnboardingContext";
import authService from "@/services/auth/authService"; 
import { MoodType, UserRole } from "@/types/user/base";

interface StepHandlerProps {
  onboardingData: any;
  setOnboardingData: (data: any) => void;
  messages: { content: string; isBot: boolean }[];
  setMessages: (messages: { content: string; isBot: boolean }[]) => void;
  setStep: (step: OnboardingStep) => void;
}

const StepHandler = ({ 
  onboardingData, 
  setOnboardingData, 
  messages, 
  setMessages, 
  setStep 
}: StepHandlerProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: UserRole | string) => {
    setOnboardingData({ ...onboardingData, role });
    setMessages([
      ...messages, 
      { content: role, isBot: false },
      { content: "Which exam are you preparing for?", isBot: true }
    ]);
    setStep("goal");
  };

  const handleGoalSelect = (goal: string) => {
    setOnboardingData({ ...onboardingData, goal });
    setMessages([
      ...messages, 
      { content: goal, isBot: false },
      { content: "Tell us more about yourself to personalize your learning experience.", isBot: true }
    ]);
    setStep("demographics");
  };
  
  const handleSignupSubmit = async (formValues: { name: string; mobile: string; otp: string; agreeTerms: boolean }) => {
    setIsLoading(true);
    
    try {
      // Clean up user input
      const cleanName = formValues.name.trim();
      const cleanMobile = formValues.mobile.trim();
      
      // Create a user object with the collected data
      const userData = {
        name: cleanName,
        email: `${cleanMobile}@sakha.ai`, // Use consistent email format based on mobile
        phoneNumber: cleanMobile,
        password: formValues.otp, // Simplified password for easier login
        role: (onboardingData.role || 'Student').toLowerCase(), // Make sure role is lowercase
      };
      
      console.log("Registering user:", userData);
      
      // Register the user using auth service
      const response = await authService.register({
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        password: userData.password,
        role: userData.role
      });
      
      if (response.success && response.data) {
        console.log("Registration successful:", response.data);
        
        // Save additional onboarding data to localStorage with consistent format
        const extendedUserData = {
          ...response.data,
          ...onboardingData,
          name: cleanName,
          phoneNumber: cleanMobile,
          completedOnboarding: true, // Changed to true to skip onboarding flow
          isNewUser: true,
          sawWelcomeTour: false
        };
        
        localStorage.setItem("userData", JSON.stringify(extendedUserData));
        
        toast({
          title: "Welcome to Sakha AI!",
          description: "Your account has been created successfully.",
        });
        
        // Redirect to welcome screen
        navigate("/welcome");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handlers: {
      handleRoleSelect,
      handleGoalSelect,
      handleDemographicsSubmit: (data: Record<string, string>) => {
        // Create a readable message for chat
        let userMessage = "";
        Object.entries(data).forEach(([key, value]) => {
          userMessage += `${key}: ${value.trim()}, `;
        });
        userMessage = userMessage.slice(0, -2); // Remove trailing comma
        
        // Clean the data by trimming all string values
        const cleanData: Record<string, string> = {};
        Object.entries(data).forEach(([key, value]) => {
          cleanData[key] = value.trim();
        });
        
        setOnboardingData({ ...onboardingData, ...cleanData });
        
        setMessages([
          ...messages, 
          { content: userMessage, isBot: false },
          { content: "Let's understand your personality type with a short quiz. Which of these best describes your approach to learning?", isBot: true }
        ]);
        setStep("personality");
      },
      handlePersonalitySelect: (personality: string) => {
        setOnboardingData({ ...onboardingData, personalityType: personality });
        setMessages([
          ...messages,
          { content: personality, isBot: false },
          { content: "How are you feeling about your studies/work today?", isBot: true }
        ]);
        setStep("sentiment");
      },
      handleMoodSelect: (mood: MoodType) => {
        setOnboardingData({ ...onboardingData, mood });
        setMessages([
          ...messages,
          { content: mood, isBot: false },
          { content: "Great! Let's understand your study preferences.", isBot: true }
        ]);
        setStep("signup");
      },
      handleSignupSubmit
    }
  };
};

export default StepHandler;
