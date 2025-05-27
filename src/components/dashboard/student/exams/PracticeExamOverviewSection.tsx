
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Brain, BookOpen, Clock, Target, TrendingUp, Award, CheckCircle, FileText } from 'lucide-react';

interface SubjectProgress {
  name: string;
  completed: number;
  total: number;
  avgScore: number;
  timeSpent: number;
  color: string;
}

interface PracticeExamOverviewSectionProps {
  className?: string;
}

const PracticeExamOverviewSection: React.FC<PracticeExamOverviewSectionProps> = ({ className }) => {
  const neetSubjects: SubjectProgress[] = [
    {
      name: 'Physics',
      completed: 12,
      total: 18,
      avgScore: 78,
      timeSpent: 360,
      color: 'blue'
    },
    {
      name: 'Chemistry',
      completed: 8,
      total: 15,
      avgScore: 82,
      timeSpent: 240,
      color: 'green'
    },
    {
      name: 'Biology',
      completed: 15,
      total: 20,
      avgScore: 85,
      timeSpent: 450,
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
  const totalExams = neetSubjects.reduce((sum, subject) => sum + subject.total, 0);
  const averageScore = Math.round(neetSubjects.reduce((sum, subject) => sum + subject.avgScore, 0) / neetSubjects.length);
  const totalTimeSpent = neetSubjects.reduce((sum, subject) => sum + subject.timeSpent, 0);

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">NEET Practice Exams Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">Test your knowledge with comprehensive practice examinations</p>
        </div>
        <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200 px-4 py-2">
          {Math.round((totalCompleted / totalExams) * 100)}% Complete
        </Badge>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-md hover:shadow-lg transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Exams</p>
                <p className="text-xl font-bold text-blue-800">{totalCompleted}/{totalExams}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-md hover:shadow-lg transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Avg Score</p>
                <p className="text-xl font-bold text-green-800">{averageScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-md hover:shadow-lg transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-md">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Time Spent</p>
                <p className="text-xl font-bold text-purple-800">{Math.round(totalTimeSpent/60)}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-md hover:shadow-lg transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-md">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium">Target Score</p>
                <p className="text-xl font-bold text-orange-800">90%</p>
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
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Exams Completed</span>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 p-3 rounded-lg border border-white/50 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Avg Score</p>
                      <p className="font-bold text-gray-800">{subject.avgScore}%</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/80 p-3 rounded-lg border border-white/50 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Time Spent</p>
                      <p className="font-bold text-gray-800">{Math.round(subject.timeSpent/60)}h</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button size="sm" className={`w-full mt-4 shadow-md hover:shadow-lg transition-all duration-200 ${
                subject.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                subject.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                'bg-purple-600 hover:bg-purple-700'
              }`}>
                <FileText className="mr-2 h-4 w-4" />
                Take Practice Exam
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PracticeExamOverviewSection;
