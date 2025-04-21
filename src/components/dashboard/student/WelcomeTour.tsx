
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Calendar, CheckCircle, Coffee, Star, Zap, Book, BookOpen } from 'lucide-react';

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
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const steps = [
    {
      title: "Welcome to Sakha AI!",
      description: "Your AI-powered learning companion for competitive exams",
      content: (
        <div className="space-y-4">
          <p>
            We're excited to have you on board! Let's take a quick tour to help you get 
            familiar with the dashboard.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Star className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-700 dark:text-blue-300">Personalized Learning</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Adaptive content based on your goals and progress
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Zap className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-700 dark:text-purple-300">24/7 AI Tutor</h4>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    Get help anytime with our AI-powered tutor
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Calendar className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-700 dark:text-green-300">Study Plans</h4>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Customized study plans to keep you on track
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Coffee className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-700 dark:text-amber-300">Mood Tracking</h4>
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    We adapt to how you're feeling today
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Your Dashboard",
      description: "Everything you need for effective learning",
      content: (
        <div className="space-y-4">
          <p>
            Your dashboard has been personalized based on your learning goals and preferences.
            Here's what you'll find:
          </p>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
                <h4 className="font-medium">Quick Overview</h4>
                <p className="text-sm text-muted-foreground">
                  See your progress at a glance, upcoming topics, and personalized recommendations.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Track your daily streak</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Log your mood to get personalized content</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Quick access to your study plan</span>
              </div>
            </TabsContent>
            
            <TabsContent value="subjects" className="space-y-4">
              <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg mt-4">
                <h4 className="font-medium">Subject Mastery</h4>
                <p className="text-sm text-muted-foreground">
                  Explore your subjects, track mastery level, and find recommended topics to study.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Detailed subject breakdowns</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Topic recommendations based on your weak areas</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Practice questions for each topic</span>
              </div>
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mt-4">
                <h4 className="font-medium">Progress Tracking</h4>
                <p className="text-sm text-muted-foreground">
                  Monitor your improvement over time with detailed analytics and insights.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Visual progress charts</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Performance analytics</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Milestones and achievements</span>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )
    },
    {
      title: "Let's Get Started!",
      description: "Time to begin your learning journey",
      content: (
        <div className="space-y-4">
          <p>
            You're all set up and ready to begin your learning journey with Sakha AI!
          </p>
          
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-6 rounded-lg border border-indigo-100 dark:border-indigo-800">
            <div className="flex flex-col items-center text-center space-y-4">
              <BookOpen className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">
                Take a Look at Your Study Plan
              </h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">
                We've prepared a personalized study plan for your exam preparation. 
                Let's review what you should focus on today!
              </p>
              <Button 
                variant="default" 
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white mt-2"
                onClick={() => {
                  onCompleteTour();
                  setTimeout(() => navigate("/dashboard/student/study-plan"), 500);
                }}
              >
                <Book className="mr-2 h-4 w-4" />
                View Today's Study Plan
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t text-sm text-muted-foreground">
            <div>
              Need help? Use the 24/7 AI Tutor anytime!
            </div>
            <Button variant="ghost" size="sm">
              Contact Support
            </Button>
          </div>
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

  const handleSkip = () => {
    onSkipTour();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl">{steps[currentStep].title}</DialogTitle>
          <DialogDescription>
            {steps[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          {steps[currentStep].content}
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`h-1.5 w-8 rounded-full ${
                  index === currentStep ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
          
          <div className="space-x-2">
            {currentStep < steps.length - 1 ? (
              <>
                <Button variant="outline" onClick={handleSkip}>
                  Skip Tour
                </Button>
                <Button onClick={handleNext}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button onClick={onCompleteTour}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
