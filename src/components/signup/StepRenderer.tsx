
import React from "react";
import { UserGoal, UserRole, OnboardingData } from "./OnboardingContext";
import { MoodType, PersonalityType } from "@/types/user/base";
import RoleStep from "./steps/RoleStep";
import GoalStep from "./steps/GoalStep";
import DemographicsStep from "./steps/DemographicsStep";
import PersonalityStep from "./steps/PersonalityStep";
import MoodStep from "./steps/MoodStep";
import HabitsStep from "./steps/HabitsStep";
import InterestsStep from "./steps/InterestsStep";
import SignupStep from "./steps/SignupStep";

interface StepRendererProps {
  step: string;
  onboardingData: OnboardingData;
  handlers: {
    handleRoleSelect: (role: UserRole) => void;
    handleGoalSelect: (goal: UserGoal) => void;
    handleDemographicsSubmit: (data: Record<string, string>) => void;
    handlePersonalitySelect: (personality: PersonalityType) => void;
    handleMoodSelect: (mood: MoodType) => void;
    handleHabitsSubmit: (habits: Record<string, string>) => void;
    handleInterestsSubmit: (interests: string) => void;
    handleSignupSubmit: (formValues: { name: string; mobile: string; otp: string; agreeTerms: boolean }) => void;
  };
  isLoading: boolean;
}

const StepRenderer: React.FC<StepRendererProps> = ({ step, onboardingData, handlers, isLoading }) => {
  // Render the appropriate step based on the current step
  switch (step) {
    case "role":
      return <RoleStep onRoleSelect={handlers.handleRoleSelect} />;
    case "goal":
      return <GoalStep role={onboardingData.role} onGoalSelect={handlers.handleGoalSelect} />;
    case "demographics":
      return <DemographicsStep onSubmit={handlers.handleDemographicsSubmit} />;
    case "personality":
      return <PersonalityStep onPersonalitySelect={handlers.handlePersonalitySelect} />;
    case "mood":
      return <MoodStep onMoodSelect={handlers.handleMoodSelect} />;
    case "habits":
      return <HabitsStep onSubmit={handlers.handleHabitsSubmit} />;
    case "interests":
      return <InterestsStep onSubmit={handlers.handleInterestsSubmit} />;
    case "signup":
      return <SignupStep onSubmit={handlers.handleSignupSubmit} isLoading={isLoading} />;
    default:
      return <div>Unknown step: {step}</div>;
  }
};

export default StepRenderer;
