
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import WelcomeTour from '@/components/dashboard/student/WelcomeTour';

const PostSignupWelcome: React.FC = () => {
  const navigate = useNavigate();
  const [showTour, setShowTour] = useState(false);
  
  // Set new user flag for the welcome tour to be shown later
  useEffect(() => {
    localStorage.setItem('new_user_signup', 'true');
  }, []);
  
  const handleGetStarted = () => {
    setShowTour(true);
  };
  
  const handleSkipTour = () => {
    // Clear the new user flag since user is skipping the tour
    localStorage.removeItem('new_user_signup');
    localStorage.setItem("hasSeenTour", "true");
    navigate('/dashboard/student');
  };
  
  const handleCompleteTour = () => {
    // Navigate to dashboard after completing tour
    localStorage.removeItem('new_user_signup');
    localStorage.setItem("hasSeenTour", "true");
    navigate('/dashboard/student');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="w-full">
          <CardHeader className="text-center pb-3">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome to PREPZR!</CardTitle>
            <CardDescription>Your account has been created successfully</CardDescription>
          </CardHeader>
          
          <CardContent className="text-center space-y-4">
            <p>
              You're now ready to start your personalized learning journey. 
              Our platform is designed to help you prepare for your exams effectively.
            </p>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium mb-2 text-blue-700 dark:text-blue-300">What's next?</h3>
              <p className="text-sm text-blue-600 dark:text-blue-200">
                Take a quick tour to learn how to use all the features of PREPZR 
                and get the most out of your study sessions.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" onClick={handleGetStarted}>
              Get Started with a Quick Tour
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="ghost" className="w-full" onClick={handleSkipTour}>
              Skip and Go to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      
      {showTour && (
        <WelcomeTour 
          open={showTour}
          onOpenChange={setShowTour}
          onSkipTour={handleSkipTour}
          onCompleteTour={handleCompleteTour}
          isFirstTimeUser={true}
          loginCount={1}
        />
      )}
    </div>
  );
};

export default PostSignupWelcome;
