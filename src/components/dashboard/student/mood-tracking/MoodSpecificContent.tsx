
import React from "react";
import { MoodType } from "@/types/user/base";
import { AnimatePresence, motion } from "framer-motion";
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
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentMood}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {currentMood === 'motivated' && <MotivatedMoodPanel />}
        {currentMood === 'curious' && <CuriousMoodPanel />}
        {currentMood === 'neutral' && <NeutralMoodPanel />}
        {currentMood === 'tired' && <TiredMoodPanel />}
        {currentMood === 'stressed' && <StressedMoodPanel />}
        {currentMood === 'focused' && <FocusedMoodPanel />}
      </motion.div>
    </AnimatePresence>
  );
};

export default MoodSpecificContent;
