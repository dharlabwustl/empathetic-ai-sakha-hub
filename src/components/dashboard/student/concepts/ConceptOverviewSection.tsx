
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Brain, BookOpen, Clock, Target, TrendingUp, Lightbulb, Award, CheckCircle } from 'lucide-react';

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
      blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300',
      green: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:border-green-300',
      purple: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:border-purple-300'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getProgressColor = (color: string) => {
    const colorMap = {
      blue: 'bg-gradient-to-r from-blue-400 to-blue-600',
      green: 'bg-gradient-to-r from-green-400 to-green-600',
      purple: 'bg-gradient-to-r from-purple-400 to-purple-600'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getIconColor = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600'
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
        <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200 px-4 py-2">
          {Math.round((totalCompleted / totalConcepts) * 100)}% Complete
        </Badge>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-md hover:shadow-lg transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Concepts</p>
                <p className="text-xl font-bold text-blue-800">{totalCompleted}/{totalConcepts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-md hover:shadow-lg transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Study Time</p>
                <p className="text-xl font-bold text-green-800">{totalStudyTime}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-md hover:shadow-lg transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-md">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Avg Efficiency</p>
                <p className="text-xl font-bold text-purple-800">{averageEfficiency}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-md hover:shadow-lg transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-md">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium">Weekly Goal</p>
                <p className="text-xl font-bold text-orange-800">85%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {neetSubjects.map((subject) => (
          <Card key={subject.name} className={`${getColorClasses(subject.color)} border-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-bold">{subject.name}</span>
                <div className="flex items-center gap-2">
                  <Brain className={`h-5 w-5 ${getIconColor(subject.color)}`} />
                  {subject.completed >= subject.total * 0.8 && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Enhanced Progress Bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Concepts Mastered</span>
                  <span className="font-bold">{subject.completed}/{subject.total}</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-white/70 rounded-full h-3 shadow-inner">
                    <div 
                      className={`h-3 rounded-full ${getProgressColor(subject.color)} shadow-sm transition-all duration-500 ease-out`}
                      style={{ width: `${(subject.completed / subject.total) * 100}%` }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-700">
                      {Math.round((subject.completed / subject.total) * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 p-3 rounded-lg border border-white/50 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Study Time</p>
                      <p className="font-bold text-gray-800">{subject.studyTime}h</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/80 p-3 rounded-lg border border-white/50 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Efficiency</p>
                      <p className="font-bold text-gray-800">{subject.efficiency}%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Button */}
              <Button size="sm" className={`w-full mt-4 shadow-md hover:shadow-lg transition-all duration-200 ${
                subject.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                subject.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                'bg-purple-600 hover:bg-purple-700'
              }`}>
                <BookOpen className="mr-2 h-4 w-4" />
                Continue Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced AI Suggestions */}
      <Card className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border-yellow-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Lightbulb className="h-5 w-5" />
            Smart AI Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">Focus Area: Physics - Mechanics</p>
                  <p className="text-xs text-gray-600 mt-1">Your weakest topic with only 60% completion. Spend extra 30 minutes today.</p>
                </div>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 ml-3">
                  High Priority
                </Badge>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">Revision Needed: Chemistry - Organic Reactions</p>
                  <p className="text-xs text-gray-600 mt-1">Last studied 5 days ago. Quick revision recommended to maintain retention.</p>
                </div>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 ml-3">
                  Medium Priority
                </Badge>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">Strength: Biology - Human Physiology</p>
                  <p className="text-xs text-gray-600 mt-1">Great progress! Move to advanced topics to maximize your advantage.</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 ml-3">
                  Opportunity
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptOverviewSection;
