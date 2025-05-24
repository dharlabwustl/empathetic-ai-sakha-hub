
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoodType } from "@/types/user/base";
import { Sparkles, Heart, Brain, Zap, Coffee, Moon } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
  mood?: MoodType;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, mood }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const screens = [
    {
      title: "Welcome to PREPZR",
      subtitle: "Your AI-powered learning companion",
      icon: <Sparkles className="h-16 w-16 text-blue-500" />,
      description: "Preparing your personalized dashboard...",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Analyzing Your Progress",
      subtitle: "Reviewing your learning journey",
      icon: <Brain className="h-16 w-16 text-green-500" />,
      description: "Understanding your study patterns...",
      color: "from-green-500 to-blue-500"
    },
    {
      title: "Ready to Learn!",
      subtitle: "Your dashboard is ready",
      icon: <Zap className="h-16 w-16 text-yellow-500" />,
      description: "Let's continue your learning journey!",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScreen((prev) => {
        if (prev < screens.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 500);
          }, 1500);
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const getMoodIcon = () => {
    switch (mood) {
      case MoodType.Happy:
        return "😊";
      case MoodType.Motivated:
        return "🚀";
      case MoodType.Focused:
        return "🎯";
      case MoodType.Stressed:
        return "😰";
      case MoodType.Tired:
        return "😴";
      default:
        return "😊";
    }
  };

  const getMoodMessage = () => {
    switch (mood) {
      case MoodType.Happy:
        return "Great to see you're feeling positive!";
      case MoodType.Motivated:
        return "Your motivation is inspiring!";
      case MoodType.Focused:
        return "Love that focus energy!";
      case MoodType.Stressed:
        return "Let's make today productive and stress-free!";
      case MoodType.Tired:
        return "Let's take it at your pace today!";
      default:
        return "Ready for an amazing learning session!";
    }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center max-w-md mx-auto px-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScreen}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      {screens[currentScreen].icon}
                    </motion.div>
                    
                    <div>
                      <h1 className={`text-3xl font-bold bg-gradient-to-r ${screens[currentScreen].color} bg-clip-text text-transparent`}>
                        {screens[currentScreen].title}
                      </h1>
                      <p className="text-white/80 mt-2">
                        {screens[currentScreen].subtitle}
                      </p>
                    </div>

                    {mood && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/10 rounded-lg p-4"
                      >
                        <div className="text-2xl mb-2">{getMoodIcon()}</div>
                        <p className="text-white/90 text-sm">{getMoodMessage()}</p>
                      </motion.div>
                    )}

                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-white/60"
                    >
                      {screens[currentScreen].description}
                    </motion.div>

                    <motion.div
                      className="flex justify-center space-x-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {screens.map((_, index) => (
                        <motion.div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentScreen ? 'bg-white' : 'bg-white/30'
                          }`}
                          animate={index === currentScreen ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
