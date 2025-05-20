
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { MoodType } from '@/types/user/base';
import { useIsMobile } from '@/hooks/use-mobile';

interface MoodScoreData {
  mood: MoodType;
  studyScore: number;
  count: number;
}

interface MoodPerformanceCorrelationProps {
  moodData: MoodScoreData[];
  title?: string;
  className?: string;
}

const colorMap: Record<MoodType, string> = {
  [MoodType.HAPPY]: '#4CAF50',
  [MoodType.MOTIVATED]: '#2196F3',
  [MoodType.OKAY]: '#9E9E9E',
  [MoodType.STRESSED]: '#F44336',
  [MoodType.TIRED]: '#795548',
  [MoodType.FOCUSED]: '#673AB7',
  [MoodType.CONFUSED]: '#FF9800',
  [MoodType.BORED]: '#607D8B',
  [MoodType.EXCITED]: '#E91E63',
  [MoodType.CALM]: '#00BCD4',
  [MoodType.SAD]: '#3F51B5',
  [MoodType.ANXIOUS]: '#FF5722',
  [MoodType.OVERWHELMED]: '#9C27B0',
  [MoodType.NEUTRAL]: '#9E9E9E',
  [MoodType.CURIOUS]: '#CDDC39'
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded border">
        <p className="font-medium">{data.mood}</p>
        <p className="text-sm">Study Score: {data.studyScore}</p>
        <p className="text-sm">Frequency: {data.count} times</p>
      </div>
    );
  }
  return null;
};

export const MoodPerformanceCorrelation: React.FC<MoodPerformanceCorrelationProps> = ({
  moodData,
  title = "Mood & Performance Correlation",
  className
}) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className={isMobile ? "text-base" : ""}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="category" 
              dataKey="mood" 
              name="Mood" 
              tick={{ fontSize: isMobile ? 10 : 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              type="number" 
              dataKey="studyScore" 
              name="Performance" 
              tick={{ fontSize: isMobile ? 10 : 12 }} 
              label={{ 
                value: 'Study Score', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fontSize: isMobile ? 10 : 12 }
              }} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Scatter 
              name="Mood-Performance Correlation" 
              data={moodData} 
              fill="#8884d8"
              shape="circle"
              fillOpacity={0.7}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MoodPerformanceCorrelation;
