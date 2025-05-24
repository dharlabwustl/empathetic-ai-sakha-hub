
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoodType } from '@/types/user/base';
import { TrendingUp, Calendar } from 'lucide-react';

const moodOptions = [
  { mood: MoodType.HAPPY, emoji: '😊', label: 'Happy' },
  { mood: MoodType.MOTIVATED, emoji: '💪', label: 'Motivated' },
  { mood: MoodType.FOCUSED, emoji: '🎯', label: 'Focused' },
  { mood: MoodType.TIRED, emoji: '😴', label: 'Tired' },
  { mood: MoodType.STRESSED, emoji: '😰', label: 'Stressed' },
  { mood: MoodType.ANXIOUS, emoji: '😨', label: 'Anxious' },
  { mood: MoodType.CONFUSED, emoji: '🤔', label: 'Confused' },
  { mood: MoodType.OVERWHELMED, emoji: '😵', label: 'Overwhelmed' },
  { mood: MoodType.CALM, emoji: '😌', label: 'Calm' },
  { mood: MoodType.CONFIDENT, emoji: '😎', label: 'Confident' },
  { mood: MoodType.EXCITED, emoji: '🤩', label: 'Excited' },
  { mood: MoodType.NEUTRAL, emoji: '😐', label: 'Neutral' },
  { mood: MoodType.OKAY, emoji: '👌', label: 'Okay' },
  { mood: MoodType.SAD, emoji: '😢', label: 'Sad' },
  { mood: MoodType.CURIOUS, emoji: '🧐', label: 'Curious' }
];

interface MoodEntry {
  date: string;
  mood: MoodType;
  note?: string;
}

interface MoodTrackingProps {
  currentMood?: MoodType;
  onMoodUpdate: (mood: MoodType) => void;
}

const MoodTracking: React.FC<MoodTrackingProps> = ({ currentMood, onMoodUpdate }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(currentMood || null);
  const [moodHistory] = useState<MoodEntry[]>([
    { date: '2024-01-15', mood: MoodType.MOTIVATED },
    { date: '2024-01-14', mood: MoodType.FOCUSED },
    { date: '2024-01-13', mood: MoodType.HAPPY },
    { date: '2024-01-12', mood: MoodType.TIRED },
    { date: '2024-01-11', mood: MoodType.MOTIVATED }
  ]);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    onMoodUpdate(mood);
  };

  const getMoodEmoji = (mood: MoodType) => {
    const option = moodOptions.find(opt => opt.mood === mood);
    return option ? option.emoji : '😐';
  };

  const getMoodLabel = (mood: MoodType) => {
    const option = moodOptions.find(opt => opt.mood === mood);
    return option ? option.label : 'Unknown';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            How are you feeling today?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
            {moodOptions.map((option) => (
              <Button
                key={option.mood}
                variant={selectedMood === option.mood ? "default" : "outline"}
                size="sm"
                onClick={() => handleMoodSelect(option.mood)}
                className="flex flex-col items-center p-3 h-auto"
              >
                <span className="text-xl mb-1">{option.emoji}</span>
                <span className="text-xs text-center">{option.label}</span>
              </Button>
            ))}
          </div>
          
          {selectedMood && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Great! Your mood has been recorded. Based on how you're feeling, we'll suggest 
                appropriate study activities and content.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Mood History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {moodHistory.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                  <div>
                    <p className="text-sm font-medium">{getMoodLabel(entry.mood)}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {getMoodLabel(entry.mood)}
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Insight:</strong> You've been mostly motivated and focused this week! 
              Keep up the great work.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracking;
