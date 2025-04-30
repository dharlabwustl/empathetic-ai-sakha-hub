
import React from 'react';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { Smile, Heart, Zap, Meh, Frown, AlertCircle, Clock, Coffee } from 'lucide-react';

interface MoodSelectorProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const moods = [
  { type: MoodType.Happy, icon: <Smile className="h-5 w-5" />, label: 'Happy' },
  { type: MoodType.Motivated, icon: <Zap className="h-5 w-5" />, label: 'Motivated' },
  { type: MoodType.Focused, icon: <Heart className="h-5 w-5" />, label: 'Focused' },
  { type: MoodType.Neutral, icon: <Meh className="h-5 w-5" />, label: 'Neutral' },
  { type: MoodType.Tired, icon: <Coffee className="h-5 w-5" />, label: 'Tired' },
  { type: MoodType.Anxious, icon: <Clock className="h-5 w-5" />, label: 'Anxious' },
  { type: MoodType.Stressed, icon: <AlertCircle className="h-5 w-5" />, label: 'Stressed' },
  { type: MoodType.Sad, icon: <Frown className="h-5 w-5" />, label: 'Sad' }
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ currentMood, onMoodChange }) => {
  if (!onMoodChange) return null;
  
  return (
    <div className="flex flex-wrap gap-2">
      {moods.map((mood) => (
        <Button
          key={mood.type}
          size="sm"
          variant={currentMood === mood.type ? "default" : "outline"}
          onClick={() => onMoodChange(mood.type)}
          className="flex items-center gap-1.5"
        >
          {mood.icon}
          <span>{mood.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;
