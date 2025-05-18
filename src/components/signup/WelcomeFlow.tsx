
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Calendar, CheckCircle, ArrowRight, GraduationCap, Clock, Brain, ChevronRight } from 'lucide-react';
import PrepzrLogo from '@/components/common/PrepzrLogo';

const WelcomeFlow = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const totalSteps = 3;
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Mark that they've completed the welcome flow
      localStorage.setItem('welcomeFlowCompleted', 'true');
      // On completion, navigate to dashboard with tour flag
      navigate('/dashboard/student?new=true&completedOnboarding=true');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="w-full max-w-xl bg-white shadow-lg border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl font-bold">Welcome to PREPZR</CardTitle>
              <CardDescription className="text-lg">Your AI-powered study companion</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-primary/10 mb-6">
                <GraduationCap className="h-16 w-16 text-primary" />
              </div>
              <div className="space-y-4">
                <p className="text-center">
                  PREPZR helps you excel in your exams with personalized study plans and AI-powered adaptive learning.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Personalized study plans tailored to your goals and learning style</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>AI tutor that adapts to your strengths and weaknesses</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Track your progress with detailed analytics and insights</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleNext} className="flex items-center gap-2">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
      case 2:
        return (
          <Card className="w-full max-w-xl bg-white shadow-lg border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl font-bold">Your Study Plan</CardTitle>
              <CardDescription className="text-lg">Optimized time allocation for your success</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-primary/10 mb-6">
                <Clock className="h-16 w-16 text-primary" />
              </div>
              <div className="space-y-4">
                <p className="text-center">
                  Your time is precious. Our AI allocates study hours based on your learning pace and exam timeline.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-center mb-2">Optimized Time Allocation</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between">
                      <span>Strong Subjects:</span>
                      <span className="font-medium">30% of study time</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Medium Proficiency:</span>
                      <span className="font-medium">40% of study time</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Weak Areas:</span>
                      <span className="font-medium">50% of study time</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Regular Breaks:</span>
                      <span className="font-medium">Pomodoro technique</span>
                    </li>
                  </ul>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Your schedule adapts in real-time as you progress through your studies.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between sm:justify-between">
              <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
              <Button onClick={handleNext} className="flex items-center gap-2">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
      case 3:
        return (
          <Card className="w-full max-w-xl bg-white shadow-lg border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl font-bold">From Our Founder</CardTitle>
              <CardDescription className="text-lg">A personal message for your learning journey</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="rounded-full bg-gray-100 w-24 h-24 mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                  DP
                </div>
              </div>
              <p className="font-medium text-center mb-1">Dr. Patel</p>
              <p className="text-sm text-muted-foreground text-center mb-4">Founder, PREPZR</p>
              
              <div className="space-y-4 text-center">
                <p className="italic">
                  "At PREPZR, we believe every student deserves personalized guidance to reach their full potential. 
                  Our AI-powered platform is designed to adapt to your unique learning style and help you achieve your academic goals."
                </p>
                <p>
                  Your journey with PREPZR begins now. We're excited to help you excel in your exams and become the best version of yourself.
                </p>
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    We allocate 5% of our monthly subscription revenue to provide free access for underprivileged students.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between sm:justify-between">
              <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
              <Button onClick={handleNext} className="flex items-center gap-2">
                Let's Begin <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <PrepzrLogo width={180} height="auto" />
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-xl"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
      
      <div className="mt-8 flex space-x-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-2 w-${index === step - 1 ? '8' : '2'} rounded-full transition-all duration-300 ${
              index < step ? 'bg-primary' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default WelcomeFlow;
