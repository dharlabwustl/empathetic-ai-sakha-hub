
import React from "react";
import { motion } from "framer-motion";
import { OnboardingStep, UserRole } from "./OnboardingContext";
import ChatMessage from "./ChatMessage";
import StepRenderer from "./StepRenderer";
import { PersonalityType, MoodType } from "@/types/user/base";

interface MessagesDisplayProps {
  step: OnboardingStep;
  messages: { content: string; isBot: boolean }[];
  isLoading: boolean;
  onRoleSelect: (role: UserRole) => void;
  onGoalSelect: (goal: string) => void;
  onDemographicsSubmit: (data: Record<string, string>) => void;
  onPersonalitySelect: (personality: PersonalityType) => void;
  onMoodSelect: (mood: MoodType) => void;
  onHabitsSubmit: (habits: Record<string, string>) => void;
  onInterestsSubmit: (interests: string) => void;
  onSignupSubmit: (formValues: { name: string; mobile: string; otp: string }) => void;
}

const MessagesDisplay: React.FC<MessagesDisplayProps> = ({
  step,
  messages,
  isLoading,
  onRoleSelect,
  onGoalSelect,
  onDemographicsSubmit,
  onPersonalitySelect,
  onMoodSelect,
  onHabitsSubmit,
  onInterestsSubmit,
  onSignupSubmit,
}) => {
  return (
    <div className="space-y-6">
      {/* Messages history */}
      <div className="space-y-4 mb-6">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <ChatMessage content={message.content} isBot={message.isBot} />
          </motion.div>
        ))}
      </div>

      {/* Current step input */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <StepRenderer
          step={step}
          onboardingData={{}}
          handlers={{
            handleRoleSelect: onRoleSelect,
            handleGoalSelect: onGoalSelect,
            handleDemographicsSubmit: onDemographicsSubmit,
            handlePersonalitySelect: onPersonalitySelect,
            handleMoodSelect: onMoodSelect,
            handleHabitsSubmit: onHabitsSubmit,
            handleInterestsSubmit: onInterestsSubmit,
            handleSignupSubmit: onSignupSubmit,
          }}
          isLoading={isLoading}
        />
      </motion.div>
    </div>
  );
};

export default MessagesDisplay;
