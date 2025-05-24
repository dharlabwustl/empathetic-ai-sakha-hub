
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MoodType } from '@/types/user/base';
import { getMoodEmoji, getMoodLabel } from './mood-tracking/moodUtils';
import { Heart, Save } from 'lucide-react';

interface MoodLogButtonProps {
  onMoodSelect: (mood: MoodType, note?: string) => void;
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const moods = Object.values(MoodType);

  const handleMoodSelection = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handleSaveMood = () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling right now",
        variant: "destructive"
      });
      return;
    }

    onMoodSelect(selectedMood, note);
    setIsOpen(false);
    setSelectedMood(null);
    setNote('');
    
    toast({
      title: "Mood logged successfully",
      description: `You're feeling ${getMoodLabel(selectedMood)} today`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Heart className="h-4 w-4" />
          Log Mood
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How are you feeling today?</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {moods.map((mood) => (
              <Button
                key={mood}
                variant={selectedMood === mood ? "default" : "outline"}
                size="sm"
                onClick={() => handleMoodSelection(mood)}
                className="flex flex-col h-auto p-3"
              >
                <span className="text-lg mb-1">{getMoodEmoji(mood)}</span>
                <span className="text-xs">{getMoodLabel(mood)}</span>
              </Button>
            ))}
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">
              Add a note (optional)
            </label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind?"
              className="min-h-[80px]"
            />
          </div>
          
          <Button onClick={handleSaveMood} className="w-full gap-2">
            <Save className="h-4 w-4" />
            Save Mood
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodLogButton;
