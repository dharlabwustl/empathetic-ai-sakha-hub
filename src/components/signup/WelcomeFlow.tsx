
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Lightbulb, BookOpen, ClipboardCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import PrepzrLogo from '@/components/common/PrepzrLogo';

interface WelcomeFlowProps {
  onComplete: () => void;
}

const WelcomeFlow: React.FC<WelcomeFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  
  const steps = [
    {
      title: "Your Personal Study Plan",
      description: "PREPZR creates a customized study plan based on your learning style, exam goals, and available study time.",
      icon: <Lightbulb className="h-16 w-16 text-indigo-500" />,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Interactive Flashcards",
      description: "Master concepts faster with our intelligent flashcards that adapt to your learning patterns.",
      icon: <BookOpen className="h-16 w-16 text-sky-500" />,
      color: "from-sky-500 to-blue-500"
    },
    {
      title: "Practice Exams",
      description: "Test your knowledge with realistic practice exams that mimic your target test's format and difficulty.",
      icon: <ClipboardCheck className="h-16 w-16 text-emerald-500" />,
      color: "from-emerald-500 to-green-500"
    }
  ];
  
  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Last step, complete the welcome flow
      onComplete();
    }
  };
  
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  
  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="mb-8">
        <PrepzrLogo width={180} height="auto" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="relative h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500">
            <motion.div 
              className="absolute h-full bg-white" 
              initial={{ width: '0%' }}
              animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          <CardContent className="p-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="p-8"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 rounded-full bg-gradient-to-br ${steps[step].color} mb-6 shadow-lg`}>
                    {steps[step].icon}
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{steps[step].title}</h2>
                  <p className="text-gray-600 mb-8">{steps[step].description}</p>
                  
                  <div className="flex items-center justify-between w-full">
                    <Button 
                      variant="outline" 
                      onClick={handleBack} 
                      disabled={step === 0}
                      className={step === 0 ? 'invisible' : ''}
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                    
                    <div className="space-x-2">
                      {step < steps.length - 1 && (
                        <Button variant="ghost" onClick={handleSkip}>
                          Skip
                        </Button>
                      )}
                      
                      <Button onClick={handleNext}>
                        {step === steps.length - 1 ? 'Get Started' : 'Next'}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
        
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-2">
            {steps.map((_, i) => (
              <motion.div 
                key={i}
                className={`h-2 rounded-full ${i <= step ? 'bg-indigo-500' : 'bg-gray-200'}`}
                initial={{ width: i === step ? 12 : 12 }}
                animate={{ width: i === step ? 24 : 12 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeFlow;
