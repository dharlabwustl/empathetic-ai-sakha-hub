import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserProfileType, MoodType } from '@/types/user/base';
import { 
  BookOpen, 
  Target, 
  Calendar, 
  Brain, 
  Zap, 
  Star,
  TrendingUp,
  Award,
  Clock,
  Users
} from 'lucide-react';

interface SplashScreenProps {
  userProfile: UserProfileType;
  onClose: () => void;
  onStartStudy?: () => void;
  onViewProgress?: () => void;
  onSetMood?: (mood: MoodType) => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  userProfile,
  onClose,
  onStartStudy,
  onViewProgress,
  onSetMood
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  const quickMoods = [
    { 
      mood: MoodType.Motivated, 
      emoji: '💪', 
      label: 'Motivated',
      message: 'Ready to tackle challenges!'
    },
    { 
      mood: MoodType.Happy, 
      emoji: '😊', 
      label: 'Happy',
      message: 'Positive energy for learning!'
    },
    { 
      mood: MoodType.Focused, 
      emoji: '🎯', 
      label: 'Focused',
      message: 'Deep concentration mode!'
    },
    { 
      mood: MoodType.Okay, 
      emoji: '👍', 
      label: 'Okay',
      message: 'Steady progress ahead!'
    },
    { 
      mood: MoodType.Stressed, 
      emoji: '😫', 
      label: 'Stressed',
      message: 'Let\'s take it step by step!'
    },
    { 
      mood: MoodType.Tired, 
      emoji: '😴', 
      label: 'Tired',
      message: 'Light study session today!'
    }
  ];

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    onSetMood?.(mood);
    nextStep();
  };

  const handleClose = () => {
    onClose();
  };

  const splashVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 }
  };

  useEffect(() => {
    // Simulate loading user data
    if (currentStep === 0) {
      const timer = setTimeout(() => {
        nextStep();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-800 dark:to-blue-900/20 flex items-center justify-center z-50">
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="welcome"
            className="max-w-md w-full p-6"
            variants={splashVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Card className="shadow-lg border-0">
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Welcome, {userProfile.name}!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Let's get you set up for success.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <Award className="mx-auto h-6 w-6 text-yellow-500 mb-2" />
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {userProfile.examPreparation}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Your Exam Goal
                    </p>
                  </div>
                  <div className="text-center">
                    <Calendar className="mx-auto h-6 w-6 text-blue-500 mb-2" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Daily Study Plan
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Personalized for you
                    </p>
                  </div>
                </div>

                <Button className="w-full" onClick={nextStep}>
                  Continue
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="mood"
            className="max-w-md w-full p-6"
            variants={splashVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Card className="shadow-lg border-0">
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    How are you feeling today?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Select a mood to personalize your study plan.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {quickMoods.map((mood) => (
                    <Button
                      key={mood.mood}
                      variant="outline"
                      className="flex flex-col items-center justify-center p-3 h-auto"
                      onClick={() => handleMoodSelect(mood.mood)}
                    >
                      <span className="text-3xl">{mood.emoji}</span>
                      <span className="text-sm">{mood.label}</span>
                    </Button>
                  ))}
                </div>

                <Button variant="ghost" className="w-full" onClick={prevStep}>
                  Go Back
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="complete"
            className="max-w-md w-full p-6"
            variants={splashVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Card className="shadow-lg border-0">
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    All Set!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    You're ready to start learning.
                  </p>
                  <div className="text-4xl">{quickMoods.find(m => m.mood === selectedMood)?.emoji}</div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Feeling {quickMoods.find(m => m.mood === selectedMood)?.label}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" onClick={onViewProgress}>
                    View Progress
                  </Button>
                  <Button onClick={onStartStudy}>
                    Start Studying
                  </Button>
                </div>

                <Button variant="ghost" className="w-full" onClick={handleClose}>
                  Close
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SplashScreen;
