
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
      className="flex flex-wrap gap-5 mb-8 relative z-20"
    >
      <div className="relative">
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
      
      <SecondaryActionButton />
    </motion.div>
  );
};

export default ButtonsContainer;
