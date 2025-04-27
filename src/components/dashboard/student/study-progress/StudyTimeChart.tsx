
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface StudySubject {
  id: string;
  name: string;
  color: string;
  studyHours: number[];
}

interface StudyTimeChartProps {
  subjects: StudySubject[];
  period?: 'week' | 'month';
}

const StudyTimeChart: React.FC<StudyTimeChartProps> = ({ 
  subjects = [],
  period = 'week'
}) => {
  // If no subjects provided, use mock data
  const displaySubjects = subjects.length > 0 ? subjects : [
    { id: "phys", name: "Physics", color: "#3b82f6", studyHours: [2, 1, 0.5, 2, 3, 1, 0.5] },
    { id: "chem", name: "Chemistry", color: "#8b5cf6", studyHours: [1, 2, 1.5, 0, 1, 2, 1] },
    { id: "math", name: "Mathematics", color: "#10b981", studyHours: [1.5, 1, 2, 1, 1.5, 0, 2] },
  ];
  
  // Generate days of the week for the x-axis
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Format the data for the chart
  const chartData = days.map((day, index) => {
    const dayData: any = { day };
    displaySubjects.forEach(subject => {
      dayData[subject.name] = subject.studyHours[index] || 0;
    });
    return dayData;
  });
  
  // Calculate total study hours
  const totalHours = displaySubjects.reduce((acc, subject) => {
    const subjectTotal = Array.isArray(subject.studyHours) 
      ? subject.studyHours.reduce((sum, hours) => sum + hours, 0)
      : 0;
    return acc + subjectTotal;
  }, 0);
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      let totalDayHours = 0;
      payload.forEach((p: any) => {
        totalDayHours += p.value;
      });
      
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((p: any) => (
            <div key={p.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: p.color }}></span>
                <span>{p.name}</span>
              </div>
              <span className="font-medium ml-2">{p.value} hrs</span>
            </div>
          ))}
          <div className="text-xs font-medium mt-1 pt-1 border-t">
            Total: {totalDayHours.toFixed(1)} hrs
          </div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Study Hours</CardTitle>
          <div className="text-sm font-medium">
            {totalHours.toFixed(1)} hrs this week
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={false} axisLine={true} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              
              {displaySubjects.map(subject => (
                <Bar 
                  key={subject.id} 
                  dataKey={subject.name} 
                  stackId="a" 
                  fill={subject.color} 
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {displaySubjects.map(subject => (
            <div key={subject.id} className="flex items-center text-sm">
              <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: subject.color }}></span>
              <span>{subject.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyTimeChart;
