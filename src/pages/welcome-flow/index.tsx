
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, GraduationCap, PlaneTakeoff, Clock, BookOpen } from 'lucide-react';
import WelcomeFlow from '@/components/signup/WelcomeFlow';
import WelcomeTour from '@/components/dashboard/student/WelcomeTour';
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const WelcomeFlowPage = () => {
  const navigate = useNavigate();
  const [showTour, setShowTour] = useState(false);
  const [showWelcomeSlider, setShowWelcomeSlider] = useState(false);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const completedOnboarding = searchParams.get('completedOnboarding') === 'true';
  const isNewUser = searchParams.get('new') === 'true' || localStorage.getItem('new_user_signup') === 'true';
  
  // Get user data from localStorage
  const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") || "{}") : {};
  const studyPlan = userData.studyPlan || {};

  useEffect(() => {
    // If user completes the welcome flow, show the welcome slider
    if (localStorage.getItem('welcomeFlowCompleted') === 'true' || completedOnboarding) {
      setShowWelcomeSlider(true);
      
      // Mark that this user has seen the onboarding
      localStorage.setItem("userData", JSON.stringify({
        ...userData,
        completedOnboarding: true
      }));
    }

    // If it's not a new user and not explicitly redirected after onboarding, go to dashboard
    if (!isNewUser && !completedOnboarding) {
      navigate('/dashboard/student');
    }
  }, [completedOnboarding, navigate, isNewUser, userData]);

  const handleSkipTour = () => {
    setShowTour(false);
    // Remove the new user flag
    localStorage.removeItem('new_user_signup');
    localStorage.removeItem('welcomeFlowCompleted');
    // Navigate to dashboard
    navigate('/dashboard/student');
    toast({
      title: "Welcome to your dashboard!",
      description: "You can always access the tour again from the navigation menu."
    });
  };

  const handleCompleteTour = () => {
    setShowTour(false);
    // Remove the new user flag
    localStorage.removeItem('new_user_signup');
    // Mark that the user has seen the welcome tour
    localStorage.setItem("userData", JSON.stringify({
      ...userData,
      sawWelcomeTour: true
    }));
    // Navigate to dashboard
    navigate('/dashboard/student');
    toast({
      title: "Tour Completed!",
      description: "You're all set to start using PREPZR. Happy studying!"
    });
  };
  
  const handleSliderComplete = () => {
    setShowWelcomeSlider(false);
    setShowTour(true);
  };
  
  const WelcomeSlider = () => {
    return (
      <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">
            Welcome to PREPZR
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your personalized learning journey begins now
          </p>
        </div>
        
        <Carousel className="w-full max-w-2xl">
          <CarouselContent>
            {/* Slide 1: Study Plan Overview */}
            <CarouselItem>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-950/40 dark:to-blue-900/30">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row p-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/60">
                          <GraduationCap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h2 className="text-xl font-semibold">Your Study Plan</h2>
                      </div>
                      
                      <div className="space-y-3">
                        <p className="text-base">
                          We've created a personalized study plan for your
                          <span className="font-semibold"> {studyPlan.examGoal || "exam"} </span>
                          preparation.
                        </p>
                        
                        <div className="space-y-2 py-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Goal:</span>
                            <span className="font-medium">{studyPlan.examGoal || "Exam Success"}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              <Calendar className="inline h-4 w-4 mr-1" />
                              Exam Date:
                            </span>
                            <span className="font-medium">
                              {studyPlan.examDate 
                                ? new Date(studyPlan.examDate).toLocaleDateString() 
                                : "Not set"}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              <BookOpen className="inline h-4 w-4 mr-1" />
                              Subjects:
                            </span>
                            <span className="font-medium">
                              {studyPlan.subjects 
                                ? `${studyPlan.subjects.length} subjects` 
                                : "Core subjects"}
                            </span>
                          </div>
                        </div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="bg-white dark:bg-slate-800 p-4 rounded-lg mt-4 shadow-sm"
                        >
                          <p className="text-sm italic">
                            "Your personalized study plan is available in the Academic Advisor 
                            section. You can customize it anytime."
                          </p>
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center mt-6 md:mt-0">
                      <motion.img
                        src="/images/study-plan-illustration.svg"
                        alt="Study Plan"
                        className="h-40 w-auto"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            
            {/* Slide 2: Time Allocation */}
            <CarouselItem>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-emerald-100 dark:from-blue-950/40 dark:to-emerald-900/30">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row p-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/60">
                          <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h2 className="text-xl font-semibold">Time Allocation</h2>
                      </div>
                      
                      <div className="space-y-3">
                        <p className="text-base">
                          We've optimized your study schedule based on your preferences and learning style.
                        </p>
                        
                        <div className="space-y-2 py-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Daily Study:</span>
                            <span className="font-medium">{studyPlan.studyHoursPerDay || 4} hours/day</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Preferred Time:
                            </span>
                            <span className="font-medium capitalize">
                              {studyPlan.preferredStudyTime || "Evening"}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Weekly Commitment:
                            </span>
                            <span className="font-medium">
                              {studyPlan.weeklyHours || 28} hours/week
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Learning Pace:
                            </span>
                            <span className="font-medium capitalize">
                              {studyPlan.learningPace || "Moderate"}
                            </span>
                          </div>
                        </div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="bg-white dark:bg-slate-800 p-4 rounded-lg mt-4 shadow-sm"
                        >
                          <p className="text-sm italic">
                            "Your daily tasks are automatically scheduled based on your 
                            preferred study times and learning pace."
                          </p>
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center mt-6 md:mt-0">
                      <motion.img
                        src="/images/time-allocation.svg"
                        alt="Time Allocation"
                        className="h-40 w-auto"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            
            {/* Slide 3: Ready to Start */}
            <CarouselItem>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/40 dark:to-pink-900/30">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row p-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/60">
                          <PlaneTakeoff className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h2 className="text-xl font-semibold">Ready for Takeoff!</h2>
                      </div>
                      
                      <div className="space-y-3">
                        <p className="text-base">
                          Your learning journey is about to begin. We've prepared everything you need to succeed.
                        </p>
                        
                        <ul className="space-y-2 list-disc list-inside pl-2 text-sm text-gray-700 dark:text-gray-300">
                          <li>Personalized study plan</li>
                          <li>AI-powered learning resources</li>
                          <li>Progress tracking and analytics</li>
                          <li>Adaptive quizzes and practice tests</li>
                          <li>Community support</li>
                        </ul>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="mt-6"
                        >
                          <Button 
                            onClick={handleSliderComplete}
                            className="w-full py-6 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                          >
                            Take the Dashboard Tour
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center mt-6 md:mt-0">
                      <motion.img
                        src="/images/ready-to-start.svg"
                        alt="Ready to Start"
                        className="h-40 w-auto"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
          
          <div className="flex items-center justify-center gap-2 mt-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30">
      {!showWelcomeSlider && !showTour ? (
        <WelcomeFlow />
      ) : showWelcomeSlider && !showTour ? (
        <div className="flex justify-center items-center min-h-screen p-4">
          <WelcomeSlider />
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <WelcomeTour 
            onSkipTour={handleSkipTour}
            onCompleteTour={handleCompleteTour}
            isFirstTimeUser={true}
            lastActivity={null}
            suggestedNextAction="Go to your dashboard to see your study plan and start learning"
            open={showTour}
            onOpenChange={setShowTour}
          />
        </div>
      )}
    </div>
  );
};

export default WelcomeFlowPage;
