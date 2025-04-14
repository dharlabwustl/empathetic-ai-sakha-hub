
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Frown, Smile, Meh, Heart } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < 3) {
        setStep(step + 1);
      } else {
        onComplete();
      }
    }, 1200);
    
    return () => clearTimeout(timer);
  }, [step, onComplete]);
  
  const moods = [
    { icon: <Frown />, color: "text-red-500", text: "Feeling stressed..." },
    { icon: <Meh />, color: "text-amber-500", text: "Analyzing learning patterns..." },
    { icon: <Smile />, color: "text-green-500", text: "Adapting to your mood..." },
    { icon: <Heart />, color: "text-purple-500", text: "Ready to assist you!" }
  ];
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-indigo-50 dark:from-gray-900 dark:to-indigo-900"
        initial={{ opacity: 1 }}
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
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl dark:bg-gray-800"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          >
            <motion.div
              className={`text-4xl ${moods[step].color}`}
              key={step}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 30 }}
            >
              {moods[step].icon}
            </motion.div>
          </motion.div>
          
          <motion.h2
            className="mb-2 text-2xl font-bold"
            key={`title-${step}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            Sakha AI
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300"
            key={`text-${step}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {moods[step].text}
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
