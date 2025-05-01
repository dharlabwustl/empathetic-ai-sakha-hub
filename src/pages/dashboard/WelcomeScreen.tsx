
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import PrepzrLogo from "@/components/common/PrepzrLogo";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  
  // Get user data from localStorage
  const userData = localStorage.getItem("userData") 
    ? JSON.parse(localStorage.getItem("userData") || "{}")
    : {};
  
  const userName = userData.name || "Student";
  const examGoal = userData.goal || "your exam";
  
  // Loading steps simulation
  useEffect(() => {
    const steps = [
      "Setting up your dashboard...",
      "Personalizing your study plan...",
      "Generating flashcards and concept cards...",
      "All set! Ready to begin."
    ];
    
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setLoadingStep(currentStep);
        setProgress(Math.min(100, (currentStep + 1) * 25));
        currentStep += 1;
      } else {
        clearInterval(interval);
      }
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);
  
  const loadingSteps = [
    "Setting up your dashboard...",
    "Personalizing your study plan...",
    "Generating flashcards and concept cards...",
    "All set! Ready to begin."
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        when: "beforeChildren" 
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  const handleContinue = () => {
    navigate("/dashboard/student");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <PrepzrLogo width={80} className="mx-auto mb-4" />
            <CardTitle className="text-2xl">Welcome, {userName}!</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8 my-6"
            >
              <motion.div variants={itemVariants} className="text-center">
                <p className="text-lg">
                  Your personalized dashboard for <span className="font-bold text-blue-600">{examGoal}</span> is almost ready.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Preparing your experience...</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-center text-gray-600 text-sm mt-2">
                  {loadingSteps[loadingStep]}
                </p>
              </motion.div>
              
              {progress === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-green-50 border border-green-100 p-4 rounded-lg"
                >
                  <h3 className="font-medium text-green-700 text-center">All systems ready!</h3>
                  <p className="text-green-600 text-sm text-center mt-1">
                    Your personalized study materials await you.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleContinue}
              disabled={progress < 100}
            >
              {progress < 100 ? (
                <span>Setting up your dashboard...</span>
              ) : (
                <>
                  Continue to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
