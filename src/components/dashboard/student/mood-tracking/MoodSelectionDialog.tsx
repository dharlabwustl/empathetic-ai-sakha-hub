
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface MoodSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMoodSelected: (mood: MoodType) => void;
  currentMood?: MoodType;
}

export function MoodSelectionDialog({ open, onOpenChange, onMoodSelected, currentMood }: MoodSelectionDialogProps) {
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>(currentMood);

  const moods: Array<{type: MoodType, emoji: string, label: string, description: string}> = [
    { type: "motivated", emoji: "💪", label: "Motivated", description: "Ready to take on challenges" },
    { type: "curious", emoji: "🧐", label: "Curious", description: "Eager to learn new things" },
    { type: "neutral", emoji: "😐", label: "Neutral", description: "Neither positive nor negative" },
    { type: "tired", emoji: "😴", label: "Tired", description: "Low energy levels" },
    { type: "stressed", emoji: "😓", label: "Stressed", description: "Feeling pressured" },
    { type: "focused", emoji: "🧠", label: "Focused", description: "In the zone, concentrated" },
    { type: "happy", emoji: "😊", label: "Happy", description: "Feeling positive and upbeat" },
    { type: "sad", emoji: "😢", label: "Sad", description: "Feeling down or upset" },
    { type: "overwhelmed", emoji: "😵", label: "Overwhelmed", description: "Too many things to handle" },
  ];
  
  const handleConfirm = () => {
    if (selectedMood) {
      onMoodSelected(selectedMood);
      toast({
        title: "Mood updated",
        description: `Your mood has been set to ${selectedMood}`,
      });
      onOpenChange(false);
    } else {
      toast({
        title: "Please select a mood",
        description: "You need to select a mood before confirming",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How are you feeling today?</DialogTitle>
          <DialogDescription>
            Your mood helps us personalize your learning experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-3 gap-3 py-4">
          {moods.map(mood => (
            <Button
              key={mood.type}
              variant="outline"
              className={cn(
                "flex flex-col h-auto py-3 px-2",
                selectedMood === mood.type && "bg-primary/10 border-primary"
              )}
              onClick={() => setSelectedMood(mood.type)}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-sm">{mood.label}</span>
            </Button>
          ))}
        </div>
        
        {selectedMood && (
          <div className="bg-muted p-3 rounded-lg text-center mb-4">
            <p className="text-sm font-medium">
              {moods.find(m => m.type === selectedMood)?.description}
            </p>
          </div>
        )}
        
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedMood}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
