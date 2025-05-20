
import React from 'react';
import ButtonsContainer from './buttons/ButtonsContainer';

interface HeroButtonsProps {
  onAnalyzeClick?: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ onAnalyzeClick }) => {
  return <ButtonsContainer onAnalyzeClick={onAnalyzeClick} />;
};

export default HeroButtons;
