
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import WelcomeTour from '@/components/dashboard/student/WelcomeTour';

const WelcomeFlow = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showTour, setShowTour] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const completedOnboarding = searchParams.get('completedOnboarding') === 'true';
  const isNewUser = searchParams.get('new') === 'true';
  
  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem('userData');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // Set flags for new user flow
    if (isNewUser || completedOnboarding) {
      localStorage.setItem('new_user_signup', 'true');
    }

    // Auto-advance to tour after 3 seconds
    const timer = setTimeout(() => {
      if (completedOnboarding) {
        setShowWelcome(false);
        setShowTour(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [completedOnboarding, isNewUser]);

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setShowWelcome(false);
      setShowTour(true);
    }
  };

  const handleSkipTour = () => {
    navigate('/dashboard/student');
  };

  const handleCompleteTour = () => {
    localStorage.setItem('hasSeenTour', 'true');
    navigate('/dashboard/student');
  };

  // Welcome slides content
  const slides = [
    {
      title: "Welcome to Your Learning Journey",
      description: "PREPZR is your personalized study partner designed to help you excel in your exams.",
      image: "👋"
    },
    {
      title: "Personalized Study Plans",
      description: "Get customized study plans based on your strengths and weaknesses, tailored for your specific exam.",
      image: "📚"
    },
    {
      title: "Track Your Progress",
      description: "Monitor your improvements and identify areas that need more focus with detailed analytics.",
      image: "📊"
    }
  ];

  const currentSlide = slides[step - 1];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-950/30">
      {showWelcome ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl w-full px-4"
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-6xl mb-6 mx-auto"
          >
            {currentSlide.image}
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{currentSlide.title}</h1>
          <p className="text-lg text-muted-foreground mb-10">{currentSlide.description}</p>
          
          {/* Progress indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {slides.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 w-10 rounded-full ${index + 1 === step ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
              ></div>
            ))}
          </div>
          
          <div className="flex justify-center gap-4">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
            )}
            <Button onClick={handleContinue}>
              {step < 3 ? 'Next' : 'Get Started'}
            </Button>
          </div>
        </motion.div>
      ) : (
        <WelcomeTour
          open={showTour}
          onOpenChange={setShowTour}
          onSkipTour={handleSkipTour}
          onCompleteTour={handleCompleteTour}
          isFirstTimeUser={true}
          showVoiceAssistantTab={true}
          loginCount={1}
        />
      )}
    </div>
  );
};

export default WelcomeFlow;
