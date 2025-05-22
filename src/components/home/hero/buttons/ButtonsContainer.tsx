
import React from 'react';
import { motion } from 'framer-motion';
import PrimaryActionButton from './PrimaryActionButton';
import SecondaryActionButton from './SecondaryActionButton';
import ButtonAnimationParticles from './ButtonAnimationParticles';

interface ButtonsContainerProps {
  onAnalyzeClick?: () => void;
}

const ButtonsContainer: React.FC<ButtonsContainerProps> = ({ onAnalyzeClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="flex flex-col sm:flex-row flex-wrap gap-5 mb-8 relative z-20"
    >
      <div className="relative order-2 sm:order-1">
        <motion.div 
          className="absolute -inset-2 bg-indigo-500/20 dark:bg-indigo-500/30 rounded-full blur-md -z-10"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7] 
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <ButtonAnimationParticles />
        <PrimaryActionButton onAnalyzeClick={onAnalyzeClick} />
      </div>
      
      <div className="order-1 sm:order-2">
        <SecondaryActionButton />
      </div>
      
      {/* Premium badge that floats above the buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 sm:top-auto sm:bottom-0 sm:left-auto sm:right-0 sm:translate-x-0 sm:translate-y-1/2"
      >
        <motion.div 
          className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 px-3 py-1 rounded-full text-xs font-medium text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 shadow-sm"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          2 million+ students enrolled
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ButtonsContainer;
