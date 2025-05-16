
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ArrowDown, ArrowUp, CheckCircle, Clock, GraduationCap, Target, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data for exam readiness forecast
const examReadinessData = [
  { date: 'Jan 01', readiness: 25 },
  { date: 'Jan 15', readiness: 30 },
  { date: 'Feb 01', readiness: 40 },
  { date: 'Feb 15', readiness: 45 },
  { date: 'Mar 01', readiness: 55 },
  { date: 'Mar 15', readiness: 60 },
  { date: 'Apr 01', readiness: 65 },
  { date: 'Apr 15', readiness: 72 },
  { date: 'Today', readiness: 76 },
  { date: 'May 15', readiness: 82, predicted: true },
  { date: 'Jun 01', readiness: 88, predicted: true },
  { date: 'Jun 15', readiness: 92, predicted: true },
  { date: 'Exam', readiness: 95, predicted: true },
];

// Subject-wise predictions
const subjectPredictions = [
  { name: 'Physics', current: 68, predicted: 85, weight: 30 },
  { name: 'Chemistry', current: 72, predicted: 88, weight: 30 },
  { name: 'Biology', current: 58, predicted: 80, weight: 30 },
  { name: 'Mathematics', current: 65, predicted: 82, weight: 10 },
];

// Score distribution prediction
const scoreDistributionData = [
  { range: '300-400', probability: 5 },
  { range: '400-500', probability: 15 },
  { range: '500-600', probability: 40 },
  { range: '600-700', probability: 30 },
  { range: '700+', probability: 10 },
];

const COLORS = ['#f87171', '#fb923c', '#facc15', '#a3e635', '#4ade80'];

// Optimization recommendations
const optimizationRecommendations = [
  { 
    id: 1,
    subject: 'Biology',
    topic: 'Human Physiology',
    currentScore: 45,
    potentialImprovement: 35,
    timeRequired: '15-20 hours',
    impact: 'high'
  },
  { 
    id: 2,
    subject: 'Physics',
    topic: 'Electromagnetism',
    currentScore: 52,
    potentialImprovement: 30,
    timeRequired: '12-15 hours',
    impact: 'high'
  },
  { 
    id: 3,
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    currentScore: 60,
    potentialImprovement: 25,
    timeRequired: '10-12 hours',
    impact: 'medium'
  },
];

// Custom tooltip for readiness chart
const ReadinessTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-md">
        <p className="font-medium">{payload[0].payload.date}</p>
        <p className="text-sm">
          <span className="font-medium">Readiness: </span>
          <span>{payload[0].value}%</span>
        </p>
        {payload[0].payload.predicted && (
          <p className="text-xs text-blue-500 mt-1 italic">Predicted value</p>
        )}
      </div>
    );
  }
  return null;
};

const PredictiveAnalytics = () => {
  // Calculate current average exam readiness
  const currentReadiness = examReadinessData.find(item => item.date === 'Today')?.readiness || 0;
  
  // Calculate predicted final score
  const predictedFinalScore = Math.round(
    subjectPredictions.reduce((acc, subject) => {
      return acc + (subject.predicted * (subject.weight / 100));
    }, 0) * 7.2
  );
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Predictive Analytics</h2>
      <p className="text-muted-foreground">
        AI-powered forecasting of your exam performance based on current trajectory
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center gap-2">
              <Target className="h-4 w-4" />
              Current Exam Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{currentReadiness}%</div>
            <div className="mt-2">
              <Progress value={currentReadiness} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
              <ArrowUp className="h-3 w-3 text-green-500" />
              <span>Up 16% from last month</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Projected Final Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{predictedFinalScore}/720</div>
            <div className="mt-2">
              <Progress value={(predictedFinalScore/720)*100} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Based on your current learning trajectory
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Days to Target Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">48 days</div>
            <p className="text-sm text-muted-foreground mt-2">
              To reach 90% exam readiness
            </p>
            <Badge variant="outline" className="mt-2">On track</Badge>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Exam Readiness Forecast</CardTitle>
          <CardDescription>
            Projected readiness level leading up to your exam date
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={examReadinessData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorReadiness" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<ReadinessTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="readiness" 
                  stroke="#8884d8" 
                  fillOpacity={1} 
                  fill="url(#colorReadiness)" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
              <span className="text-sm">Actual Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-300 rounded-full"></div>
              <span className="text-sm">Predicted Progress</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Predictions</CardTitle>
            <CardDescription>
              Current and predicted scores for each subject
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {subjectPredictions.map((subject) => (
                <div key={subject.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{subject.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Weight: {subject.weight}%
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-full space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Current: {subject.current}%</span>
                        <span>Predicted: {subject.predicted}%</span>
                      </div>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div 
                            style={{ width: `${subject.current}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          ></div>
                        </div>
                        <div 
                          style={{ width: `${subject.predicted}%` }}
                          className="h-2 absolute top-1 left-0 rounded border-2 border-indigo-500 bg-transparent"
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm flex items-center whitespace-nowrap">
                      <ArrowUp className="h-4 w-4 text-green-500" />
                      <span>{subject.predicted - subject.current}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Predicted Score Distribution</CardTitle>
            <CardDescription>
              Likelihood of scoring within different ranges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex justify-center">
              <ResponsiveContainer width="70%" height="100%">
                <PieChart>
                  <Pie
                    data={scoreDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="probability"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {scoreDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 flex-wrap mt-4">
              {scoreDistributionData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-xs">{entry.range}: {entry.probability}%</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
              <p>Based on current trajectory, you have a 40% chance of scoring in the 500-600 range, with a 30% chance of scoring 600-700.</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Optimization Recommendations</CardTitle>
          <CardDescription>
            Focus areas with the highest potential for score improvement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {optimizationRecommendations.map((rec) => (
              <div key={rec.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{rec.topic}</h3>
                    <p className="text-sm text-muted-foreground">
                      {rec.subject} • Current: {rec.currentScore}% • Potential: {rec.currentScore + rec.potentialImprovement}%
                    </p>
                  </div>
                  <Badge variant={rec.impact === 'high' ? 'default' : 'outline'} className="capitalize">
                    {rec.impact} impact
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 my-3">
                  <div className="w-full">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Current</span>
                      <span>Potential</span>
                    </div>
                    <div className="relative h-2 w-full bg-gray-200 rounded">
                      <div 
                        className="absolute h-2 bg-blue-500 rounded"
                        style={{ width: `${rec.currentScore}%` }}
                      ></div>
                      <div 
                        className="absolute h-2 border-2 border-green-500 rounded bg-transparent"
                        style={{ width: `${rec.currentScore + rec.potentialImprovement}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-green-500 font-medium flex items-center whitespace-nowrap">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+{rec.potentialImprovement}%</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Estimated effort: {rec.timeRequired}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20">
                    15 Concept Cards
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20">
                    8 Practice Tests
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20">
                    4 Formula Labs
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Score Maximization Strategy</h3>
            <p className="text-sm mb-3">
              By focusing on the recommended areas, you can potentially increase your score by 65-80 points, 
              moving your projected final score from 545 to 610-625.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">Dedicate 60% of your remaining study time to the three priority areas identified above</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">Increase practice test frequency to once every 5 days</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">Use the Formula Lab 3 times per week for Physics and Chemistry topics</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalytics;
