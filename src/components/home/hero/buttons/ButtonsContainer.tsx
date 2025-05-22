
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
      className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <div className="relative">
        <ButtonAnimationParticles />
        <PrimaryActionButton onAnalyzeClick={onAnalyzeClick} />
      </div>
      
      <SecondaryActionButton />
      
      {/* Flying animation elements */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-indigo-500/60"
          initial={{ 
            x: -10, 
            y: 0, 
            opacity: 0.8,
            scale: 0.6 + Math.random() * 0.4
          }}
          animate={{ 
            x: 60 + Math.random() * 40, 
            y: -20 - Math.random() * 40,
            opacity: 0,
            scale: 0 
          }}
          transition={{ 
            duration: 1 + Math.random() * 1, 
            repeat: Infinity, 
            delay: i * 0.7,
            ease: "easeOut" 
          }}
          style={{
            top: `${40 + Math.random() * 20}%`,
            left: `${Math.random() * 20}%`
          }}
        />
      ))}
    </motion.div>
  );
};

export default ButtonsContainer;
