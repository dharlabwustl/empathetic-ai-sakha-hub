
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoodType } from "@/types/user/base";
import { motion } from "framer-motion";
import { Smile, Frown, Meh, Heart, Coffee, Brain, BookOpen } from "lucide-react";

interface MoodSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMood?: MoodType;
  onSelectMood: (mood: MoodType) => void;
}

const moods: Array<{ value: MoodType; label: string; icon: React.ReactNode; color: string }> = [
  { value: "happy", label: "Happy", icon: <Smile className="text-amber-500" />, color: "bg-amber-100 border-amber-200 text-amber-700" },
  { value: "motivated", label: "Motivated", icon: <Heart className="text-green-500" />, color: "bg-green-100 border-green-200 text-green-700" },
  { value: "focused", label: "Focused", icon: <Brain className="text-indigo-500" />, color: "bg-indigo-100 border-indigo-200 text-indigo-700" },
  { value: "curious", label: "Curious", icon: <BookOpen className="text-cyan-500" />, color: "bg-cyan-100 border-cyan-200 text-cyan-700" },
  { value: "okay", label: "Okay", icon: <Coffee className="text-sky-500" />, color: "bg-sky-100 border-sky-200 text-sky-700" },
  { value: "neutral", label: "Neutral", icon: <Meh className="text-gray-500" />, color: "bg-gray-100 border-gray-200 text-gray-700" },
  { value: "tired", label: "Tired", icon: <Coffee className="text-purple-500" />, color: "bg-purple-100 border-purple-200 text-purple-700" },
  { value: "stressed", label: "Stressed", icon: <Frown className="text-red-500" />, color: "bg-red-100 border-red-200 text-red-700" },
  { value: "overwhelmed", label: "Overwhelmed", icon: <Frown className="text-pink-500" />, color: "bg-pink-100 border-pink-200 text-pink-700" },
  { value: "sad", label: "Sad", icon: <Frown className="text-blue-500" />, color: "bg-blue-100 border-blue-200 text-blue-700" },
];

const MoodSelectionDialog: React.FC<MoodSelectionDialogProps> = ({
  isOpen,
  onClose,
  selectedMood,
  onSelectMood,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">How are you feeling today?</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-3 py-4">
          {moods.map((mood) => (
            <motion.button
              key={mood.value}
              onClick={() => onSelectMood(mood.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                selectedMood === mood.value
                  ? `ring-2 ring-offset-2 ring-violet-500 ${mood.color}`
                  : `hover:bg-gray-50 border-gray-200 ${mood.color}`
              }`}
            >
              <div className="text-2xl mb-1">{mood.icon}</div>
              <span className="text-xs font-medium">{mood.label}</span>
            </motion.button>
          ))}
        </div>
        <div className="flex justify-center mt-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodSelectionDialog;
