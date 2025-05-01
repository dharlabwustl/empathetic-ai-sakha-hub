
import React, { Fragment } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Steps, StepLabel } from "@/components/ui/steps";
import { Check, X } from "lucide-react";
import PrepzrLogo from "@/components/common/PrepzrLogo";

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser?: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WelcomeTour({
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser = true,
  open,
  onOpenChange,
}: WelcomeTourProps) {
  const handleSkip = () => {
    onSkipTour();
  };

  const handleComplete = () => {
    onCompleteTour();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <PrepzrLogo width={100} height={100} />
          </div>
          <DialogTitle className="text-2xl text-center">Welcome to PREPZR!</DialogTitle>
          <DialogDescription className="text-center">
            Your personalized study companion powered by AI
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-6 flex flex-col md:flex-row gap-4 p-4 bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-100 rounded-lg">
            <img
              src="/lovable-uploads/8b654e3b-59bb-4288-9e3c-b3299d9cdfb3.png"
              alt="Amit Singh - Founder"
              className="w-24 h-24 object-cover rounded-full mx-auto md:mx-0 border-2 border-blue-200"
            />
            <div>
              <h3 className="font-medium text-blue-700 text-center md:text-left">A Message From Our Founder</h3>
              <p className="text-gray-700 text-sm mt-2 italic">
                "Hi, I'm Amit Singh, Founder of Prepzr. You've taken the first step toward mastering your exam journey.
                Prepzr isn't just another prep tool — it's your 24/7 personal coach, your daily motivator and your smart companion.
                We personalize everything — from study plans to concept clarity — based on your exam goals, mood and pace."
              </p>
              <p className="text-gray-700 text-sm mt-2 italic">
                "Let's stay focused. Let's stay consistent. Let's crack it — together."
              </p>
              <p className="text-blue-600 mt-2 text-sm font-medium text-right">— Amit Singh, Founder, Prepzr</p>
            </div>
          </div>

          <Separator className="my-4" />

          <h3 className="font-medium text-lg mb-3">What makes PREPZR special:</h3>
          <Steps>
            <Fragment>
              <StepLabel>
                <h4 className="font-medium">Personalized Study Plan</h4>
                <p className="text-sm text-muted-foreground">Automatically adapts to your learning style and progress</p>
              </StepLabel>
              <StepLabel>
                <h4 className="font-medium">AI-Powered Assistance</h4>
                <p className="text-sm text-muted-foreground">Get help with concepts and track your progress</p>
              </StepLabel>
              <StepLabel>
                <h4 className="font-medium">Mood-Adaptive Learning</h4>
                <p className="text-sm text-muted-foreground">Study plans that adjust to your current mental state</p>
              </StepLabel>
              <StepLabel>
                <h4 className="font-medium">Comprehensive Resources</h4>
                <p className="text-sm text-muted-foreground">Concept cards, flashcards, and practice exams in one place</p>
              </StepLabel>
            </Fragment>
          </Steps>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleSkip} className="w-full sm:w-auto">
            <X className="mr-2 h-4 w-4" /> Skip Tour
          </Button>
          <Button onClick={handleComplete} className="w-full sm:w-auto">
            <Check className="mr-2 h-4 w-4" /> Let's Begin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
