
import React from "react";
import { MoodType } from "@/types/user/base";
import MotivatedMoodPanel from "../mood-specific/MotivatedMoodPanel";
import CuriousMoodPanel from "../mood-specific/CuriousMoodPanel";
import NeutralMoodPanel from "../mood-specific/NeutralMoodPanel";
import TiredMoodPanel from "../mood-specific/TiredMoodPanel";
import StressedMoodPanel from "../mood-specific/StressedMoodPanel";
import FocusedMoodPanel from "../mood-specific/FocusedMoodPanel";

interface MoodSpecificContentProps {
  currentMood?: MoodType;
}

const MoodSpecificContent: React.FC<MoodSpecificContentProps> = ({ currentMood }) => {
  if (!currentMood) return null;
  
  switch (currentMood) {
    case 'motivated':
      return <MotivatedMoodPanel />;
    
    case 'curious':
      return <CuriousMoodPanel />;
    
    case 'neutral':
      return <NeutralMoodPanel />;
    
    case 'tired':
      return <TiredMoodPanel />;
    
    case 'stressed':
      return <StressedMoodPanel />;
      
    case 'focused':
      return <FocusedMoodPanel />;
      
    default:
      return null;
  }
};

export default MoodSpecificContent;
