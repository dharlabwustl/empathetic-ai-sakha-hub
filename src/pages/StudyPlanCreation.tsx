
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, Check, Calendar, BookOpen, Brain } from "lucide-react";
import PrepzrLogo from "@/components/common/PrepzrLogo";

const StudyPlanCreation = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [userName, setUserName] = useState("");
  const [examGoal, setExamGoal] = useState("");

  useEffect(() => {
    // Try to get user data from local storage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUserName(parsedData.name || "");
      setExamGoal(parsedData.examGoal || "IIT-JEE");
    }

    // Simulate plan creation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 2;
        } else {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 33) {
      setStep(0);
    } else if (progress < 66) {
      setStep(1);
    } else if (progress < 100) {
      setStep(2);
    }
  }, [progress]);

  const handleContinue = () => {
    navigate("/welcome-back?new=true&completedOnboarding=true");
  };

  const steps = [
    {
      title: "Analyzing Learning Style",
      description: "Processing your personality type and preferences"
    },
    {
      title: "Building Curriculum",
      description: `Creating personalized ${examGoal} study path`,
    },
    {
      title: "Optimizing Schedule",
      description: "Tailoring to your available study hours"
    }
  ];

  const completedSteps = Array(3)
    .fill(0)
    .map((_, i) => i < step);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <PrepzrLogo width={120} height={120} />
          <h1 className="mt-4 text-3xl font-bold text-gray-800 dark:text-white">
            Creating Your Study Plan
          </h1>
          <p className="text-gray-500 text-center mt-2">
            {userName ? `Hi ${userName.split(' ')[0]}, we're` : "We're"} building a personalized study plan for your {examGoal} preparation
          </p>
        </div>

        <Card className="shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="flex justify-between items-center">
              <span>Study Plan Generator</span>
              <span>{progress}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {!isComplete ? (
              <>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="space-y-6">
                  {steps.map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          i === step
                            ? "bg-blue-100 text-blue-600 animate-pulse"
                            : i < step
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {i === step ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : i < step ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <span className="text-sm">{i + 1}</span>
                        )}
                      </div>
                      <div>
                        <h3
                          className={`font-medium ${
                            i === step
                              ? "text-blue-700 dark:text-blue-400"
                              : i < step
                              ? "text-green-700 dark:text-green-400"
                              : "text-gray-500"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="py-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="h-10 w-10" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center space-y-3 mb-8"
                >
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Study Plan Ready!
                  </h2>
                  <p className="text-gray-500">
                    Your personalized study plan for {examGoal} has been created
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">Duration</h3>
                    </div>
                    <p className="text-sm text-gray-500">3 months plan</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="h-4 w-4 text-purple-500" />
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">Topics</h3>
                    </div>
                    <p className="text-sm text-gray-500">42 concept cards</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="h-4 w-4 text-green-500" />
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">Learning Style</h3>
                    </div>
                    <p className="text-sm text-gray-500">Visual & Kinesthetic</p>
                  </motion.div>
                </div>

                <Button
                  onClick={handleContinue}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StudyPlanCreation;
