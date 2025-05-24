
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Brain, Check, Clock, FileText } from 'lucide-react';

interface StudyStatsSectionProps {
  subjects?: any[];
  conceptCards?: any[];
}

const StudyStatsSection: React.FC<StudyStatsSectionProps> = ({ subjects = [], conceptCards = [] }) => {
  // Mock data for stats
  const stats = [
    {
      title: 'Concepts Completed',
      value: '24 / 40',
      percentage: 60,
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
    },
    {
      title: 'Quiz Average Score',
      value: '78%',
      percentage: 78,
      icon: <Brain className="h-5 w-5 text-purple-500" />,
    },
    {
      title: 'Flashcard Recall Accuracy',
      value: '85%',
      percentage: 85,
      icon: <FileText className="h-5 w-5 text-amber-500" />,
    },
    {
      title: 'Practice Tests Completed',
      value: '12 / 20',
      percentage: 60,
      icon: <Check className="h-5 w-5 text-green-500" />,
    },
    {
      title: 'Recommended Daily Study',
      value: '3.5 hrs',
      percentage: 70,
      icon: <Clock className="h-5 w-5 text-indigo-500" />,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden border-t-4" style={{ borderTopColor: getColorForPercentage(stat.percentage) }}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 mr-3">
                  {stat.icon}
                </div>
                <h3 className="text-sm font-medium">{stat.title}</h3>
              </div>
            </div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.percentage}%</span>
            </div>
            <Progress value={stat.percentage} className="h-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Helper function to get color based on percentage
const getColorForPercentage = (percentage: number): string => {
  if (percentage >= 80) return '#10b981'; // green
  if (percentage >= 60) return '#3b82f6'; // blue
  if (percentage >= 40) return '#f59e0b'; // amber
  return '#ef4444'; // red
};

export default StudyStatsSection;
