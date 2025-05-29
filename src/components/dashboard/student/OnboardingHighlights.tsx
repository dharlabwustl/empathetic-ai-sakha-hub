
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { X, ChevronRight, Target, BookOpen, Brain, BarChart } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  targetSelector: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'neet-strategy',
    title: 'NEET Strategy Card',
    description: 'Your personalized study plan with adaptive recommendations based on your progress and goals.',
    icon: <Target className="h-5 w-5" />,
    targetSelector: '[data-tour="neet-strategy"]',
    position: 'bottom'
  },
  {
    id: 'study-plan',
    title: 'Today\'s Study Plan',
    description: 'Your daily tasks and goals, updated based on your mood and performance.',
    icon: <BookOpen className="h-5 w-5" />,
    targetSelector: '[data-tour="study-plan"]',
    position: 'bottom'
  },
  {
    id: 'smart-suggestions',
    title: 'Smart Suggestions',
    description: 'AI-powered recommendations that adapt to your study habits and time of day.',
    icon: <Brain className="h-5 w-5" />,
    targetSelector: '[data-tour="smart-suggestions"]',
    position: 'top'
  },
  {
    id: 'exam-readiness',
    title: 'Exam Readiness Score',
    description: 'Track your preparation progress and identify areas that need more attention.',
    icon: <BarChart className="h-5 w-5" />,
    targetSelector: '[data-tour="exam-readiness"]',
    position: 'bottom'
  }
];

interface OnboardingHighlightsProps {
  isVisible: boolean;
  onComplete: () => void;
}

const OnboardingHighlights: React.FC<OnboardingHighlightsProps> = ({ isVisible, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightPosition, setHighlightPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    if (isVisible && currentStep < onboardingSteps.length) {
      const targetElement = document.querySelector(onboardingSteps[currentStep].targetSelector) as HTMLElement;
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setHighlightPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        });
      }
    }
  }, [currentStep, isVisible]);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  if (!isVisible || currentStep >= onboardingSteps.length) return null;

  const currentStepData = onboardingSteps[currentStep];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleSkip}
          />

          {/* Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed z-50 pointer-events-none"
            style={{
              top: highlightPosition.top - 8,
              left: highlightPosition.left - 8,
              width: highlightPosition.width + 16,
              height: highlightPosition.height + 16,
            }}
          >
            <div className="w-full h-full border-4 border-yellow-400 rounded-lg shadow-lg animate-pulse" />
          </motion.div>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 max-w-sm"
            style={{
              top: currentStepData.position === 'bottom' ? highlightPosition.top + highlightPosition.height + 16 : highlightPosition.top - 120,
              left: highlightPosition.left + (highlightPosition.width / 2) - 150,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                {currentStepData.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{currentStepData.title}</h3>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{currentStepData.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {onboardingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleSkip}>
                  Skip Tour
                </Button>
                <Button size="sm" onClick={handleNext}>
                  {currentStep === onboardingSteps.length - 1 ? 'Finish' : 'Next'}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OnboardingHighlights;
