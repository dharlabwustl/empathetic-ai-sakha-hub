
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { OnboardingStep, UserRole, UserGoal } from "./OnboardingContext";
import { MoodType } from "@/types/user/base";
import { SubscriptionType, TrialSubscription } from "@/types/subscription";
import { getSubjectsForGoal } from "@/components/dashboard/student/onboarding/SubjectData";

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
  
  // Check if this is a trial signup
  const isTrialSignup = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('trial') === 'true';
  };

  // Create trial subscription
  const createTrialSubscription = (): TrialSubscription => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 7); // 7 days from now
    
    return {
      isActive: true,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      daysRemaining: 7,
      planType: SubscriptionType.PRO // Set to PRO for premium features during trial
    };
  };
  
  const handleSignupSubmit = async (formValues: { name: string; mobile: string; otp: string }) => {
    setIsLoading(true);
    
    try {
      // Clean up user input
      const cleanName = formValues.name.trim();
      const cleanMobile = formValues.mobile.trim();
      
      // Check if this is a trial signup
      const isTrial = isTrialSignup();
      
      // Create trial subscription if applicable
      const trialSubscription = isTrial ? createTrialSubscription() : null;
      
      // Create a user object with the collected data
      const userData = {
        id: `user_${Date.now()}`,
        name: cleanName,
        email: `${cleanMobile}@prepzr.com`, // Use consistent email format based on mobile
        phoneNumber: cleanMobile,
        role: UserRole.Student,
        ...onboardingData,
        completedOnboarding: true,
        isNewUser: true,
        sawWelcomeTour: false,
        subscription: trialSubscription ? {
          type: isTrial ? SubscriptionType.PRO : SubscriptionType.FREE,
          isActive: true,
          trial: trialSubscription
        } : {
          type: SubscriptionType.FREE,
          isActive: false,
          trial: null
        }
      };
      
      console.log("Registering user:", userData);
      
      // Clear admin login if exists
      localStorage.removeItem('admin_logged_in');
      localStorage.removeItem('admin_user');
      
      // Set user as logged in
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('new_user_signup', 'true');
      
      // Store trial information if applicable
      if (trialSubscription) {
        localStorage.setItem('trial_subscription', JSON.stringify(trialSubscription));
        localStorage.setItem('trial_active', 'true');
      }
      
      // Set flag to show study plan creation dialog after tour
      localStorage.setItem('needs_study_plan_creation', 'true');
      
      // Dispatch auth state changed event
      window.dispatchEvent(new Event('auth-state-changed'));
      
      toast({
        title: isTrial ? "Welcome to your 7-day free trial!" : "Welcome to Prepzr!",
        description: isTrial ? "Your trial has started. Explore all premium features!" : "Let's start your learning journey.",
      });
      
      // Navigate directly to welcome-flow, skipping login
      window.location.href = "/welcome-flow";
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
          { content: "Let's understand your study preferences for a personalized experience.", isBot: true }
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
          { content: "Your personalized Prepzr dashboard is ready. Please sign up to access it.", isBot: true }
        ]);
        setStep("signup");
      },
      handleSignupSubmit
    }
  };
};

export default StepHandler;
