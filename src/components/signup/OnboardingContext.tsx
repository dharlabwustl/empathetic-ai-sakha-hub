
import React, { createContext, useContext, useState } from "react";
import { MoodType, PersonalityType, UserRole } from "@/types/user/base";

export type OnboardingStep = "role" | "goal" | "demographics" | "personality" | "sentiment" | "habits" | "interests" | "signup" | "complete";

export type UserGoal = "IIT-JEE" | "NEET" | "GATE" | "CAT" | "UPSC" | "Bank Exams" | "Board Exams" | "Other";

interface OnboardingContextType {
  step: OnboardingStep;
  setStep: (step: OnboardingStep) => void;
  onboardingData: any;
  setOnboardingData: (data: any) => void;
  messages: { content: string; isBot: boolean }[];
  setMessages: (messages: { content: string; isBot: boolean }[]) => void;
}

const defaultContext: OnboardingContextType = {
  step: "role",
  setStep: () => {},
  onboardingData: {},
  setOnboardingData: () => {},
  messages: [{ content: "Hi! I'm Sakha AI. Let's set up your personalized learning experience. What role best describes you?", isBot: true }],
  setMessages: () => {}
};

const OnboardingContext = createContext<OnboardingContextType>(defaultContext);

export const useOnboarding = () => useContext(OnboardingContext);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<OnboardingStep>("role");
  const [onboardingData, setOnboardingData] = useState({
    role: "",
    goal: "",
    personalityType: "",
    mood: "",
  });
  const [messages, setMessages] = useState([
    { content: "Hi! I'm Sakha AI. Let's set up your personalized learning experience. What role best describes you?", isBot: true }
  ]);

  return (
    <OnboardingContext.Provider value={{ step, setStep, onboardingData, setOnboardingData, messages, setMessages }}>
      {children}
    </OnboardingContext.Provider>
  );
};
