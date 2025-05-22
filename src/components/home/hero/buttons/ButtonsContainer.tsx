
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
      transition={{ delay: 0.6, duration: 0.5 }}
      className="flex flex-wrap gap-4 mb-8 relative"
    >
      <div className="relative">
        <ButtonAnimationParticles />
        <PrimaryActionButton onAnalyzeClick={onAnalyzeClick} />
      </div>
      
      <SecondaryActionButton />
    </motion.div>
  );
};

export default ButtonsContainer;
