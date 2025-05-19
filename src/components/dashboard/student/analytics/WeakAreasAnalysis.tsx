
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowUpRight, Book, Calendar, Clock, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const WeakAreasAnalysis: React.FC = () => {
  // Mock data for weak areas
  const weakAreasData = [
    { topic: 'Organic Chemistry', mastery: 35, priority: 'high', trend: 'improving' },
    { topic: 'Thermodynamics', mastery: 40, priority: 'high', trend: 'stable' },
    { topic: 'Electromagnetism', mastery: 42, priority: 'medium', trend: 'improving' },
    { topic: 'Cellular Biology', mastery: 45, priority: 'medium', trend: 'declining' },
    { topic: 'Mechanics', mastery: 48, priority: 'low', trend: 'improving' },
  ];

  // Mock data for progress tracking
  const progressData = [
    { week: 'Week 1', organicChemistry: 20, thermodynamics: 25, electromagnetism: 30 },
    { week: 'Week 2', organicChemistry: 23, thermodynamics: 28, electromagnetism: 35 },
    { week: 'Week 3', organicChemistry: 27, thermodynamics: 30, electromagnetism: 38 },
    { week: 'Week 4', organicChemistry: 30, thermodynamics: 33, electromagnetism: 40 },
    { week: 'Week 5', organicChemistry: 35, thermodynamics: 35, electromagnetism: 42 },
  ];

  // Mock data for improvement plans
  const improvementPlans = [
    {
      topic: 'Organic Chemistry',
      actions: [
        { action: 'Complete concept cards 1-5', timeRequired: '45 mins', dueDate: '2 days' },
        { action: 'Practice 20 reaction mechanisms', timeRequired: '60 mins', dueDate: '3 days' },
        { action: 'Take practice test', timeRequired: '30 mins', dueDate: '5 days' }
      ]
    },
    {
      topic: 'Thermodynamics',
      actions: [
        { action: 'Review fundamental laws', timeRequired: '30 mins', dueDate: '1 day' },
        { action: 'Solve problem set #3', timeRequired: '45 mins', dueDate: '3 days' },
        { action: 'Watch video lecture on entropy', timeRequired: '20 mins', dueDate: '2 days' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Improvement Areas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Priority Improvement Areas</CardTitle>
            <CardDescription>
              Topics that need immediate attention based on current mastery and exam importance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weakAreasData.map((area) => (
                <div key={area.topic} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{area.topic}</span>
                      <Badge variant={area.priority === 'high' 
                        ? 'destructive' 
                        : area.priority === 'medium' 
                          ? 'default' 
                          : 'outline'}>
                        {area.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="mr-2">{area.mastery}%</span>
                      <span className={`flex items-center ${
                        area.trend === 'improving' 
                          ? 'text-green-500' 
                          : area.trend === 'declining' 
                            ? 'text-red-500' 
                            : 'text-amber-500'
                      }`}>
                        {area.trend === 'improving' && <ArrowUpRight size={14} />}
                        {area.trend === 'declining' && <span className="rotate-180 inline-block"><ArrowUpRight size={14} /></span>}
                        {area.trend === 'stable' && <span className="inline-block">→</span>}
                      </span>
                    </div>
                  </div>
                  <Progress value={area.mastery} className="h-2" />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full">View Detailed Analysis</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Progress Tracking Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Progress Tracking</CardTitle>
            <CardDescription>
              Weekly improvement in your previously identified weak areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="organicChemistry" name="Organic Chemistry" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="thermodynamics" name="Thermodynamics" stroke="#82ca9d" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="electromagnetism" name="Electromagnetism" stroke="#ff7300" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Consistent improvement in Organic Chemistry (15% gain). Keep using the current strategy.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personalized Improvement Plans */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Personalized Improvement Plans</CardTitle>
          <CardDescription>
            Tailored recommendations for addressing your weak areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {improvementPlans.map((plan, index) => (
              <div key={index}>
                <div className="flex items-center gap-2 mb-3">
                  <Book className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">{plan.topic}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {plan.actions.map((action, actionIndex) => (
                    <Card key={actionIndex} className="border border-gray-100 dark:border-gray-800">
                      <CardContent className="p-4">
                        <div className="text-sm font-medium mb-2">{action.action}</div>
                        <div className="flex items-center text-xs text-muted-foreground mb-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{action.timeRequired}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Due in {action.dueDate}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button variant="default" className="w-full">Add These Tasks to Study Plan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeakAreasAnalysis;
