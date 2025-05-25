
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smile, Meh, Frown, Calendar } from 'lucide-react';

interface MoodEntry {
  date: string;
  mood: 'happy' | 'neutral' | 'sad';
  note?: string;
}

interface MoodTimelineProps {
  className?: string;
}

const MoodTimeline: React.FC<MoodTimelineProps> = ({ className }) => {
  const moodEntries: MoodEntry[] = [
    { date: '2024-01-15', mood: 'happy', note: 'Great study session!' },
    { date: '2024-01-14', mood: 'neutral', note: 'Regular day' },
    { date: '2024-01-13', mood: 'sad', note: 'Struggled with concepts' }
  ];

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy':
        return <Smile className="h-4 w-4 text-green-500" />;
      case 'neutral':
        return <Meh className="h-4 w-4 text-yellow-500" />;
      case 'sad':
        return <Frown className="h-4 w-4 text-red-500" />;
      default:
        return <Meh className="h-4 w-4 text-gray-500" />;
    }
  };

  const getMoodTheme = (mood: string) => {
    switch (mood) {
      case 'happy':
        return { background: 'bg-green-50 dark:bg-green-950', text: 'text-green-700 dark:text-green-300' };
      case 'neutral':
        return { background: 'bg-yellow-50 dark:bg-yellow-950', text: 'text-yellow-700 dark:text-yellow-300' };
      case 'sad':
        return { background: 'bg-red-50 dark:bg-red-950', text: 'text-red-700 dark:text-red-300' };
      default:
        return { background: 'bg-gray-50 dark:bg-gray-950', text: 'text-gray-700 dark:text-gray-300' };
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Mood Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {moodEntries.map((entry, index) => {
            const theme = getMoodTheme(entry.mood);
            return (
              <div 
                key={index}
                className={`p-3 rounded-lg border ${theme.background}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getMoodIcon(entry.mood)}
                    <span className={`text-sm font-medium ${theme.text}`}>
                      {entry.date}
                    </span>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {entry.mood}
                  </Badge>
                </div>
                {entry.note && (
                  <p className={`text-sm ${theme.text}`}>{entry.note}</p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTimeline;
