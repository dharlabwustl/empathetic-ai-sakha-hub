
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import StepHandler from "./StepHandler";
import MessagesDisplay from "./MessagesDisplay";
import { useOnboarding } from "./OnboardingContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useSubscriptionFlow } from "@/contexts/SubscriptionFlowContext";

const SignUpContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectPlan } = useSubscriptionFlow();
  const [isLoading, setIsLoading] = useState(false);
  const { onboardingData, setOnboardingData, messages, setMessages, step, setStep } = useOnboarding();

  // Check URL parameters for subscription plan on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get("plan");
    if (plan) {
      selectPlan(plan);
      // Remove plan from URL to prevent repeated processing
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("plan");
      window.history.replaceState({}, document.title, newUrl.toString());
    }
  }, [location.search, selectPlan]);

  const { isLoading: handlerLoading, handlers } = StepHandler({
    onboardingData,
    setOnboardingData,
    messages,
    setMessages,
    setStep
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full"
    >
      <Card className="border-0 shadow-lg shadow-purple-200/20">
        <CardContent className="p-6">
          <MessagesDisplay 
            step={step}
            messages={messages}
            isLoading={isLoading || handlerLoading}
            onRoleSelect={handlers.handleRoleSelect}
            onGoalSelect={handlers.handleGoalSelect}
            onDemographicsSubmit={handlers.handleDemographicsSubmit}
            onPersonalitySelect={handlers.handlePersonalitySelect}
            onMoodSelect={handlers.handleMoodSelect}
            onHabitsSubmit={handlers.handleHabitsSubmit}
            onInterestsSubmit={handlers.handleInterestsSubmit}
            onSignupSubmit={handlers.handleSignupSubmit}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SignUpContent;
