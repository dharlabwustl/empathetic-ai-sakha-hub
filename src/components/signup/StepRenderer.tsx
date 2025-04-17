
import React from "react";
import RoleStep from "@/components/signup/steps/RoleStep";
import DemographicsStep from "@/components/signup/steps/DemographicsStep";
import GoalStep from "@/components/signup/steps/GoalStep";
import PersonalityStep from "@/components/signup/steps/PersonalityStep";
import SentimentStep from "@/components/signup/steps/SentimentStep";
import HabitsStep from "@/components/signup/steps/HabitsStep";
import InterestsStep from "@/components/signup/steps/InterestsStep";
import SignupStep from "@/components/signup/steps/SignupStep";
import { OnboardingStep } from "./OnboardingContext";
import { PersonalityType, MoodType, UserRole } from "@/types/user/base";

interface StepRendererProps {
  step: OnboardingStep;
  onboardingData: any;
  handlers: {
    handleRoleSelect: (role: UserRole) => void;
    handleDemographicsSubmit: (data: Record<string, string>) => void;
    handleGoalSelect: (goal: string) => void;
    handlePersonalitySelect: (personality: PersonalityType) => void;
    handleMoodSelect: (mood: MoodType) => void;
    handleHabitsSubmit: (habits: Record<string, string>) => void;
    handleInterestsSubmit: (interests: string) => void;
    handleSignupSubmit: (formValues: { name: string; mobile: string; otp: string }) => void;
  };
  isLoading: boolean;
}

const StepRenderer: React.FC<StepRendererProps> = ({ 
  step, 
  onboardingData, 
  handlers,
  isLoading
}) => {
  switch (step) {
    case "role":
      return <RoleStep onRoleSelect={handlers.handleRoleSelect} />;
    case "goal":
      return <GoalStep 
        role={onboardingData.role} 
        onGoalSelect={handlers.handleGoalSelect} 
      />;
    case "demographics":
      return <DemographicsStep 
        role={onboardingData.role}
        goal={onboardingData.goal}
        onSubmit={handlers.handleDemographicsSubmit} 
      />;
    case "personality":
      return <PersonalityStep 
        onPersonalitySelect={handlers.handlePersonalitySelect} 
      />;
    case "sentiment":
      return <SentimentStep 
        onMoodSelect={handlers.handleMoodSelect} 
      />;
    case "habits":
      return <HabitsStep 
        onSubmit={handlers.handleHabitsSubmit} 
      />;
    case "interests":
      return <InterestsStep 
        examGoal={onboardingData.goal}
        onSubmit={handlers.handleInterestsSubmit} 
      />;
    case "signup":
      return <SignupStep 
        onSubmit={handlers.handleSignupSubmit} 
        isLoading={isLoading} 
      />;
    default:
      return null;
  }
};

export default StepRenderer;
