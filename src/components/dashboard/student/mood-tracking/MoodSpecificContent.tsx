
import React from 'react';
import { MoodType } from "@/types/user/base";
import HappyMoodPanel from '../mood-specific/HappyMoodPanel';
import SadMoodPanel from '../mood-specific/SadMoodPanel';
import NeutralMoodPanel from '../mood-specific/NeutralMoodPanel';
import MotivatedMoodPanel from '../mood-specific/MotivatedMoodPanel';
import TiredMoodPanel from '../mood-specific/TiredMoodPanel';
import StressedMoodPanel from '../mood-specific/StressedMoodPanel';
import FocusedMoodPanel from '../mood-specific/FocusedMoodPanel';
import CuriousMoodPanel from '../mood-specific/CuriousMoodPanel';
import OverwhelmedMoodPanel from '../mood-specific/OverwhelmedMoodPanel';
import OkayMoodPanel from '../mood-specific/OkayMoodPanel';

interface MoodSpecificContentProps {
  mood: MoodType;
}

const MoodSpecificContent: React.FC<MoodSpecificContentProps> = ({ mood }) => {
  // Render different content based on the mood
  switch (mood) {
    case 'happy':
      return <HappyMoodPanel />;
    case 'sad':
      return <SadMoodPanel />;
    case 'neutral':
      return <NeutralMoodPanel />;
    case 'motivated':
      return <MotivatedMoodPanel />;
    case 'tired':
      return <TiredMoodPanel />;
    case 'stressed':
      return <StressedMoodPanel />;
    case 'focused':
      return <FocusedMoodPanel />;
    case 'curious':
      return <CuriousMoodPanel />;
    case 'overwhelmed':
      return <OverwhelmedMoodPanel />;
    case 'okay':
      return <OkayMoodPanel />;
    default:
      return (
        <div className="text-muted-foreground">
          Select a mood to see personalized recommendations
        </div>
      );
  }
};

export default MoodSpecificContent;
