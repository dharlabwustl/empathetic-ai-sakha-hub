
import { useState } from 'react';
import { MoodType } from '@/types/user/base';
import { Button } from '@/components/ui/button';
import { 
  Smile, Frown, Meh, Zap, Coffee, 
  Heart, AlertCircle, BookOpen, Moon
} from 'lucide-react';

interface MoodSelectorProps {
  onMoodSelected: (mood: MoodType) => void;
  currentMood?: MoodType;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelected, currentMood }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType>(
    currentMood || MoodType.Happy
  );
  
  const moods = [
    { type: MoodType.Happy, icon: <Smile className="mr-2 h-4 w-4" />, label: 'Happy' },
    { type: MoodType.Sad, icon: <Frown className="mr-2 h-4 w-4" />, label: 'Sad' },
    { type: MoodType.Calm, icon: <Meh className="mr-2 h-4 w-4" />, label: 'Calm' },
    { type: MoodType.Motivated, icon: <Zap className="mr-2 h-4 w-4" />, label: 'Motivated' },
    { type: MoodType.Tired, icon: <Coffee className="mr-2 h-4 w-4" />, label: 'Tired' },
    { type: MoodType.Focused, icon: <BookOpen className="mr-2 h-4 w-4" />, label: 'Focused' },
    { type: MoodType.Stressed, icon: <AlertCircle className="mr-2 h-4 w-4" />, label: 'Stressed' },
    { type: MoodType.Overwhelmed, icon: <AlertCircle className="mr-2 h-4 w-4" />, label: 'Overwhelmed' }
  ];
  
  const handleSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    onMoodSelected(mood);
  };
  
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {moods.map((mood) => (
        <Button
          key={mood.label}
          variant={selectedMood === mood.type ? "default" : "outline"}
          size="sm"
          onClick={() => handleSelect(mood.type)}
          className="flex items-center"
        >
          {mood.icon}
          {mood.label}
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;
