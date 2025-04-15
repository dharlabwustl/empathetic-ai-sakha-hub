
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { UserRole, UserGoal, OnboardingStep } from "./OnboardingContext";
import { getDemographicsQuestion } from "./utils/stepUtils";
import authService from "@/services/auth/authService";

interface StepHandlerProps {
  onboardingData: any;
  setOnboardingData: (data: any) => void;
  messages: { content: string; isBot: boolean }[];
  setMessages: (messages: { content: string; isBot: boolean }[]) => void;
  setStep: React.Dispatch<React.SetStateAction<OnboardingStep>>;
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
      { content: getDemographicsQuestion(role), isBot: true }
    ]);
    setStep("demographics");
  };
  
  const handleSignupSubmit = async (formValues: { name: string; mobile: string; otp: string }) => {
    setIsLoading(true);
    
    try {
      // Create a user object with the collected data
      const userData = {
        name: formValues.name,
        email: `${formValues.mobile}@sakha.ai`, // Use consistent email format based on mobile
        phoneNumber: formValues.mobile,
        password: formValues.otp, // Simplified password for easier login
        role: (onboardingData.role || 'student').toLowerCase(), // Make sure role is lowercase
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
          ...onboardingData,
          name: formValues.name,
          phoneNumber: formValues.mobile,
          completedOnboarding: false, // This will trigger the onboarding flow
          isNewUser: true,
          sawWelcomeTour: false,
          loginCount: 1
        };
        
        localStorage.setItem("userData", JSON.stringify(extendedUserData));
        
        toast({
          title: "Welcome to Sakha AI!",
          description: "Let's customize your learning experience.",
        });
        
        // Use completedOnboarding=true AND new=true to ensure the onboarding flow is shown
        navigate(`/dashboard/student?completedOnboarding=true&new=true`);
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
      handleDemographicsSubmit: (data: Record<string, string>) => {
        // Create a readable message for chat
        let userMessage = "";
        Object.entries(data).forEach(([key, value]) => {
          userMessage += `${key}: ${value}, `;
        });
        userMessage = userMessage.slice(0, -2); // Remove trailing comma
        
        setOnboardingData({ ...onboardingData, ...data });
        
        let nextQuestion = "What's your primary goal?";
        if (onboardingData.role === "Student") {
          nextQuestion = "Which exam are you preparing for?";
        }
        
        setMessages([
          ...messages, 
          { content: userMessage, isBot: false },
          { content: nextQuestion, isBot: true }
        ]);
        setStep("goal");
      },
      handleGoalSelect: (goal: UserGoal) => {
        setOnboardingData({ ...onboardingData, goals: [goal] });
        setMessages([
          ...messages, 
          { content: goal, isBot: false },
          { content: "Let's understand your personality type with a short quiz. Which of these best describes your approach to learning?", isBot: true }
        ]);
        setStep("personality");
      },
      handlePersonalitySelect: (personality: string) => {
        setOnboardingData({ ...onboardingData, personality });
        setMessages([
          ...messages,
          { content: personality, isBot: false },
          { content: "How are you feeling about your studies/work today?", isBot: true }
        ]);
        setStep("sentiment");
      },
      handleMoodSelect: (mood: string) => {
        setOnboardingData({ ...onboardingData, mood });
        setMessages([
          ...messages,
          { content: mood, isBot: false },
          { content: "Let's understand your study habits better. How would you describe your sleep pattern and daily routine?", isBot: true }
        ]);
        setStep("habits");
      },
      handleHabitsSubmit: (habits: Record<string, string>) => {
        // Clean up habits data
        const cleanedHabits = {...habits};
        
        // Create a readable message for chat from the habits
        let userMessage = "";
        Object.entries(habits).forEach(([key, value]) => {
          // Skip custom fields in the message if they've already been included
          if (key === "stressManagementCustom" || key === "studyPreferenceCustom") {
            return;
          }
          userMessage += `${key}: ${value}, `;
        });
        userMessage = userMessage.slice(0, -2); // Remove trailing comma
        
        setOnboardingData({ ...onboardingData, ...cleanedHabits });
        setMessages([
          ...messages,
          { content: userMessage, isBot: false },
          { content: "What are your main areas of interest? (e.g. Science, Math, Programming, Writing)", isBot: true }
        ]);
        setStep("interests");
      },
      handleInterestsSubmit: (interests: string) => {
        const interestsList = interests.split(",").map(i => i.trim());
        
        setOnboardingData({ ...onboardingData, interests: interestsList });
        setMessages([
          ...messages,
          { content: interests, isBot: false },
          { content: "Your personalized Sakha dashboard is ready. Please sign up to access it.", isBot: true }
        ]);
        setStep("signup");
      },
      handleSignupSubmit
    }
  };
};

export default StepHandler;
