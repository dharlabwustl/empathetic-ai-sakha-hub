
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  X,  
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  Brain, 
  FileText, 
  Bell, 
  UserCircle2,
  Mic,
  Volume,
  MessageSquare
} from "lucide-react";
import Image from "@/components/common/Image";

interface WelcomeTourProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser?: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
}

const WelcomeTour = ({
  open,
  onOpenChange,
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser = false,
  lastActivity,
  suggestedNextAction,
  loginCount = 1
}: WelcomeTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfirmSkip, setShowConfirmSkip] = useState(false);
  
  const totalSteps = 7; // Added one more step for voice assistant
  
  // Define steps for the tour
  const steps = [
    {
      title: "Welcome to PREPZR",
      description: "Let's take a quick tour to help you get the most out of your dashboard.",
      icon: <LayoutDashboard className="h-10 w-10 text-blue-500" />,
      image: "/lovable-uploads/74c5ffb7-af29-456c-9cd0-76bc0375e646.png"
    },
    {
      title: "Your Dashboard",
      description: "This is your central hub where you can see your progress, upcoming activities, and personalized recommendations.",
      icon: <LayoutDashboard className="h-10 w-10 text-indigo-500" />,
      image: "/lovable-uploads/b3545ed9-c85f-44c4-9f1c-1da34aad8222.png"
    },
    {
      title: "Today's Plan",
      description: "View and manage your daily study schedule, optimized for your learning style and goals.",
      icon: <Calendar className="h-10 w-10 text-green-500" />,
      image: "/lovable-uploads/74c5ffb7-af29-456c-9cd0-76bc0375e646.png"
    },
    {
      title: "Concept Cards",
      description: "Interactive learning modules that break down complex topics into manageable pieces.",
      icon: <BookOpen className="h-10 w-10 text-orange-500" />,
      image: "/lovable-uploads/74c5ffb7-af29-456c-9cd0-76bc0375e646.png"
    },
    {
      title: "AI Tutor",
      description: "Your personal AI tutor can answer questions and guide you through difficult concepts.",
      icon: <Brain className="h-10 w-10 text-purple-500" />,
      image: "/lovable-uploads/bc6ddd97-d150-4508-9e19-1910f8602086.png" 
    },
    {
      title: "Voice Intelligent Support",
      description: "PREPZR's voice assistant can help you navigate the platform, answer questions, and provide verbal guidance for your studies.",
      icon: <Mic className="h-10 w-10 text-pink-500" />,
      image: "/lovable-uploads/74c5ffb7-af29-456c-9cd0-76bc0375e646.png",
      features: [
        {
          title: "Voice Commands",
          description: "Ask questions or navigate using your voice",
          icon: <Mic className="h-5 w-5 text-pink-500" />
        },
        {
          title: "Verbal Learning",
          description: "Get concepts explained in different languages",
          icon: <Volume className="h-5 w-5 text-pink-500" />
        },
        {
          title: "Quick Assistance",
          description: "Click the mic icon anytime for help",
          icon: <MessageSquare className="h-5 w-5 text-pink-500" />
        }
      ]
    },
    {
      title: "Your Profile",
      description: "Track your achievements, customize your learning preferences, and update your personal information.",
      icon: <UserCircle2 className="h-10 w-10 text-teal-500" />,
      image: "/lovable-uploads/74c5ffb7-af29-456c-9cd0-76bc0375e646.png"
    }
  ];
  
  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onCompleteTour();
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSkip = () => {
    if (isFirstTimeUser) {
      setShowConfirmSkip(true);
    } else {
      onSkipTour();
    }
  };
  
  const handleConfirmSkip = () => {
    setShowConfirmSkip(false);
    onSkipTour();
  };
  
  const handleCancelSkip = () => {
    setShowConfirmSkip(false);
  };
  
  const currentStepData = steps[currentStep];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden" onInteractOutside={(e) => e.preventDefault()}>
        <div className="relative">
          {showConfirmSkip ? (
            <div className="p-6">
              <DialogHeader>
                <DialogTitle>Skip the tour?</DialogTitle>
                <DialogDescription>
                  Are you sure you want to skip the tour? You can always access it again from the help menu.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4 gap-2 sm:gap-0">
                <Button variant="outline" onClick={handleCancelSkip} className="w-full sm:w-auto">
                  No, continue tour
                </Button>
                <Button onClick={handleConfirmSkip} className="w-full sm:w-auto">
                  Yes, skip tour
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 pb-14 relative">
                <div className="flex items-center mb-4">
                  {currentStepData.icon}
                  <h3 className="ml-3 text-xl font-bold text-white">{currentStepData.title}</h3>
                </div>
                <p className="text-white/90">{currentStepData.description}</p>
                
                <div className="absolute -bottom-10 left-0 right-0 flex justify-center">
                  <div className="bg-white dark:bg-gray-800 rounded-full p-1 shadow-xl">
                    <div className="flex space-x-1">
                      {steps.map((_, index) => (
                        <div 
                          key={index}
                          className={cn(
                            "h-2 w-2 rounded-full transition-colors", 
                            index === currentStep ? "bg-blue-500" : "bg-gray-300"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 pt-14">
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 mb-6">
                  {currentStepData.image && (
                    <div className="aspect-video bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                      <Image 
                        src={currentStepData.image} 
                        alt={currentStepData.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                
                {/* Feature list for specific steps */}
                {currentStepData.features && (
                  <div className="mb-6 space-y-3">
                    {currentStepData.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
                        <div className="mt-0.5 mr-3">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{feature.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-between">
                  <div>
                    {currentStep > 0 && (
                      <Button 
                        variant="outline" 
                        onClick={handlePrevStep}
                        className="flex items-center"
                      >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Back
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      onClick={handleSkip}
                      className="flex items-center"
                    >
                      <X className="mr-1 h-4 w-4" />
                      Skip
                    </Button>
                    
                    <Button 
                      onClick={handleNextStep}
                      className="flex items-center"
                    >
                      {currentStep < totalSteps - 1 ? (
                        <>
                          Next
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Complete
                          <Check className="ml-1 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
