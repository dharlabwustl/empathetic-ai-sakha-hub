
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubjectProgress, StudyStreak } from "@/types/user";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';

interface StudyTimeChartProps {
  subjectProgress: SubjectProgress;
  studyStreak: StudyStreak;
}

const StudyTimeChart: React.FC<StudyTimeChartProps> = ({ subjectProgress, studyStreak }) => {
  // Mock data for the chart
  const chartData = [
    { name: 'Mon', hours: studyStreak.thisWeek[0] },
    { name: 'Tue', hours: studyStreak.thisWeek[1] },
    { name: 'Wed', hours: studyStreak.thisWeek[2] },
    { name: 'Thu', hours: studyStreak.thisWeek[3] },
    { name: 'Fri', hours: studyStreak.thisWeek[4] },
    { name: 'Sat', hours: studyStreak.thisWeek[5] },
    { name: 'Sun', hours: studyStreak.thisWeek[6] },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Study Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="hours" fill="#0ea5e9" name="Hours Studied" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StudyTimeChart;
