
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { UserRole, UserGoal, OnboardingStep } from "./OnboardingContext";
import { getDemographicsQuestion } from "./utils/stepUtils";
import authService from "@/services/auth/authService"; 
import { getSubjectsForGoal } from "@/components/dashboard/student/onboarding/SubjectData";
import { PersonalityType, MoodType } from "@/types/user/base";

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
          ...onboardingData,
          name: cleanName,
          phoneNumber: cleanMobile,
          completedOnboarding: true, // Mark as completed
          isNewUser: true,
          sawWelcomeTour: false
        };
        
        localStorage.setItem("userData", JSON.stringify(extendedUserData));
        
        toast({
          title: "Welcome to Sakha AI!",
          description: "Your personalized dashboard is ready.",
        });
        
        // First navigate to the landing page to show them what they've signed up for
        setTimeout(() => {
          navigate("/");
        }, 1500);
        
        // Then after a short delay, send them to their dashboard
        setTimeout(() => {
          navigate(`/dashboard/student?completedOnboarding=true&new=true`);
        }, 3500);
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
      handleGoalSelect: (goal: UserGoal) => {
        setOnboardingData({ ...onboardingData, goal });
        setMessages([
          ...messages, 
          { content: goal, isBot: false },
          { content: "Tell us more about yourself to personalize your learning experience.", isBot: true }
        ]);
        setStep("demographics");
      },
      handlePersonalitySelect: (personality: PersonalityType) => {
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
          { content: "Let's understand your study habits better. How would you describe your sleep pattern and daily routine?", isBot: true }
        ]);
        setStep("habits");
      },
      handleHabitsSubmit: (habits: Record<string, string>) => {
        // Clean up habits data - remove whitespace and normalize
        const cleanedHabits: Record<string, string> = {};
        
        Object.entries(habits).forEach(([key, value]) => {
          // Skip custom fields in the cleaned data if they've already been included
          if (key === "stressManagementCustom" || key === "studyPreferenceCustom") {
            return;
          }
          cleanedHabits[key] = value.trim();
        });
        
        // Create a readable message for chat from the habits
        let userMessage = "";
        Object.entries(cleanedHabits).forEach(([key, value]) => {
          userMessage += `${key}: ${value}, `;
        });
        userMessage = userMessage.slice(0, -2); // Remove trailing comma
        
        setOnboardingData({ ...onboardingData, ...cleanedHabits });
        
        // Get subjects based on selected exam goal
        const suggestedSubjects = onboardingData.goal 
          ? getSubjectsForGoal(onboardingData.goal)
          : [];
        
        setMessages([
          ...messages,
          { content: userMessage, isBot: false },
          { content: "Select your preferred subjects to study:", isBot: true }
        ]);
        setStep("interests");
      },
      handleInterestsSubmit: (interests: string) => {
        // Clean and deduplicate interests
        const interestsList = Array.from(new Set(
          interests.split(",").map(i => i.trim()).filter(i => i.length > 0)
        ));
        
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
