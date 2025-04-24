
import React, { useState } from "react";
import RoleSelection from "@/components/signup/steps/RoleSelection";
import GoalSelection from "@/components/signup/steps/GoalSelection";
import DemographicsForm from "@/components/signup/steps/DemographicsForm";
import PersonalityStep from "@/components/signup/steps/PersonalityStep";
import MoodSelection from "@/components/signup/steps/MoodSelection";
import HabitsForm from "@/components/signup/steps/HabitsForm";
import SignupForm from "@/components/signup/steps/SignupForm";
import { OnboardingStep, UserRole } from "./OnboardingContext";
import SubjectSelectionStep from "./steps/SubjectSelectionStep";
import { MoodType, PersonalityType } from "@/types/user/base";

interface StepRendererProps {
  step: OnboardingStep;
  onboardingData: any;
  handlers: {
    handleRoleSelect: (role: UserRole) => void;
    handleGoalSelect: (goal: string) => void;
    handleDemographicsSubmit: (data: Record<string, string>) => void;
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
      return <RoleSelection onSelect={handlers.handleRoleSelect} />;
    case "goal":
      return <GoalSelection onSelect={handlers.handleGoalSelect} selectedRole={onboardingData.role} />;
    case "demographics":
      return (
        <DemographicsForm
          onSubmit={handlers.handleDemographicsSubmit}
          role={onboardingData.role}
          goal={onboardingData.goal}
          isLoading={isLoading}
        />
      );
    case "personality":
      return (
        <PersonalityStep
          onSelect={handlers.handlePersonalitySelect}
          isLoading={isLoading}
        />
      );
    case "sentiment":
      return (
        <MoodSelection
          onSelect={handlers.handleMoodSelect}
          isLoading={isLoading}
        />
      );
    case "habits":
      return (
        <HabitsForm
          onSubmit={handlers.handleHabitsSubmit}
          isLoading={isLoading}
        />
      );
    case "interests":
      return (
        <SubjectSelectionStep
          examGoal={onboardingData.goal}
          onSubmit={handlers.handleInterestsSubmit}
          isLoading={isLoading}
        />
      );
    case "signup":
      return (
        <SignupForm
          onSubmit={handlers.handleSignupSubmit}
          isLoading={isLoading}
        />
      );
    default:
      return <div>Unknown step</div>;
  }
};

export default StepRenderer;
