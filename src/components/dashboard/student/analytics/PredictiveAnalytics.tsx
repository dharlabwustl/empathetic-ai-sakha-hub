
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, Clock } from 'lucide-react';

interface PredictiveAnalyticsProps {
  className?: string;
}

const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({ className }) => {
  const data = [
    { name: 'Week 1', performance: 65 },
    { name: 'Week 2', performance: 72 },
    { name: 'Week 3', performance: 78 },
    { name: 'Week 4', performance: 85 }
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Performance Prediction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="performance" 
                stroke="#8884d8" 
                strokeWidth={2}
                strokeDasharray="0"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Predicted Score</span>
            </div>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">92%</p>
          </div>
          
          <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Time to Goal</span>
            </div>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">3 weeks</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictiveAnalytics;
