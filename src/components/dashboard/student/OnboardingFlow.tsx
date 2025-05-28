
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Brain, Target, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { UserProfileBase } from '@/types/user/base';

interface OnboardingFlowProps {
  userProfile: UserProfileBase;
  goalTitle: string;
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ userProfile, goalTitle, onComplete }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const steps = [
    {
      title: "Welcome to Your AI-Powered Dashboard!",
      description: "Your personalized learning experience is ready",
      icon: <Brain className="h-8 w-8 text-primary" />,
      content: (
        <div className="space-y-4 py-4">
          <div className="text-center mb-6">
            <PrepzrLogo width={60} className="mx-auto mb-4" />
            <h2 className="text-xl font-bold">Welcome, {userProfile.name}!</h2>
            <p className="text-muted-foreground mt-2">
              Your AI has analyzed your profile and created a personalized {goalTitle} preparation experience
            </p>
          </div>
          
          <div className="bg-primary/5 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-medium">What's Personalized for You:</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>• Smart widgets based on your learning style</li>
              <li>• Time-adaptive study recommendations</li>
              <li>• Mood-responsive interface adjustments</li>
              <li>• AI-driven content curation for {goalTitle}</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Your Dashboard Learns & Adapts",
      description: "Experience intelligent personalization in action",
      icon: <Target className="h-8 w-8 text-primary" />,
      content: (
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="border rounded-lg p-3">
              <h3 className="font-medium text-sm mb-1">Performance-Based Adaptation</h3>
              <p className="text-xs text-muted-foreground">Dashboard prioritizes weak areas automatically</p>
            </div>
            <div className="border rounded-lg p-3">
              <h3 className="font-medium text-sm mb-1">Time-Smart Suggestions</h3>
              <p className="text-xs text-muted-foreground">Content changes based on your optimal study hours</p>
            </div>
            <div className="border rounded-lg p-3">
              <h3 className="font-medium text-sm mb-1">Mood-Responsive Interface</h3>
              <p className="text-xs text-muted-foreground">UI adapts to your emotional state for better focus</p>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            Ready to experience your personalized learning journey?
          </div>
        </div>
      )
    }
  ];
  
  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onComplete();
      }, 1000);
    }
  };
  
  const progress = ((step + 1) / steps.length) * 100;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {steps[step].icon}
            </div>
            <CardTitle className="text-lg">{steps[step].title}</CardTitle>
            <CardDescription>{steps[step].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {steps[step].content}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              className="w-full" 
              onClick={handleNext}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Launching your dashboard...
                </>
              ) : step < steps.length - 1 ? (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Enter Your Personalized Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <Progress value={progress} className="h-1" />
            <div className="text-xs text-center text-muted-foreground">
              Step {step + 1} of {steps.length}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default OnboardingFlow;
