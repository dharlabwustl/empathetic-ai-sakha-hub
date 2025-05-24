
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, TrendingUp, Calendar } from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface MoodEntry {
  date: string;
  mood: MoodType;
  note?: string;
}

const MoodTracking: React.FC = () => {
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);
  const [moodHistory] = useState<MoodEntry[]>([
    { date: '2024-01-15', mood: MoodType.Happy, note: 'Great progress today!' },
    { date: '2024-01-14', mood: MoodType.Motivated, note: 'Ready to tackle new challenges' },
    { date: '2024-01-13', mood: MoodType.Focused, note: 'Deep work session' },
    { date: '2024-01-12', mood: MoodType.Tired, note: 'Long study day' },
    { date: '2024-01-11', mood: MoodType.Motivated, note: 'Excited about learning' }
  ]);

  const getMoodEmoji = (mood: MoodType) => {
    const emojiMap: Record<MoodType, string> = {
      [MoodType.Happy]: '😊',
      [MoodType.Motivated]: '💪',
      [MoodType.Focused]: '🎯',
      [MoodType.Tired]: '😴',
      [MoodType.Anxious]: '😰',
      [MoodType.Neutral]: '😐',
      [MoodType.Stressed]: '😫',
      [MoodType.Sad]: '😢',
      [MoodType.Calm]: '😌',
      [MoodType.Confused]: '🤔',
      [MoodType.Overwhelmed]: '🤯',
      [MoodType.Okay]: '👍',
      [MoodType.Curious]: '🤓'
    };
    return emojiMap[mood] || '😐';
  };

  const getMoodColor = (mood: MoodType) => {
    const colorMap: Record<MoodType, string> = {
      [MoodType.Happy]: 'bg-green-100 text-green-800',
      [MoodType.Motivated]: 'bg-blue-100 text-blue-800',
      [MoodType.Focused]: 'bg-purple-100 text-purple-800',
      [MoodType.Tired]: 'bg-orange-100 text-orange-800',
      [MoodType.Anxious]: 'bg-red-100 text-red-800',
      [MoodType.Neutral]: 'bg-gray-100 text-gray-800',
      [MoodType.Stressed]: 'bg-red-100 text-red-800',
      [MoodType.Sad]: 'bg-gray-100 text-gray-800',
      [MoodType.Calm]: 'bg-green-100 text-green-800',
      [MoodType.Confused]: 'bg-yellow-100 text-yellow-800',
      [MoodType.Overwhelmed]: 'bg-red-100 text-red-800',
      [MoodType.Okay]: 'bg-gray-100 text-gray-800',
      [MoodType.Curious]: 'bg-blue-100 text-blue-800'
    };
    return colorMap[mood] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Mood Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Current Mood Display */}
            {currentMood && (
              <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{getMoodEmoji(currentMood)}</div>
                  <div>
                    <h3 className="font-semibold">Current Mood</h3>
                    <Badge className={getMoodColor(currentMood)}>
                      {currentMood}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Mood History */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Recent Mood History
              </h3>
              <div className="space-y-2">
                {moodHistory.slice(0, 5).map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getMoodEmoji(entry.mood)}</span>
                      <div>
                        <Badge className={getMoodColor(entry.mood)} size="sm">
                          {entry.mood}
                        </Badge>
                        {entry.note && (
                          <p className="text-sm text-gray-600 mt-1">{entry.note}</p>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{entry.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mood Analytics */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <TrendingUp className="h-6 w-6 mx-auto text-green-500 mb-2" />
                <div className="text-lg font-bold text-green-600">Positive</div>
                <div className="text-xs text-gray-500">Overall trend</div>
              </div>
              <div className="text-center">
                <Calendar className="h-6 w-6 mx-auto text-blue-500 mb-2" />
                <div className="text-lg font-bold">7 days</div>
                <div className="text-xs text-gray-500">Tracking streak</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracking;
