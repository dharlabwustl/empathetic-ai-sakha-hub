
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star, Sparkles } from 'lucide-react';

interface EnhancedWelcomeScreenProps {
  userName: string;
  isReturningUser?: boolean;
  onComplete: () => void;
}

const EnhancedWelcomeScreen: React.FC<EnhancedWelcomeScreenProps> = ({
  userName,
  isReturningUser = false,
  onComplete
}) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [hasSpoken, setHasSpoken] = useState(false);

  const features = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "AI-Powered Learning",
      description: "Personalized study plans that adapt to your learning style"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Comprehensive Coverage",
      description: "Complete NEET, JEE, and competitive exam preparation"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Smart Analytics",
      description: "Track your progress with detailed performance insights"
    }
  ];

  // Cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Welcome voice announcement - only with user name
  useEffect(() => {
    if (!hasSpoken && userName && userName !== 'Student') {
      const timer = setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(
          `Welcome to PREPZR, ${userName}! I'm your AI study companion. Let's start your journey to exam success together.`
        );
        utterance.rate = 0.9;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
        setHasSpoken(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [userName, hasSpoken]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-8 text-center"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-200/50 dark:border-blue-800/50 mb-6">
            <Sparkles className="w-4 h-4" />
            Welcome to PREPZR
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {isReturningUser ? `Welcome back, ${userName}!` : `Hello ${userName}!`}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isReturningUser 
              ? "Ready to continue your learning journey?" 
              : "Let's begin your personalized learning journey"
            }
          </p>
        </motion.div>

        {/* Feature showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <motion.div
            key={currentFeature}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
              {features[currentFeature].icon}
            </div>
            <div className="text-left flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {features[currentFeature].title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {features[currentFeature].description}
              </p>
            </div>
          </motion.div>

          {/* Feature indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {features.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentFeature ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            onClick={onComplete}
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isReturningUser ? "Continue Learning" : "Start Learning"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        {/* Additional info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-xs text-gray-500 dark:text-gray-400"
        >
          Your AI-powered study companion is ready to help you succeed
        </motion.p>
      </motion.div>
    </div>
  );
};

export default EnhancedWelcomeScreen;
