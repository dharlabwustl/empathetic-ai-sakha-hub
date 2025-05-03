
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Calendar, CheckCircle, ClipboardCheck, Clock, BookMarked, Brain, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { useToast } from "@/hooks/use-toast";

interface PendingTask {
  id: string;
  title: string;
  path: string;
  iconType: "quiz" | "flashcard" | "concept" | "practice" | "other";
}

const PostLoginWelcome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [userName, setUserName] = useState<string>('Student');
  const [lastActivity, setLastActivity] = useState<string | null>(null);
  const [pendingTasks, setPendingTasks] = useState<PendingTask[]>([]);
  const [lastLoginDate, setLastLoginDate] = useState<string>('recently');
  const [currentStep, setCurrentStep] = useState(0);
  const isNewUser = new URLSearchParams(window.location.search).get('new') === 'true';
  
  // Define the welcome flow steps for new users
  const welcomeSteps = [
    {
      title: "Welcome to PREPZR!",
      description: "Your personalized study plan is ready to help you achieve your goals.",
      icon: Calendar,
      content: "We've created a personalized study plan based on your preferences. Access your daily study schedule, track progress, and adjust as needed to stay on track for exam success."
    },
    {
      title: "Master Concepts with Flashcards",
      description: "Retain knowledge effectively with our smart flashcard system",
      icon: Brain,
      content: "Our AI-powered flashcards adapt to your learning style and memory patterns. Review key concepts, strengthen weak areas, and build lasting knowledge for your exams."
    },
    {
      title: "Practice Makes Perfect",
      description: "Test your knowledge with practice exams that match your learning pace",
      icon: FileText,
      content: "Take realistic practice exams tailored to your current level. Get detailed feedback, track improvement over time, and build confidence for your actual exam day."
    }
  ];
  
  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('userData');
    
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        
        // Set user name
        if (parsedData.name) {
          setUserName(parsedData.name);
        }
        
        // Get last activity
        if (parsedData.lastActivity) {
          setLastActivity(parsedData.lastActivity.description);
        }
        
        // Format last login date if available
        if (parsedData.lastLogin) {
          const lastLogin = new Date(parsedData.lastLogin);
          const now = new Date();
          const diffDays = Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
          
          if (diffDays === 0) {
            setLastLoginDate('today');
          } else if (diffDays === 1) {
            setLastLoginDate('yesterday');
          } else if (diffDays < 7) {
            setLastLoginDate(`${diffDays} days ago`);
          } else {
            setLastLoginDate(lastLogin.toLocaleDateString());
          }
        }
        
        // Generate mock pending tasks
        setPendingTasks([
          {
            id: '1',
            title: 'Complete Physics Quiz on Mechanics',
            path: '/dashboard/student/practice-exam',
            iconType: 'quiz'
          },
          {
            id: '2',
            title: 'Review Biology Flashcards',
            path: '/dashboard/student/flashcards',
            iconType: 'flashcard'
          },
          {
            id: '3',
            title: 'Study Chemistry Concepts',
            path: '/dashboard/student/concepts',
            iconType: 'concept'
          }
        ]);
        
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      // If no user data, redirect to login
      navigate('/login');
      return;
    }
    
    // Auto-redirect after 5 seconds if no action taken and NOT a new user
    if (!isNewUser) {
      const timer = setTimeout(() => {
        navigate('/dashboard/student/today');
        toast({
          title: "Welcome back!",
          description: "You've been automatically redirected to Today's Plan.",
        });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [navigate, toast, isNewUser]);

  const getIconForTask = (type: string) => {
    switch (type) {
      case 'quiz':
        return <ClipboardCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
      case 'flashcard':
        return <BookMarked className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      case 'concept':
        return <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'practice':
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const goToTodaysPlan = () => {
    navigate("/dashboard/student/today");
    toast({
      title: "Today's Plan",
      description: "Let's focus on today's learning goals!"
    });
  };

  const goToDashboard = () => {
    navigate("/dashboard/student?new=true&completedOnboarding=true");
    toast({
      title: "Welcome to Your Dashboard",
      description: "Let's start your learning journey!"
    });
  };
  
  const navigateToTask = (task: PendingTask) => {
    navigate(task.path);
    toast({
      title: "Continuing Your Work",
      description: `Now viewing: ${task.title}`
    });
  };

  const handleNext = () => {
    if (currentStep < welcomeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Done with welcome flow, go to dashboard with tour flag
      goToDashboard();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Render welcome flow for new users
  if (isNewUser) {
    const currentStepData = welcomeSteps[currentStep];
    const StepIcon = currentStepData.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950/20 flex flex-col justify-center items-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
          key={`welcome-step-${currentStep}`}
        >
          <div className="text-center mb-8">
            <PrepzrLogo width={120} height="auto" className="mx-auto" />
            <h1 className="mt-4 text-3xl font-display font-bold gradient-text">{currentStepData.title}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {currentStepData.description}
            </p>
          </div>
          
          <Card className="shadow-lg border-gray-200 dark:border-gray-800">
            <CardHeader className="text-center pt-8 pb-2">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mx-auto p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4"
              >
                <StepIcon size={36} />
              </motion.div>
            </CardHeader>
            
            <CardContent className="text-center px-8 pb-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                {currentStepData.content}
              </p>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t pt-4 pb-4 px-6">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={currentStep === 0 ? "opacity-0" : ""}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              <div className="flex gap-1.5">
                {welcomeSteps.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`w-2 h-2 rounded-full ${idx === currentStep ? 'bg-blue-600' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              
              <Button onClick={handleNext}>
                {currentStep < welcomeSteps.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Start Learning
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Render returning user welcome
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
          <h1 className="mt-4 text-4xl font-display font-bold gradient-text">Welcome Back, {userName}!</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {lastLoginDate === 'today' 
              ? "Returning for another study session today?" 
              : `You last logged in ${lastLoginDate}`}
          </p>
        </div>
        
        <Card className="shadow-lg border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl">Pick Up Where You Left Off</CardTitle>
            <CardDescription>
              {lastActivity 
                ? `You were working on ${lastActivity}`
                : "Choose where to continue your learning journey"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Button 
              variant="default" 
              className="w-full justify-start gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
              onClick={goToTodaysPlan}
            >
              <Calendar className="h-5 w-5" />
              <span className="flex-1 text-left">Go to Today's Plan</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 pt-2 pb-1">
              Pending Activities:
            </div>
            
            {pendingTasks.map((task) => (
              <Button 
                key={task.id}
                variant="outline" 
                className="w-full justify-start gap-3 border-blue-200 dark:border-blue-900 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                onClick={() => navigateToTask(task)}
              >
                {getIconForTask(task.iconType)}
                <span className="flex-1 text-left truncate">
                  {task.title}
                </span>
                <ArrowRight className="h-4 w-4 flex-shrink-0" />
              </Button>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 mt-4"
              onClick={goToDashboard}
            >
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="flex-1 text-left">Go to My Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
          
          <CardFooter className="flex justify-center pt-2">
            <p className="text-sm text-muted-foreground">
              You'll be redirected to Today's Plan shortly...
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default PostLoginWelcome;
