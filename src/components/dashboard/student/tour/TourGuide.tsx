
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Calendar, 
  Award, 
  FileText, 
  Brain, 
  Users, 
  ChevronRight, 
  ChevronLeft,
  RotateCw,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";
import { getPreferredAccent } from '../voice/voiceUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TourGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

// Tour steps definition
const tourSteps = [
  {
    id: 1,
    title: "Your Academic Advisor",
    description: "This is your personalized hub where you get exam-specific details and an overview of your learning journey.",
    icon: Brain,
    image: "/images/tour/advisor.png", 
    route: "/dashboard/student/academic-advisor",
    detailedDescription: "Your Academic Advisor provides personalized guidance based on your learning style, goals, and progress. It analyzes your strengths and weaknesses to recommend the most effective study strategies.",
    voicePrompt: "Welcome to your Academic Advisor. This is where your personalized learning journey begins. The advisor will help you understand your exam requirements and create a tailored study plan."
  },
  {
    id: 2,
    title: "Today's Study Plan",
    description: "Your daily tasks broken down based on your learning style and past performance.",
    icon: Calendar,
    image: "/images/tour/todays-plan.png",
    route: "/dashboard/student/today",
    detailedDescription: "Today's Plan breaks down your study schedule into manageable chunks. It dynamically adjusts based on your progress and ensures you focus on the right topics at the right time.",
    voicePrompt: "This is your Today's Plan section. Here you'll find your daily tasks organized by priority and tailored to your learning style. Each task is designed to optimize your study time."
  },
  {
    id: 3,
    title: "Concept Cards",
    description: "Master key concepts with detailed explanations, visual aids, and practice questions.",
    icon: BookOpen,
    image: "/images/tour/concepts.png",
    route: "/dashboard/student/concepts",
    detailedDescription: "Concept Cards provide in-depth explanations of key topics. Each card includes visual aids, examples, and practice questions to ensure complete understanding.",
    voicePrompt: "Concept Cards help you master key topics through comprehensive explanations and visual aids. Each card is designed to build a strong foundation of understanding."
  },
  {
    id: 4,
    title: "Flashcards",
    description: "Quick revision tools to reinforce your memory of important facts and formulas.",
    icon: FileText,
    image: "/images/tour/flashcards.png",
    route: "/dashboard/student/flashcards",
    detailedDescription: "Flashcards use spaced repetition to help you memorize key facts and formulas. The system adapts to your recall ability, showing cards at optimal intervals for retention.",
    voicePrompt: "Flashcards are perfect for quick revisions. They use spaced repetition techniques to help you memorize key information effectively."
  },
  {
    id: 5,
    title: "Practice Exams",
    description: "Test your knowledge with exam-like questions and get detailed performance analytics.",
    icon: Award,
    image: "/images/tour/practice-exam.png",
    route: "/dashboard/student/practice-exam",
    detailedDescription: "Practice Exams simulate real testing environments. After each exam, you'll receive detailed analysis of your performance, highlighting areas that need improvement.",
    voicePrompt: "Practice Exams help you apply your knowledge and prepare for the real test. You'll get detailed feedback on your performance to focus your revisions."
  },
  {
    id: 6,
    title: "Formula Lab",
    description: "Interactive tools to master and practice subject-specific formulas.",
    icon: Sparkles,
    image: "/images/tour/formula-lab.png",
    route: "/dashboard/student/formula-lab",
    detailedDescription: "The Formula Lab provides interactive tools to understand and apply complex formulas. You can see step-by-step solutions and practice with different variables.",
    voicePrompt: "Welcome to the Formula Lab, where you can master complex formulas through interactive tools and practice examples."
  },
  {
    id: 7,
    title: "AI Tutor & Community",
    description: "Get 24/7 help from our AI tutor and engage with a community of fellow students.",
    icon: Users,
    image: "/images/tour/community.png",
    route: "/dashboard/student/community",
    detailedDescription: "Our AI Tutor is available 24/7 to answer questions and provide guidance. The Community section connects you with fellow students for discussions, study groups, and friendly competitions.",
    voicePrompt: "The AI Tutor is always available to help with your questions, and the Community section lets you connect with other students working toward similar goals."
  }
];

const TourGuide: React.FC<TourGuideProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'tabs'>('carousel');
  const navigate = useNavigate();
  const { toast } = useToast();
  const step = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;
  
  // Initialize voice announcer with the preferred language
  const { speakMessage } = useVoiceAnnouncer({ 
    language: getPreferredAccent()
  });

  // Speak the current step description when it changes
  useEffect(() => {
    if (isOpen && step) {
      speakMessage(step.voicePrompt || step.description);
    }
    
    // Reset to first step when dialog is closed
    if (!isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen, currentStep, step, speakMessage]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Tour completed
      onClose();
      toast({
        title: "Tour Completed!",
        description: "You can access the tour anytime from the help menu.",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  const handleVisitPage = () => {
    // Navigate to the current step's route
    if (step && step.route) {
      onClose();
      navigate(step.route);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Your Learning Journey
          </DialogTitle>
          <DialogDescription>
            Follow this guide to understand how to make the most of your PREPZR experience
          </DialogDescription>
        </DialogHeader>

        {/* View mode selector */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex rounded-md border border-gray-200 dark:border-gray-700 p-1">
            <Button 
              variant={viewMode === 'carousel' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setViewMode('carousel')}
            >
              Step by Step
            </Button>
            <Button 
              variant={viewMode === 'tabs' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setViewMode('tabs')}
            >
              Quick Overview
            </Button>
          </div>
        </div>

        {viewMode === 'carousel' ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {step.image && (
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image fails to load
                        (e.target as HTMLImageElement).src = '/images/tour/placeholder.png';
                      }}
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-full bg-primary/10 mr-3">
                      {React.createElement(step.icon, { className: "w-6 h-6 text-primary" })}
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{step.detailedDescription}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <RotateCw className="w-4 h-4 mr-1 text-blue-500" />
                      <span>Updates daily</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                      <span>Interactive learning</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Step {currentStep + 1} of {tourSteps.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <Tabs defaultValue="1" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              {tourSteps.slice(0, 4).map((step) => (
                <TabsTrigger key={step.id} value={String(step.id)}>
                  {React.createElement(step.icon, { className: "w-4 h-4 mr-1" })}
                  <span className="hidden sm:inline">{step.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsList className="grid grid-cols-3 mb-6">
              {tourSteps.slice(4).map((step) => (
                <TabsTrigger key={step.id} value={String(step.id)}>
                  {React.createElement(step.icon, { className: "w-4 h-4 mr-1" })}
                  <span className="hidden sm:inline">{step.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {tourSteps.map((step) => (
              <TabsContent key={step.id} value={String(step.id)} className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  {step.image && (
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700">
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image fails to load
                          (e.target as HTMLImageElement).src = '/images/tour/placeholder.png';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300">{step.detailedDescription}</p>
                  </div>
                </div>
                <Button onClick={() => navigate(step.route)} className="w-full">
                  Visit {step.title}
                </Button>
              </TabsContent>
            ))}
          </Tabs>
        )}

        <DialogFooter className={viewMode === 'carousel' ? 'flex justify-between sm:justify-between' : 'justify-end'}>
          {viewMode === 'carousel' && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="mr-1 h-4 w-4" /> Previous
              </Button>
              <Button onClick={handleVisitPage}>
                Visit Page
              </Button>
            </div>
          )}
          
          {viewMode === 'carousel' ? (
            <Button onClick={handleNext}>
              {currentStep < tourSteps.length - 1 ? (
                <>Next <ChevronRight className="ml-1 h-4 w-4" /></>
              ) : (
                'Complete Tour'
              )}
            </Button>
          ) : (
            <Button onClick={onClose}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TourGuide;
