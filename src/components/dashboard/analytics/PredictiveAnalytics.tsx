
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Award, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Mock data for predictive analytics
const predictionData = [
  { week: 'Current', physics: 72, chemistry: 68, biology: 65, overall: 68 },
  { week: 'Week 1', physics: 75, chemistry: 70, biology: 67, overall: 71 },
  { week: 'Week 2', physics: 78, chemistry: 73, biology: 70, overall: 74 },
  { week: 'Week 3', physics: 80, chemistry: 76, biology: 74, overall: 77 },
  { week: 'Week 4', physics: 83, chemistry: 79, biology: 77, overall: 80 },
  { week: 'Week 5', physics: 85, chemistry: 82, biology: 80, overall: 82 },
  { week: 'Week 6', physics: 88, chemistry: 84, biology: 82, overall: 85 },
  { week: 'Week 7', physics: 90, chemistry: 86, biology: 84, overall: 87 },
  { week: 'Week 8', physics: 92, chemistry: 88, biology: 87, overall: 89 },
];

const rankPredictionData = [
  { name: 'Top 1%', value: 15 },
  { name: 'Top 5%', value: 30 },
  { name: 'Top 10%', value: 25 },
  { name: 'Top 25%', value: 20 },
  { name: 'Below Top 25%', value: 10 },
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#ffc658'];

const improvementRecommendations = [
  {
    subject: 'Biology',
    currentScore: 65,
    potentialImprovement: 25,
    effortRequired: 'high',
    recommendation: 'Focus on cell biology and human physiology concepts',
  },
  {
    subject: 'Chemistry',
    currentScore: 68,
    potentialImprovement: 22,
    effortRequired: 'medium',
    recommendation: 'Strengthen organic chemistry and chemical equilibrium',
  },
  {
    subject: 'Physics',
    currentScore: 72,
    potentialImprovement: 20,
    effortRequired: 'medium',
    recommendation: 'Practice more problems in thermodynamics and electromagnetism',
  },
];

const PredictiveAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Score Projection Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={predictionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="physics" name="Physics" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="chemistry" name="Chemistry" stroke="#82ca9d" />
                <Line type="monotone" dataKey="biology" name="Biology" stroke="#ffc658" />
                <Line type="monotone" dataKey="overall" name="Overall Score" stroke="#ff7300" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="font-medium">Current Projected Score:</span>
                <span>68%</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">8-Week Projection:</span>
                <span className="text-green-600 font-medium">89% (+21%)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              Rank Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rankPredictionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {rankPredictionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Based on your current trajectory, you have a <span className="font-medium">70%</span> chance of ranking in the top 10%.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Score Optimization Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {improvementRecommendations.map((item, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{item.subject}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">Current:</span>
                      <span className="font-medium">{item.currentScore}%</span>
                      <span className="text-green-600 text-sm ml-2">+{item.potentialImprovement}%</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="relative pt-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Potential Improvement</span>
                        <span>{item.currentScore + item.potentialImprovement}%</span>
                      </div>
                      <div className="flex h-2 overflow-hidden rounded bg-gray-200">
                        <div
                          className="bg-blue-500 h-2"
                          style={{ width: `${item.currentScore}%` }}
                        ></div>
                        <div
                          className="bg-green-400 h-2"
                          style={{ width: `${item.potentialImprovement}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span>Effort: </span>
                      <span className={`font-medium ${
                        item.effortRequired === 'high' 
                          ? 'text-red-500' 
                          : item.effortRequired === 'medium' 
                            ? 'text-amber-500' 
                            : 'text-green-500'
                      }`}>
                        {item.effortRequired.charAt(0).toUpperCase() + item.effortRequired.slice(1)}
                      </span>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      View Study Plan
                    </Button>
                  </div>
                  
                  <div className="mt-3 text-sm bg-gray-50 p-2 rounded dark:bg-gray-800">
                    <strong>Tip:</strong> {item.recommendation}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-center">
              <Button className="gap-2">
                <Clock className="h-4 w-4" />
                Generate Optimized Study Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;
