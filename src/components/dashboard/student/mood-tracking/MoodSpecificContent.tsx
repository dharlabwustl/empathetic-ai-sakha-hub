
import React from "react";
import { MoodType } from "@/types/user/base";
import { AnimatePresence, motion } from "framer-motion";
import MotivatedMoodPanel from "./mood-specific/MotivatedMoodPanel";
import CuriousMoodPanel from "./mood-specific/CuriousMoodPanel";
import NeutralMoodPanel from "./mood-specific/NeutralMoodPanel";
import TiredMoodPanel from "./mood-specific/TiredMoodPanel";
import StressedMoodPanel from "./mood-specific/StressedMoodPanel";
import FocusedMoodPanel from "./mood-specific/FocusedMoodPanel";
import HappyMoodPanel from "./mood-specific/HappyMoodPanel";
import OkayMoodPanel from "./mood-specific/OkayMoodPanel";
import OverwhelmedMoodPanel from "./mood-specific/OverwhelmedMoodPanel";
import SadMoodPanel from "./mood-specific/SadMoodPanel";

interface MoodSpecificContentProps {
  currentMood?: MoodType;
}

const MoodSpecificContent: React.FC<MoodSpecificContentProps> = ({ currentMood }) => {
  if (!currentMood) return null;
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentMood}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="mt-4"
      >
        {currentMood === 'motivated' && <MotivatedMoodPanel />}
        {currentMood === 'curious' && <CuriousMoodPanel />}
        {currentMood === 'neutral' && <NeutralMoodPanel />}
        {currentMood === 'tired' && <TiredMoodPanel />}
        {currentMood === 'stressed' && <StressedMoodPanel />}
        {currentMood === 'focused' && <FocusedMoodPanel />}
        {currentMood === 'happy' && <HappyMoodPanel />}
        {currentMood === 'okay' && <OkayMoodPanel />}
        {currentMood === 'overwhelmed' && <OverwhelmedMoodPanel />}
        {currentMood === 'sad' && <SadMoodPanel />}
      </motion.div>
    </AnimatePresence>
  );
};

export default MoodSpecificContent;
