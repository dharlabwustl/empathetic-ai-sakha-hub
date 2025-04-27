
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const TimeAllocationWidget = () => {
  // Mock data for time allocation
  const data = [
    { name: 'Physics', value: 90, color: '#4f46e5' },
    { name: 'Chemistry', value: 60, color: '#0ea5e9' },
    { name: 'Math', value: 120, color: '#10b981' },
    { name: 'Biology', value: 45, color: '#f59e0b' },
  ];

  const COLORS = data.map(item => item.color);
  
  // Calculate total time
  const totalMinutes = data.reduce((total, item) => total + item.value, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Study Time Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Study Time</p>
            <p className="text-2xl font-bold">{hours}h {minutes}m</p>
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => {
                  const min = value as number;
                  const hrs = Math.floor(min / 60);
                  const mins = min % 60;
                  return [`${hrs ? `${hrs}h ` : ''}${mins}m`, 'Study Time'];
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeAllocationWidget;
