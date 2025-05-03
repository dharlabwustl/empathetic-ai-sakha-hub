
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Calendar, ClipboardList, ArrowRight, CheckCircle } from 'lucide-react';
import PrepzrLogo from '@/components/common/PrepzrLogo';

const WelcomeFlow = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const totalSteps = 3;
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
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
              <CardTitle className="text-2xl md:text-3xl font-bold">Your Study Plan</CardTitle>
              <CardDescription className="text-lg">Personalized and adaptive learning path</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-primary/10 mb-6">
                <Calendar className="h-16 w-16 text-primary" />
              </div>
              <div className="space-y-4">
                <p className="text-center">
                  We've created a personalized study plan based on your goals and learning preferences.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Daily and weekly study targets customized to your schedule</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Dynamic pacing that adapts to your progress</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Subject prioritization based on your strengths and weaknesses</span>
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
              <CardTitle className="text-2xl md:text-3xl font-bold">Smart Flashcards</CardTitle>
              <CardDescription className="text-lg">Master concepts faster and more effectively</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-primary/10 mb-6">
                <Book className="h-16 w-16 text-primary" />
              </div>
              <div className="space-y-4">
                <p className="text-center">
                  Our AI-powered flashcards adapt to your learning pace and help identify knowledge gaps.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Spaced repetition for long-term retention</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Visual learning with diagrams and illustrations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Track your recall accuracy and memory strength</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
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
              <CardTitle className="text-2xl md:text-3xl font-bold">Practice Exams & Pacing</CardTitle>
              <CardDescription className="text-lg">Build confidence with realistic exam practice</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-primary/10 mb-6">
                <ClipboardList className="h-16 w-16 text-primary" />
              </div>
              <div className="space-y-4">
                <p className="text-center">
                  Prepare for the real exam with timed practice tests and performance analytics.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Real exam-style questions and timing</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Detailed performance analysis by topic and question type</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Personalized recommendations for improvement</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
              <Button onClick={handleNext} className="flex items-center gap-2">
                Go to Dashboard <ArrowRight className="h-4 w-4" />
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
