
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoodType } from '@/types/user/base';
import MoodSelector from './MoodSelector';
import { Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MoodTrackerProps {
  onMoodChange?: (mood: MoodType) => void;
  currentMood?: MoodType;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({
  onMoodChange,
  currentMood = MoodType.NEUTRAL
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodType>(currentMood);
  const { toast } = useToast();
  
  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    
    if (onMoodChange) {
      onMoodChange(mood);
    }
    
    // Save to local storage
    localStorage.setItem('current_mood', mood);
    
    toast({
      title: 'Mood Updated',
      description: `Your mood has been set to ${mood.toLowerCase()}`,
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-rose-500" />
          How are you feeling today?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <MoodSelector onSelectMood={handleMoodSelect} selectedMood={selectedMood} />
        
        <div className="mt-4 flex justify-end">
          <Button size="sm" onClick={() => toast({ title: 'Mood saved!', description: 'Thank you for sharing how you feel.' })}>
            Save Mood
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
