
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";

import ChatMessage from "@/components/signup/ChatMessage";
import { useOnboarding, UserRole, UserGoal } from "@/components/signup/OnboardingContext";

// Import step components
import RoleStep from "@/components/signup/steps/RoleStep";
import DemographicsStep from "@/components/signup/steps/DemographicsStep";
import GoalStep from "@/components/signup/steps/GoalStep";
import PersonalityStep from "@/components/signup/steps/PersonalityStep";
import SentimentStep from "@/components/signup/steps/SentimentStep";
import HabitsStep from "@/components/signup/steps/HabitsStep";
import InterestsStep from "@/components/signup/steps/InterestsStep";
import SignupStep from "@/components/signup/steps/SignupStep";

const SignUpContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    step, 
    setStep, 
    onboardingData, 
    setOnboardingData, 
    messages, 
    setMessages 
  } = useOnboarding();

  const handleRoleSelect = (role: UserRole) => {
    setOnboardingData({ ...onboardingData, role });
    setMessages([
      ...messages, 
      { content: role, isBot: false },
      { content: getDemographicsQuestion(role), isBot: true }
    ]);
    setStep("demographics");
  };
  
  const getDemographicsQuestion = (role: UserRole) => {
    switch(role) {
      case "Student": 
        return "Great! To help personalize your learning experience, could you share your age, class/grade (10th to post graduation), and location?";
      case "Employee": 
        return "Excellent! Please tell me about your job role, seniority level, and domain to customize your professional growth plan.";
      case "Doctor": 
        return "Thanks! Could you share your specialization, institution, and any ongoing research you're working on?";
      case "Founder": 
        return "Perfect! To tailor our support, please share your startup stage, team size, industry, and main goals.";
      default: 
        return "Please tell me more about yourself.";
    }
  };

  const handleDemographicsSubmit = (data: Record<string, string>) => {
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
  };
  
  const handleGoalSelect = (goal: UserGoal) => {
    setOnboardingData({ ...onboardingData, goals: [goal] });
    setMessages([
      ...messages, 
      { content: goal, isBot: false },
      { content: "Let's understand your personality type with a short quiz. Which of these best describes your approach to learning?", isBot: true }
    ]);
    setStep("personality");
  };
  
  const handlePersonalitySelect = (personality: string) => {
    setOnboardingData({ ...onboardingData, personality });
    setMessages([
      ...messages,
      { content: personality, isBot: false },
      { content: "How are you feeling about your studies/work today?", isBot: true }
    ]);
    setStep("sentiment");
  };
  
  const handleMoodSelect = (mood: string) => {
    setOnboardingData({ ...onboardingData, mood });
    setMessages([
      ...messages,
      { content: mood, isBot: false },
      { content: "Let's understand your study habits better. How would you describe your sleep pattern and daily routine?", isBot: true }
    ]);
    setStep("habits");
  };
  
  const handleHabitsSubmit = (habits: Record<string, string>) => {
    let userMessage = "";
    Object.entries(habits).forEach(([key, value]) => {
      userMessage += `${key}: ${value}, `;
    });
    userMessage = userMessage.slice(0, -2);
    
    setOnboardingData({ ...onboardingData, ...habits });
    setMessages([
      ...messages,
      { content: userMessage, isBot: false },
      { content: "What are your main areas of interest? (e.g. Science, Math, Programming, Writing)", isBot: true }
    ]);
    setStep("interests");
  };
  
  const handleInterestsSubmit = (interests: string) => {
    const interestsList = interests.split(",").map(i => i.trim());
    
    setOnboardingData({ ...onboardingData, interests: interestsList });
    setMessages([
      ...messages,
      { content: interests, isBot: false },
      { content: "Your personalized Sakha dashboard is ready. Please sign up to access it.", isBot: true }
    ]);
    setStep("signup");
  };
  
  const handleSignupSubmit = (formValues: { name: string; mobile: string; otp: string }) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      navigate(`/dashboard/student`);
      
      toast({
        title: "Welcome to Sakha AI!",
        description: "Your personalized dashboard is ready.",
      });
    }, 2000);
  };
  
  const renderStep = () => {
    switch (step) {
      case "role":
        return <RoleStep onRoleSelect={handleRoleSelect} />;
      case "demographics":
        return <DemographicsStep role={onboardingData.role} onSubmit={handleDemographicsSubmit} />;
      case "goal":
        return <GoalStep role={onboardingData.role} onGoalSelect={handleGoalSelect} />;
      case "personality":
        return <PersonalityStep onPersonalitySelect={handlePersonalitySelect} />;
      case "sentiment":
        return <SentimentStep onMoodSelect={handleMoodSelect} />;
      case "habits":
        return <HabitsStep onSubmit={handleHabitsSubmit} />;
      case "interests":
        return <InterestsStep onSubmit={handleInterestsSubmit} />;
      case "signup":
        return <SignupStep onSubmit={handleSignupSubmit} isLoading={isLoading} />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-3xl shadow-xl border-gray-200 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <CardTitle className="text-2xl flex items-center">
          <img 
            src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
            alt="Sakha AI Logo" 
            className="w-10 h-10 mr-3" 
          />
          Sakha AI Onboarding
        </CardTitle>
        <CardDescription className="text-blue-100">
          Let's personalize your learning experience
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2">
          <div className="bg-gray-50 p-6 max-h-[600px] overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <ChatMessage 
                  key={index} 
                  content={msg.content} 
                  isBot={msg.isBot} 
                />
              ))}
            </div>
          </div>
          <div className="p-6">
            {renderStep()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpContent;
