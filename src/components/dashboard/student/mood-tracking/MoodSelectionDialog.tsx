
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoodType } from '@/types/user/base';
import { getMoodEmoji, getMoodLabel, getStudyRecommendationForMood } from './moodUtils';
import { motion } from 'framer-motion';

interface MoodSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMood?: MoodType;
  onSelectMood: (mood: MoodType) => void;
}

const MoodSelectionDialog: React.FC<MoodSelectionDialogProps> = ({
  isOpen,
  onClose,
  selectedMood,
  onSelectMood,
}) => {
  const moods = [
    { type: MoodType.HAPPY, color: 'bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-800/40' },
    { type: MoodType.MOTIVATED, color: 'bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-800/40' },
    { type: MoodType.FOCUSED, color: 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40' },
    { type: MoodType.CURIOUS, color: 'bg-lime-100 hover:bg-lime-200 dark:bg-lime-900/30 dark:hover:bg-lime-800/40' },
    { type: MoodType.OKAY, color: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800/50 dark:hover:bg-gray-700/60' },
    { type: MoodType.NEUTRAL, color: 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/50 dark:hover:bg-slate-700/60' },
    { type: MoodType.TIRED, color: 'bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-800/40' },
    { type: MoodType.CONFUSED, color: 'bg-teal-100 hover:bg-teal-200 dark:bg-teal-900/30 dark:hover:bg-teal-800/40' },
    { type: MoodType.ANXIOUS, color: 'bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40' },
    { type: MoodType.STRESSED, color: 'bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/40' },
    { type: MoodType.OVERWHELMED, color: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700/50 dark:hover:bg-gray-600/60' },
    { type: MoodType.SAD, color: 'bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40' },
  ];

  const handleMoodSelect = (mood: MoodType) => {
    onSelectMood(mood);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How are you feeling today?</DialogTitle>
          <DialogDescription>
            Your mood helps us personalize your study experience and adjust your daily plan.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-3 gap-3 py-4">
          {moods.map((mood, index) => (
            <motion.div
              key={mood.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Button
                variant={selectedMood === mood.type ? "default" : "outline"}
                onClick={() => handleMoodSelect(mood.type)}
                className={`w-full h-20 flex flex-col items-center justify-center gap-1 ${mood.color} border-2 transition-all duration-200 transform hover:scale-105`}
              >
                <span className="text-2xl">{getMoodEmoji(mood.type)}</span>
                <span className="text-xs font-medium">{getMoodLabel(mood.type)}</span>
              </Button>
            </motion.div>
          ))}
        </div>
        
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border"
          >
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Recommendation:</strong> {getStudyRecommendationForMood(selectedMood)}
            </p>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MoodSelectionDialog;
