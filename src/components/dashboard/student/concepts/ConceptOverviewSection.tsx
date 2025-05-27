
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Brain, BookOpen, Clock, Target, TrendingUp, Lightbulb } from 'lucide-react';

interface SubjectProgress {
  name: string;
  completed: number;
  total: number;
  studyTime: number;
  efficiency: number;
  color: string;
}

interface ConceptOverviewSectionProps {
  className?: string;
}

const ConceptOverviewSection: React.FC<ConceptOverviewSectionProps> = ({ className }) => {
  const neetSubjects: SubjectProgress[] = [
    {
      name: 'Physics',
      completed: 45,
      total: 62,
      studyTime: 120,
      efficiency: 85,
      color: 'blue'
    },
    {
      name: 'Chemistry',
      completed: 38,
      total: 58,
      studyTime: 95,
      efficiency: 78,
      color: 'green'
    },
    {
      name: 'Biology',
      completed: 52,
      total: 71,
      studyTime: 140,
      efficiency: 92,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getProgressColor = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const totalCompleted = neetSubjects.reduce((sum, subject) => sum + subject.completed, 0);
  const totalConcepts = neetSubjects.reduce((sum, subject) => sum + subject.total, 0);
  const averageEfficiency = Math.round(neetSubjects.reduce((sum, subject) => sum + subject.efficiency, 0) / neetSubjects.length);
  const totalStudyTime = neetSubjects.reduce((sum, subject) => sum + subject.studyTime, 0);

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">NEET Concepts Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">Track your progress across Physics, Chemistry, and Biology</p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {Math.round((totalCompleted / totalConcepts) * 100)}% Complete
        </Badge>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-full">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600">Total Concepts</p>
                <p className="text-xl font-bold text-blue-800">{totalCompleted}/{totalConcepts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-full">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600">Study Time</p>
                <p className="text-xl font-bold text-green-800">{totalStudyTime}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-full">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600">Avg Efficiency</p>
                <p className="text-xl font-bold text-purple-800">{averageEfficiency}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-full">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600">Weekly Goal</p>
                <p className="text-xl font-bold text-orange-800">85%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {neetSubjects.map((subject) => (
          <Card key={subject.name} className={`${getColorClasses(subject.color)} border-2`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{subject.name}</span>
                <Brain className="h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Concepts Mastered</span>
                  <span>{subject.completed}/{subject.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(subject.color)}`}
                    style={{ width: `${(subject.completed / subject.total) * 100}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Study Time</p>
                  <p className="font-semibold">{subject.studyTime}h</p>
                </div>
                <div>
                  <p className="text-gray-600">Efficiency</p>
                  <p className="font-semibold">{subject.efficiency}%</p>
                </div>
              </div>

              {/* Action Button */}
              <Button size="sm" className="w-full mt-3">
                Continue Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Suggestions */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Lightbulb className="h-5 w-5" />
            Smart AI Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg border border-yellow-200">
              <p className="text-sm font-medium text-gray-800">Focus Area: Physics - Mechanics</p>
              <p className="text-xs text-gray-600 mt-1">Your weakest topic with only 60% completion. Spend extra 30 minutes today.</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-yellow-200">
              <p className="text-sm font-medium text-gray-800">Revision Needed: Chemistry - Organic Reactions</p>
              <p className="text-xs text-gray-600 mt-1">Last studied 5 days ago. Quick revision recommended to maintain retention.</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-yellow-200">
              <p className="text-sm font-medium text-gray-800">Strength: Biology - Human Physiology</p>
              <p className="text-xs text-gray-600 mt-1">Great progress! Move to advanced topics to maximize your advantage.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptOverviewSection;
