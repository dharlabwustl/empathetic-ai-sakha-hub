
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoodType } from "@/types/user/base";
import { Smile, Frown, Meh, Heart, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface MoodTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  onMoodSelect: (mood: MoodType) => void;
  currentMood?: MoodType;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({
  isOpen,
  onClose,
  onMoodSelect,
  currentMood
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>(currentMood);

  useEffect(() => {
    setSelectedMood(currentMood);
  }, [currentMood, isOpen]);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handleSubmit = () => {
    if (selectedMood) {
      onMoodSelect(selectedMood);
      onClose();
    }
  };
  
  const moods: { value: MoodType; label: string; icon: React.ReactNode; color: string; description: string }[] = [
    {
      value: 'happy',
      label: 'Happy',
      icon: <Smile className="h-10 w-10" />,
      color: 'bg-green-100 text-green-600 border-green-200',
      description: "I'm having a good day!"
    },
    {
      value: 'neutral',
      label: 'Neutral',
      icon: <Meh className="h-10 w-10" />,
      color: 'bg-amber-100 text-amber-600 border-amber-200',
      description: "I'm feeling okay"
    },
    {
      value: 'sad',
      label: 'Sad',
      icon: <Frown className="h-10 w-10" />,
      color: 'bg-red-100 text-red-600 border-red-200',
      description: "I'm having a tough day"
    },
    {
      value: 'motivated',
      label: 'Motivated',
      icon: <Heart className="h-10 w-10" />,
      color: 'bg-pink-100 text-pink-600 border-pink-200',
      description: "I'm feeling energized!"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How are you feeling today?</DialogTitle>
          <DialogDescription>
            Your study recommendations will be tailored to your mood.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          {moods.map((mood) => (
            <motion.div
              key={mood.value}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`cursor-pointer border-2 transition ${
                  selectedMood === mood.value 
                    ? `${mood.color} ring-2 ring-offset-2 ring-offset-background ring-${mood.color.split(' ')[1]}`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleMoodSelect(mood.value)}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className={`rounded-full p-3 mb-2 ${mood.color.split(' ')[0]} ${mood.color.split(' ')[1]}`}>
                    {mood.icon}
                  </div>
                  <h3 className="font-medium text-lg">{mood.label}</h3>
                  <p className="text-sm text-center text-muted-foreground mt-1">
                    {mood.description}
                  </p>
                  {selectedMood === mood.value && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedMood}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MoodTracker;
