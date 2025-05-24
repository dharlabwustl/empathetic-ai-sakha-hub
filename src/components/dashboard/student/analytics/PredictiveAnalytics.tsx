
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, Brain, Target, AlertTriangle, CheckCircle, Clock, BookOpen } from 'lucide-react';

interface PredictionData {
  date: string;
  predicted: number;
  actual?: number;
  confidence: number;
}

interface PerformanceTrend {
  subject: string;
  currentScore: number;
  predictedScore: number;
  trend: 'improving' | 'stable' | 'declining';
  confidence: number;
}

const PredictiveAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'1week' | '1month' | '3months'>('1month');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Mock data for predictions
  const mockPredictionData: PredictionData[] = [
    { date: '2024-01-01', predicted: 75, actual: 73, confidence: 85 },
    { date: '2024-01-08', predicted: 78, actual: 76, confidence: 82 },
    { date: '2024-01-15', predicted: 81, actual: 79, confidence: 88 },
    { date: '2024-01-22', predicted: 83, confidence: 90 },
    { date: '2024-01-29', predicted: 85, confidence: 87 },
    { date: '2024-02-05', predicted: 87, confidence: 92 },
  ];

  const mockPerformanceTrends: PerformanceTrend[] = [
    { subject: 'Mathematics', currentScore: 78, predictedScore: 85, trend: 'improving', confidence: 92 },
    { subject: 'Physics', currentScore: 82, predictedScore: 86, trend: 'improving', confidence: 88 },
    { subject: 'Chemistry', currentScore: 75, predictedScore: 74, trend: 'declining', confidence: 79 },
    { subject: 'Biology', currentScore: 88, predictedScore: 89, trend: 'stable', confidence: 85 },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <CheckCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'bg-green-100 text-green-800';
      case 'declining': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const confidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Predictive Analytics
            </CardTitle>
            <div className="flex gap-2">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-3 py-1 border rounded-md"
              >
                <option value="1week">1 Week</option>
                <option value="1month">1 Month</option>
                <option value="3months">3 Months</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">87%</div>
              <div className="text-sm text-gray-500">Predicted Final Score</div>
              <div className="text-xs text-green-600 mt-1">↗ +5% from current</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">92%</div>
              <div className="text-sm text-gray-500">Model Confidence</div>
              <div className="text-xs text-gray-400 mt-1">High accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">23</div>
              <div className="text-sm text-gray-500">Days to Goal</div>
              <div className="text-xs text-blue-600 mt-1">On track</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance">Performance Prediction</TabsTrigger>
          <TabsTrigger value="trends">Subject Trends</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
        </TabsList>

        {/* Performance Prediction Tab */}
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Prediction Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={mockPredictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    name="Actual Score"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#82ca9d" 
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    name="Predicted Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subject Trends Tab */}
        <TabsContent value="trends">
          <div className="space-y-4">
            {mockPerformanceTrends.map((trend, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-blue-500" />
                      <div>
                        <h3 className="font-medium">{trend.subject}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {getTrendIcon(trend.trend)}
                          <Badge className={getTrendColor(trend.trend)}>
                            {trend.trend}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {trend.currentScore}% → {trend.predictedScore}%
                      </div>
                      <div className={`text-sm ${confidenceColor(trend.confidence)}`}>
                        {trend.confidence}% confidence
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* AI Recommendations Tab */}
        <TabsContent value="recommendations">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-green-700">Focus Area: Mathematics</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Increase practice time by 30 minutes daily in algebra topics. 
                    Predicted improvement: +7% in 2 weeks.
                  </p>
                  <Badge className="mt-2 bg-green-100 text-green-800">High Impact</Badge>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-medium text-yellow-700">Optimize Study Schedule</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Your peak performance hours are 9-11 AM. Schedule difficult topics 
                    during this time for better retention.
                  </p>
                  <Badge className="mt-2 bg-yellow-100 text-yellow-800">Medium Impact</Badge>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-medium text-red-700">Address Chemistry Gaps</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Declining trend detected in organic chemistry. Consider additional 
                    practice or seek help before the gap widens.
                  </p>
                  <Badge className="mt-2 bg-red-100 text-red-800">Urgent</Badge>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-blue-700">Maintain Biology Performance</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Great job maintaining consistent performance in biology! 
                    Continue current study pattern.
                  </p>
                  <Badge className="mt-2 bg-blue-100 text-blue-800">Maintain</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Study Time Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Recommended Daily Schedule</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Mathematics</span>
                        <span className="font-medium">45 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Physics</span>
                        <span className="font-medium">30 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Chemistry</span>
                        <span className="font-medium">60 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Biology</span>
                        <span className="font-medium">30 min</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Optimal Study Times</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Peak Performance</span>
                        <span className="font-medium">9:00 - 11:00 AM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Good Performance</span>
                        <span className="font-medium">4:00 - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Review Time</span>
                        <span className="font-medium">8:00 - 9:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictiveAnalytics;
