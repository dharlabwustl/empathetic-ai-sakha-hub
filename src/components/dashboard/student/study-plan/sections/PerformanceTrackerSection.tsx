
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Award, 
  TrendingUp, 
  Target,
  BarChart3
} from 'lucide-react';

export const PerformanceTrackerSection = () => {
  const performanceData = [
    {
      subject: 'Physics',
      testScores: [78, 82, 75, 85, 88],
      accuracy: 84,
      averageScore: 81.6,
      trend: 'improving'
    },
    {
      subject: 'Chemistry',
      testScores: [72, 68, 71, 74, 79],
      accuracy: 73,
      averageScore: 72.8,
      trend: 'improving'
    },
    {
      subject: 'Biology',
      testScores: [88, 92, 89, 91, 94],
      accuracy: 91,
      averageScore: 90.8,
      trend: 'stable'
    }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'improving' ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <BarChart3 className="h-4 w-4 text-blue-600" />
    );
  };

  const getTrendColor = (trend: string) => {
    return trend === 'improving' ? 'text-green-600' : 'text-blue-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Performance Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {performanceData.map((data) => (
              <Card key={data.subject} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-lg">{data.subject}</h4>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(data.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(data.trend)}`}>
                        {data.trend}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Target className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-blue-600">{data.averageScore.toFixed(1)}%</div>
                      <div className="text-xs text-gray-600">Average Score</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <Award className="h-6 w-6 text-green-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-green-600">{data.accuracy}%</div>
                      <div className="text-xs text-gray-600">Accuracy</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-purple-600">{data.testScores.length}</div>
                      <div className="text-xs text-gray-600">Tests Taken</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <Badge variant="outline">{data.accuracy}%</Badge>
                    </div>
                    <Progress value={data.accuracy} />
                  </div>
                  
                  <div className="mt-3">
                    <h5 className="text-sm font-medium mb-2">Recent Test Scores</h5>
                    <div className="flex gap-2">
                      {data.testScores.map((score, index) => (
                        <Badge 
                          key={index} 
                          variant={score >= 80 ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {score}%
                        </Badge>
                      ))}
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
