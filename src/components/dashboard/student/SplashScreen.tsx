
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface SplashScreenProps {
  onComplete: () => void;
  mood?: MoodType;
}

const quotes = [
  {
    text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
    author: "Malcolm X"
  },
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King"
  },
  {
    text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss"
  },
  {
    text: "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.",
    author: "Abigail Adams"
  },
  {
    text: "The mind is not a vessel to be filled, but a fire to be kindled.",
    author: "Plutarch"
  },
  {
    text: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar"
  },
  {
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier"
  },
];

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, mood }) => {
  const [quote, setQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);
    
    // Animate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);
  
  const getBgGradient = () => {
    switch (mood) {
      case 'happy':
        return 'from-amber-100 via-white to-amber-50';
      case 'motivated':
        return 'from-green-100 via-white to-emerald-50';
      case 'sad':
        return 'from-blue-100 via-white to-blue-50';
      case 'focused':
        return 'from-indigo-100 via-white to-violet-50';
      default:
        return 'from-violet-100 via-white to-sky-50';
    }
  };
  
  return (
    <motion.div 
      className={`min-h-screen w-full flex flex-col items-center justify-center px-4 bg-gradient-to-br ${getBgGradient()}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
          className="mb-8"
        >
          <img 
            src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
            alt="Sakha AI Logo" 
            className="h-20 w-auto mx-auto"
          />
          <h1 className="text-3xl md:text-4xl font-bold mt-4 gradient-text">
            Welcome to Sakha AI
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Your emotional learning companion
          </p>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <p className="text-lg md:text-xl italic text-gray-700 dark:text-gray-300">
            "{quote.text}"
          </p>
          <p className="mt-2 text-sm text-right text-gray-500">
            — {quote.author}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full"
        >
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-violet-500 to-sky-500"
              initial={{ width: "0%" }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Loading your personalized experience...</span>
            <span>{loadingProgress}%</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loadingProgress >= 70 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-10"
        >
          <Button 
            onClick={onComplete}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white transition-all duration-300 shadow-lg hover:shadow-xl px-6 py-2"
          >
            Enter Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
