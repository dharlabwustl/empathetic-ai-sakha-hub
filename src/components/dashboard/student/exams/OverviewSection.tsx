
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Clock, 
  Trophy, 
  TrendingUp, 
  Target,
  CheckCircle,
  BarChart3,
  Calendar
} from 'lucide-react';

interface Subject {
  name: string;
  completed: number;
  total: number;
  progress: number;
  efficiency: number;
  studyTime: number;
}

interface OverviewSectionProps {
  type: "Practice Exams";
  title: string;
  subjects: Subject[];
  totalStudyTime: number;
  overallProgress: number;
  suggestions: string[];
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
  type,
  title,
  subjects,
  totalStudyTime,
  overallProgress,
  suggestions
}) => {
  const totalCompleted = subjects.reduce((sum, subject) => sum + subject.completed, 0);
  const totalExams = subjects.reduce((sum, subject) => sum + subject.total, 0);
  const averageEfficiency = Math.round(subjects.reduce((sum, subject) => sum + subject.efficiency, 0) / subjects.length);

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 mt-2">Track your practice exam progress and performance</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white text-green-700 border-green-200">
              <FileText className="h-3 w-3 mr-1" />
              {totalCompleted}/{totalExams} Completed
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium text-gray-600">Overall Progress</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{overallProgress}%</div>
            <Progress value={overallProgress} className="mt-2 h-2" />
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Study Time</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalStudyTime}h</div>
            <div className="text-xs text-gray-500 mt-1">This month</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-600">Efficiency</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{averageEfficiency}%</div>
            <div className="text-xs text-green-600 mt-1">↑ 5% from last week</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-orange-100">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-600">Target Score</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">650+</div>
            <div className="text-xs text-gray-500 mt-1">NEET 2024</div>
          </div>
        </div>
      </div>

      {/* Subject breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Subject-wise Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjects.map((subject) => (
              <div key={subject.name} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-lg">{subject.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {subject.completed}/{subject.total} exams
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-blue-600" />
                      {subject.studyTime}h
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span className="font-medium">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Efficiency</span>
                      <span className="font-medium">{subject.efficiency}%</span>
                    </div>
                    <Progress value={subject.efficiency} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Target className="h-5 w-5" />
            AI Study Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-yellow-200">
                <div className="p-1 bg-yellow-100 rounded-full mt-0.5">
                  <Target className="h-3 w-3 text-yellow-600" />
                </div>
                <p className="text-sm text-gray-700">{suggestion}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewSection;
