
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Frown, Smile, Meh, Heart, Sun, Star, Lightbulb } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
  mood?: 'sad' | 'neutral' | 'happy' | 'motivated' | undefined;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, mood = undefined }) => {
  const [step, setStep] = useState(0);
  
  // Define moods based on user's current mood or follow default sequence
  const getMoods = () => {
    if (mood === 'sad') {
      return [
        { icon: <Frown />, color: "text-red-500", text: "Feeling low today..." },
        { icon: <Meh />, color: "text-amber-500", text: "Let's turn this around..." },
        { icon: <Sun />, color: "text-amber-400", text: "Finding your spark..." },
        { icon: <Smile />, color: "text-green-500", text: "We'll get through this together!" },
        { icon: <Star />, color: "text-purple-500", text: "Ready to help you succeed!" }
      ];
    } else if (mood === 'neutral') {
      return [
        { icon: <Meh />, color: "text-amber-500", text: "Hello there..." },
        { icon: <Sun />, color: "text-amber-400", text: "Analyzing your needs..." },
        { icon: <Lightbulb />, color: "text-yellow-500", text: "Finding your optimal path..." },
        { icon: <Smile />, color: "text-green-500", text: "Let's make progress today!" },
        { icon: <Heart />, color: "text-purple-500", text: "Ready to assist you!" }
      ];
    } else if (mood === 'happy' || mood === 'motivated') {
      return [
        { icon: <Smile />, color: "text-green-500", text: "Great to see you!" },
        { icon: <Star />, color: "text-yellow-500", text: "Harnessing your energy..." },
        { icon: <Lightbulb />, color: "text-yellow-500", text: "Ready for breakthroughs..." },
        { icon: <Sun />, color: "text-amber-400", text: "Let's achieve even more!" },
        { icon: <Heart />, color: "text-purple-500", text: "Your success is our mission!" }
      ];
    } else {
      // Default sequence
      return [
        { icon: <Meh />, color: "text-amber-500", text: "Understanding your needs..." },
        { icon: <Sun />, color: "text-amber-400", text: "Analyzing learning patterns..." },
        { icon: <Smile />, color: "text-green-500", text: "Adapting to your mood..." },
        { icon: <Heart />, color: "text-purple-500", text: "Ready to assist you!" },
        { icon: <Lightbulb />, color: "text-yellow-500", text: "Together towards excellence!" }
      ];
    }
  };
  
  const moods = getMoods();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < moods.length - 1) {
        setStep(step + 1);
      } else {
        // Add a slight delay before completion for the user to see the final message
        setTimeout(onComplete, 800);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [step, onComplete, moods.length]);
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-indigo-50 dark:from-gray-900 dark:to-indigo-900 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl dark:bg-gray-800"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          >
            <motion.div
              className={`text-4xl ${moods[step].color}`}
              key={`icon-${step}`}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 30 }}
            >
              {moods[step].icon}
            </motion.div>
          </motion.div>
          
          <motion.div
            className="relative mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <img 
              src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
              alt="Sakha AI Logo" 
              className="h-12 w-auto mx-auto"
            />
          </motion.div>
          
          <motion.h2
            className="mb-2 text-2xl font-bold text-gray-900 dark:text-white"
            key={`title-${step}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            Sakha AI
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-200 font-medium"
            key={`text-${step}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {moods[step].text}
          </motion.p>
          
          <motion.p 
            className="mt-6 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Your emotionally intelligent study partner
          </motion.p>
          
          <motion.div
            className="mt-4 h-2 w-64 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "16rem" }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${(step + 1) / moods.length * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
