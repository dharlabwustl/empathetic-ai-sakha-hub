
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
  // Define the moods with their icons, labels, and recommendation messages
  const moods = [
    { 
      type: MoodType.Happy, 
      icon: Smile, 
      label: 'Happy', 
      color: 'text-yellow-500',
      message: "Great that you're feeling happy! It's a perfect time to tackle some challenging topics."
    },
    { 
      type: MoodType.Tired, 
      icon: Frown, 
      label: 'Tired', 
      color: 'text-blue-500',
      message: "I see you're feeling tired. Let's focus on lighter review sessions and take regular breaks."
    },
    { 
      type: MoodType.Motivated, 
      icon: Zap, 
      label: 'Motivated', 
      color: 'text-purple-500',
      message: "You're motivated! Perfect time to make progress on your most important subjects."
    },
    { 
      type: MoodType.Focused, 
      icon: Target, 
      label: 'Focused', 
      color: 'text-green-500',
      message: "Focused mode activated! Let's dive into some concept quizzes to maximize your concentration."
    },
    { 
      type: MoodType.Neutral, 
      icon: Meh, 
      label: 'Neutral', 
      color: 'text-gray-500',
      message: "Feeling neutral today. A balanced study session with varied activities might work well."
    },
    { 
      type: MoodType.Anxious, 
      icon: AlertCircle, 
      label: 'Anxious', 
      color: 'text-orange-500',
      message: "I notice you're feeling anxious. Let's try some confidence-building review of topics you know well."
    },
    { 
      type: MoodType.Stressed, 
      icon: AlertTriangle, 
      label: 'Stressed', 
      color: 'text-red-500',
      message: "Stress detected. Consider a lighter study load today with breaks and some mindfulness exercises."
    },
    { 
      type: MoodType.Confused, 
      icon: HelpCircle, 
      label: 'Confused', 
      color: 'text-cyan-500',
      message: "Feeling confused is normal during learning. Let's review some fundamentals to build clarity."
    }
  ];
  
  // Size classes based on the buttonSize prop
  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3'
  };
  
  // Function to handle mood selection and trigger voice assistant
  const handleMoodChange = (mood: MoodType) => {
    onMoodChange(mood);
    
    // Find the selected mood's message
    const selectedMood = moods.find(m => m.type === mood);
    if (selectedMood) {
      // Trigger voice assistant event with the mood's message
      const voiceEvent = new CustomEvent('voice-assistant-speak', {
        detail: {
          message: `Noted you're feeling ${selectedMood.label.toLowerCase()} today. ${selectedMood.message}`
        }
      });
      document.dispatchEvent(voiceEvent);
    }
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
            onClick={() => handleMoodChange(mood.type)}
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
