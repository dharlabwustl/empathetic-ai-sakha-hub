
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { UserRole, UserGoal, OnboardingStep } from "./OnboardingContext";
import { getDemographicsQuestion } from "./utils/stepUtils";

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
  
  const handleSignupSubmit = (formValues: { name: string; mobile: string; otp: string }) => {
    setIsLoading(true);
    
    // Save user data to localStorage with proper flags
    const userData = {
      ...onboardingData,
      name: formValues.name,
      phoneNumber: formValues.mobile,
      completedOnboarding: false, // This will trigger the onboarding flow
      isNewUser: true,            // Flag to indicate this is a new user
      sawWelcomeTour: false       // Flag to show welcome tour after onboarding
    };
    
    localStorage.setItem("userData", JSON.stringify(userData));
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Navigate to dashboard with newUser flag
      navigate(`/dashboard/student?newUser=true`);
      
      toast({
        title: "Welcome to Sakha AI!",
        description: "Let's customize your learning experience.",
      });
    }, 1000);
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
