
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Gauge, TrendingUp, Clock, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data
const examReadiness = {
  overall: 76,
  projectedScore: 592,
  maxScore: 720,
  predictedRank: '1,253/10,000',
  daysRemaining: 45,
  subjects: [
    { name: 'Physics', mastery: 82, projectedScore: 142, maxScore: 180 },
    { name: 'Chemistry', mastery: 78, projectedScore: 135, maxScore: 180 },
    { name: 'Biology', mastery: 68, projectedScore: 124, maxScore: 180 },
    { name: 'Mathematics', mastery: 75, projectedScore: 135, maxScore: 180 }
  ]
};

const projectionData = [
  { week: 'Current', score: 592 },
  { week: 'Week 1', score: 608 },
  { week: 'Week 2', score: 623 },
  { week: 'Week 3', score: 639 },
  { week: 'Week 4', score: 652 },
  { week: 'Week 5', score: 667 },
  { week: 'Week 6', score: 679 }
];

const timeAllocationData = [
  { name: 'Physics', current: 12, recommended: 15 },
  { name: 'Chemistry', current: 10, recommended: 12 },
  { name: 'Biology', current: 8, recommended: 14 },
  { name: 'Mathematics', current: 14, recommended: 13 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PredictiveAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Exam Readiness Forecast
            </CardTitle>
            <CardDescription>
              Your projected performance based on current trajectory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-6">
              <div className="relative h-40 w-40">
                {/* Custom gauge visualization */}
                <div className="h-full w-full rounded-full border-8 border-gray-100 dark:border-gray-800"></div>
                <div 
                  className="absolute top-0 left-0 h-full w-full rounded-full border-8 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent"
                  style={{ transform: `rotate(${(examReadiness.overall / 100) * 360}deg)` }}
                ></div>
                <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center flex-col">
                  <span className="text-4xl font-bold">{examReadiness.overall}%</span>
                  <span className="text-sm text-muted-foreground">Readiness</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Projected Score</p>
                <p className="text-2xl font-bold">{examReadiness.projectedScore}/{examReadiness.maxScore}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Days Remaining</p>
                <p className="text-2xl font-bold">{examReadiness.daysRemaining}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {examReadiness.subjects.map((subject) => (
                <div key={subject.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{subject.name}</span>
                    <span>{subject.projectedScore}/{subject.maxScore}</span>
                  </div>
                  <Progress value={subject.mastery} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Score Projection
            </CardTitle>
            <CardDescription>
              Predicted score trend based on your study plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={projectionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[580, 720]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
                {/* Target line */}
                <Line 
                  type="monotone" 
                  dataKey={() => 650} 
                  stroke="rgba(255, 0, 0, 0.5)" 
                  strokeDasharray="5 5"
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Key Insights:</h3>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">+87 points</Badge>
                  <span>Potential improvement in 6 weeks</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge className="bg-blue-100 text-blue-800">Week 3</Badge>
                  <span>Expected to cross target score of 650</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-500" />
            Optimization Recommendations
          </CardTitle>
          <CardDescription>
            Suggested time allocation for maximum score improvement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={timeAllocationData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" name="Current Hours/Week" fill="#8884d8" />
                  <Bar dataKey="recommended" name="Recommended Hours/Week" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Top Recommendations</h3>
              <ul className="space-y-4">
                <li className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-100 text-amber-800">Biology</Badge>
                    <span className="text-sm font-medium">+6 hours needed</span>
                  </div>
                  <p className="text-xs mt-2">
                    Focus on molecular biology and genetics to address weak areas
                  </p>
                </li>
                <li className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">Physics</Badge>
                    <span className="text-sm font-medium">+3 hours needed</span>
                  </div>
                  <p className="text-xs mt-2">
                    Improve understanding of electromagnetism for maximum impact
                  </p>
                </li>
                <li className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">Chemistry</Badge>
                    <span className="text-sm font-medium">+2 hours needed</span>
                  </div>
                  <p className="text-xs mt-2">
                    Practice more organic chemistry reaction mechanisms
                  </p>
                </li>
              </ul>
              
              <Button className="w-full mt-4">
                Apply Recommended Changes
              </Button>
            </div>
          </div>
          
          <div className="mt-6 border-t pt-6">
            <h3 className="text-sm font-medium mb-3">Score Improvement Potential</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg text-center">
                <h4 className="text-sm text-muted-foreground mb-1">Current Plan</h4>
                <p className="text-2xl font-bold">+45 points</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg text-center">
                <h4 className="text-sm text-muted-foreground mb-1">Optimized Plan</h4>
                <p className="text-2xl font-bold">+87 points</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20 rounded-lg text-center">
                <h4 className="text-sm text-muted-foreground mb-1">Potential Gain</h4>
                <p className="text-2xl font-bold text-green-600">+42 points</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalytics;
