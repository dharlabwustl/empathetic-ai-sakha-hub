
import React from "react";
import { MoodType } from "@/types/user/base";
import { AnimatePresence, motion } from "framer-motion";

interface MoodSpecificContentProps {
  currentMood?: MoodType;
}

const MoodSpecificContent: React.FC<MoodSpecificContentProps> = ({ currentMood }) => {
  if (!currentMood) return null;
  
  // Dynamic import of the mood-specific panel based on current mood
  const renderMoodPanel = () => {
    switch (currentMood) {
      case 'motivated':
        return <div className="p-4 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-lg border border-orange-200 dark:border-orange-800">
          <h3 className="font-semibold text-orange-700 dark:text-orange-300">
            Power Mode Activated!
          </h3>
          <p className="text-sm mt-2">Channel your motivation into productive study sessions.</p>
        </div>;
      case 'curious':
        return <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-700 dark:text-blue-300">
            Today's Wonder Box
          </h3>
          <p className="text-sm mt-2">Explore new concepts and satisfy your curiosity.</p>
        </div>;
      case 'neutral':
        return <div className="p-4 bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-900/30 dark:to-slate-900/30 rounded-lg border border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">
            Small Steps Count
          </h3>
          <p className="text-sm mt-2">Every bit of progress matters, even on neutral days.</p>
        </div>;
      case 'tired':
        return <div className="p-4 bg-gradient-to-r from-sky-100 to-indigo-100 dark:from-sky-900/30 dark:to-indigo-900/30 rounded-lg border border-sky-200 dark:border-sky-800">
          <h3 className="font-semibold text-sky-700 dark:text-sky-300">
            Rest and Recharge
          </h3>
          <p className="text-sm mt-2">Take it easy today and focus on light study tasks.</p>
        </div>;
      case 'stressed':
        return <div className="p-4 bg-gradient-to-r from-lavender-100 to-blue-100 dark:from-lavender-900/30 dark:to-blue-900/30 rounded-lg border border-lavender-200 dark:border-lavender-800">
          <h3 className="font-semibold text-lavender-700 dark:text-lavender-300">
            Let's Take a Moment
          </h3>
          <p className="text-sm mt-2">Breathe and take care of yourself first.</p>
        </div>;
      case 'focused':
        return <div className="p-4 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">
            Deep Focus Mode
          </h3>
          <p className="text-sm mt-2">Let's make the most of your concentration.</p>
        </div>;
      case 'happy':
        return <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-700 dark:text-green-300">
            Today's Joy Booster
          </h3>
          <p className="text-sm mt-2">Happiness boosts learning - let's make use of it!</p>
        </div>;
      case 'okay':
        return <div className="p-4 bg-gradient-to-r from-blue-100 to-sky-100 dark:from-blue-900/30 dark:to-sky-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-700 dark:text-blue-300">
            Steady Progress
          </h3>
          <p className="text-sm mt-2">You're doing fine! Let's keep moving forward.</p>
        </div>;
      case 'overwhelmed':
        return <div className="p-4 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 rounded-lg border border-purple-200 dark:border-purple-800">
          <h3 className="font-semibold text-purple-700 dark:text-purple-300">
            Calm Space
          </h3>
          <p className="text-sm mt-2">Let's break things down into smaller tasks.</p>
        </div>;
      case 'sad':
        return <div className="p-4 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">
            Mood Uplift
          </h3>
          <p className="text-sm mt-2">Try starting with a small task to build momentum.</p>
        </div>;
      default:
        return null;
    }
  };
  
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
        {renderMoodPanel()}
      </motion.div>
    </AnimatePresence>
  );
};

export default MoodSpecificContent;
