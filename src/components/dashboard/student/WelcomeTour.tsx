
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, CalendarDays, Book, MessageSquare } from "lucide-react";

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({ 
  onSkipTour, 
  onCompleteTour,
  isFirstTimeUser,
  lastActivity,
  suggestedNextAction,
  loginCount,
  open,
  onOpenChange
}) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  
  const steps = [
    {
      title: "Welcome to Sakha AI!",
      description: "Your personalized learning assistant is here to help you succeed in your exams.",
      image: "/assets/welcome-tour/welcome.svg"
    },
    {
      title: "Personalized Learning",
      description: "We've created a customized study plan based on your goals and learning style.",
      image: "/assets/welcome-tour/personalized.svg"
    },
    {
      title: "24/7 AI Tutor",
      description: "Get help anytime with our AI tutor. Ask questions, solve problems, and clarify concepts.",
      image: "/assets/welcome-tour/tutor.svg"
    },
    {
      title: "Track Your Progress",
      description: "Monitor your improvement, identify weak areas, and celebrate your achievements.",
      image: "/assets/welcome-tour/progress.svg"
    },
    {
      title: "Ready to Start Learning?",
      description: "Let's take an overview of your study plan based on your exam preparation needs.",
      image: "/assets/welcome-tour/start.svg",
      isLast: true
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onCompleteTour();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const currentStepData = steps[currentStep];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <DialogTitle className="text-xl">{currentStepData.title}</DialogTitle>
          <DialogDescription className="text-indigo-100 mt-2">
            {currentStepData.description}
          </DialogDescription>
        </div>
        
        <div className="p-6 flex flex-col items-center">
          <img 
            src={currentStepData.image || "/assets/welcome-tour/placeholder.svg"} 
            alt={currentStepData.title}
            className="h-40 mb-4 object-contain"
          />
          
          {currentStepData.isLast && (
            <Card className="w-full mb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-emerald-100">
              <CardContent className="p-4 flex items-center gap-3">
                <CalendarDays className="h-10 w-10 text-emerald-600" />
                <div>
                  <h3 className="font-medium">Today's Study Plan</h3>
                  <p className="text-sm text-muted-foreground">Review your personalized study schedule for maximum productivity</p>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="flex w-full gap-2 justify-center mt-2 mb-4">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 rounded-full ${index === currentStep ? 'w-8 bg-indigo-600' : 'w-2 bg-gray-200'}`} 
              />
            ))}
          </div>
        </div>
        
        <DialogFooter className="border-t p-4">
          <div className="flex justify-between w-full">
            <Button
              variant="ghost"
              onClick={onSkipTour}
            >
              Skip Tour
            </Button>
            
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
              
              <Button 
                onClick={handleNext}
                className={currentStepData.isLast ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              >
                {currentStepData.isLast ? (
                  <>
                    <span>View Study Plan</span>
                    <CalendarDays className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
