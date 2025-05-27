
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Brain, BookOpen, Clock, Target, TrendingUp, Award, CheckCircle, FileText, Sparkles, Zap } from 'lucide-react';

interface SubjectProgress {
  name: string;
  completed: number;
  total: number;
  avgScore: number;
  timeSpent: number;
  color: string;
  streak: number;
  lastExam: string;
}

interface EnhancedPracticeExamOverviewSectionProps {
  className?: string;
}

const EnhancedPracticeExamOverviewSection: React.FC<EnhancedPracticeExamOverviewSectionProps> = ({ className }) => {
  const neetSubjects: SubjectProgress[] = [
    {
      name: 'Physics',
      completed: 12,
      total: 18,
      avgScore: 78,
      timeSpent: 360,
      color: 'blue',
      streak: 5,
      lastExam: 'Wave Optics Mock'
    },
    {
      name: 'Chemistry',
      completed: 8,
      total: 15,
      avgScore: 82,
      timeSpent: 240,
      color: 'green',
      streak: 3,
      lastExam: 'Organic Chemistry Test'
    },
    {
      name: 'Biology',
      completed: 15,
      total: 20,
      avgScore: 85,
      timeSpent: 450,
      color: 'purple',
      streak: 7,
      lastExam: 'Human Physiology Mock'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 border-blue-200 hover:border-blue-300 hover:shadow-xl',
      green: 'bg-gradient-to-br from-green-50 via-emerald-100 to-green-100 border-green-200 hover:border-green-300 hover:shadow-xl',
      purple: 'bg-gradient-to-br from-purple-50 via-violet-100 to-purple-100 border-purple-200 hover:border-purple-300 hover:shadow-xl'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getProgressColor = (color: string) => {
    const colorMap = {
      blue: 'bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600',
      green: 'bg-gradient-to-r from-green-500 via-emerald-600 to-green-600',
      purple: 'bg-gradient-to-r from-purple-500 via-violet-600 to-purple-600'
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
    <div className={`space-y-8 ${className || ''}`}>
      {/* Premium Header with enhanced styling */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30">
                <FileText className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">NEET Practice Exams</h2>
                <p className="text-indigo-100 mt-1">Test your knowledge with comprehensive practice examinations</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <Badge variant="outline" className="bg-white/20 text-white border-white/30 px-4 py-2 backdrop-blur-sm">
                {Math.round((totalCompleted / totalExams) * 100)}% Complete
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Enhanced decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/15 to-transparent rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-white/30 rounded-full blur-sm"></div>
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-white/40 rounded-full blur-sm"></div>
      </div>

      {/* Enhanced Overall Stats with premium styling */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium mb-1">Total Exams</p>
                <p className="text-2xl font-bold text-blue-800">{totalCompleted}/{totalExams}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Zap className="h-3 w-3 text-blue-500" />
                  <span className="text-xs text-blue-600">Active streak</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-xl"></div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-100 to-green-100 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium mb-1">Avg Score</p>
                <p className="text-2xl font-bold text-green-800">{averageScore}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">+5% this week</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-200/30 to-transparent rounded-full blur-xl"></div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-violet-100 to-purple-100 border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium mb-1">Time Spent</p>
                <p className="text-2xl font-bold text-purple-800">{Math.round(totalTimeSpent/60)}h</p>
                <div className="flex items-center gap-1 mt-1">
                  <Brain className="h-3 w-3 text-purple-500" />
                  <span className="text-xs text-purple-600">Focused study</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-200/30 to-transparent rounded-full blur-xl"></div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-100 to-orange-100 border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl shadow-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium mb-1">Target Score</p>
                <p className="text-2xl font-bold text-orange-800">650+</p>
                <div className="flex items-center gap-1 mt-1">
                  <Target className="h-3 w-3 text-orange-500" />
                  <span className="text-xs text-orange-600">NEET 2026</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-200/30 to-transparent rounded-full blur-xl"></div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Subject-wise Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {neetSubjects.map((subject) => (
          <Card key={subject.name} className={`${getColorClasses(subject.color)} border-2 shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden`}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl shadow-lg ${
                    subject.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                    subject.color === 'green' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                    'bg-gradient-to-r from-purple-500 to-violet-600'
                  }`}>
                    <Brain className={`h-6 w-6 text-white`} />
                  </div>
                  <span className="text-xl font-bold">{subject.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {subject.completed >= subject.total * 0.8 && (
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <Sparkles className="h-4 w-4 text-amber-500" />
                    </div>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="font-medium">Exams Completed</span>
                  <span className="font-bold">{subject.completed}/{subject.total}</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-white/80 rounded-full h-4 shadow-inner border border-white/50">
                    <div 
                      className={`h-4 rounded-full ${getProgressColor(subject.color)} shadow-lg transition-all duration-700 ease-out relative overflow-hidden`}
                      style={{ width: `${(subject.completed / subject.total) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-700">
                      {Math.round((subject.completed / subject.total) * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/90 p-4 rounded-xl border border-white/70 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-gray-600" />
                    <p className="text-xs text-gray-600 font-medium">Avg Score</p>
                  </div>
                  <p className="text-xl font-bold text-gray-800">{subject.avgScore}%</p>
                </div>
                <div className="bg-white/90 p-4 rounded-xl border border-white/70 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-gray-600" />
                    <p className="text-xs text-gray-600 font-medium">Streak</p>
                  </div>
                  <p className="text-xl font-bold text-gray-800">{subject.streak}</p>
                </div>
              </div>

              <div className="bg-white/80 p-4 rounded-xl border border-white/60 shadow-sm">
                <p className="text-xs text-gray-600 font-medium mb-1">Last Exam</p>
                <p className="font-semibold text-sm text-gray-800">{subject.lastExam}</p>
                <p className="text-xs text-gray-500 mt-1">{Math.round(subject.timeSpent/60)}h total study time</p>
              </div>

              <Button size="lg" className={`w-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                subject.color === 'blue' ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' :
                subject.color === 'green' ? 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800' :
                'bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800'
              }`}>
                <FileText className="mr-2 h-5 w-5" />
                Take Practice Exam
              </Button>
            </CardContent>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/15 to-transparent rounded-full blur-lg"></div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnhancedPracticeExamOverviewSection;
