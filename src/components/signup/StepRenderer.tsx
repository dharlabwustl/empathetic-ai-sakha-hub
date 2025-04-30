
import React from "react";
import { UserRole, MoodType, PersonalityType } from "@/types/user/base";
import { OnboardingStep } from "./OnboardingContext";
import RoleStep from "./steps/RoleStep";
import GoalStep from "./steps/GoalStep";
import DemographicsStep from "./steps/DemographicsStep";
import PersonalityStep from "./steps/PersonalityStep";
import MoodStep from "./steps/MoodStep";
import HabitsStep from "./steps/HabitsStep";
import InterestsStep from "./steps/InterestsStep";
import SignupStep from "./steps/SignupStep";

interface StepRendererProps {
  step: OnboardingStep;
  onboardingData: any;
  handlers: {
    handleRoleSelect: (role: UserRole) => void;
    handleGoalSelect: (goal: string) => void;
    handleDemographicsSubmit: (data: Record<string, string>) => void;
    handlePersonalitySelect: (personality: PersonalityType) => void;
    handleMoodSelect: (mood: MoodType) => void;
    handleHabitsSubmit: (habits: Record<string, string>) => void;
    handleInterestsSubmit: (interests: string) => void;
    handleSignupSubmit: (formValues: { name: string; mobile: string; otp: string; agreeTerms: boolean }) => void;
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
      return <GoalStep onGoalSelect={handlers.handleGoalSelect} />;
    
    case "demographics":
      return (
        <DemographicsStep 
          examGoal={onboardingData.goal || ""} 
          onSubmit={handlers.handleDemographicsSubmit} 
        />
      );
    
    case "personality":
      return <PersonalityStep onPersonalitySelect={handlers.handlePersonalitySelect} />;
    
    case "sentiment":
      return <MoodStep onMoodSelect={handlers.handleMoodSelect} />;
    
    case "habits":
      return <HabitsStep onSubmit={handlers.handleHabitsSubmit} />;
    
    case "interests":
      return (
        <InterestsStep 
          examGoal={onboardingData.goal} 
          onSubmit={handlers.handleInterestsSubmit} 
        />
      );
    
    case "signup":
      return (
        <SignupStep 
          onSubmit={handlers.handleSignupSubmit}
          isLoading={isLoading}
        />
      );
    
    default:
      return <div>Unknown step</div>;
  }
};

export default StepRenderer;
