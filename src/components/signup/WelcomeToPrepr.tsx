
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, BookOpen, Calendar, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface WelcomeToPreprProps {
  userName?: string;
  onNext?: () => void;
}

const WelcomeToPrepr: React.FC<WelcomeToPreprProps> = ({
  userName = "Student",
  onNext
}) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showSpinner, setShowSpinner] = useState(false);

  // Set the first-time user flag when this component mounts
  useEffect(() => {
    localStorage.setItem('new_user_signup', 'true');
  }, []);

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // When completing the final step, show the spinner and simulate plan creation
      setShowSpinner(true);
      
      // Simulate creating plans with a short delay
      setTimeout(() => {
        // Create a study plan and navigate to dashboard with the new=true param
        localStorage.setItem('study_plan_created', 'true');
        navigate('/dashboard/student?new=true&completedOnboarding=true');
      }, 2000);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mb-2 flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="rounded-full bg-green-100 p-3"
              >
                <CheckCircle className="h-10 w-10 text-green-600" />
              </motion.div>
            </div>
            <CardTitle className="text-center text-2xl">Welcome to PREPZR!</CardTitle>
            <CardDescription className="text-center text-lg">
              Congratulations, {userName}! Your account has been created successfully.
            </CardDescription>
            <CardContent className="space-y-4 pt-6">
              <p className="text-center">
                You're all set to start your personalized learning journey. Our AI-powered platform
                will help you prepare for your exams with customized study plans, interactive
                practice tests, and real-time performance tracking.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Personalized Study Plans</h4>
                    <p className="text-sm text-muted-foreground">
                      Tailored to your learning style and pace
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">AI Tutor</h4>
                    <p className="text-sm text-muted-foreground">
                      Get help when you need it, 24/7
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Smart Flashcards</h4>
                    <p className="text-sm text-muted-foreground">
                      Memorize key concepts effectively
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Performance Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      Track your progress and improve
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </motion.div>
        );
        
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mb-2 flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="rounded-full bg-blue-100 p-3"
              >
                <BookOpen className="h-10 w-10 text-blue-600" />
              </motion.div>
            </div>
            <CardTitle className="text-center text-2xl">Creating Your Study Plan</CardTitle>
            <CardDescription className="text-center text-lg">
              Let's set up your personalized NEET study journey
            </CardDescription>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <h3 className="font-semibold text-blue-800 flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5" />
                    Smart Scheduling
                  </h3>
                  <p className="text-sm text-gray-700">
                    Your personalized study plan will be created based on your exam date, learning pace, 
                    and the subjects you need to focus on. We'll help you allocate the right amount of time to each topic.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl">
                  <h3 className="font-semibold text-purple-800 flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5" />
                    Adaptive Learning
                  </h3>
                  <p className="text-sm text-gray-700">
                    Our AI constantly adapts your plan based on your progress, focusing more on areas where you need 
                    improvement and optimizing your study sessions for maximum retention.
                  </p>
                </div>
                
                <div className="text-center mt-6">
                  <p className="font-medium">Based on your profile, we'll create:</p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• Daily study schedules with optimal breaks</li>
                    <li>• Balanced coverage of Physics, Chemistry and Biology</li>
                    <li>• Regular revision cycles for better retention</li>
                    <li>• Practice test schedules to build exam stamina</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mb-2 flex justify-center">
              {showSpinner ? (
                <div className="rounded-full bg-green-100 p-3 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="rounded-full bg-green-100 p-3"
                >
                  <Calendar className="h-10 w-10 text-green-600" />
                </motion.div>
              )}
            </div>
            <CardTitle className="text-center text-2xl">
              {showSpinner ? "Creating Your Plan..." : "Your Dashboard Is Ready!"}
            </CardTitle>
            <CardDescription className="text-center text-lg">
              {showSpinner ? 
                "Please wait while we set up your personalized study plan" : 
                "Let's head to your dashboard to begin your NEET preparation"}
            </CardDescription>
            <CardContent className="space-y-4 pt-6">
              {showSpinner ? (
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-green-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2 }}
                      />
                    </div>
                    
                    <div className="text-center mt-4 space-y-2">
                      <p className="text-sm text-gray-500">Analyzing your learning profile...</p>
                      <p className="text-sm text-gray-500">Creating your personalized study plan...</p>
                      <p className="text-sm text-gray-500">Setting up your dashboard...</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-6">
                  <div className="grid grid-cols-1 gap-4 w-full">
                    <div className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Study Plan Created</h4>
                          <p className="text-xs text-gray-500">Personalized to your NEET preparation needs</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">AI Tutor Ready</h4>
                          <p className="text-xs text-gray-500">Your personal learning assistant is set up</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Progress Tracking Set Up</h4>
                          <p className="text-xs text-gray-500">Track your NEET preparation journey</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-lg">
        <CardHeader>
          {renderStep()}
        </CardHeader>
        <CardFooter>
          <Button 
            className="w-full"
            size="lg"
            onClick={handleContinue}
            disabled={showSpinner}
          >
            {step === 3 ? (showSpinner ? "Setting up your dashboard..." : "Go to Dashboard") : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WelcomeToPrepr;
