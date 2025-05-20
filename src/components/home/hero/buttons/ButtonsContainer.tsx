
import React from 'react';
import ButtonAnimationParticles from './ButtonAnimationParticles';
import PrimaryActionButton from './PrimaryActionButton';
import SecondaryActionButton from './SecondaryActionButton';

interface ButtonsContainerProps {
  onAnalyzeClick?: () => void;
}

const ButtonsContainer: React.FC<ButtonsContainerProps> = ({ onAnalyzeClick }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 relative">
      {/* Floating particles animation */}
      <ButtonAnimationParticles />

      {/* Primary action button */}
      <PrimaryActionButton onClick={onAnalyzeClick} />

      {/* Secondary action button */}
      <SecondaryActionButton />
    </div>
  );
};

export default ButtonsContainer;
