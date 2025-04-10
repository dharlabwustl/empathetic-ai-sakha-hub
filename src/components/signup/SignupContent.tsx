
import React from "react";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import ChatMessage from "@/components/signup/ChatMessage";
import { useOnboarding } from "@/components/signup/OnboardingContext";
import StepHandler from "@/components/signup/StepHandler";
import StepRenderer from "@/components/signup/StepRenderer";

const SignUpContent = () => {
  const { 
    step, 
    setStep, 
    onboardingData, 
    setOnboardingData, 
    messages, 
    setMessages 
  } = useOnboarding();

  const { isLoading, handlers } = StepHandler({
    onboardingData,
    setOnboardingData,
    messages,
    setMessages,
    setStep
  });

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
            <StepRenderer 
              step={step}
              onboardingData={onboardingData}
              handlers={handlers}
              isLoading={isLoading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpContent;
