
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Clock } from 'lucide-react';

interface TimeAllocationProps {
  data: {
    concepts: number;
    flashcards: number;
    exams: number;
    total: number;
  }
}

export function TimeAllocationChart({ data }: TimeAllocationProps) {
  const chartData = [
    { name: 'Concepts', value: data.concepts, color: '#3b82f6' },  // blue
    { name: 'Flashcards', value: data.flashcards, color: '#f59e0b' }, // amber
    { name: 'Exams', value: data.exams, color: '#8b5cf6' }, // violet
  ];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="text-emerald-500" size={18} />
          Time Allocation
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.total > 0 ? (
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value} min`, 'Time']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-56 flex items-center justify-center text-muted-foreground">
            No time data available
          </div>
        )}
        <div className="mt-3 text-sm text-center">
          <p>Total: <span className="font-medium">{data.total} minutes</span></p>
        </div>
      </CardContent>
    </Card>
  );
}
