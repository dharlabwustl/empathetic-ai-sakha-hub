
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Clock, BookOpen, Award } from 'lucide-react';

interface StudyStatsSectionProps {
  stats: {
    totalHours: number;
    weeklyHours: number;
    conceptsCompleted: number;
    averageScore: number;
  };
}

const StudyStatsSection: React.FC<StudyStatsSectionProps> = ({ stats }) => {
  const statItems = [
    {
      icon: Clock,
      label: 'Total Study Hours',
      value: stats.totalHours,
      suffix: 'hrs',
      color: 'text-blue-600'
    },
    {
      icon: BarChart,
      label: 'This Week',
      value: stats.weeklyHours,
      suffix: 'hrs',
      color: 'text-green-600'
    },
    {
      icon: BookOpen,
      label: 'Concepts Completed',
      value: stats.conceptsCompleted,
      suffix: '',
      color: 'text-purple-600'
    },
    {
      icon: Award,
      label: 'Average Score',
      value: stats.averageScore,
      suffix: '%',
      color: 'text-amber-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((item, index) => (
            <div key={index} className="text-center">
              <item.icon className={`h-8 w-8 mx-auto mb-2 ${item.color}`} />
              <div className="text-2xl font-bold">{item.value}{item.suffix}</div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyStatsSection;
