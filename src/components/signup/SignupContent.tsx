
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOnboarding } from './OnboardingContext';
import SignupForm from './SignupForm';
import OnboardingFlow from './OnboardingFlow';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const SignupContent = () => {
  const { step, goBack } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSignupComplete = () => {
    setIsSubmitting(true);
    
    // Wait for 1.5 seconds to simulate signup processing
    setTimeout(() => {
      // Set the new user signup flag to trigger the welcome flow
      localStorage.setItem('new_user_signup', 'true');
      
      // Redirect to the welcome back page which will show tour
      navigate('/welcome-back');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg"
    >
      <Card className="shadow-lg border-gray-200">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-between items-center">
            {step > 1 ? (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={goBack} 
                className="rounded-full"
                disabled={isSubmitting}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            ) : (
              <div />
            )}
            <PrepzrLogo width={120} height="auto" className="mx-auto" />
            <div />
          </div>
          <CardTitle className="text-2xl mt-2">
            {step === 1 ? "Create Your Account" : "Complete Your Profile"}
          </CardTitle>
          <CardDescription>
            {step === 1 
              ? "Join our learning community to start your journey" 
              : "Help us tailor your learning experience"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {step === 1 ? (
            <SignupForm />
          ) : (
            <OnboardingFlow onComplete={handleSignupComplete} isSubmitting={isSubmitting} />
          )}
        </CardContent>
        
        {step === 1 && (
          <CardFooter className="flex-col space-y-4 pt-0">
            <div className="text-center w-full">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-blue-600 dark:text-blue-400"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Button>
              </p>
            </div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default SignupContent;
