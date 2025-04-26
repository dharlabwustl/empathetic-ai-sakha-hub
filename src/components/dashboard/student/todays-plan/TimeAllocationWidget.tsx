
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface TimeAllocationProps {
  conceptsTime: number;
  flashcardsTime: number;
  examsTime: number;
  className?: string;
}

const TimeAllocationWidget: React.FC<TimeAllocationProps> = ({
  conceptsTime,
  flashcardsTime,
  examsTime,
  className
}) => {
  const totalTime = conceptsTime + flashcardsTime + examsTime;
  
  if (totalTime === 0) return null;
  
  const data = [
    { name: 'Concepts', value: conceptsTime, color: '#8b5cf6' },
    { name: 'Flashcards', value: flashcardsTime, color: '#3b82f6' },
    { name: 'Practice Exams', value: examsTime, color: '#10b981' },
  ];

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
    }
    return `${mins}m`;
  };

  return (
    <Card className={`overflow-hidden ${className || ''}`}>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-3">Study Time Allocation</h3>
        
        <div className="flex items-center">
          <div className="w-1/2 h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatTime(value)} 
                  labelFormatter={() => ''}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="w-1/2">
            <div className="space-y-2 text-xs">
              {data.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: item.color }}></div>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{formatTime(item.value)}</span>
                </div>
              ))}
              <div className="pt-1 flex items-center justify-between border-t text-xs font-medium">
                <span>Total</span>
                <span>{formatTime(totalTime)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeAllocationWidget;
