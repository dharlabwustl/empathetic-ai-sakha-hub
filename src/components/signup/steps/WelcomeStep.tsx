
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <div className="space-y-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-2">Welcome to PREPZR</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Your personalized exam preparation partner
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
      >
        <p className="mb-4 text-sm text-blue-700 dark:text-blue-300">
          PREPZR is India's 1st emotionally intelligent study partner that adapts to your mood, 
          learning style, and exam goals.
        </p>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center mr-3">
              <span className="text-blue-600 dark:text-blue-300 font-semibold">1</span>
            </div>
            <p className="text-sm text-left">Tell us about yourself</p>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center mr-3">
              <span className="text-blue-600 dark:text-blue-300 font-semibold">2</span>
            </div>
            <p className="text-sm text-left">Set your exam goals</p>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center mr-3">
              <span className="text-blue-600 dark:text-blue-300 font-semibold">3</span>
            </div>
            <p className="text-sm text-left">Get a personalized study plan</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Button 
          onClick={onNext} 
          size="lg" 
          className="w-full"
        >
          Let's Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
};

export default WelcomeStep;
