
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useOnboardingContext } from './OnboardingContext';
import { motion } from 'framer-motion';
import WelcomeStep from './steps/WelcomeStep';
import UserTypeStep from './steps/UserTypeStep';
import GoalStep from './steps/GoalStep';
import RegistrationStep from './steps/RegistrationStep';
import StudyHabitsStep from './steps/StudyHabitsStep';
import CompletionStep from './steps/CompletionStep';
import ProgressIndicator from './ProgressIndicator';

const SignupContent = () => {
  const { currentStep, setCurrentStep, steps } = useOnboardingContext();

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (steps[currentStep]) {
      case 'welcome':
        return <WelcomeStep onNext={goToNextStep} />;
      case 'userType':
        return <UserTypeStep onNext={goToNextStep} />;
      case 'goal':
        return <GoalStep onNext={goToNextStep} onBack={goToPreviousStep} />;
      case 'registration':
        return <RegistrationStep onNext={goToNextStep} />;
      case 'study':
        return <StudyHabitsStep onNext={goToNextStep} onBack={goToPreviousStep} />;
      case 'complete':
        return <CompletionStep />;
      default:
        return <WelcomeStep onNext={goToNextStep} />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border shadow-lg">
        <CardContent className="p-0 overflow-hidden">
          {/* Progress indicator */}
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Sign Up
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {currentStep < steps.length - 1
                  ? "Create your personalized learning experience"
                  : "You're all set!"}
              </p>
            </div>
            
            <ProgressIndicator steps={steps} currentStep={currentStep} />
          </div>
          
          {/* Step content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 pt-4"
          >
            {renderCurrentStep()}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupContent;
