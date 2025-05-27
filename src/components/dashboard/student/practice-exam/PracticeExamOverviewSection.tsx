
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Target, Clock, TrendingUp, Lightbulb, Award, BarChart3 } from 'lucide-react';

interface PracticeExamOverviewSectionProps {
  className?: string;
}

const PracticeExamOverviewSection: React.FC<PracticeExamOverviewSectionProps> = ({ className }) => {
  const neetSubjects = [
    {
      name: 'Physics',
      totalExams: 25,
      completedExams: 18,
      averageScore: 76,
      bestScore: 89,
      timeSpent: 840, // minutes
      improvement: 12,
      color: 'blue'
    },
    {
      name: 'Chemistry',
      totalExams: 28,
      completedExams: 22,
      averageScore: 82,
      bestScore: 94,
      timeSpent: 920,
      improvement: 8,
      color: 'green'
    },
    {
      name: 'Biology',
      totalExams: 32,
      completedExams: 26,
      averageScore: 78,
      bestScore: 91,
      timeSpent: 1080,
      improvement: 15,
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

  const totalExams = neetSubjects.reduce((sum, subject) => sum + subject.totalExams, 0);
  const totalCompleted = neetSubjects.reduce((sum, subject) => sum + subject.completedExams, 0);
  const overallAverage = Math.round(neetSubjects.reduce((sum, subject) => sum + subject.averageScore, 0) / neetSubjects.length);
  const totalTimeSpent = neetSubjects.reduce((sum, subject) => sum + subject.timeSpent, 0);

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">NEET Practice Exams Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">Track your exam performance across Physics, Chemistry, and Biology</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          {totalCompleted}/{totalExams} Completed
        </Badge>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-full">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600">Total Exams</p>
                <p className="text-xl font-bold text-blue-800">{totalCompleted}/{totalExams}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-full">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600">Average Score</p>
                <p className="text-xl font-bold text-green-800">{overallAverage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-full">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600">Time Spent</p>
                <p className="text-xl font-bold text-purple-800">{Math.round(totalTimeSpent / 60)}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-full">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600">This Week</p>
                <p className="text-xl font-bold text-orange-800">+5%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {neetSubjects.map((subject) => (
          <Card key={subject.name} className={`${getColorClasses(subject.color)} border-2`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{subject.name}</span>
                <BarChart3 className="h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Exams Completed</span>
                  <span>{subject.completedExams}/{subject.totalExams}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      subject.color === 'blue' ? 'bg-blue-500' :
                      subject.color === 'green' ? 'bg-green-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${(subject.completedExams / subject.totalExams) * 100}%` }}
                  />
                </div>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center bg-white p-2 rounded">
                  <p className="text-lg font-bold text-gray-800">{subject.averageScore}%</p>
                  <p className="text-xs text-gray-600">Average</p>
                </div>
                <div className="text-center bg-white p-2 rounded">
                  <p className="text-lg font-bold text-green-600">{subject.bestScore}%</p>
                  <p className="text-xs text-gray-600">Best</p>
                </div>
              </div>

              {/* Improvement */}
              <div className="flex items-center justify-between text-sm">
                <span>This Month:</span>
                <span className="text-green-600 font-semibold">+{subject.improvement}%</span>
              </div>

              {/* Action Button */}
              <Button size="sm" className="w-full mt-3">
                Take Practice Test
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Performance Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Lightbulb className="h-5 w-5" />
            AI Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-gray-800">Strength: Biology Applications</p>
              <p className="text-xs text-gray-600 mt-1">Consistently scoring 85%+ in applied biology questions. Great conceptual understanding!</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-gray-800">Focus Area: Physics Numerical</p>
              <p className="text-xs text-gray-600 mt-1">Average 68% in numerical problems. Practice more calculation-heavy topics.</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-gray-800">Time Management: Chemistry</p>
              <p className="text-xs text-gray-600 mt-1">Spending too much time on organic chemistry. Try time-boxed practice sessions.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticeExamOverviewSection;
