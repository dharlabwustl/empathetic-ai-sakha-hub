
import React, { useEffect } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SignUpContent = () => {
  const { 
    step, 
    setStep, 
    onboardingData, 
    setOnboardingData, 
    messages, 
    setMessages 
  } = useOnboarding();
  
  const navigate = useNavigate();

  const { isLoading, handlers } = StepHandler({
    onboardingData,
    setOnboardingData,
    messages,
    setMessages,
    setStep
  });
  
  // Debug flag to verify signup and onboarding flow
  useEffect(() => {
    console.log("Current step:", step);
    console.log("Current onboarding data:", onboardingData);
    
    // Check if we've completed signup and should move to dashboard/onboarding
    if (step === "signup" && onboardingData.role) { // Changed from "completed" to "signup"
      console.log("Signup completed, navigating to dashboard/student");
      
      // Make sure we set the completedOnboarding flag to false to ensure the onboarding flow shows up
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.completedOnboarding = false;
        parsedData.isNewUser = true;
        localStorage.setItem("userData", JSON.stringify(parsedData));
      }
      
      // Navigate to dashboard with URL parameters to trigger onboarding
      navigate("/dashboard/student?completedOnboarding=false&new=true");
    }
  }, [step, onboardingData, navigate]);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.3
      }
    }),
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={step}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={cardVariants}
        className="w-full max-w-3xl"
      >
        <Card className="w-full shadow-xl border-gray-200 overflow-hidden bg-white dark:bg-gray-900">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-violet-700 text-white">
            <CardTitle className="text-2xl flex items-center">
              <motion.img 
                src="/lovable-uploads/6bd65589-a748-4b63-a28b-12521c233a7e.png" 
                alt="Sakha AI Logo" 
                className="w-10 h-10 mr-3" 
                variants={logoVariants}
                initial="hidden"
                animate="visible"
              />
              Sakha AI Onboarding
            </CardTitle>
            <CardDescription className="text-purple-100">
              Let's personalize your learning experience
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 max-h-[600px] overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={`${index}-${msg.content.substring(0, 10)}`}
                      custom={index}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <ChatMessage 
                        content={msg.content} 
                        isBot={msg.isBot} 
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-gray-900 border-l border-purple-100 dark:border-purple-900/20">
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
    </AnimatePresence>
  );
};

export default SignUpContent;
