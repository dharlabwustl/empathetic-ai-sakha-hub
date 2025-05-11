
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Smile, 
  Frown, 
  Zap, 
  Target, 
  Meh, 
  AlertTriangle, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface MoodSelectorProps {
  currentMood?: MoodType;
  onMoodChange: (mood: MoodType) => void;
  className?: string;
  buttonSize?: 'sm' | 'md' | 'lg';
}

const MoodSelector: React.FC<MoodSelectorProps> = ({
  currentMood,
  onMoodChange,
  className = '',
  buttonSize = 'md'
}) => {
  // Define the moods with their icons and labels
  const moods = [
    { type: MoodType.Happy, icon: Smile, label: 'Happy', color: 'text-yellow-500' },
    { type: MoodType.Tired, icon: Frown, label: 'Tired', color: 'text-blue-500' },
    { type: MoodType.Motivated, icon: Zap, label: 'Motivated', color: 'text-purple-500' },
    { type: MoodType.Focused, icon: Target, label: 'Focused', color: 'text-green-500' },
    { type: MoodType.Neutral, icon: Meh, label: 'Neutral', color: 'text-gray-500' },
    { type: MoodType.Anxious, icon: AlertCircle, label: 'Anxious', color: 'text-orange-500' },
    { type: MoodType.Stressed, icon: AlertTriangle, label: 'Stressed', color: 'text-red-500' },
    { type: MoodType.Confused, icon: HelpCircle, label: 'Confused', color: 'text-cyan-500' }
  ];
  
  // Size classes based on the buttonSize prop
  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3'
  };
  
  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {moods.map((mood) => {
        const isActive = currentMood === mood.type;
        const Icon = mood.icon;
        
        return (
          <Button
            key={mood.label}
            variant={isActive ? 'default' : 'ghost'}
            size="sm"
            className={`${sizeClasses[buttonSize]} ${isActive ? 'bg-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} rounded-full`}
            onClick={() => onMoodChange(mood.type)}
            title={mood.label}
          >
            <Icon
              className={`${isActive ? 'text-white' : mood.color} h-4 w-4 ${buttonSize === 'lg' ? 'h-5 w-5' : ''}`}
            />
            <span className="sr-only">{mood.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default MoodSelector;
