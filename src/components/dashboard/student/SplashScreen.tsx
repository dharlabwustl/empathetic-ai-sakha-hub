import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MoodType } from '@/types/user/base';
import { Button } from '@/components/ui/button';
import { ArrowRight, Smile, Sun, Target, Book, Coffee, Battery, BatteryLow, Cloud, CloudRain, ThumbsUp } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
  mood?: MoodType;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, mood }) => {
  const [step, setStep] = useState(1);
  const [animation, setAnimation] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>(mood);

  useEffect(() => {
    // Start animation after a short delay
    const timer = setTimeout(() => {
      setAnimation(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const getMoodIcon = (mood: MoodType) => {
    switch (mood) {
      case "happy": return <Smile className="h-6 w-6 text-yellow-500" />;
      case "motivated": return <Target className="h-6 w-6 text-green-500" />;
      case "focused": return <Book className="h-6 w-6 text-blue-500" />;
      case "curious": return <Sun className="h-6 w-6 text-purple-500" />;
      case "neutral": return <ThumbsUp className="h-6 w-6 text-gray-500" />;
      case "tired": return <Coffee className="h-6 w-6 text-amber-500" />;
      case "stressed": return <BatteryLow className="h-6 w-6 text-orange-500" />;
      case "sad": return <Cloud className="h-6 w-6 text-indigo-500" />;
      case "overwhelmed": return <CloudRain className="h-6 w-6 text-red-500" />;
      case "okay": return <Battery className="h-6 w-6 text-teal-500" />;
      default: return <Smile className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getMoodLabel = (mood: MoodType): string => {
    switch (mood) {
      case "happy": return "Happy";
      case "motivated": return "Motivated";
      case "focused": return "Focused";
      case "curious": return "Curious";
      case "neutral": return "Neutral";
      case "tired": return "Tired";
      case "stressed": return "Stressed";
      case "sad": return "Sad";
      case "overwhelmed": return "Overwhelmed";
      case "okay": return "Okay";
      default: return "Happy";
    }
  };

  const getMoodColor = (mood: MoodType): string => {
    switch (mood) {
      case "happy": return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "motivated": return "bg-green-100 border-green-300 text-green-800";
      case "focused": return "bg-blue-100 border-blue-300 text-blue-800";
      case "curious": return "bg-purple-100 border-purple-300 text-purple-800";
      case "neutral": return "bg-gray-100 border-gray-300 text-gray-800";
      case "tired": return "bg-amber-100 border-amber-300 text-amber-800";
      case "stressed": return "bg-orange-100 border-orange-300 text-orange-800";
      case "sad": return "bg-indigo-100 border-indigo-300 text-indigo-800";
      case "overwhelmed": return "bg-red-100 border-red-300 text-red-800";
      case "okay": return "bg-teal-100 border-teal-300 text-teal-800";
      default: return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const moods: MoodType[] = [
    "happy", 
    "motivated", 
    "focused", 
    "curious", 
    "neutral", 
    "tired", 
    "stressed", 
    "sad", 
    "overwhelmed", 
    "okay"
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center z-50">
      <motion.div 
        className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: animation ? 1 : 0, 
          scale: animation ? 1 : 0.9,
          y: animation ? 0 : 20
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-6">
          <motion.img 
            src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
            alt="Sakha AI" 
            className="h-16 w-16"
            initial={{ rotate: 0 }}
            animate={{ rotate: animation ? 360 : 0 }}
            transition={{ duration: 1 }}
          />
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-2xl font-bold text-center mb-4">Welcome to Sakha AI</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              Your personalized learning companion
            </p>
            <div className="space-y-4">
              <motion.div 
                className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-medium">Personalized Learning</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tailored study plans based on your goals and learning style
                </p>
              </motion.div>
              <motion.div 
                className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-medium">24/7 AI Tutor</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get help with any subject, anytime you need it
                </p>
              </motion.div>
              <motion.div 
                className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-medium">Track Your Progress</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  See your improvement over time with detailed analytics
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-2xl font-bold text-center mb-4">How are you feeling today?</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              Your mood helps us personalize your learning experience
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {moods.map((mood) => (
                <motion.button
                  key={mood}
                  className={`p-3 rounded-lg border flex items-center justify-center gap-2 transition-colors ${
                    selectedMood === mood 
                      ? getMoodColor(mood) + " ring-2 ring-offset-2 ring-blue-500" 
                      : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMoodSelect(mood)}
                >
                  {getMoodIcon(mood)}
                  <span>{getMoodLabel(mood)}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-2xl font-bold text-center mb-4">You're all set!</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              Your personalized dashboard is ready
            </p>
            
            <div className="flex justify-center mb-6">
              <motion.div
                className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  {selectedMood ? getMoodIcon(selectedMood) : <Smile className="h-10 w-10 text-green-500" />}
                </motion.div>
              </motion.div>
            </div>
            
            <p className="text-center font-medium mb-2">
              {selectedMood ? `You're feeling ${getMoodLabel(selectedMood).toLowerCase()}` : "Let's start learning"}
            </p>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
              We've personalized your dashboard based on your mood and preferences
            </p>
          </motion.div>
        )}

        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleContinue}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            {step === 3 ? "Go to Dashboard" : "Continue"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
