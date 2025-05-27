
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Target, Clock, TrendingUp, Lightbulb, Award, BarChart3, Star, Trophy } from 'lucide-react';

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
      color: 'blue',
      recentPerformance: 'Improving',
      weakAreas: ['Optics', 'Modern Physics']
    },
    {
      name: 'Chemistry',
      totalExams: 28,
      completedExams: 22,
      averageScore: 82,
      bestScore: 94,
      timeSpent: 920,
      improvement: 8,
      color: 'green',
      recentPerformance: 'Excellent',
      weakAreas: ['Organic Chemistry', 'Coordination Compounds']
    },
    {
      name: 'Biology',
      totalExams: 32,
      completedExams: 26,
      averageScore: 78,
      bestScore: 91,
      timeSpent: 1080,
      improvement: 15,
      color: 'purple',
      recentPerformance: 'Strong',
      weakAreas: ['Genetics', 'Biotechnology']
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

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'Excellent':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'Strong':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Improving':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const totalExams = neetSubjects.reduce((sum, subject) => sum + subject.totalExams, 0);
  const totalCompleted = neetSubjects.reduce((sum, subject) => sum + subject.completedExams, 0);
  const overallAverage = Math.round(neetSubjects.reduce((sum, subject) => sum + subject.averageScore, 0) / neetSubjects.length);
  const totalTimeSpent = neetSubjects.reduce((sum, subject) => sum + subject.timeSpent, 0);

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="h-7 w-7 text-green-600" />
            NEET Practice Exams Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Track your exam performance across Physics, Chemistry, and Biology</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {totalCompleted}/{totalExams} Completed
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {overallAverage}% Average
          </Badge>
        </div>
      </div>

      {/* Enhanced Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-full shadow-sm">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600">Total Exams</p>
                <p className="text-2xl font-bold text-blue-800">{totalCompleted}/{totalExams}</p>
                <p className="text-xs text-blue-600">Completion rate: {Math.round((totalCompleted/totalExams)*100)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500 rounded-full shadow-sm">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-600">Average Score</p>
                <p className="text-2xl font-bold text-green-800">{overallAverage}%</p>
                <p className="text-xs text-green-600">↑ 8% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500 rounded-full shadow-sm">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-600">Time Spent</p>
                <p className="text-2xl font-bold text-purple-800">{Math.round(totalTimeSpent / 60)}h</p>
                <p className="text-xs text-purple-600">Practice hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500 rounded-full shadow-sm">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-orange-600">This Week</p>
                <p className="text-2xl font-bold text-orange-800">+5%</p>
                <p className="text-xs text-orange-600">Improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Subject-wise Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {neetSubjects.map((subject) => (
          <Card key={subject.name} className={`${getColorClasses(subject.color)} border-2 shadow-lg hover:shadow-xl transition-shadow duration-200`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6" />
                  <span className="text-lg">{subject.name}</span>
                </div>
                <Badge variant="outline" className={getPerformanceColor(subject.recentPerformance)}>
                  {subject.recentPerformance}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Enhanced Progress with visual completion */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Exams Completed</span>
                  <span className="font-bold">{subject.completedExams}/{subject.totalExams}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      subject.color === 'blue' ? 'bg-blue-500' :
                      subject.color === 'green' ? 'bg-green-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${(subject.completedExams / subject.totalExams) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-center mt-1 font-medium">
                  {Math.round((subject.completedExams / subject.totalExams) * 100)}% Complete
                </p>
              </div>

              {/* Enhanced Performance Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center bg-white/70 p-3 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Target className="h-4 w-4 text-gray-600" />
                    <span className="text-xs font-medium">Average</span>
                  </div>
                  <p className="text-xl font-bold text-gray-800">{subject.averageScore}%</p>
                </div>
                <div className="text-center bg-white/70 p-3 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="text-xs font-medium">Best</span>
                  </div>
                  <p className="text-xl font-bold text-green-600">{subject.bestScore}%</p>
                </div>
              </div>

              {/* Improvement Indicator */}
              <div className="bg-white/70 p-3 rounded-lg text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Monthly Progress</span>
                </div>
                <p className="text-lg font-bold text-green-600">+{subject.improvement}%</p>
              </div>

              {/* Weak Areas */}
              <div>
                <p className="text-xs font-medium text-red-700 mb-2">Focus Areas:</p>
                <div className="flex flex-wrap gap-1">
                  {subject.weakAreas.map((area, idx) => (
                    <Badge key={idx} variant="outline" className="bg-red-100 text-red-700 border-red-300 text-xs">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Enhanced Action Button */}
              <Button size="sm" className="w-full mt-3 shadow-sm hover:shadow-md transition-shadow">
                Take Practice Test
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced AI Performance Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Lightbulb className="h-6 w-6" />
            AI Performance Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-green-600" />
                <p className="text-sm font-medium text-gray-800">Strength Area</p>
              </div>
              <p className="text-sm text-gray-600 mb-2">Biology Applications - consistently scoring 85%+</p>
              <Button size="sm" variant="outline" className="w-full">Maintain Edge</Button>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-orange-600" />
                <p className="text-sm font-medium text-gray-800">Improvement Focus</p>
              </div>
              <p className="text-sm text-gray-600 mb-2">Physics Numerical - average 68%, needs calculation practice</p>
              <Button size="sm" variant="outline" className="w-full">Practice More</Button>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <p className="text-sm font-medium text-gray-800">Time Management</p>
              </div>
              <p className="text-sm text-gray-600 mb-2">Chemistry sections - optimize time allocation for organic</p>
              <Button size="sm" variant="outline" className="w-full">Time Practice</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticeExamOverviewSection;
