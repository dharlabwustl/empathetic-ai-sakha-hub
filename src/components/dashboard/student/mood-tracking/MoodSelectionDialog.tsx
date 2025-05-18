
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { motion } from 'framer-motion';

interface MoodOption {
  type: MoodType;
  emoji: string;
  label: string;
  color: string;
  description: string;
}

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
  onSelectMood
}) => {
  // Define mood options with enhanced visual elements
  const moodOptions: MoodOption[] = [
    { 
      type: MoodType.HAPPY, 
      emoji: '😊', 
      label: 'Happy',
      color: 'from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300 border-yellow-300',
      description: 'Feeling good and positive today!'
    },
    { 
      type: MoodType.MOTIVATED, 
      emoji: '💪', 
      label: 'Motivated',
      color: 'from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 border-green-300',
      description: 'Ready to take on challenges!'
    },
    { 
      type: MoodType.FOCUSED, 
      emoji: '🧠', 
      label: 'Focused',
      color: 'from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 border-blue-300',
      description: 'In the zone, concentrating well.'
    },
    { 
      type: MoodType.CALM, 
      emoji: '😌', 
      label: 'Calm',
      color: 'from-teal-100 to-teal-200 hover:from-teal-200 hover:to-teal-300 border-teal-300',
      description: 'Peaceful and relaxed.'
    },
    { 
      type: MoodType.OKAY, 
      emoji: '😐', 
      label: 'Neutral',
      color: 'from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-gray-300',
      description: 'Not great, not terrible.'
    },
    { 
      type: MoodType.TIRED, 
      emoji: '😴', 
      label: 'Tired',
      color: 'from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 border-orange-300',
      description: 'Low on energy today.'
    },
    { 
      type: MoodType.STRESSED, 
      emoji: '😓', 
      label: 'Stressed',
      color: 'from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 border-red-300',
      description: 'Feeling overwhelmed.'
    },
    { 
      type: MoodType.ANXIOUS, 
      emoji: '😨', 
      label: 'Anxious',
      color: 'from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 border-purple-300',
      description: 'Nervous or worried.'
    },
    { 
      type: MoodType.CONFUSED, 
      emoji: '🤔', 
      label: 'Confused',
      color: 'from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 border-amber-300',
      description: 'Uncertain or puzzled.'
    },
    { 
      type: MoodType.SAD, 
      emoji: '😔', 
      label: 'Sad',
      color: 'from-indigo-100 to-indigo-200 hover:from-indigo-200 hover:to-indigo-300 border-indigo-300',
      description: 'Feeling down today.'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">How are you feeling today?</DialogTitle>
          <DialogDescription className="text-center">
            Tracking your mood helps personalize your study experience
          </DialogDescription>
        </DialogHeader>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {moodOptions.map((mood) => (
            <motion.div key={mood.type} variants={item}>
              <Button
                type="button"
                variant="outline"
                onClick={() => onSelectMood(mood.type)}
                className={`w-full h-auto py-4 px-2 flex flex-col items-center gap-2 border bg-gradient-to-r ${mood.color} ${
                  selectedMood === mood.type ? 'ring-2 ring-offset-2 ring-purple-500' : ''
                }`}
              >
                <span className="text-2xl mb-1">{mood.emoji}</span>
                <span className="font-medium text-sm">{mood.label}</span>
              </Button>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Mood description footer */}
        <div className="mt-4 text-center text-sm text-muted-foreground p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
          {selectedMood ? (
            <p>
              {moodOptions.find(m => m.type === selectedMood)?.description || 
                "Select a mood to personalize your study experience."}
            </p>
          ) : (
            <p>Select a mood to personalize your study experience.</p>
          )}
        </div>
        
        <div className="flex justify-between mt-4">
          <DialogClose asChild>
            <Button variant="outline" type="button">Cancel</Button>
          </DialogClose>
          
          <Button
            type="button"
            className="bg-gradient-to-r from-purple-600 to-indigo-600"
            onClick={() => {
              if (selectedMood) {
                onSelectMood(selectedMood);
              }
            }}
            disabled={!selectedMood}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodSelectionDialog;
