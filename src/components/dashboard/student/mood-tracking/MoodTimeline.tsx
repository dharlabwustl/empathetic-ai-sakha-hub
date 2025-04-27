
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface MoodDataPoint {
  date: string;
  mood: number;
  moodLabel: string;
  note?: string;
}

interface MoodTheme {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  textColor: string;
  colors?: {
    line: string;
    dot: string;
    grid: string;
  };
}

interface MoodTimelineProps {
  moodData: MoodDataPoint[];
  theme?: MoodTheme;
}

const defaultTheme: MoodTheme = {
  name: 'default',
  primary: '#8B5CF6',
  secondary: '#C4B5FD',
  background: '#F5F3FF',
  textColor: '#4C1D95',
  colors: {
    line: '#8B5CF6',
    dot: '#6D28D9',
    grid: '#E5E7EB'
  }
};

const MoodTimeline: React.FC<MoodTimelineProps> = ({ 
  moodData,
  theme = defaultTheme
}) => {
  // Ensure theme.colors exists
  const colors = theme.colors || defaultTheme.colors;
  
  const chartData = moodData.map(point => ({
    date: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    mood: point.mood,
    moodLabel: point.moodLabel,
    note: point.note
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="text-sm text-gray-700">{`${label}`}</p>
          <p className="text-sm font-medium">{`Mood: ${payload[0].payload.moodLabel}`}</p>
          {payload[0].payload.note && (
            <p className="text-xs text-gray-600 max-w-[200px]">{payload[0].payload.note}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Mood Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={{ stroke: colors.grid }}
              />
              <YAxis 
                domain={[1, 5]} 
                tick={false} 
                axisLine={false} 
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke={colors.line}
                strokeWidth={2}
                dot={{ fill: colors.dot, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTimeline;
