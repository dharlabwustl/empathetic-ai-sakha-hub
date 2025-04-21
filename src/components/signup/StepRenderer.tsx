
import React from "react";
import { OnboardingStep, UserGoal, UserRole } from "./OnboardingContext";
import { MoodType } from "@/types/user/base";
import RoleStep from "./steps/RoleStep";
import GoalStep from "./steps/GoalStep";
import DemographicsStep from "./steps/DemographicsStep";
import PersonalityStep from "./steps/PersonalityStep";
import SentimentStep from "./steps/SentimentStep";
import StudyHabitsStep from "./steps/StudyHabitsStep";
import InterestsStep from "./steps/InterestsStep";
import SignupStep from "./steps/SignupStep";
import CompletedStep from "./steps/CompletedStep";

interface StepRendererProps {
  step: OnboardingStep;
  onboardingData: any;
  handlers: {
    handleRoleSelect: (role: UserRole) => void;
    handleDemographicsSubmit: (data: Record<string, string>) => void;
    handleGoalSelect: (goal: UserGoal) => void;
    handlePersonalitySelect: (personality: string) => void;
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
      return <GoalStep onGoalSelect={handlers.handleGoalSelect} selectedRole={onboardingData.role} />;
      
    case "demographics":
      return <DemographicsStep onSubmit={handlers.handleDemographicsSubmit} selectedGoal={onboardingData.goal} />;
      
    case "personality":
      return <PersonalityStep onSelect={handlers.handlePersonalitySelect} />;
      
    case "sentiment":
      return <SentimentStep onSelect={handlers.handleMoodSelect} />;
      
    case "habits":
      return <StudyHabitsStep onSubmit={handlers.handleHabitsSubmit} />;
      
    case "interests":
      return <InterestsStep onSubmit={handlers.handleInterestsSubmit} selectedGoal={onboardingData.goal} />;
      
    case "signup":
      return <SignupStep onSubmit={handlers.handleSignupSubmit} isLoading={isLoading} />;
      
    case "complete":
      return <CompletedStep onboardingData={onboardingData} />;
      
    default:
      return <div>Unknown step</div>;
  }
};

export default StepRenderer;
