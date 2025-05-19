
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Target, AlertTriangle, Calendar, Gauge, Lightbulb, Calculator } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Slider } from '@/components/ui/slider';

// Mock exam readiness forecast data
const readinessForecastData = [
  { week: 'Current', readiness: 65, projected: 65 },
  { week: 'Week 1', readiness: null, projected: 70 },
  { week: 'Week 2', readiness: null, projected: 75 },
  { week: 'Week 3', readiness: null, projected: 79 },
  { week: 'Week 4', readiness: null, projected: 83 },
  { week: 'Week 5', readiness: null, projected: 86 },
  { week: 'Week 6', readiness: null, projected: 89 },
  { week: 'Week 7', readiness: null, projected: 91 },
  { week: 'Week 8', readiness: null, projected: 93 }
];

// Mock subject-wise predictions data
const subjectPredictionsData = [
  { subject: 'Physics', currentScore: 68, projectedScore: 82, maxPotential: 92, weightage: 0.25 },
  { subject: 'Chemistry', currentScore: 62, projectedScore: 78, maxPotential: 88, weightage: 0.25 },
  { subject: 'Mathematics', currentScore: 72, projectedScore: 85, maxPotential: 95, weightage: 0.25 },
  { subject: 'Biology', currentScore: 70, projectedScore: 81, maxPotential: 90, weightage: 0.25 }
];

// Mock time allocation optimization data
const timeAllocationData = [
  { subject: 'Physics', currentHours: 8, recommendedHours: 10, potentialGain: 14 },
  { subject: 'Chemistry', currentHours: 6, recommendedHours: 12, potentialGain: 16 },
  { subject: 'Mathematics', currentHours: 10, recommendedHours: 9, potentialGain: 8 },
  { subject: 'Biology', currentHours: 7, recommendedHours: 8, potentialGain: 10 }
];

// Mock exam simulation data
const examSimulationData = {
  overallScore: 72,
  timeManagement: 65,
  accuracyRate: 78,
  attemptRate: 85,
  subjectBreakdown: [
    { subject: 'Physics', score: 68, national: 64 },
    { subject: 'Chemistry', score: 62, national: 68 },
    { subject: 'Mathematics', score: 72, national: 66 },
    { subject: 'Biology', score: 70, national: 67 }
  ]
};

// Mock risk factors data
const riskFactorsData = {
  overall: 'moderate',
  factors: [
    { 
      factor: 'Time Management', 
      risk: 'high', 
      description: 'You tend to spend too much time on difficult questions',
      recommendation: 'Practice timed sections and set strict time limits per question type'
    },
    { 
      factor: 'Chemistry Weak Areas', 
      risk: 'high', 
      description: 'Organic chemistry concepts remain below threshold',
      recommendation: 'Allocate 30% more time to organic chemistry with focus on reaction mechanisms'
    },
    { 
      factor: 'Test Anxiety', 
      risk: 'medium', 
      description: 'Performance drops under timed test conditions',
      recommendation: 'Regular simulated exam practice and mindfulness techniques before exams'
    },
    { 
      factor: 'Concept Application', 
      risk: 'medium', 
      description: 'Struggles with applying concepts to new problem types',
      recommendation: 'Focus on varied practice problems that apply same concepts in different contexts'
    }
  ]
};

// Mock optimization recommendations data
const optimizationRecommendationsData = [
  { 
    id: 1,
    category: 'Study Focus',
    title: 'Organic Chemistry Deep Dive',
    description: 'Increase focus on reaction mechanisms and structural analysis',
    impact: 'high',
    timeInvestment: 'medium',
    potentialGain: '+6% in Chemistry'
  },
  { 
    id: 2,
    category: 'Technique',
    title: 'Physics Problem Solving Strategy',
    description: 'Implement the 3-step approach: Analyze, Apply, Answer',
    impact: 'high',
    timeInvestment: 'low',
    potentialGain: '+8% in Physics'
  },
  { 
    id: 3,
    category: 'Practice',
    title: 'Weekly Mock Test Regiment',
    description: 'Complete one full-length practice test every weekend',
    impact: 'medium',
    timeInvestment: 'high',
    potentialGain: '+5% Overall Score'
  },
  { 
    id: 4,
    category: 'Technique',
    title: 'Formula Mastery Program',
    description: 'Daily practice of derivation and application of key formulas',
    impact: 'medium',
    timeInvestment: 'medium',
    potentialGain: '+4% in Mathematics'
  }
];

// Colors for the charts
const COLORS = ['#4ade80', '#f87171', '#60a5fa', '#fbbf24'];

const PredictiveAnalytics = () => {
  const [activeTab, setActiveTab] = useState('readiness-forecast');
  const [timeRange, setTimeRange] = useState('2-months');
  const [studyHoursPerDay, setStudyHoursPerDay] = useState([4]);
  const [weeksTillExam, setWeeksTillExam] = useState([12]);
  
  // Calculate adjusted readiness based on study hours
  const hoursFactor = studyHoursPerDay[0] / 4; // baseline is 4 hours
  const timeFactor = (24 - weeksTillExam[0]) / 12; // adjust based on time pressure
  
  // Calculate combined factor (more study time and more weeks = better readiness)
  const adjustmentFactor = hoursFactor * (1 - timeFactor * 0.5);
  
  // Apply adjustment to projected scores (max adjustment ±10%)
  const adjustedReadiness = readinessForecastData.map(item => ({
    ...item,
    projected: item.projected ? Math.min(99, Math.max(40, Math.round(item.projected * adjustmentFactor))) : null
  }));
  
  // Calculate overall projected score
  const overallProjectedScore = Math.round(
    subjectPredictionsData.reduce((acc, subject) => acc + (subject.projectedScore * subject.weightage), 0)
  );
  
  // Calculate adjusted overall projected score
  const adjustedProjectedScore = Math.round(overallProjectedScore * adjustmentFactor);
  
  // Calculate days to target (90% readiness)
  const daysToTarget = Math.round((90 - examSimulationData.overallScore) / (adjustmentFactor * 0.5) * 7);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Predictive Analytics</h2>
          <p className="text-muted-foreground">AI-powered predictions and optimization recommendations</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={timeRange === '1-month' ? 'default' : 'outline'}
            onClick={() => setTimeRange('1-month')}
          >
            1 Month
          </Button>
          <Button
            size="sm"
            variant={timeRange === '2-months' ? 'default' : 'outline'}
            onClick={() => setTimeRange('2-months')}
          >
            2 Months
          </Button>
          <Button
            size="sm"
            variant={timeRange === 'till-exam' ? 'default' : 'outline'}
            onClick={() => setTimeRange('till-exam')}
          >
            Till Exam
          </Button>
        </div>
      </div>
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Gauge className="h-4 w-4 mr-2 text-violet-500" />
              Current Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-baseline">
              <div className="text-3xl font-bold">{examSimulationData.overallScore}%</div>
              <div className="text-sm text-amber-600">
                Moderate
              </div>
            </div>
            <Progress 
              value={examSimulationData.overallScore} 
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
              Projected Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-baseline">
              <div className="text-3xl font-bold">{adjustedProjectedScore}%</div>
              <div className="text-sm text-green-600">
                +{adjustedProjectedScore - examSimulationData.overallScore}%
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Based on your current study patterns and effort
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-blue-500" />
              Days to Target
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-baseline">
              <div className="text-3xl font-bold">{daysToTarget}</div>
              <div className="text-sm text-muted-foreground">
                To reach 90%
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              With {studyHoursPerDay}h/day study commitment
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-lg p-6 bg-blue-50 dark:bg-blue-900/20">
        <h3 className="text-lg font-medium mb-4">Adjust Prediction Variables</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Study Hours Per Day</label>
              <span className="text-sm font-medium">{studyHoursPerDay[0]} hours</span>
            </div>
            <Slider 
              value={studyHoursPerDay}
              min={1}
              max={10}
              step={0.5}
              onValueChange={setStudyHoursPerDay}
              className="mb-6"
            />
            <div className="text-xs text-muted-foreground">
              Higher study hours lead to faster progress and better outcomes.
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Weeks Till Exam</label>
              <span className="text-sm font-medium">{weeksTillExam[0]} weeks</span>
            </div>
            <Slider 
              value={weeksTillExam}
              min={4}
              max={24}
              step={1}
              onValueChange={setWeeksTillExam}
              className="mb-6"
            />
            <div className="text-xs text-muted-foreground">
              Adjusting this helps provide more accurate time-based predictions.
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="readiness-forecast" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Readiness Forecast</span>
          </TabsTrigger>
          <TabsTrigger value="subject-predictions" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span>Subject Predictions</span>
          </TabsTrigger>
          <TabsTrigger value="optimization" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Score Optimization</span>
          </TabsTrigger>
          <TabsTrigger value="risk-analysis" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Risk Analysis</span>
          </TabsTrigger>
        </TabsList>

        {/* Readiness Forecast Tab */}
        <TabsContent value="readiness-forecast">
          <Card>
            <CardHeader>
              <CardTitle>Exam Readiness Projection</CardTitle>
              <CardDescription>
                Your projected exam readiness over time based on current progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={adjustedReadiness}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis type="number" domain={[40, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="readiness" 
                      name="Actual Readiness" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="projected" 
                      name="Projected Readiness" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 4 }}
                    />
                    {/* Add threshold line for passing */}
                    <Line 
                      name="Target Score"
                      type="monotone"
                      dataKey={() => 90} 
                      stroke="#ff8042"
                      strokeWidth={1}
                      strokeDasharray="3 3"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Projection Insights</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500 mt-1"></div>
                      <span>You're projected to reach 90% readiness in <strong>{daysToTarget} days</strong> at current pace</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500 mt-1"></div>
                      <span>Increasing daily study time by 1 hour could reduce this to <strong>{Math.round(daysToTarget * 0.85)} days</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500 mt-1"></div>
                      <span>Expected improvement rate: <strong>{Math.round((adjustedReadiness[8].projected - adjustedReadiness[0].projected) / 8)}% per week</strong></span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Critical Milestones</h4>
                  <div className="space-y-3">
                    <div className="border-b pb-2">
                      <div className="flex justify-between text-sm">
                        <span>75% Readiness</span>
                        <span className="font-medium">~{Math.round((75 - examSimulationData.overallScore) / ((adjustedReadiness[8].projected - adjustedReadiness[0].projected) / 8 / 7))} days</span>
                      </div>
                      <Progress value={Math.min(100, ((examSimulationData.overallScore - 50) / (75 - 50)) * 100)} className="h-1.5 mt-1" />
                    </div>
                    <div className="border-b pb-2">
                      <div className="flex justify-between text-sm">
                        <span>85% Readiness</span>
                        <span className="font-medium">~{Math.round((85 - examSimulationData.overallScore) / ((adjustedReadiness[8].projected - adjustedReadiness[0].projected) / 8 / 7))} days</span>
                      </div>
                      <Progress value={Math.min(100, ((examSimulationData.overallScore - 50) / (85 - 50)) * 100)} className="h-1.5 mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>90% Readiness (Target)</span>
                        <span className="font-medium">~{daysToTarget} days</span>
                      </div>
                      <Progress value={Math.min(100, ((examSimulationData.overallScore - 50) / (90 - 50)) * 100)} className="h-1.5 mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subject-wise Predictions Tab */}
        <TabsContent value="subject-predictions">
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Score Predictions</CardTitle>
              <CardDescription>
                Detailed breakdown of expected scores across subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-right">Current Score</TableHead>
                    <TableHead className="text-right">Projected Score</TableHead>
                    <TableHead className="text-right">Maximum Potential</TableHead>
                    <TableHead className="text-right">Weightage</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjectPredictionsData.map((subject) => (
                    <TableRow key={subject.subject}>
                      <TableCell className="font-medium">{subject.subject}</TableCell>
                      <TableCell className="text-right">{subject.currentScore}%</TableCell>
                      <TableCell className="text-right font-medium">{subject.projectedScore}%</TableCell>
                      <TableCell className="text-right">{subject.maxPotential}%</TableCell>
                      <TableCell className="text-right">{subject.weightage * 100}%</TableCell>
                      <TableCell>
                        <div>
                          <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${(subject.projectedScore / subject.maxPotential) * 100}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span>{Math.round((subject.projectedScore - subject.currentScore) / subject.currentScore * 100)}% growth</span>
                            <span>{Math.round((subject.projectedScore / subject.maxPotential) * 100)}% of potential</span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium mb-4">Score Distribution</h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={subjectPredictionsData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="projectedScore"
                          nameKey="subject"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {subjectPredictionsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Growth Potential by Subject</h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={subjectPredictionsData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="subject" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="currentScore" name="Current Score" fill="#8884d8" />
                        <Bar dataKey="projectedScore" name="Projected Score" fill="#82ca9d" />
                        <Bar dataKey="maxPotential" name="Maximum Potential" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 border-t pt-4">
                <h4 className="font-medium text-lg mb-3">Insights & Recommendations</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="mt-1 bg-blue-100 text-blue-700 rounded-full p-0.5">
                      <Lightbulb className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="font-medium">Your strongest predicted subject is Mathematics at {subjectPredictionsData[2].projectedScore}%</p>
                      <p className="text-muted-foreground">Focus on maintaining this strength while addressing other areas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-1 bg-blue-100 text-blue-700 rounded-full p-0.5">
                      <Lightbulb className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="font-medium">Chemistry shows the largest gap between current and potential scores</p>
                      <p className="text-muted-foreground">Targeted effort here will yield the highest overall improvement</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-1 bg-blue-100 text-blue-700 rounded-full p-0.5">
                      <Lightbulb className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="font-medium">Adjusted prediction based on {studyHoursPerDay}h/day: {adjustedProjectedScore}% overall</p>
                      <p className="text-muted-foreground">Increasing to {Math.min(10, studyHoursPerDay[0] + 1)}h/day could raise this to approximately {Math.round(adjustedProjectedScore * (studyHoursPerDay[0] + 1) / studyHoursPerDay[0])}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Optimization Tab */}
        <TabsContent value="optimization">
          <Card>
            <CardHeader>
              <CardTitle>Score Optimization Recommendations</CardTitle>
              <CardDescription>
                Strategic adjustments to maximize your exam score potential
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Study Time Allocation Optimization</h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={timeAllocationData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="subject" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="currentHours" name="Current Weekly Hours" fill="#8884d8" />
                        <Bar dataKey="recommendedHours" name="Recommended Hours" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {timeAllocationData.map((item) => (
                      <Card key={item.subject}>
                        <CardContent className="p-3">
                          <div className="text-xs text-muted-foreground">{item.subject}</div>
                          <div className="text-base font-bold mt-1">
                            {item.currentHours} → {item.recommendedHours} hrs
                          </div>
                          <div className={`text-xs mt-1 ${item.recommendedHours > item.currentHours ? 'text-green-600' : 'text-blue-600'}`}>
                            {item.recommendedHours > item.currentHours 
                              ? `+${item.recommendedHours - item.currentHours} hours needed` 
                              : `${item.currentHours - item.recommendedHours} hours to reallocate`}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-medium mb-4">Strategic Focus Areas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {optimizationRecommendationsData.map((rec) => (
                      <div 
                        key={rec.id}
                        className="border rounded-lg p-4 bg-white dark:bg-gray-800"
                      >
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="mb-2">{rec.category}</Badge>
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-muted-foreground">Impact:</span>
                            <span className={`font-medium ${
                              rec.impact === 'high' ? 'text-green-600' : 
                              rec.impact === 'medium' ? 'text-amber-600' : 'text-blue-600'
                            }`}>
                              {rec.impact}
                            </span>
                          </div>
                        </div>
                        <h5 className="font-medium">{rec.title}</h5>
                        <p className="text-sm text-muted-foreground my-2">{rec.description}</p>
                        <div className="flex justify-between text-xs mt-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">Time: {rec.timeInvestment}</span>
                          </div>
                          <div className="text-green-600 font-medium">{rec.potentialGain}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline">Save Recommendations</Button>
              <Button>Generate Custom Plan</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Risk Analysis Tab */}
        <TabsContent value="risk-analysis">
          <Card>
            <CardHeader>
              <CardTitle>Exam Performance Risk Analysis</CardTitle>
              <CardDescription>
                Identification of potential challenges and mitigation strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="border-t-4 border-t-amber-500">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Overall Risk Level</h4>
                      <Badge className="capitalize bg-amber-100 text-amber-800 hover:bg-amber-200">
                        {riskFactorsData.overall}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm">
                      Based on analysis of your performance patterns, study habits, and current knowledge gaps
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-t-4 border-t-blue-500">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Critical Risk Factors</h4>
                      <span className="text-lg font-bold">{riskFactorsData.factors.filter(f => f.risk === 'high').length}</span>
                    </div>
                    <p className="mt-2 text-sm">
                      Identified high-priority areas that require immediate attention
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-t-4 border-t-green-500">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Mitigation Score</h4>
                      <span className="text-lg font-bold">78%</span>
                    </div>
                    <p className="mt-2 text-sm">
                      Percentage of risks that can be effectively mitigated before exam
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-5 mt-8">
                <h4 className="text-lg font-medium mb-4">Risk Factors and Mitigation</h4>
                {riskFactorsData.factors.map((factor, index) => (
                  <div 
                    key={index}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className={`px-4 py-3 flex justify-between items-center border-b ${
                      factor.risk === 'high' ? 'bg-red-50 dark:bg-red-900/20' : 
                      factor.risk === 'medium' ? 'bg-amber-50 dark:bg-amber-900/20' : 
                      'bg-yellow-50 dark:bg-yellow-900/20'
                    }`}
                    >
                      <h5 className="font-medium">{factor.factor}</h5>
                      <Badge className={`capitalize ${
                        factor.risk === 'high' ? 'bg-red-100 text-red-800 hover:bg-red-200' : 
                        factor.risk === 'medium' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 
                        'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      }`}>
                        {factor.risk} risk
                      </Badge>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-sm font-medium mb-1">Issue Analysis</h6>
                        <p className="text-sm text-muted-foreground">
                          {factor.description}
                        </p>
                      </div>
                      <div>
                        <h6 className="text-sm font-medium mb-1">Recommended Mitigation</h6>
                        <p className="text-sm text-muted-foreground">
                          {factor.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 border-t pt-6">
                <h4 className="font-medium text-lg mb-4">Performance in Simulated Exams</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">Overall Score</div>
                      <div className="text-2xl font-bold mt-1">{examSimulationData.overallScore}%</div>
                      <div className="text-xs mt-1">
                        <span className="text-green-600">+3%</span> from last attempt
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">Time Management</div>
                      <div className="text-2xl font-bold mt-1">{examSimulationData.timeManagement}%</div>
                      <div className="text-xs mt-1 text-amber-600">
                        Needs improvement
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                      <div className="text-2xl font-bold mt-1">{examSimulationData.accuracyRate}%</div>
                      <div className="text-xs mt-1 text-green-600">
                        Above average
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">Attempt Rate</div>
                      <div className="text-2xl font-bold mt-1">{examSimulationData.attemptRate}%</div>
                      <div className="text-xs mt-1 text-green-600">
                        Good coverage
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={examSimulationData.subjectBreakdown}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" name="Your Score" fill="#8884d8" />
                      <Bar dataKey="national" name="National Average" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button>
                Schedule Mock Test
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictiveAnalytics;
