import React, { useState, useEffect } from 'react';
import { Smile, Zap, Target, Sun, Battery, Wind, AlertTriangle, CloudRain } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from './mood-tracking/moodUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface MoodTrackingProps {
  onMoodChange: (mood: MoodType) => void;
}

const MoodTracking: React.FC<MoodTrackingProps> = ({ onMoodChange }) => {
  const [mood, setMood] = useState<MoodType | undefined>(undefined);
  const { toast } = useToast();

  useEffect(() => {
    const savedMood = getCurrentMoodFromLocalStorage();
    if (savedMood) {
      setMood(savedMood);
    }
  }, []);

  const moodOptions = [
    { value: MoodType.HAPPY, label: 'Happy', icon: <Smile className="h-4 w-4" /> },
    { value: MoodType.MOTIVATED, label: 'Motivated', icon: <Zap className="h-4 w-4" /> },
    { value: MoodType.FOCUSED, label: 'Focused', icon: <Target className="h-4 w-4" /> },
    { value: MoodType.NEUTRAL, label: 'Neutral', icon: <Sun className="h-4 w-4" /> },
    { value: MoodType.TIRED, label: 'Tired', icon: <Battery className="h-4 w-4" /> },
    { value: MoodType.ANXIOUS, label: 'Anxious', icon: <Wind className="h-4 w-4" /> },
    { value: MoodType.STRESSED, label: 'Stressed', icon: <AlertTriangle className="h-4 w-4" /> },
    { value: MoodType.SAD, label: 'Sad', icon: <CloudRain className="h-4 w-4" /> }
  ];

  const handleMoodChange = (newMood: MoodType) => {
    setMood(newMood);
    storeMoodInLocalStorage(newMood);
    onMoodChange(newMood);
    
    toast({
      title: "Mood updated!",
      description: `You're feeling ${newMood.toLowerCase()} today.`,
    });
  };

  const moodMap = {
    [MoodType.HAPPY]: { icon: <Smile className="h-5 w-5" />, color: 'bg-green-500' },
    [MoodType.MOTIVATED]: { icon: <Zap className="h-5 w-5" />, color: 'bg-yellow-500' },
    [MoodType.FOCUSED]: { icon: <Target className="h-5 w-5" />, color: 'bg-blue-500' },
    [MoodType.NEUTRAL]: { icon: <Sun className="h-5 w-5" />, color: 'bg-gray-500' },
    [MoodType.TIRED]: { icon: <Battery className="h-5 w-5" />, color: 'bg-orange-500' },
    [MoodType.ANXIOUS]: { icon: <Wind className="h-5 w-5" />, color: 'bg-indigo-500' },
    [MoodType.STRESSED]: { icon: <AlertTriangle className="h-5 w-5" />, color: 'bg-red-500' },
    [MoodType.SAD]: { icon: <CloudRain className="h-5 w-5" />, color: 'bg-gray-700' }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>How are you feeling today?</CardTitle>
        <CardDescription>Select your current mood to personalize your study experience.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2">
          {moodOptions.map((option) => (
            <Button
              key={option.value}
              variant="outline"
              className={`flex flex-col items-center justify-center p-3 rounded-md text-sm ${mood === option.value ? 'bg-secondary text-secondary-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}
              onClick={() => handleMoodChange(option.value)}
            >
              {option.icon}
              <span className="mt-1">{option.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTracking;
