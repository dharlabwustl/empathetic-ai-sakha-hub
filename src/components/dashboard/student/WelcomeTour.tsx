
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Book,
  CalendarDays,
  LucideIcon,
  MessageSquare,
  Star,
  Heart,
  TrendingUp,
  User,
} from "lucide-react";
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

interface FeatureDescriptionProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureDescription: React.FC<FeatureDescriptionProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900">
        <Icon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default function WelcomeTour({
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser = true,
  lastActivity,
  suggestedNextAction,
  loginCount = 1,
  open,
  onOpenChange,
}: WelcomeTourProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <PrepzrLogo width={60} height={60} />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            Welcome to PREPZR
          </DialogTitle>
          <DialogDescription className="text-center">
            {isFirstTimeUser
              ? "Your personalized exam preparation partner. Let's get you started with a quick tour."
              : `Welcome back! This is login #${loginCount}. Let's continue where you left off.`}
          </DialogDescription>
        </DialogHeader>

        <div className="my-6 space-y-6">
          {isFirstTimeUser ? (
            <>
              <div className="space-y-4">
                <FeatureDescription
                  icon={Book}
                  title="Personalized Study Plan"
                  description="We've created a customized study plan based on your goals and learning style."
                />
                <FeatureDescription
                  icon={Star}
                  title="Concept Cards & Flashcards"
                  description="Master key concepts and test your knowledge with interactive learning tools."
                />
                <FeatureDescription
                  icon={CalendarDays}
                  title="Today's Plan"
                  description="See what you need to focus on today to stay on track with your exam goals."
                />
                <FeatureDescription
                  icon={MessageSquare}
                  title="24/7 AI Tutor"
                  description="Get help anytime with our AI tutor that's always ready to answer your questions."
                />
                <FeatureDescription
                  icon={Heart}
                  title="Feel Good Corner"
                  description="Take breaks, reduce stress, and get motivated with the Feel Good Corner."
                />
                <FeatureDescription
                  icon={TrendingUp}
                  title="Track Your Progress"
                  description="See your improvement over time and identify areas that need more focus."
                />
              </div>

              <div className="border-t border-b border-gray-200 dark:border-gray-800 py-4 my-4">
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <img
                      src="/lovable-uploads/e0b0d435-a8a1-4419-bedd-59bf826b4560.png" 
                      alt="Founder"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs">
                      👋
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Amit, Founder, PREPZR</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      "We created PREPZR to make exam prep personalized, effective, and stress-free. I'm excited to have you join us!"
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {lastActivity && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-1">Last Activity</h3>
                  <p className="text-sm">
                    {lastActivity.type}: {lastActivity.description}
                  </p>
                </div>
              )}

              {suggestedNextAction && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-1">Suggested Next Step</h3>
                  <p className="text-sm">{suggestedNextAction}</p>
                </div>
              )}

              <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                <FeatureDescription
                  icon={User}
                  title="New Features Available"
                  description="Check out our latest updates to help you prepare better!"
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onSkipTour}
            className="sm:mr-auto"
          >
            {isFirstTimeUser ? "Skip Tour" : "Remind Me Later"}
          </Button>
          <Button 
            onClick={onCompleteTour}
            className="bg-gradient-to-r from-blue-500 to-blue-600"
          >
            {isFirstTimeUser ? "Get Started" : "Continue Learning"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
