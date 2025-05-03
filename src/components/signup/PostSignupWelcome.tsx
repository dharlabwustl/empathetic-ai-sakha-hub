
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Brain, CheckCircle, Calendar, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import WelcomeTour from '@/components/dashboard/student/WelcomeTour';

const PostSignupWelcome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [showTour, setShowTour] = useState(false);
  
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Show the welcome tour after the 3-page welcome flow
      setShowTour(true);
    }
  };
  
  const handleSkipTour = () => {
    // Mark that the user has seen the tour
    localStorage.setItem("hasSeenTour", "true");
    
    // Redirect to dashboard
    navigate("/dashboard/student/overview");
    toast({
      title: "Welcome to PREPZR!",
      description: "Your study journey begins now."
    });
  };
  
  const handleCompleteTour = () => {
    // Mark that the user has seen the tour
    localStorage.setItem("hasSeenTour", "true");
    
    // Redirect to dashboard
    navigate("/dashboard/student/overview");
    toast({
      title: "Welcome to PREPZR!",
      description: "You're all set to start learning."
    });
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">Personalized Study Plan</h2>
            <p className="text-center text-gray-600">
              We've created a customized study plan based on your goals and preferences.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Your Study Plan Includes:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Carefully selected subjects based on your goal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Key concepts prioritized for efficient learning</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Optimized schedule that adapts to your progress</span>
                </li>
              </ul>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">Smart Flashcards & Concepts</h2>
            <p className="text-center text-gray-600">
              Boost your memory and understanding with our intelligent learning tools.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-white">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <div className="p-1 bg-violet-100 rounded">
                      <BookOpen className="h-4 w-4 text-violet-600" />
                    </div>
                    Concept Cards
                  </h3>
                  <p className="text-sm text-gray-600">
                    Visual learning materials with detailed explanations and examples
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <div className="p-1 bg-blue-100 rounded">
                      <Brain className="h-4 w-4 text-blue-600" />
                    </div>
                    Smart Flashcards
                  </h3>
                  <p className="text-sm text-gray-600">
                    Adaptive flashcards that focus on your weak areas
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">Your Success Journey</h2>
            <p className="text-center text-gray-600">
              Track your progress and stay motivated with our powerful tools.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Your Success Tools:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>AI-powered performance analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Personalized motivation system</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Weekly progress reports and insights</span>
                </li>
              </ul>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950/20 flex flex-col justify-center items-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <PrepzrLogo width={120} height={60} className="mx-auto" />
            <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to PREPZR
            </h1>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              {renderStep()}
            </CardContent>
            
            <CardFooter className="flex justify-between">
              {step > 1 && (
                <Button 
                  variant="outline" 
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
              )}
              <Button 
                className={`${step === 1 ? 'w-full' : ''} bg-gradient-to-r from-blue-600 to-violet-600`}
                onClick={handleNext}
              >
                {step < 3 ? 'Next' : 'Get Started'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Step {step} of 3
            </p>
          </div>
        </motion.div>
      </div>

      {/* Welcome Tour Dialog - will show after the 3-page welcome */}
      <WelcomeTour
        open={showTour}
        onOpenChange={setShowTour}
        onSkipTour={handleSkipTour}
        onCompleteTour={handleCompleteTour}
        isFirstTimeUser={true}
      />
    </>
  );
};

export default PostSignupWelcome;
