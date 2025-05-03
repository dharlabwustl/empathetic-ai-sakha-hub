
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, GraduationCap, Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import PrepzrLogo from '@/components/common/PrepzrLogo';
import ThreeStepWelcome from '@/components/signup/ThreeStepWelcome';

const WelcomeToPrepr = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Student');
  const [examGoal, setExamGoal] = useState('NEET');
  const [showThreeStepWelcome, setShowThreeStepWelcome] = useState(false);
  
  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('userData');
    
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        
        // Set user name and exam goal if available
        if (parsedData.name) {
          setUserName(parsedData.name);
        }
        
        if (parsedData.examGoal) {
          setExamGoal(parsedData.examGoal);
        }
        
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    
    // Check if the three-step welcome has already been shown
    const threeStepWelcomeCompleted = localStorage.getItem('threeStepWelcomeCompleted') === 'true';
    
    // Auto-proceed to three-step welcome after 2 seconds
    const timer = setTimeout(() => {
      if (!threeStepWelcomeCompleted) {
        setShowThreeStepWelcome(true);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    setShowThreeStepWelcome(true);
  };
  
  const handleThreeStepWelcomeComplete = () => {
    // Mark that the three-step welcome has been completed
    localStorage.setItem('threeStepWelcomeCompleted', 'true');
    
    // Update userData to indicate signup flow is completed
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        localStorage.setItem('userData', JSON.stringify({
          ...parsedData,
          sawWelcomeTour: false, // Will trigger the tour when they first reach the dashboard
          completedOnboarding: true
        }));
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
    
    // Navigate to dashboard with indication to show welcome tour
    navigate('/dashboard/student?showTour=true');
  };

  if (showThreeStepWelcome) {
    return (
      <ThreeStepWelcome 
        userName={userName}
        examGoal={examGoal}
        onComplete={handleThreeStepWelcomeComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950/20 flex flex-col justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <PrepzrLogo width={120} height="auto" className="mx-auto" />
          <h1 className="mt-6 text-4xl font-display font-bold gradient-text">Welcome to PREPZR!</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Your personalized learning journey begins now
          </p>
        </div>
        
        <Card className="shadow-lg border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl">Hello, {userName}!</CardTitle>
            <CardDescription>
              We're excited to help you prepare for {examGoal}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">Account Created Successfully</h3>
                <p className="text-sm text-muted-foreground">
                  Your PREPZR account is ready to use
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">Personalized Study Plan</h3>
                <p className="text-sm text-muted-foreground">
                  We've prepared a custom study plan for you
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium">Expert Learning Resources</h3>
                <p className="text-sm text-muted-foreground">
                  Access concept cards, flashcards and practice exams
                </p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={handleGetStarted}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default WelcomeToPrepr;
