
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { SmilePlus } from 'lucide-react';
import { MoodType } from '@/types/user';

interface LogMoodButtonProps {
  onMoodSelect?: (mood: MoodType) => void;
  currentMood?: MoodType;
}

const moodOptions: {
  value: MoodType;
  label: string;
  emoji: string;
  color: string;
}[] = [
  { value: 'motivated', label: 'Motivated', emoji: '🔥', color: 'bg-orange-500 hover:bg-orange-600' },
  { value: 'curious', label: 'Curious', emoji: '🤔', color: 'bg-blue-500 hover:bg-blue-600' },
  { value: 'neutral', label: 'Neutral', emoji: '😐', color: 'bg-gray-400 hover:bg-gray-500' },
  { value: 'tired', label: 'Tired', emoji: '😴', color: 'bg-teal-400 hover:bg-teal-500' },
  { value: 'stressed', label: 'Stressed', emoji: '😰', color: 'bg-purple-500 hover:bg-purple-600' },
  { value: 'happy', label: 'Happy', emoji: '😊', color: 'bg-yellow-400 hover:bg-yellow-500' },
  { value: 'sad', label: 'Sad', emoji: '😢', color: 'bg-blue-400 hover:bg-blue-500' },
  { value: 'overwhelmed', label: 'Overwhelmed', emoji: '🥵', color: 'bg-red-500 hover:bg-red-600' },
];

const LogMoodButton: React.FC<LogMoodButtonProps> = ({ onMoodSelect, currentMood }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMoodSelect = (mood: MoodType) => {
    if (onMoodSelect) {
      onMoodSelect(mood);
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-6 right-6 z-50 rounded-full h-14 w-14 p-0 shadow-lg bg-white dark:bg-gray-800 border-purple-200 hover:bg-purple-50"
      >
        <SmilePlus className="h-6 w-6 text-purple-500" />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>How are you feeling today?</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${mood.color} text-white ${currentMood === mood.value ? 'ring-4 ring-purple-300 scale-105' : ''}`}
                onClick={() => handleMoodSelect(mood.value)}
              >
                <span className="text-3xl mb-2">{mood.emoji}</span>
                <span className="text-sm font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            Your mood influences how we personalize your learning experience
          </div>
          
          <DialogClose asChild>
            <Button variant="outline" className="w-full">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogMoodButton;
