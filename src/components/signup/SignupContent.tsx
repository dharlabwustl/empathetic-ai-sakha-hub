
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { OnboardingStep, useOnboarding } from './OnboardingContext';
import StepRenderer from './StepRenderer';
import StepHandler from './StepHandler';
import { Progress } from '@/components/ui/progress';

const ChatBubble = ({ content, isBot = false }: { content: string; isBot?: boolean }) => (
  <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
    <div className={`px-4 py-2 rounded-2xl max-w-[75%] ${
      isBot ? 'bg-gray-100 text-gray-800 rounded-tl-none' : 'bg-blue-500 text-white rounded-tr-none'
    }`}>
      {content}
    </div>
  </div>
);

const SignUpContent: React.FC = () => {
  const { step, setStep, onboardingData, updateFormData } = useOnboarding();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("role");
  const [messages, setMessages] = useState<{ content: string; isBot: boolean }[]>([
    { content: "Welcome to Prepzr! Let's get started by selecting your role.", isBot: true }
  ]);
  
  // Use step handler for all step transitions
  const { isLoading, handlers } = StepHandler({
    onboardingData, 
    setOnboardingData: updateFormData,
    messages,
    setMessages,
    setStep: setCurrentStep
  });

  // Map steps to progress percentage
  const stepMap: { [key in OnboardingStep]: number } = {
    role: 0,
    goal: 15,
    demographics: 30,
    personality: 45,
    sentiment: 60,
    habits: 75,
    interests: 85,
    signup: 100,
    welcome: 100,
    studyTime: 70,
    studyPace: 72,
    studyHours: 74
  };

  return (
    <motion.div 
      className="w-full max-w-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-2">{stepMap[currentStep]}%</span>
            <Progress value={stepMap[currentStep]} className="w-20" />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="space-y-4 max-h-[300px] overflow-y-auto p-2 mb-4">
            {messages.map((message, index) => (
              <ChatBubble 
                key={index} 
                content={message.content} 
                isBot={message.isBot} 
              />
            ))}
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <StepRenderer 
              step={currentStep} 
              onboardingData={onboardingData} 
              handlers={handlers}
              isLoading={isLoading}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SignUpContent;
