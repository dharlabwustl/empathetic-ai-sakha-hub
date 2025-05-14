
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Calendar, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MoodType } from '@/types/user/base';

interface MoodInsightsProps {
  moodHistory?: Array<{
    date: string;
    mood: MoodType;
    notes?: string;
  }>;
}

const MoodInsights: React.FC<MoodInsightsProps> = ({
  moodHistory = []
}) => {
  // If no mood history is provided, use sample data
  const sampleMoodData = [
    { date: '2023-09-01', mood: MoodType.HAPPY },
    { date: '2023-09-02', mood: MoodType.MOTIVATED },
    { date: '2023-09-03', mood: MoodType.FOCUSED },
    { date: '2023-09-04', mood: MoodType.NEUTRAL },
    { date: '2023-09-05', mood: MoodType.TIRED },
    { date: '2023-09-06', mood: MoodType.ANXIOUS },
    { date: '2023-09-07', mood: MoodType.STRESSED },
  ];
  
  const data = moodHistory.length > 0 ? moodHistory : sampleMoodData;
  
  const getMoodEmoji = (mood: MoodType) => {
    switch (mood) {
      case MoodType.HAPPY: return '😃';
      case MoodType.MOTIVATED: return '💪';
      case MoodType.FOCUSED: return '🧠';
      case MoodType.CALM: return '😌';
      case MoodType.NEUTRAL: return '😐';
      case MoodType.TIRED: return '😴';
      case MoodType.ANXIOUS: return '😰';
      case MoodType.STRESSED: return '😣';
      case MoodType.SAD: return '😢';
      default: return '😐';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <LineChart className="h-5 w-5 text-indigo-500" />
            Mood Insights
          </CardTitle>
          <Button variant="outline" size="sm" className="h-8">
            <Calendar className="h-4 w-4 mr-1" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your mood patterns from the past week:
          </p>
          
          <div className="space-y-2">
            {data.slice(-5).map((entry, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{getMoodEmoji(entry.mood)}</span>
                  <span className="text-sm font-medium capitalize">
                    {entry.mood.toLowerCase()}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{entry.date}</span>
              </div>
            ))}
          </div>
          
          <div className="pt-2">
            <Button variant="link" className="w-full flex items-center justify-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 p-0">
              See detailed analysis <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodInsights;
