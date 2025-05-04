
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import WelcomeTour from "@/components/dashboard/student/WelcomeTour";

interface PostSignupWelcomeProps {
  userName?: string;
}

const PostSignupWelcome: React.FC<PostSignupWelcomeProps> = ({ userName }) => {
  const navigate = useNavigate();
  const [showTour, setShowTour] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [userData, setUserData] = useState<any>({});

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

    // Mark as new user for tour
    localStorage.setItem('new_user_signup', 'true');

    // Hide the welcome screen after 3 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
      setShowTour(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSkipTour = () => {
    navigate('/dashboard/student');
  };

  const handleCompleteTour = () => {
    localStorage.setItem('hasSeenTour', 'true');
    navigate('/dashboard/student');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-950/30">
      {showWelcome ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, 0, -2, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="mx-auto mb-6"
          >
            <div className="size-24 mx-auto bg-gradient-to-br from-primary/80 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-4xl font-bold">P</span>
            </div>
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Welcome to PREPZR, {userName || userData?.name || 'Student'}!
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
          >
            Your personalized study partner is being set up. Get ready for a smarter way to prepare for your exams.
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center gap-x-4"
          >
            <Button
              variant="default"
              onClick={() => {
                setShowWelcome(false);
                setShowTour(true);
              }}
            >
              Take a tour
            </Button>
          </motion.div>
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

export default PostSignupWelcome;
