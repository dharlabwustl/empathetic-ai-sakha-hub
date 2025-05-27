
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Target, Brain, Calendar, Award } from 'lucide-react';

interface PredictionData {
  subject: string;
  currentScore: number;
  predictedScore: number;
  confidence: number;
  trend: 'improving' | 'declining' | 'stable';
  recommendations: string[];
}

interface PerformanceTrend {
  date: string;
  physics: number;
  chemistry: number;
  biology: number;
  overall: number;
}

const PredictiveAnalytics: React.FC = () => {
  const [predictions] = useState<PredictionData[]>([
    {
      subject: 'Physics',
      currentScore: 75,
      predictedScore: 82,
      confidence: 87,
      trend: 'improving',
      recommendations: [
        'Focus on thermodynamics concepts',
        'Practice more numerical problems',
        'Review electromagnetic theory'
      ]
    },
    {
      subject: 'Chemistry',
      currentScore: 68,
      predictedScore: 71,
      confidence: 79,
      trend: 'stable',
      recommendations: [
        'Strengthen organic chemistry',
        'Practice reaction mechanisms',
        'Review periodic trends'
      ]
    },
    {
      subject: 'Biology',
      currentScore: 82,
      predictedScore: 85,
      confidence: 92,
      trend: 'improving',
      recommendations: [
        'Continue current study pattern',
        'Focus on human physiology',
        'Review plant biology concepts'
      ]
    }
  ]);

  const [trendData] = useState<PerformanceTrend[]>([
    { date: 'Week 1', physics: 65, chemistry: 60, biology: 78, overall: 68 },
    { date: 'Week 2', physics: 68, chemistry: 62, biology: 80, overall: 70 },
    { date: 'Week 3', physics: 72, chemistry: 65, biology: 81, overall: 73 },
    { date: 'Week 4', physics: 75, chemistry: 68, biology: 82, overall: 75 },
    { date: 'Predicted', physics: 82, chemistry: 71, biology: 85, overall: 79 }
  ]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declining': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <TrendingUp className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-600 bg-green-100';
      case 'declining': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Overview */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            AI Performance Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-purple-100">
              <div className="text-2xl font-bold text-purple-600">79%</div>
              <div className="text-sm text-gray-600">Predicted Overall</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-green-100">
              <div className="text-2xl font-bold text-green-600">+7</div>
              <div className="text-sm text-gray-600">Expected Improvement</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">86%</div>
              <div className="text-sm text-gray-600">Avg Confidence</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-yellow-100">
              <div className="text-2xl font-bold text-yellow-600">2</div>
              <div className="text-sm text-gray-600">Weeks to Goal</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trend & Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[50, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="physics" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  strokeDasharray="0"
                />
                <Line 
                  type="monotone" 
                  dataKey="chemistry" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  strokeDasharray="0"
                />
                <Line 
                  type="monotone" 
                  dataKey="biology" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  strokeDasharray="0"
                />
                <Line 
                  type="monotone" 
                  dataKey="overall" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  strokeDasharray="0"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Subject-wise Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise AI Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {predictions.map((prediction) => (
              <div key={prediction.subject} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-semibold">{prediction.subject}</h4>
                    {getTrendIcon(prediction.trend)}
                    <Badge variant="outline" className={getTrendColor(prediction.trend)}>
                      {prediction.trend}
                    </Badge>
                  </div>
                  <div className={`text-sm font-medium ${getConfidenceColor(prediction.confidence)}`}>
                    {prediction.confidence}% confidence
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Current Score</span>
                      <span className="font-medium">{prediction.currentScore}%</span>
                    </div>
                    <Progress value={prediction.currentScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Predicted Score</span>
                      <span className="font-medium text-blue-600">{prediction.predictedScore}%</span>
                    </div>
                    <Progress value={prediction.predictedScore} className="h-2" />
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    AI Recommendations
                  </h5>
                  <ul className="space-y-1">
                    {prediction.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Goal Achievement Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Goal Achievement Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-blue-600" />
                <div>
                  <h4 className="font-medium">Reach 80% in Physics</h4>
                  <p className="text-sm text-gray-600">Based on current trend</p>
                </div>
              </div>
              <Badge className="bg-blue-600">2 weeks</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium">Maintain 85%+ in Biology</h4>
                  <p className="text-sm text-gray-600">Continue current pace</p>
                </div>
              </div>
              <Badge className="bg-green-600">On track</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <h4 className="font-medium">Improve Chemistry to 75%</h4>
                  <p className="text-sm text-gray-600">Needs focused attention</p>
                </div>
              </div>
              <Badge className="bg-yellow-600">4 weeks</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalytics;
