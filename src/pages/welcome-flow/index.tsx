
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Book, Calendar, CheckCircle, ArrowRight, GraduationCap, 
  Clock, Brain, ChevronRight, Sparkles, Volume, Mic
} from 'lucide-react';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import VoiceGreeting from '@/components/dashboard/student/voice/VoiceGreeting';

const WelcomeFlow = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Student");
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);

  useEffect(() => {
    // Get user data and check if this is a Google signup
    const userData = localStorage.getItem('userData');
    const googleSignup = localStorage.getItem('google_signup') === 'true';
    
    setIsGoogleSignup(googleSignup);
    
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData.name) {
          setUserName(parsedData.name);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const totalSteps = 4; // Added one more step for voice assistant
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Mark that they've completed the welcome flow
      localStorage.setItem('welcomeFlowCompleted', 'true');
      
      // Set flags to ensure the welcome tour shows up
      localStorage.setItem('new_user_signup', 'true');
      localStorage.setItem('sawWelcomeSlider', 'true');
      localStorage.setItem('sawWelcomeTour', 'false');
      localStorage.setItem('isLoggedIn', 'true');
      
      // For Google signups, flag for study plan creation should be maintained
      if (isGoogleSignup) {
        localStorage.setItem('needs_study_plan_creation', 'true');
      }
      
      // On completion, navigate to dashboard with tour flag
      // Direct navigation to dashboard with query parameters
      window.location.href = '/dashboard/student?new=true&completedOnboarding=true';
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        // Welcome screen
        return (
          <Card className="w-full max-w-xl bg-white shadow-2xl border-0 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400"></div>
            <CardHeader className="text-center pb-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CardTitle className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Welcome to PREPZR</CardTitle>
                <CardDescription className="text-lg">Your AI-powered study companion</CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <motion.div 
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                className="p-4 rounded-full bg-primary/10 mb-6"
              >
                <GraduationCap className="h-16 w-16 text-primary" />
              </motion.div>
              <div className="space-y-4">
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-center"
                >
                  PREPZR helps you excel in your exams with personalized study plans and AI-powered adaptive learning.
                </motion.p>
                <motion.ul 
                  className="space-y-2"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.15, delayChildren: 0.5 }
                    },
                    hidden: {}
                  }}
                >
                  <motion.li 
                    className="flex items-start space-x-2"
                    variants={{
                      visible: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: -20 }
                    }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Personalized study plans tailored to your goals and learning style</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-start space-x-2"
                    variants={{
                      visible: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: -20 }
                    }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>AI tutor that adapts to your strengths and weaknesses</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-start space-x-2"
                    variants={{
                      visible: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: -20 }
                    }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Smart analytics to track your progress and identify areas for improvement</span>
                  </motion.li>
                </motion.ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-2">
              <Button onClick={handleNext} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8">
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
      case 2:
        // Personalized learning step
        return (
          <Card className="w-full max-w-xl bg-white shadow-2xl border-0 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400"></div>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold">Personalized Learning</CardTitle>
              <CardDescription>How PREPZR adapts to your needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-blue-100 text-blue-700">
                  <Brain className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="font-medium">AI-Driven Study Plans</h3>
                  <p className="text-sm text-gray-500">Our AI analyzes your performance to create optimal study schedules</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-purple-100 text-purple-700">
                  <Book className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="font-medium">Smart Concept Cards</h3>
                  <p className="text-sm text-gray-500">Break down complex topics into manageable, interactive learning cards</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-pink-100 text-pink-700">
                  <Calendar className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="font-medium">Spaced Repetition</h3>
                  <p className="text-sm text-gray-500">Review concepts at optimal intervals to maximize long-term retention</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-700">
                  <Clock className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="font-medium">Time Optimization</h3>
                  <p className="text-sm text-gray-500">Focus on what matters most based on your exam goals and timeline</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-2">
              <Button onClick={handleNext} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
      case 3:
        // Voice assistant introduction
        return (
          <Card className="w-full max-w-xl bg-white shadow-2xl border-0 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400"></div>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold">Meet Your Voice Assistant</CardTitle>
              <CardDescription>Your personal AI study companion</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                  <Volume className="h-10 w-10 text-white" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 rounded-full border-4 border-purple-300 opacity-70"
                ></motion.div>
              </div>
              
              <div className="space-y-4 text-center max-w-md">
                <p>Your AI assistant helps you study more effectively through voice interaction.</p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mic className="h-4 w-4 text-purple-600" />
                    <p className="text-sm">"Show me today's tasks"</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mic className="h-4 w-4 text-purple-600" />
                    <p className="text-sm">"Explain Newton's Laws"</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mic className="h-4 w-4 text-purple-600" />
                    <p className="text-sm">"Create flashcards for biology"</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <VoiceGreeting 
                    isFirstTimeUser={true}
                    userName={userName}
                    language="en"
                    autoPlay={false}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-2">
              <Button onClick={handleNext} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
        
      case 4:
        // Final step - getting started
        return (
          <Card className="w-full max-w-xl bg-white shadow-2xl border-0 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400"></div>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold">Ready to Get Started!</CardTitle>
              <CardDescription>Your dashboard is waiting for you</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
              >
                <Sparkles className="h-14 w-14 text-white" />
              </motion.div>
              
              <div className="text-center max-w-md space-y-4">
                <p className="font-medium text-lg">
                  Welcome, {userName}! We're excited to help you achieve your academic goals.
                </p>
                <p className="text-gray-600">
                  Your personalized dashboard is all set up. Take the guided tour to learn all the features that will help you succeed.
                </p>

                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-sm">
                  {isGoogleSignup ? (
                    <p>
                      Since you signed up with Google, we'll help you create your study plan after the tour.
                    </p>
                  ) : (
                    <p>
                      Your study preferences have been saved. You can update them anytime from your profile.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-4">
              <Button 
                onClick={handleNext} 
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-8 py-6 text-lg"
              >
                Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full max-w-xl"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WelcomeFlow;
