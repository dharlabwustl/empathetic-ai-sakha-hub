import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Calendar, CheckCircle, ArrowRight, GraduationCap, Clock, Brain, ChevronRight, Sparkles, Mic } from 'lucide-react';
import PrepzrLogo from '@/components/common/PrepzrLogo';

const WelcomeFlow = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const totalSteps = 4; // Increased from 3 to add voice assistant step
  
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
      
      // On completion, navigate to dashboard with tour flag
      navigate('/dashboard/student?new=true&completedOnboarding=true');
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
        // First step - Welcome to PREPZR
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
                    <span>Track your progress with detailed analytics and insights</span>
                  </motion.li>
                </motion.ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button onClick={handleNext} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300">
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        );
      case 2:
        // Second step - Study Plan
        return (
          <Card className="w-full max-w-xl bg-white shadow-2xl border-0 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400"></div>
            <CardHeader className="text-center pb-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CardTitle className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Your Study Plan</CardTitle>
                <CardDescription className="text-lg">Optimized time allocation for your success</CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <motion.div 
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                className="p-4 rounded-full bg-primary/10 mb-6"
              >
                <Clock className="h-16 w-16 text-primary" />
              </motion.div>
              <div className="space-y-4">
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-center"
                >
                  Your time is precious. Our AI allocates study hours based on your learning pace and exam timeline.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-blue-50 p-4 rounded-lg shadow-inner"
                >
                  <h4 className="font-medium text-center mb-2 flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    Optimized Time Allocation
                  </h4>
                  <ul className="space-y-2">
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center justify-between"
                    >
                      <span>Strong Subjects:</span>
                      <span className="font-medium text-blue-700">30% of study time</span>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex items-center justify-between"
                    >
                      <span>Medium Proficiency:</span>
                      <span className="font-medium text-blue-700">40% of study time</span>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-center justify-between"
                    >
                      <span>Weak Areas:</span>
                      <span className="font-medium text-blue-700">50% of study time</span>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                      className="flex items-center justify-between"
                    >
                      <span>Regular Breaks:</span>
                      <span className="font-medium text-blue-700">Pomodoro technique</span>
                    </motion.li>
                  </ul>
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="text-center text-sm text-muted-foreground"
                >
                  Your schedule adapts in real-time as you progress through your studies.
                </motion.p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between sm:justify-between">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleNext} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300">
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        );
      case 3:
        // New step - Voice Intelligent Support
        return (
          <Card className="w-full max-w-xl bg-white shadow-2xl border-0 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400"></div>
            <CardHeader className="text-center pb-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CardTitle className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Voice Intelligent Support</CardTitle>
                <CardDescription className="text-lg">Your study companion speaks with you</CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <motion.div 
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                className="p-4 rounded-full bg-primary/10 mb-6"
              >
                <Mic className="h-16 w-16 text-primary" />
              </motion.div>
              <div className="space-y-4">
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-center"
                >
                  PREPZR's voice intelligent system helps you study more effectively by providing verbal guidance and answering your questions.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-purple-50 p-4 rounded-lg shadow-inner"
                >
                  <h4 className="font-medium text-center mb-2 flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    Voice Assistant Features
                  </h4>
                  <ul className="space-y-2">
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center space-x-2"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Ask questions about any topic in your curriculum</span>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex items-center space-x-2"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Get instant verbal explanations of complex concepts</span>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-center space-x-2"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Use voice commands to navigate the platform</span>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                      className="flex items-center space-x-2"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Multiple language support for better understanding</span>
                    </motion.li>
                  </ul>
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="text-center text-sm text-muted-foreground"
                >
                  Voice assistance helps you learn faster and retain information better with auditory learning.
                </motion.p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between sm:justify-between">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleNext} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300">
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        );
      case 4:
        // Original third step - From our founder
        return (
          <Card className="w-full max-w-xl bg-white shadow-2xl border-0 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400"></div>
            <CardHeader className="text-center pb-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CardTitle className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">From Our Founder</CardTitle>
                <CardDescription className="text-lg">A personal message for your learning journey</CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                className="rounded-full overflow-hidden w-24 h-24 mb-4 shadow-lg"
              >
                <img 
                  src="/lovable-uploads/2536e929-d62e-4754-919e-759100b32e1d.png" 
                  alt="Amit Singh" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-medium text-center mb-1"
              >
                Amit Singh
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-muted-foreground text-center mb-4"
              >
                Founder, PREPZR
              </motion.p>
              
              <div className="space-y-4 text-center">
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="italic"
                >
                  "At PREPZR, we believe every student deserves personalized guidance to reach their full potential. 
                  Our AI-powered platform is designed to adapt to your unique learning style and help you achieve your academic goals."
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Your journey with PREPZR begins now. We're excited to help you excel in your exams and become the best version of yourself.
                </motion.p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleNext} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300">
                  Start Now <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-950/30 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {renderStep()}
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              {[...Array(totalSteps)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i + 1 === step ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WelcomeFlow;
