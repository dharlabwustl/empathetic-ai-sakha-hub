
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoodType } from '@/types/user/base';
import { getMoodEmoji, getMoodLabel, getStudyRecommendationForMood } from './mood-tracking/moodUtils';
import MoodLogButton from './MoodLogButton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MoodEntry {
  id: string;
  mood: MoodType;
  timestamp: Date;
  note?: string;
}

interface MoodTrackingProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const MoodTracking: React.FC<MoodTrackingProps> = ({ currentMood, onMoodChange }) => {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [showRecommendation, setShowRecommendation] = useState(false);

  // Mock mood history data
  useEffect(() => {
    const mockHistory: MoodEntry[] = [
      { id: '1', mood: MoodType.Happy, timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) },
      { id: '2', mood: MoodType.Motivated, timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
      { id: '3', mood: MoodType.Focused, timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
      { id: '4', mood: MoodType.Neutral, timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
      { id: '5', mood: MoodType.Tired, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
      { id: '6', mood: MoodType.Anxious, timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
      { id: '7', mood: MoodType.Stressed, timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000) },
      { id: '8', mood: MoodType.Sad, timestamp: new Date() }
    ];
    setMoodHistory(mockHistory);
  }, []);

  // Show recommendation when mood changes
  useEffect(() => {
    if (currentMood) {
      setShowRecommendation(true);
      const timer = setTimeout(() => setShowRecommendation(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [currentMood]);

  // Convert mood to numeric value for chart
  const getMoodValue = (mood: MoodType): number => {
    const moodValues: Record<MoodType, number> = {
      [MoodType.Happy]: 9,
      [MoodType.Motivated]: 8,
      [MoodType.Focused]: 8,
      [MoodType.Neutral]: 5,
      [MoodType.Tired]: 3,
      [MoodType.Anxious]: 2,
      [MoodType.Stressed]: 2,
      [MoodType.Sad]: 1,
      [MoodType.Calm]: 7,
      [MoodType.Confused]: 4,
      [MoodType.Overwhelmed]: 2,
      [MoodType.Okay]: 6,
      [MoodType.Curious]: 7
    };
    return moodValues[mood] || 5;
  };

  // Prepare chart data
  const chartData = moodHistory.slice(-7).map((entry, index) => ({
    day: `Day ${index + 1}`,
    mood: getMoodValue(entry.mood),
    moodType: entry.mood
  }));

  const handleMoodUpdate = (mood: MoodType) => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      timestamp: new Date()
    };
    
    setMoodHistory(prev => [...prev, newEntry]);
    onMoodChange?.(mood);
  };

  return (
    <div className="space-y-6">
      {/* Current Mood Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            How are you feeling today?
            <span className="text-2xl">{currentMood ? getMoodEmoji(currentMood) : '😐'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentMood ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-sm">
                    Currently feeling {getMoodLabel(currentMood)}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Updated {new Date().toLocaleTimeString()}
                  </span>
                </div>
                
                {showRecommendation && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      💡 {getStudyRecommendationForMood(currentMood)}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Track your mood to get personalized study recommendations!</p>
            )}
            
            <MoodLogButton 
              currentMood={currentMood}
              onMoodChange={handleMoodUpdate}
              className="w-full sm:w-auto"
            />
          </div>
        </CardContent>
      </Card>

      {/* Mood Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Your Mood Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[1, 9]} />
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${getMoodLabel(props.payload.moodType)} (${value})`,
                    'Mood Level'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Track your mood daily to identify patterns and optimize your study schedule.</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Mood History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Moods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {moodHistory.slice(-5).reverse().map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-2 border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{getMoodEmoji(entry.mood)}</span>
                  <span className="font-medium">{getMoodLabel(entry.mood)}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {entry.timestamp.toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracking;
