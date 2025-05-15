
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { OnboardingStep, UserRole, UserGoal } from "./OnboardingContext";
import { MoodType } from "@/types/user/base";

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

  const handleRoleSelect = (role: UserRole) => {
    setOnboardingData({ ...onboardingData, role });
    setMessages([
      ...messages, 
      { content: role, isBot: false },
      { content: "Which exam are you preparing for?", isBot: true }
    ]);
    setStep("goal");
  };
  
  const handleSignupSubmit = async (formValues: { name: string; mobile: string; otp: string }) => {
    setIsLoading(true);
    
    try {
      // Clean up user input
      const cleanName = formValues.name.trim();
      const cleanMobile = formValues.mobile.trim();
      
      // Create a user object with the collected data
      const userData = {
        name: cleanName,
        email: `${cleanMobile}@prepzr.com`, // Use consistent email format based on mobile
        phoneNumber: cleanMobile,
        password: formValues.otp, // Simplified password for easier login
        role: (onboardingData.role || 'Student').toLowerCase(), // Make sure role is lowercase
      };
      
      console.log("Registering user:", userData);
      
      // For demo, mock a successful registration
      // Set user in state and localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'student');
      
      // Set as new user for onboarding flow
      localStorage.setItem('new_user_signup', 'true');
      
      // Store complete user data for profile
      const extendedUserData = {
        ...onboardingData,
        name: cleanName,
        phoneNumber: cleanMobile,
        completedOnboarding: false, // Mark as not completed to trigger onboarding flow
        isNewUser: true,
        sawWelcomeTour: false,
        mood: MoodType.MOTIVATED
      };
      localStorage.setItem("userData", JSON.stringify(extendedUserData));
      
      toast({
        title: "Welcome to Prepzr!",
        description: "Let's create your personalized study plan.",
      });
      
      // Go directly to the dashboard with parameters to show onboarding
      navigate("/dashboard/student?completedOnboarding=false&new=true");
      
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
      handleGoalSelect: (goal: UserGoal) => {
        setOnboardingData({ ...onboardingData, goal });
        setMessages([
          ...messages, 
          { content: goal, isBot: false },
          { content: "Tell us more about yourself to personalize your learning experience.", isBot: true }
        ]);
        setStep("demographics");
      },
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
        
        setOnboardingData({ ...onboardingData, demographics: cleanData });
        setMessages([
          ...messages, 
          { content: userMessage, isBot: false },
          { content: "Thanks for sharing! Now, let's create your account.", isBot: true }
        ]);
        setStep("signup");
      },
      handleSignupSubmit
    }
  };
};

export default StepHandler;
