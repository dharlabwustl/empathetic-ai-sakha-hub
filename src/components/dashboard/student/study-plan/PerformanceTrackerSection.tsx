
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Clock, BarChart3 } from 'lucide-react';

interface PerformanceTrackerSectionProps {
  data: any;
  onUpdate: (data: any) => void;
}

const PerformanceTrackerSection: React.FC<PerformanceTrackerSectionProps> = ({ data, onUpdate }) => {
  const performanceData = {
    subjects: [
      { name: 'Physics', score: 78, accuracy: 85, avgTime: '2.3 min', trend: 'up' },
      { name: 'Chemistry', score: 65, accuracy: 72, avgTime: '2.8 min', trend: 'down' },
      { name: 'Biology', score: 88, accuracy: 92, avgTime: '1.9 min', trend: 'up' }
    ],
    overallStats: {
      averageScore: 77,
      totalTests: 24,
      accuracyTrend: 'improving',
      speedTrend: 'stable'
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Performance Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-800">{performanceData.overallStats.averageScore}%</div>
              <div className="text-sm text-blue-600">Average Score</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-800">{performanceData.overallStats.totalTests}</div>
              <div className="text-sm text-green-600">Tests Completed</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-800">2.3</div>
              <div className="text-sm text-purple-600">Avg Time/Question</div>
            </div>
          </div>

          <div className="space-y-4">
            {performanceData.subjects.map((subject, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{subject.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Score: {subject.score}%</span>
                      <TrendingUp className={`h-4 w-4 ${subject.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Test Score</div>
                      <Progress value={subject.score} className="h-2" />
                      <div className="text-xs text-gray-500 mt-1">{subject.score}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Accuracy</div>
                      <Progress value={subject.accuracy} className="h-2" />
                      <div className="text-xs text-gray-500 mt-1">{subject.accuracy}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Avg Time</div>
                      <div className="text-lg font-medium">{subject.avgTime}</div>
                      <div className="text-xs text-gray-500">per question</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceTrackerSection;
