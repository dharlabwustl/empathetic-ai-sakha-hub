
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, Clock, Settings, User, Check, Wand } from 'lucide-react';
import { UserProfile } from '@/types/user/base';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PrepzrLogo from '@/components/common/PrepzrLogo';

interface OnboardingFlowProps {
  userProfile: UserProfile;
  goalTitle: string;
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ userProfile, goalTitle, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };
  
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-blue-900/30 dark:via-gray-900 dark:to-violet-900/30 p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center border-b pb-6">
          <div className="mx-auto mb-4">
            <PrepzrLogo width={120} />
          </div>
          <CardTitle className="text-2xl">Welcome to PREPZR</CardTitle>
          <CardDescription>Let's set up your personalized learning experience</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs mb-1">
              <span>Getting Started</span>
              <span>Step {currentStep} of {totalSteps}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          
          {/* Step Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center">
                    <User className="mr-2 h-5 w-5 text-primary" />
                    Your Profile
                  </h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    We've created your account with the following details:
                  </p>
                  
                  <div className="grid gap-4">
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">Name</p>
                      <p className="font-medium">{userProfile.name}</p>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="font-medium">{userProfile.email}</p>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">Role</p>
                      <p className="font-medium capitalize">{userProfile.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-primary" />
                    Your Goal
                  </h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    We'll help you prepare for your exam with a personalized study plan.
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-md border border-blue-200 dark:border-blue-800 text-center">
                    <h4 className="text-xl font-bold mb-2">{goalTitle}</h4>
                    <p className="text-muted-foreground">
                      Your personalized study journey starts now.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">Study Schedule</p>
                      <p className="font-medium flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        Personalized daily plan
                      </p>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">Target Date</p>
                      <p className="font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        Exam-focused timeline
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center">
                    <Wand className="mr-2 h-5 w-5 text-primary" />
                    AI Personalization
                  </h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    Our AI will personalize your learning experience based on your preferences.
                  </p>
                  
                  <div className="grid gap-4">
                    <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-md border border-violet-200 dark:border-violet-800 flex items-center">
                      <div className="mr-4 p-2 bg-violet-100 dark:bg-violet-800 rounded-full">
                        <Settings className="h-6 w-6 text-violet-600 dark:text-violet-300" />
                      </div>
                      <div>
                        <h4 className="font-medium">Personalized Content</h4>
                        <p className="text-sm text-muted-foreground">
                          Content tailored to your learning style and pace
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-md border border-emerald-200 dark:border-emerald-800 flex items-center">
                      <div className="mr-4 p-2 bg-emerald-100 dark:bg-emerald-800 rounded-full">
                        <Check className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
                      </div>
                      <div>
                        <h4 className="font-medium">Adaptive Learning</h4>
                        <p className="text-sm text-muted-foreground">
                          Our system adapts to your progress and challenges
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md border border-amber-200 dark:border-amber-800 flex items-center">
                      <div className="mr-4 p-2 bg-amber-100 dark:bg-amber-800 rounded-full">
                        <Clock className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                      </div>
                      <div>
                        <h4 className="font-medium">Smart Scheduling</h4>
                        <p className="text-sm text-muted-foreground">
                          Optimized study schedules based on your availability
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t pt-6">
          <Button 
            variant="ghost" 
            onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          
          <Button onClick={handleNextStep}>
            {currentStep === totalSteps ? 'Get Started' : 'Next'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
