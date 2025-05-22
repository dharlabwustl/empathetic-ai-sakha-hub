import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, CalendarDays, FileText, Brain, ExternalLink, ChevronLeft, ChevronRight, ClipboardCheck, BookMarked, FileQuestion } from 'lucide-react';

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser?: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser = false,
  lastActivity,
  suggestedNextAction,
  loginCount = 0,
  open = false,
  onOpenChange
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  useEffect(() => {
    // Stop any voice announcements when this component unmounts
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const steps = [
    {
      title: "Your Academic Advisor",
      content: (
        <div className="space-y-4">
          <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg border border-blue-100 dark:border-blue-900/50 shadow-sm">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <Brain className="mr-2 h-5 w-5 text-blue-500" />
              Your Study Plan
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Your academic advisor creates personalized study plans based on your exam requirements and learning style.
              This is your first stop for guidance on what to study.
            </p>
            
            {/* Interactive element */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm font-medium mb-2">What would you like to see first?</p>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setHasInteracted(true)}
                >
                  My Study Schedule
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setHasInteracted(true)}
                >
                  Exam Requirements
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Today's Study Plan",
      content: (
        <div className="space-y-4">
          <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg border border-blue-100 dark:border-blue-900/50 shadow-sm">
            <h3 className="text-md font-medium mb-2 flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-indigo-500" />
              Daily Learning Roadmap
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Focus on what matters today with your personalized daily plan. Complete tasks to stay on track for your exam.
            </p>
            
            {/* Example daily task */}
            <div className="mt-3 border border-indigo-100 dark:border-indigo-900/30 rounded-lg overflow-hidden">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 border-b border-indigo-100 dark:border-indigo-900/30">
                <h4 className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Today's Tasks</h4>
              </div>
              <div className="p-3 space-y-2">
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0 mr-2"
                    onClick={() => setHasInteracted(true)}
                  >
                    <div className="h-4 w-4 border border-indigo-400 dark:border-indigo-500 rounded-sm"></div>
                  </Button>
                  <span className="text-xs">Read Chapter 5: Cell Division (45 min)</span>
                </div>
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0 mr-2"
                    onClick={() => setHasInteracted(true)}
                  >
                    <div className="h-4 w-4 border border-indigo-400 dark:border-indigo-500 rounded-sm"></div>
                  </Button>
                  <span className="text-xs">Solve 10 practice problems on DNA Structure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Concept Cards & Flashcards",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50 shadow-sm">
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <BookOpen className="mr-2 h-4 w-4 text-indigo-500" />
                Master Key Concepts
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Concept cards break down complex topics with visual aids and clear explanations.
              </p>
              
              {/* Mini concept card example */}
              <div className="mt-3 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/10 p-2 rounded border border-indigo-100 dark:border-indigo-900/30">
                <h5 className="text-xs font-medium text-indigo-700 dark:text-indigo-300">DNA Structure</h5>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">A double helix structure with complementary base pairs...</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs mt-1 h-6 px-2 text-indigo-600 dark:text-indigo-400"
                  onClick={() => setHasInteracted(true)}
                >
                  View concept →
                </Button>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/50 shadow-sm">
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <BookMarked className="mr-2 h-4 w-4 text-emerald-500" />
                Flashcards for Quick Review
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Test your knowledge with interactive flashcards that adapt to your learning progress.
              </p>
              
              {/* Flashcard example */}
              <div className="mt-2 flex justify-center">
                <Button 
                  variant="outline"
                  size="sm"
                  className="text-xs py-5 px-4 w-full max-w-[200px] bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50"
                  onClick={() => setHasInteracted(true)}
                >
                  <span className="text-center w-full">Tap to see the function of mitochondria</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Practice Exams & Past Papers",
      content: (
        <div className="space-y-4">
          <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg border border-purple-100 dark:border-purple-900/50 shadow-sm">
            <h4 className="text-sm font-medium mb-1 flex items-center">
              <FileText className="mr-2 h-4 w-4 text-purple-500" />
              Practice Exams
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Test your knowledge with exam-like questions and get detailed analytics to improve your performance.
            </p>
            
            {/* Practice exam example */}
            <div className="mt-3 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-xs">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Biology Mock Test</span>
                <span className="text-purple-600 dark:text-purple-300">45 min</span>
              </div>
              <div className="flex space-x-1">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="text-xs h-6 px-2 flex-1"
                  onClick={() => setHasInteracted(true)}
                >
                  Start Exam
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-6 px-2"
                  onClick={() => setHasInteracted(true)}
                >
                  Details
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg border border-amber-100 dark:border-amber-900/50 shadow-sm">
            <h4 className="text-sm font-medium mb-1 flex items-center">
              <FileQuestion className="mr-2 h-4 w-4 text-amber-500" />
              Previous Year Papers
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Master real exam patterns by practicing with previous year papers with detailed solutions.
            </p>
            
            {/* Previous papers list */}
            <ul className="mt-2 space-y-1">
              <li>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs w-full justify-start h-6 px-2"
                  onClick={() => setHasInteracted(true)}
                >
                  <span className="flex justify-between w-full">
                    <span>NEET 2023 Paper</span>
                    <span className="text-amber-600 dark:text-amber-400 text-xs">Solve</span>
                  </span>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs w-full justify-start h-6 px-2"
                  onClick={() => setHasInteracted(true)}
                >
                  <span className="flex justify-between w-full">
                    <span>NEET 2022 Paper</span>
                    <span className="text-amber-600 dark:text-amber-400 text-xs">Solve</span>
                  </span>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Your Learning Journey Begins!",
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
            <h3 className="text-center font-medium text-green-700 dark:text-green-300 mb-2">
              {hasInteracted ? "Great job interacting!" : "Your dashboard is ready!"}
            </h3>
            <p className="text-center text-sm">
              You're all set to begin your successful exam preparation journey with PREPZR.
            </p>
            
            <div className="mt-4 flex justify-center">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-green-200 dark:border-green-800/50 max-w-xs">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 dark:bg-green-800/30 p-1.5 rounded-full">
                    <ClipboardCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Start with Today's Plan</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      We recommend beginning with your daily study plan to stay on track for your exam goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {suggestedNextAction && (
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800/50">
              <h3 className="text-sm font-medium mb-1">Suggested Next Action:</h3>
              <p className="text-sm text-blue-800 dark:text-blue-300">{suggestedNextAction}</p>
            </div>
          )}
        </div>
      )
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onCompleteTour();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            {steps[currentStep].title}
          </DialogTitle>
          <DialogDescription>
            {isFirstTimeUser 
              ? "Your personalized learning space is ready for you."
              : `It's good to see you again. Let's continue your learning journey.`
            }
          </DialogDescription>
        </DialogHeader>
        
        {/* Step content */}
        <div className="my-4">
          {steps[currentStep].content}
        </div>
        
        {/* Progress indicator */}
        <div className="flex justify-center space-x-1 my-2">
          {steps.map((_, index) => (
            <div 
              key={index}
              className={`h-2 rounded-full ${currentStep === index ? 'w-6 bg-blue-500' : 'w-2 bg-gray-300 dark:bg-gray-600'}`}
            />
          ))}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={onSkipTour} 
              size="sm"
              className="text-xs sm:text-sm"
            >
              Skip Tour
            </Button>
            
            {currentStep > 0 && (
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                size="sm"
                className="text-xs sm:text-sm flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
            )}
          </div>
          
          <Button 
            onClick={handleNext} 
            className={`bg-gradient-to-r ${currentStep === steps.length - 1 ? 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' : 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'} text-xs sm:text-sm flex items-center`}
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'} 
            {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
