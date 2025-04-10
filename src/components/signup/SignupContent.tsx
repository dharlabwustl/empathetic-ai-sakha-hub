
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
import { motion } from "framer-motion";

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl"
    >
      <Card className="w-full shadow-xl border-gray-200 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <CardTitle className="text-2xl flex items-center">
            <motion.img 
              src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
              alt="Sakha AI Logo" 
              className="w-10 h-10 mr-3" 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
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
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <ChatMessage 
                      content={msg.content} 
                      isBot={msg.isBot} 
                    />
                  </motion.div>
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
    </motion.div>
  );
};

export default SignUpContent;
