
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface OnboardingHighlightTourProps {
  isFirstTimeUser: boolean;
  onComplete: () => void;
}

const OnboardingHighlightTour: React.FC<OnboardingHighlightTourProps> = ({
  isFirstTimeUser,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const tourSteps = [
    {
      id: 'academic-advisor',
      title: 'Step 1: Academic Advisor',
      description: 'Check your personalized study plans created specifically for your exam preparation. This is your starting point to understand your learning path.',
      selector: '.academic-advisor-section',
      position: { top: '20%', left: '50%' }
    },
    {
      id: 'todays-plan',
      title: 'Step 2: Today\'s Plan',
      description: 'Your daily study plan tailored to your preparation timeline and profile. Follow this for structured daily progress.',
      selector: '.todays-plan-section',
      position: { top: '30%', left: '50%' }
    },
    {
      id: 'top-priority',
      title: 'Step 3: Top Priority Card',
      description: 'Take immediate action on the most critical tasks for your exam preparation. These are time-sensitive activities.',
      selector: '#top-priority-card',
      position: { top: '40%', left: '30%' }
    },
    {
      id: 'concept-cards',
      title: 'Step 4: Concept Cards',
      description: 'Access all study materials for each concept across all subjects. Your comprehensive learning resource library.',
      selector: '#concept-cards',
      position: { top: '50%', left: '70%' }
    },
    {
      id: 'flashcards',
      title: 'Step 5: Flashcards',
      description: 'Practice recall for studied concepts to improve accuracy and memory retention through spaced repetition.',
      selector: '#flashcard-review',
      position: { top: '60%', left: '30%' }
    },
    {
      id: 'practice-exams',
      title: 'Step 6: Practice Exams',
      description: 'Take practice exams to test your understanding and knowledge of each concept. Track your progress over time.',
      selector: '#practice-exams',
      position: { top: '70%', left: '70%' }
    },
    {
      id: 'formula-practice',
      title: 'Step 7: Formula Practice',
      description: 'Practice formulas for all subjects to get hands-on experience and build muscle memory for calculations.',
      selector: '#formula-practice',
      position: { top: '80%', left: '50%' }
    },
    {
      id: 'strategy-card',
      title: 'Step 8: Strategy Card',
      description: 'Your adaptive strategy card personalized to your profile, strengths, and learning patterns. This evolves with your progress.',
      selector: '.neet-strategy-card',
      position: { top: '50%', left: '50%' }
    }
  ];

  useEffect(() => {
    if (isFirstTimeUser) {
      const hasSeenTour = localStorage.getItem('hasSeenOnboardingTour');
      if (!hasSeenTour) {
        setTimeout(() => setIsVisible(true), 3000); // Start after 3 seconds
      }
    }
  }, [isFirstTimeUser]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
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
    localStorage.setItem('hasSeenOnboardingTour', 'true');
    onComplete();
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!isVisible || !isFirstTimeUser) return null;

  const currentStepData = tourSteps[currentStep];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[9999] pointer-events-auto"
            style={{ backdropFilter: 'blur(2px)' }}
          />

          {/* Highlight Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed z-[10000] pointer-events-none"
            style={{
              top: currentStepData.position.top,
              left: currentStepData.position.left,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-80 h-60 rounded-xl border-4 border-blue-400 shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] bg-white/10 backdrop-blur-sm animate-pulse" />
          </motion.div>

          {/* Instruction Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[10001] pointer-events-auto"
          >
            <Card className="w-96 max-w-[90vw] bg-white dark:bg-gray-800 shadow-2xl border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-blue-700 dark:text-blue-400 mb-1">
                      {currentStepData.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Getting Started Guide</span>
                      <span>•</span>
                      <span>{currentStep + 1} of {tourSteps.length}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSkip}
                    className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
                
                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {currentStepData.description}
                </p>
                
                {/* Progress Dots */}
                <div className="flex justify-center space-x-2 mb-6">
                  {tourSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentStep 
                          ? 'bg-blue-500' 
                          : index < currentStep
                          ? 'bg-blue-300'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    {currentStep === tourSteps.length - 1 ? 'Finish Tour' : 'Next Step'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Custom Styles for highlight effect */}
          <style>{`
            .tour-highlight {
              position: relative;
              z-index: 10001;
              box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3);
              border-radius: 8px;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};

export default OnboardingHighlightTour;
