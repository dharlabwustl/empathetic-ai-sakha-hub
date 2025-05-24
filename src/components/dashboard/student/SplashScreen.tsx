
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Target } from 'lucide-react';
import { UserProfileBase } from '@/types/user/base';

interface SplashScreenProps {
  userProfile: UserProfileBase;
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ userProfile, onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center z-50"
    >
      <div className="text-center text-white">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex justify-center space-x-4 mb-4">
            <BookOpen className="h-12 w-12" />
            <Brain className="h-12 w-12" />
            <Target className="h-12 w-12" />
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold mb-2"
        >
          Welcome back, {userProfile.name || 'Student'}!
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl opacity-90"
        >
          Ready to continue your learning journey?
        </motion.p>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, repeat: Infinity, duration: 1 }}
          className="mt-8"
        >
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
