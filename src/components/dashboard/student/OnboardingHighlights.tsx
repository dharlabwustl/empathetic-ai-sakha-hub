
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'neet-strategy',
    title: 'NEET Strategy Card',
    description: 'Your personalized study plan with adaptive recommendations based on your progress and weak areas.',
    target: '#neet-strategy-card',
    position: 'bottom'
  },
  {
    id: 'todays-plan',
    title: "Today's Study Plan",
    description: 'Your daily tasks and goals. Complete these to stay on track for your NEET preparation.',
    target: '#todays-plan-section',
    position: 'bottom'
  },
  {
    id: 'exam-readiness',
    title: 'Exam Readiness Score',
    description: 'Track your overall preparation level and see how ready you are for NEET.',
    target: '#exam-readiness-section',
    position: 'top'
  },
  {
    id: 'concepts',
    title: 'Master Concepts',
    description: 'Study core concepts with detailed explanations, examples, and practice questions.',
    target: '#concepts-section',
    position: 'top'
  },
  {
    id: 'flashcards',
    title: 'Quick Flashcards',
    description: 'Reinforce your learning with spaced repetition flashcards for better retention.',
    target: '#flashcards-section',
    position: 'top'
  },
  {
    id: 'practice-exam',
    title: 'Practice Exams',
    description: 'Test your knowledge with full-length practice tests and targeted quizzes.',
    target: '#practice-exam-section',
    position: 'top'
  }
];

interface OnboardingHighlightsProps {
  isFirstTimeUser?: boolean;
}

const OnboardingHighlights: React.FC<OnboardingHighlightsProps> = ({ 
  isFirstTimeUser = false 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [highlightPosition, setHighlightPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    // Only show onboarding for first-time users or if explicitly requested
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding') === 'true';
    if (isFirstTimeUser && !hasSeenOnboarding) {
      setTimeout(() => setIsVisible(true), 2000); // Show after 2 seconds
    }
  }, [isFirstTimeUser]);

  useEffect(() => {
    if (isVisible && currentStep < onboardingSteps.length) {
      const targetElement = document.querySelector(onboardingSteps[currentStep].target);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setHighlightPosition({
          top: rect.top + window.scrollY - 10,
          left: rect.left + window.scrollX - 10,
          width: rect.width + 20,
          height: rect.height + 20
        });
        
        // Scroll to element
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentStep, isVisible]);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  const handleSkip = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  if (!isVisible || currentStep >= onboardingSteps.length) return null;

  const step = onboardingSteps[currentStep];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleSkip}
          />

          {/* Highlight box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-50 border-4 border-yellow-400 rounded-lg pointer-events-none"
            style={{
              top: highlightPosition.top,
              left: highlightPosition.left,
              width: highlightPosition.width,
              height: highlightPosition.height,
              boxShadow: '0 0 20px rgba(255, 255, 0, 0.5)'
            }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(255, 255, 0, 0.5)',
                '0 0 30px rgba(255, 255, 0, 0.8)',
                '0 0 20px rgba(255, 255, 0, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed z-50"
            style={{
              top: step.position === 'bottom' ? highlightPosition.top + highlightPosition.height + 20 : 
                   step.position === 'top' ? highlightPosition.top - 200 :
                   highlightPosition.top,
              left: step.position === 'right' ? highlightPosition.left + highlightPosition.width + 20 :
                    step.position === 'left' ? highlightPosition.left - 320 :
                    highlightPosition.left + (highlightPosition.width / 2) - 150,
            }}
          >
            <Card className="w-80 p-4 bg-white dark:bg-gray-800 shadow-xl border-2 border-yellow-400">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSkip}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {step.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Step {currentStep + 1} of {onboardingSteps.length}
                </div>
                
                <div className="flex gap-2">
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevious}
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    onClick={handleNext}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    {currentStep === onboardingSteps.length - 1 ? 'Finish' : 'Next'}
                    {currentStep !== onboardingSteps.length - 1 && (
                      <ArrowRight className="h-4 w-4 ml-1" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OnboardingHighlights;
