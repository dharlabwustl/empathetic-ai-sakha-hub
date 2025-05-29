
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  BookOpen, 
  Calendar, 
  AlertTriangle, 
  Brain, 
  Zap, 
  Target,
  Calculator,
  FileText
} from 'lucide-react';

interface OnboardingHighlightTourProps {
  onComplete: () => void;
}

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const OnboardingHighlightTour: React.FC<OnboardingHighlightTourProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);

  const tourSteps: TourStep[] = [
    {
      id: 'academic-advisor',
      title: 'Academic Advisor',
      description: 'Check your study plans and get personalized recommendations based on your learning progress.',
      icon: <BookOpen className="h-5 w-5" />,
      target: '[data-tour-step="exam-goal"]',
      position: 'bottom'
    },
    {
      id: 'todays-plan',
      title: "Today's Plan",
      description: 'View your daily study schedule prepared as per your preparation timeline and profile.',
      icon: <Calendar className="h-5 w-5" />,
      target: '[data-tour-step="todays-plan"]',
      position: 'bottom'
    },
    {
      id: 'top-priority',
      title: 'Top Priority',
      description: 'Take immediate action on the most important tasks for your exam preparation.',
      icon: <AlertTriangle className="h-5 w-5" />,
      target: '[data-tour-step="top-priority"]',
      position: 'left'
    },
    {
      id: 'concept-cards',
      title: 'Concept Cards',
      description: 'Get all study materials for each concept across all subjects. Learn with interactive content.',
      icon: <Brain className="h-5 w-5" />,
      target: '[data-tour-step="concept-cards"]',
      position: 'top'
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      description: 'Practice recall for studied concepts to improve accuracy and strengthen your memory.',
      icon: <Zap className="h-5 w-5" />,
      target: '[data-tour-step="flashcards"]',
      position: 'top'
    },
    {
      id: 'practice-exam',
      title: 'Practice Exams',
      description: 'Take practice exams and get detailed understanding of your knowledge for each concept.',
      icon: <FileText className="h-5 w-5" />,
      target: '[data-tour-step="practice-exam"]',
      position: 'top'
    },
    {
      id: 'formula-practice',
      title: 'Formula Practice',
      description: 'Practice formulas for different subjects to get hands-on experience and improve speed.',
      icon: <Calculator className="h-5 w-5" />,
      target: '[data-tour-step="formula-practice"]',
      position: 'top'
    },
    {
      id: 'strategy-card',
      title: 'Strategy Card',
      description: 'Get adaptive strategies tailored to your profile, learning pace, and exam preparation needs.',
      icon: <Target className="h-5 w-5" />,
      target: '[data-tour-step="strategy-card"]',
      position: 'top'
    }
  ];

  useEffect(() => {
    if (currentStep < tourSteps.length) {
      const targetElement = document.querySelector(tourSteps[currentStep].target) as HTMLElement;
      if (targetElement) {
        setHighlightedElement(targetElement);
        
        // Scroll element into view
        targetElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'center'
        });
      }
    }
  }, [currentStep, tourSteps]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const getTooltipPosition = (position: string) => {
    const baseClasses = "absolute z-50";
    switch (position) {
      case 'top':
        return `${baseClasses} bottom-full mb-2 left-1/2 transform -translate-x-1/2`;
      case 'bottom':
        return `${baseClasses} top-full mt-2 left-1/2 transform -translate-x-1/2`;
      case 'left':
        return `${baseClasses} right-full mr-2 top-1/2 transform -translate-y-1/2`;
      case 'right':
        return `${baseClasses} left-full ml-2 top-1/2 transform -translate-y-1/2`;
      default:
        return `${baseClasses} bottom-full mb-2 left-1/2 transform -translate-x-1/2`;
    }
  };

  if (currentStep >= tourSteps.length) {
    return null;
  }

  const currentTourStep = tourSteps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40 pointer-events-none" />
      
      {/* Highlight box */}
      {highlightedElement && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            top: highlightedElement.offsetTop - 8,
            left: highlightedElement.offsetLeft - 8,
            width: highlightedElement.offsetWidth + 16,
            height: highlightedElement.offsetHeight + 16,
            border: '3px solid #3b82f6',
            borderRadius: '12px',
            boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.5)',
            animation: 'pulse 2s infinite'
          }}
        />
      )}

      {/* Tooltip */}
      {highlightedElement && (
        <div
          className={getTooltipPosition(currentTourStep.position)}
          style={{
            top: currentTourStep.position === 'top' ? highlightedElement.offsetTop - 8 : 
                 currentTourStep.position === 'bottom' ? highlightedElement.offsetTop + highlightedElement.offsetHeight + 8 :
                 highlightedElement.offsetTop + highlightedElement.offsetHeight / 2,
            left: currentTourStep.position === 'left' ? highlightedElement.offsetLeft - 8 :
                  currentTourStep.position === 'right' ? highlightedElement.offsetLeft + highlightedElement.offsetWidth + 8 :
                  highlightedElement.offsetLeft + highlightedElement.offsetWidth / 2,
            transform: currentTourStep.position === 'top' || currentTourStep.position === 'bottom' ? 'translateX(-50%) translateY(0)' :
                      currentTourStep.position === 'left' || currentTourStep.position === 'right' ? 'translateY(-50%) translateX(0)' : 'translate(-50%, 0)'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="w-80 bg-white dark:bg-gray-900 shadow-2xl border-2 border-blue-200 dark:border-blue-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                        {currentTourStep.icon}
                      </div>
                      <CardTitle className="text-lg">{currentTourStep.title}</CardTitle>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handleSkip}
                      className="h-6 w-6"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    Step {currentStep + 1} of {tourSteps.length}
                  </Badge>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentTourStep.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                      className="flex items-center gap-1"
                    >
                      <ChevronLeft className="h-3 w-3" />
                      Previous
                    </Button>
                    
                    <div className="flex gap-1">
                      {tourSteps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentStep ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={handleNext}
                      className="flex items-center gap-1"
                    >
                      {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </>
  );
};

export default OnboardingHighlightTour;
