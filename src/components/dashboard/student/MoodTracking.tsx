import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoodType } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';
import { useUserProfile } from '@/hooks/useUserProfile';

interface MoodTrackingProps {
  onMoodChange: (mood: MoodType) => void;
}

const MoodTracking: React.FC<MoodTrackingProps> = ({ onMoodChange }) => {
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);
  const { toast } = useToast();
  const { userProfile } = useUserProfile();

  useEffect(() => {
    if (userProfile?.currentMood) {
      setCurrentMood(userProfile.currentMood);
    }
  }, [userProfile?.currentMood]);

  const handleMoodSelect = (mood: MoodType) => {
    setCurrentMood(mood);
    onMoodChange(mood);

    toast({
      title: `Mood set to ${mood}`,
      description: `You're feeling ${mood.toLowerCase()}. We'll tailor your experience accordingly.`,
    });
  };

  const moodIcons = {
    [MoodType.HAPPY]: '😊',
    [MoodType.MOTIVATED]: '💪',
    [MoodType.FOCUSED]: '🧠',
    [MoodType.CALM]: '😌',
    [MoodType.TIRED]: '😴',
    [MoodType.STRESSED]: '😓',
    [MoodType.CONFUSED]: '😕',
    [MoodType.BORED]: '😒',
    [MoodType.EXCITED]: '🤩',
    [MoodType.OKAY]: '😐',
    [MoodType.SAD]: '😢',
    [MoodType.NEUTRAL]: '😐',
    [MoodType.ANXIOUS]: '😰',
    [MoodType.OVERWHELMED]: '🥴'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent className="grid w-full gap-2">
        <div className="flex justify-between">
          {Object.values(MoodType).map((mood) => (
            <button
              key={mood}
              className={`px-3 py-2 rounded-md text-sm ${currentMood === mood
                ? 'bg-secondary text-secondary-foreground'
                : 'hover:bg-muted'
                }`}
              onClick={() => handleMoodSelect(mood)}
            >
              <span className="mr-1">{moodIcons[mood]}</span>
              {mood}
            </button>
          ))}
        </div>
        {currentMood && (
          <Badge variant="secondary">
            Current Mood: {currentMood}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracking;
