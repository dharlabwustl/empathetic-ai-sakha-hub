
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

interface StudyTimeChartProps {
  dailyStudyTime?: Record<string, number>;
  weeklyTotal?: number;
}

const StudyTimeChart: React.FC<StudyTimeChartProps> = ({ 
  dailyStudyTime = {}, 
  weeklyTotal = 0
}) => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Transform data for the chart
  const chartData = daysOfWeek.map(day => ({
    day,
    minutes: dailyStudyTime[day] || 0
  }));

  // Calculate total study time if weeklyTotal is not provided
  const calculatedTotal = Object.values(dailyStudyTime).length > 0 ? 
    Object.values(dailyStudyTime).reduce((a: number, b: number) => a + b, 0) : 
    0;
  
  const totalTime = weeklyTotal || calculatedTotal;
  
  // Format time for display
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${mins}m`;
    }
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-md">
          <p className="font-medium">{payload[0].payload.day}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Study time: {formatTime(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="font-medium">Study Time Distribution</h3>
        <div className="text-sm text-muted-foreground">
          Total: <span className="font-medium">{formatTime(totalTime)}</span>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis 
              label={{ 
                value: 'Minutes', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="minutes" name="Study Time" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudyTimeChart;
