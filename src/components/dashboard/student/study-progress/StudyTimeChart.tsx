
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const StudyTimeChart = () => {
  // Mock data for study time
  const data = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 4.0 },
    { day: 'Fri', hours: 2.7 },
    { day: 'Sat', hours: 5.1 },
    { day: 'Sun', hours: 3.5 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Study Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`${value} hrs`, 'Study Time']}
              labelFormatter={(label) => `${label}`}
            />
            <Bar dataKey="hours" fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StudyTimeChart;
