
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
        {/* Enhanced glow effect */}
        <motion.div 
          className="absolute -inset-2 bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-indigo-500/40 dark:from-indigo-500/30 dark:via-purple-500/40 dark:to-indigo-500/30 rounded-full blur-xl -z-10"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.6, 1, 0.6],
            background: [
              'linear-gradient(90deg, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.4) 50%, rgba(99, 102, 241, 0.4) 100%)',
              'linear-gradient(90deg, rgba(99, 102, 241, 0.5) 0%, rgba(168, 85, 247, 0.5) 50%, rgba(99, 102, 241, 0.5) 100%)',
              'linear-gradient(90deg, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.4) 50%, rgba(99, 102, 241, 0.4) 100%)'
            ]
          }}
          transition={{
            duration: 3,
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
