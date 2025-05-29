
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingHighlightsProps {
  isFirstTimeUser: boolean;
  onComplete: () => void;
}

const OnboardingHighlights: React.FC<OnboardingHighlightsProps> = ({
  isFirstTimeUser,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const highlights = [
    {
      id: 'neet-strategy',
      title: 'NEET Strategy Card',
      description: 'Your personalized strategy based on performance analysis and subject strengths/weaknesses.',
      position: { top: '50%', left: '50%' }
    },
    {
      id: 'study-plan',
      title: "Today's Study Plan",
      description: 'Adaptive daily plan that changes based on your mood and learning progress.',
      position: { top: '60%', left: '50%' }
    },
    {
      id: 'smart-suggestions',
      title: 'Smart Suggestions',
      description: 'Time-based AI recommendations that suggest the best activities for your current time of day.',
      position: { top: '70%', left: '30%' }
    },
    {
      id: 'exam-readiness',
      title: 'Exam Readiness',
      description: 'Real-time assessment of your preparation level with actionable insights.',
      position: { top: '50%', left: '70%' }
    },
    {
      id: 'concepts',
      title: 'Interactive Concepts',
      description: 'Learn complex topics through interactive explanations and visual aids.',
      position: { top: '40%', left: '60%' }
    },
    {
      id: 'flashcards',
      title: 'Smart Flashcards',
      description: 'AI-powered spaced repetition system for effective memorization.',
      position: { top: '30%', left: '40%' }
    }
  ];

  useEffect(() => {
    if (isFirstTimeUser) {
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboardingHighlights');
      if (!hasSeenOnboarding) {
        setTimeout(() => setIsVisible(true), 2000); // Start after 2 seconds
      }
    }
  }, [isFirstTimeUser]);

  const handleNext = () => {
    if (currentStep < highlights.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenOnboardingHighlights', 'true');
    onComplete();
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!isVisible || !isFirstTimeUser) return null;

  const currentHighlight = highlights[currentStep];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 pointer-events-auto"
          />

          {/* Highlight spotlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed z-50 pointer-events-none"
            style={{
              top: currentHighlight.position.top,
              left: currentHighlight.position.left,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-64 h-64 rounded-full border-4 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] bg-transparent" />
          </motion.div>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm pointer-events-auto"
            style={{
              top: `calc(${currentHighlight.position.top} + 150px)`,
              left: currentHighlight.position.left,
              transform: 'translateX(-50%)'
            }}
          >
            {/* Arrow pointing up */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white dark:border-b-gray-800" />
            
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                {currentHighlight.title}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </Button>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
              {currentHighlight.description}
            </p>
            
            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                {highlights.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep 
                        ? 'bg-blue-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {currentStep === highlights.length - 1 ? 'Finish' : 'Next'}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
              Step {currentStep + 1} of {highlights.length}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OnboardingHighlights;
