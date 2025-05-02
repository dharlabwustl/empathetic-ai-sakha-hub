
import React from "react";
import RoleStep from "./steps/RoleStep";
import GoalStep from "./steps/GoalStep";
import DemographicsStep from "./steps/DemographicsStep";
import PersonalityStep from "./steps/PersonalityStep";
import MoodStep from "./steps/MoodStep";
import StudyHabitsStep from "./steps/StudyHabitsStep";
import InterestsStep from "./steps/InterestsStep";
import SignupStep from "./steps/SignupStep";
import { OnboardingStep } from "./OnboardingContext";

interface StepRendererProps {
  step: OnboardingStep;
  onboardingData: any;
  handlers: {
    handleRoleSelect: any;
    handleGoalSelect: any;
    handleDemographicsSubmit: any;
    handlePersonalitySelect: any;
    handleMoodSelect: any;
    handleHabitsSubmit: any;
    handleInterestsSubmit: any;
    handleSignupSubmit: any;
  };
  isLoading: boolean;
}

const StepRenderer: React.FC<StepRendererProps> = ({ step, onboardingData, handlers, isLoading }) => {
  switch (step) {
    case "role":
      return <RoleStep onRoleSelect={handlers.handleRoleSelect} />;

    case "goal":
      return <GoalStep role={onboardingData.role} onGoalSelect={handlers.handleGoalSelect} />;

    case "demographics":
      return (
        <DemographicsStep
          role={onboardingData.role}
          examGoal={onboardingData.examGoal}
          onSubmit={handlers.handleDemographicsSubmit}
        />
      );

    case "personality":
      return <PersonalityStep onPersonalitySelect={handlers.handlePersonalitySelect} />;

    case "sentiment":
      return <MoodStep onMoodSelect={handlers.handleMoodSelect} />;

    case "habits":
      return <StudyHabitsStep onSubmit={handlers.handleHabitsSubmit} />;

    case "interests":
      return (
        <InterestsStep
          examGoal={onboardingData.examGoal}
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
