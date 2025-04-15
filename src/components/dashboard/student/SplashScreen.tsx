
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/providers/ThemeProvider';

interface SplashScreenProps {
  onComplete: () => void;
  mood?: 'sad' | 'neutral' | 'happy' | 'motivated' | 'curious' | 'stressed' | 'tired' | undefined;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, mood = 'motivated' }) => {
  const [progress, setProgress] = useState(0);
  const [showQuote, setShowQuote] = useState(false);
  const { theme } = useTheme();
  
  // Define mood-specific themes
  const moodThemes = {
    motivated: {
      bgClass: "bg-gradient-to-br from-orange-500/90 to-amber-500/90 dark:from-orange-600/90 dark:to-amber-600/90",
      textClass: "text-white",
      quote: "You're on fire today! Let's channel this energy into something amazing.",
      icon: "🔥"
    },
    curious: {
      bgClass: "bg-gradient-to-br from-purple-500/90 to-blue-400/90 dark:from-purple-600/90 dark:to-blue-500/90",
      textClass: "text-white",
      quote: "Curiosity is your superpower. Want to explore something new?",
      icon: "✨"
    },
    neutral: {
      bgClass: "bg-gradient-to-br from-gray-200/90 to-gray-300/90 dark:from-gray-700/90 dark:to-gray-800/90",
      textClass: "text-gray-800 dark:text-gray-200",
      quote: "It's okay to just be. Small steps still count.",
      icon: "🌤️"
    },
    tired: {
      bgClass: "bg-gradient-to-br from-blue-300/90 to-indigo-200/90 dark:from-blue-800/90 dark:to-indigo-900/90",
      textClass: "text-gray-800 dark:text-gray-100",
      quote: "Rest is part of growth. Take it slow, you're doing just fine.",
      icon: "😴"
    },
    stressed: {
      bgClass: "bg-gradient-to-br from-blue-400/90 to-cyan-300/90 dark:from-blue-600/90 dark:to-cyan-700/90", 
      textClass: "text-white",
      quote: "It's okay to feel overwhelmed. Let's take a moment together.",
      icon: "🧘"
    },
    happy: {
      bgClass: "bg-gradient-to-br from-yellow-400/90 to-green-400/90 dark:from-yellow-500/90 dark:to-green-500/90",
      textClass: "text-white",
      quote: "Your positive energy is contagious! Let's make the most of it.",
      icon: "😊"
    },
    sad: {
      bgClass: "bg-gradient-to-br from-blue-400/90 to-indigo-400/90 dark:from-blue-600/90 dark:to-indigo-600/90",
      textClass: "text-white",
      quote: "It's okay to feel down. We'll work at your pace today.",
      icon: "🌧️"
    }
  };
  
  // Default to motivated if mood is not provided
  const currentMood = mood || 'motivated';
  const moodTheme = moodThemes[currentMood];

  useEffect(() => {
    // Start progress animation
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setShowQuote(true);
            setTimeout(onComplete, 2500);
          }, 500);
          return 100;
        }
        return prevProgress + 4;
      });
    }, 60);
    
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div 
        className={`fixed inset-0 flex items-center justify-center z-50 ${moodTheme.bgClass}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-center px-6 max-w-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <img 
              src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png"
              alt="Sakha AI Logo" 
              className="w-24 h-24 mx-auto mb-4"
            />
            <h1 className={`text-3xl font-bold font-display mb-2 ${moodTheme.textClass}`}>
              Sakha AI
            </h1>
            <p className={`text-lg ${moodTheme.textClass} opacity-90`}>
              Your AI Study Partner
            </p>
          </motion.div>
          
          <div className="relative h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden w-64 mx-auto mb-6">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-white dark:bg-white"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Show mood-based message after loading */}
          <AnimatePresence>
            {showQuote && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <div className="text-4xl mb-4">{moodTheme.icon}</div>
                <p className={`text-xl ${moodTheme.textClass}`}>
                  {moodTheme.quote}
                </p>
                <motion.p 
                  className={`mt-4 ${moodTheme.textClass} opacity-75`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.75 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Let's make today count!
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Animated elements based on mood */}
        {currentMood === 'motivated' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-yellow-300"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: window.innerHeight + 20,
                  opacity: Math.random() * 0.7 + 0.3
                }}
                animate={{ 
                  y: -20,
                  opacity: 0
                }}
                transition={{ 
                  duration: Math.random() * 3 + 2,
                  delay: Math.random() * 5,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2
                }}
              />
            ))}
          </div>
        )}
        
        {currentMood === 'curious' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-xl"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                  scale: 0.5
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: Math.random() * 4 + 2,
                  delay: Math.random() * 5,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3
                }}
              >
                {["❓", "💭", "✨", "🔍"][Math.floor(Math.random() * 4)]}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
