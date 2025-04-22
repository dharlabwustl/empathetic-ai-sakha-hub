
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StudyStreak } from "@/types/user/progress";

interface StudyTimeChartProps {
  studyStreak?: StudyStreak | null;
}

export const StudyTimeChart: React.FC<StudyTimeChartProps> = ({ studyStreak }) => {
  const dailyData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 2.0 },
    { day: 'Fri', hours: 2.7 },
    { day: 'Sat', hours: 4.1 },
    { day: 'Sun', hours: 1.5 },
  ];

  const weeklyTotal = studyStreak?.thisWeek || dailyData.reduce((acc, day) => acc + day.hours, 0);

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Study Time Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Weekly study hours</p>
          <p className="font-semibold">{weeklyTotal.toFixed(1)} hrs</p>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value: number) => [`${value} hours`, 'Study time']} 
                labelFormatter={(label) => `${label}:`}
              />
              <Bar 
                dataKey="hours" 
                fill="#8884d8" 
                radius={[4, 4, 0, 0]} 
                barSize={30} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyTimeChart;
