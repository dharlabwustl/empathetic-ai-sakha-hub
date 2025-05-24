import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { Heart, TrendingUp } from 'lucide-react';

interface MoodTrackingProps {
  currentMood?: MoodType;
  onMoodChange: (mood: MoodType) => void;
}

const MoodTracking: React.FC<MoodTrackingProps> = ({ currentMood, onMoodChange }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>(currentMood);

  const moodOptions = [
    { mood: MoodType.Happy, emoji: '😊', color: 'bg-yellow-100' },
    { mood: MoodType.Motivated, emoji: '🔥', color: 'bg-orange-100' },
    { mood: MoodType.Focused, emoji: '🎯', color: 'bg-blue-100' },
    { mood: MoodType.Neutral, emoji: '😐', color: 'bg-gray-100' },
    { mood: MoodType.Tired, emoji: '😴', color: 'bg-purple-100' },
    { mood: MoodType.Anxious, emoji: '😰', color: 'bg-red-100' },
    { mood: MoodType.Stressed, emoji: '😫', color: 'bg-red-200' },
    { mood: MoodType.Sad, emoji: '😢', color: 'bg-blue-200' }
  ];

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    onMoodChange(mood);
  };

  const weeklyMoodData = [
    { day: 'Mon', mood: MoodType.Happy },
    { day: 'Tue', mood: MoodType.Motivated },
    { day: 'Wed', mood: MoodType.Focused },
    { day: 'Thu', mood: MoodType.Neutral },
    { day: 'Fri', mood: MoodType.Tired },
    { day: 'Sat', mood: MoodType.Anxious },
    { day: 'Sun', mood: MoodType.Stressed },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Mood Tracking</CardTitle>
        <Heart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">How are you feeling today?</h3>
          <div className="flex gap-2">
            {moodOptions.map((option) => (
              <Button
                key={option.mood}
                variant={selectedMood === option.mood ? 'default' : 'outline'}
                className={`w-12 h-12 rounded-full flex items-center justify-center ${option.color} text-gray-800`}
                onClick={() => handleMoodSelect(option.mood)}
              >
                <span aria-label={option.mood} role="img">
                  {option.emoji}
                </span>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Weekly Mood Trend</h3>
          <div className="flex items-center justify-between">
            {weeklyMoodData.map((item) => (
              <div key={item.day} className="text-center">
                <div className="text-xs text-muted-foreground">{item.day}</div>
                <span aria-label={item.mood} role="img">
                  {moodOptions.find((option) => option.mood === item.mood)?.emoji || '😐'}
                </span>
              </div>
            ))}
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTracking;
