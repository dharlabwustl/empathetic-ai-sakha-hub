
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, Zap, Coffee, Target } from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface SplashScreenProps {
  onComplete: () => void;
  mood?: MoodType;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, mood }) => {
  const [currentMoodIndex, setCurrentMoodIndex] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  const moodOptions = [
    {
      type: MoodType.Motivated,
      icon: Zap,
      color: 'from-yellow-400 to-orange-500',
      message: "I'm feeling motivated and ready to learn!"
    },
    {
      type: MoodType.Happy,
      icon: Heart,
      color: 'from-pink-400 to-red-500',
      message: "I'm in a great mood today!"
    },
    {
      type: MoodType.Focused,
      icon: Target,
      color: 'from-blue-400 to-purple-500',
      message: "I'm focused and ready to tackle challenges!"
    },
    {
      type: MoodType.Okay,
      icon: Star,
      color: 'from-green-400 to-blue-500',
      message: "I'm feeling okay and ready to start!"
    },
    {
      type: MoodType.Stressed,
      icon: Coffee,
      color: 'from-orange-400 to-yellow-500',
      message: "I'm a bit stressed but ready to push through!"
    },
    {
      type: MoodType.Tired,
      icon: Sparkles,
      color: 'from-purple-400 to-pink-500',
      message: "I'm tired but committed to learning!"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleMoodSelect = (selectedMood: MoodType) => {
    // Store mood in localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        parsedData.mood = selectedMood;
        localStorage.setItem("userData", JSON.stringify(parsedData));
      } catch (err) {
        localStorage.setItem("userData", JSON.stringify({ mood: selectedMood }));
      }
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood: selectedMood }));
    }
    
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Welcome to Prepzr
              </h1>
              <p className="text-lg mb-8 text-purple-100">
                How are you feeling today?
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {moodOptions.map((moodOption, index) => (
                <motion.button
                  key={moodOption.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  onClick={() => handleMoodSelect(moodOption.type)}
                  className={`p-4 rounded-lg bg-gradient-to-r ${moodOption.color} hover:scale-105 transition-transform duration-200 text-white font-medium`}
                >
                  <moodOption.icon className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm">{moodOption.message}</div>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {showContinue && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    onClick={() => handleMoodSelect(mood || MoodType.Motivated)}
                    className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    Continue to Dashboard
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
