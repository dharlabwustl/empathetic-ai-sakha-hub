
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceData {
  date: string;
  score: number;
  target: number;
}

interface PerformanceChartProps {
  data?: PerformanceData[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data = [] }) => {
  const defaultData: PerformanceData[] = [
    { date: 'Mon', score: 75, target: 80 },
    { date: 'Tue', score: 82, target: 80 },
    { date: 'Wed', score: 78, target: 80 },
    { date: 'Thu', score: 85, target: 80 },
    { date: 'Fri', score: 88, target: 80 },
    { date: 'Sat', score: 90, target: 80 },
    { date: 'Sun', score: 87, target: 80 }
  ];

  const chartData = data.length > 0 ? data : defaultData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
