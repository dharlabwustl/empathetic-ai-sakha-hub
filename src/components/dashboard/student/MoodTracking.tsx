
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MoodType } from '@/types/user/base';
import { Heart, Brain, Calendar, TrendingUp } from 'lucide-react';

interface MoodTrackingProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  moodHistory?: Array<{ mood: MoodType; timestamp: Date }>;
}

const MoodTracking: React.FC<MoodTrackingProps> = ({
  currentMood,
  onMoodChange,
  moodHistory = []
}) => {
  const [showMoodSelector, setShowMoodSelector] = useState(false);

  const moodOptions = [
    { type: MoodType.Happy, emoji: '😊', label: 'Happy', color: 'bg-yellow-100 text-yellow-800' },
    { type: MoodType.Motivated, emoji: '💪', label: 'Motivated', color: 'bg-green-100 text-green-800' },
    { type: MoodType.Focused, emoji: '🎯', label: 'Focused', color: 'bg-blue-100 text-blue-800' },
    { type: MoodType.Neutral, emoji: '😐', label: 'Neutral', color: 'bg-gray-100 text-gray-800' },
    { type: MoodType.Tired, emoji: '😴', label: 'Tired', color: 'bg-orange-100 text-orange-800' },
    { type: MoodType.Anxious, emoji: '😰', label: 'Anxious', color: 'bg-purple-100 text-purple-800' },
    { type: MoodType.Stressed, emoji: '😫', label: 'Stressed', color: 'bg-red-100 text-red-800' },
    { type: MoodType.Sad, emoji: '😢', label: 'Sad', color: 'bg-indigo-100 text-indigo-800' }
  ];

  const handleMoodSelect = (mood: MoodType) => {
    onMoodChange?.(mood);
    setShowMoodSelector(false);
  };

  const currentMoodData = moodOptions.find(m => m.type === currentMood);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-pink-500" />
          Mood Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentMood && currentMoodData && (
          <div className="text-center">
            <div className="text-4xl mb-2">{currentMoodData.emoji}</div>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${currentMoodData.color}`}>
              Feeling {currentMoodData.label}
            </div>
          </div>
        )}

        {!showMoodSelector ? (
          <Button 
            onClick={() => setShowMoodSelector(true)}
            className="w-full"
            variant="outline"
          >
            {currentMood ? 'Update Mood' : 'Set Your Mood'}
          </Button>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {moodOptions.map((mood) => (
              <Button
                key={mood.type}
                variant="outline"
                onClick={() => handleMoodSelect(mood.type)}
                className="flex flex-col items-center p-3 h-auto"
              >
                <span className="text-xl mb-1">{mood.emoji}</span>
                <span className="text-xs">{mood.label}</span>
              </Button>
            ))}
          </div>
        )}

        {moodHistory.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Recent Moods</h4>
            <div className="flex space-x-2">
              {moodHistory.slice(0, 7).map((entry, index) => {
                const moodData = moodOptions.find(m => m.type === entry.mood);
                return (
                  <div key={index} className="text-center">
                    <div className="text-lg">{moodData?.emoji || '😐'}</div>
                    <div className="text-xs text-gray-500">
                      {entry.timestamp.getDate()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracking;
