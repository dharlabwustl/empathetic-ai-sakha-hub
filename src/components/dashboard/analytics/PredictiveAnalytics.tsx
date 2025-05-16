
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Target, AlertCircle, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Mock data for exam readiness forecast
const readinessForecastData = [
  { month: 'Jan', score: 45 },
  { month: 'Feb', score: 52 },
  { month: 'Mar', score: 58 },
  { month: 'Apr', score: 62 }, // Current month
  { month: 'May', projection: 68 },
  { month: 'Jun', projection: 73 },
  { month: 'Jul', projection: 78 },
  { month: 'Aug', projection: 82 },
  { month: 'Sep', projection: 85 },
];

// Subject-wise predictions
const subjectPredictionsData = [
  { subject: 'Physics', current: 62, predicted: 78, benchmark: 85 },
  { subject: 'Chemistry', current: 68, predicted: 82, benchmark: 85 },
  { subject: 'Biology', current: 72, predicted: 86, benchmark: 85 },
];

// Score improvement potential
const improvementPotentialData = [
  { name: 'Current Trajectory', value: 78, color: '#3f51b5' },
  { name: 'Optimization Potential', value: 12, color: '#4caf50' },
  { name: 'Gap to Perfect', value: 10, color: '#e0e0e0' },
];

const PredictiveAnalytics: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
          Predictive Analytics
        </CardTitle>
        <CardDescription>
          Forecast your exam readiness and potential improvements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="forecast" className="w-full">
          <TabsList className="grid grid-cols-3 gap-2 mb-4">
            <TabsTrigger value="forecast">Readiness Forecast</TabsTrigger>
            <TabsTrigger value="subjects">Subject Predictions</TabsTrigger>
            <TabsTrigger value="optimization">Optimization Plan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="forecast" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={readinessForecastData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" name="Actual Score" stroke="#8884d8" strokeWidth={3} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="projection" name="Projected Score" stroke="#82ca9d" strokeDasharray="5 5" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 flex items-center">
                <Target className="mr-2 h-4 w-4" />
                Exam Readiness Projection
              </h4>
              <div className="mt-3">
                <div className="flex justify-between mb-1 text-sm">
                  <span>Current Readiness:</span>
                  <span className="font-medium">62%</span>
                </div>
                <Progress value={62} className="h-2 mb-3" />
                
                <div className="flex justify-between mb-1 text-sm">
                  <span>Projected for Exam Date (Sep):</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2 mb-3" />
                
                <p className="text-sm mt-4">
                  At your current rate of progress, you're projected to reach 85% readiness by your target exam date. This is a strong position, but optimization could further improve your results.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="subjects" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPredictionsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" name="Current Score" fill="#8884d8" />
                  <Bar dataKey="predicted" name="Predicted Score" fill="#82ca9d" />
                  <Bar dataKey="benchmark" name="Target Score" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {subjectPredictionsData.map((subject, index) => (
                <div key={index} className="bg-muted/30 p-4 rounded-lg">
                  <h5 className="font-medium mb-3">{subject.subject}</h5>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Current</span>
                        <span>{subject.current}%</span>
                      </div>
                      <Progress value={subject.current} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Predicted</span>
                        <span className="text-emerald-600 font-medium">{subject.predicted}%</span>
                      </div>
                      <Progress value={subject.predicted} className="h-1.5 bg-emerald-100" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Benchmark</span>
                        <span>{subject.benchmark}%</span>
                      </div>
                      <Progress value={subject.benchmark} className="h-1.5 bg-amber-100" />
                    </div>
                  </div>
                  
                  <div className="mt-4 text-xs text-muted-foreground">
                    {subject.predicted >= subject.benchmark ? (
                      <div className="text-emerald-600">On track to exceed target!</div>
                    ) : (
                      <div className="text-amber-600">Potential gap: {subject.benchmark - subject.predicted}%</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="optimization" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-md mb-3">Score Improvement Potential</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={improvementPotentialData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {improvementPotentialData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-2">
                  <div className="text-2xl font-bold">+12%</div>
                  <div className="text-sm text-muted-foreground">Potential Score Improvement</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-md mb-3">Optimization Recommendations</h4>
                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-800/50">
                    <h5 className="font-medium flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 text-blue-600" />
                      Study Pattern Adjustment
                    </h5>
                    <p className="text-sm mt-1">
                      Increase frequency of practice tests from once to twice weekly to improve test-taking efficiency.
                    </p>
                  </div>
                  
                  <div className="bg-emerald-50 dark:bg-emerald-900/10 p-3 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                    <h5 className="font-medium flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 text-emerald-600" />
                      Content Coverage
                    </h5>
                    <p className="text-sm mt-1">
                      Focus on Optics and Organic Chemistry topics - currently at 55% and 58% mastery respectively.
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/10 p-3 rounded-lg border border-purple-100 dark:border-purple-800/50">
                    <h5 className="font-medium flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 text-purple-600" />
                      Skill Development
                    </h5>
                    <p className="text-sm mt-1">
                      Dedicate 30 minutes daily to time-management exercises to improve exam performance speed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-4">
              <Button className="gap-2">
                Get Detailed Optimization Plan <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PredictiveAnalytics;
