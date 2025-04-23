
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Book, Calendar, ChevronLeft, ChevronRight, Layout, PencilLine } from 'lucide-react';

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
  const [step, setStep] = React.useState(1);
  const totalSteps = 5;
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onCompleteTour();
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleSkip = () => {
    onSkipTour();
  };
  
  const progress = (step / totalSteps) * 100;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {step === 1 && "Welcome to Sakha AI!"}
            {step === 2 && "Your Dashboard Overview"}
            {step === 3 && "Study Concepts & Practice"}
            {step === 4 && "Track Your Progress"}
            {step === 5 && "Let's Get Started!"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="space-y-4">
              <img 
                src="https://placehold.co/600x300/e2e8f0/475569?text=Welcome+to+Sakha+AI"
                alt="Welcome"
                className="rounded-lg w-full h-48 object-cover"
              />
              <p>
                Welcome to your personalized learning journey! We've designed this platform to help you achieve your academic goals and excel in your exams.
              </p>
              <p>
                Let's take a quick tour to get you familiar with all the features we offer.
              </p>
            </div>
          )}
          
          {/* Step 2: Dashboard Overview */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <Layout className="h-12 w-12 text-blue-600" />
                <div>
                  <h3 className="font-medium text-lg mb-1">Your Dashboard</h3>
                  <p>
                    The Overview tab shows your daily updates, study plan and upcoming tasks. Here you'll find:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Today's learning recommendations</li>
                    <li>Study timeline and progress</li>
                    <li>Important notifications and reminders</li>
                    <li>Quick access to practice exams</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Study Content */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <Book className="h-12 w-12 text-green-600" />
                <div>
                  <h3 className="font-medium text-lg mb-1">Study Concepts</h3>
                  <p>
                    Master concepts through our interactive learning system:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Study concept cards for each subject</li>
                    <li>Take practice exams to test your knowledge</li>
                    <li>Review your performance and focus on weak areas</li>
                    <li>Access educational resources and references</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: Progress Tracking */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <Calendar className="h-12 w-12 text-purple-600" />
                <div>
                  <h3 className="font-medium text-lg mb-1">Track Your Progress</h3>
                  <p>
                    Monitor your improvement over time:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>View detailed analytics on your study habits</li>
                    <li>Track concept mastery and test scores</li>
                    <li>See your daily and weekly study streak</li>
                    <li>Compare your performance with practice exams</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 5: Next Actions */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <PencilLine className="h-12 w-12 text-amber-600" />
                <div>
                  <h3 className="font-medium text-lg mb-1">Start Learning Today</h3>
                  <p>
                    We recommend these next steps to get started:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li><strong>First:</strong> Go to the Overview tab to see your personalized study plan</li>
                    <li><strong>Next:</strong> Start with today's recommended concept cards</li>
                    <li><strong>Then:</strong> Try a practice test to assess your current knowledge</li>
                    <li><strong>Finally:</strong> Track your progress in the Progress tab</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <Progress value={progress} className="h-2 mb-4" />
        
        <DialogFooter className="flex justify-between items-center">
          <div className="flex gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="mr-1 h-4 w-4" /> Back
              </Button>
            )}
            {step < totalSteps && (
              <Button variant="outline" onClick={handleSkip}>
                Skip Tour
              </Button>
            )}
          </div>
          
          <Button onClick={handleNext} className="bg-primary">
            {step < totalSteps ? (
              <>
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </>
            ) : (
              "Get Started"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
