
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp, Target, AlertCircle } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface WeightageAnalysisProps {
  subjects: StudyPlanSubject[];
}

const WeightageAnalysis: React.FC<WeightageAnalysisProps> = ({ subjects }) => {
  // Mock weightage data for visualization
  const subjectWeightage = [
    { subject: 'Physics', weightage: 35, completed: 60, color: '#8B5CF6' },
    { subject: 'Chemistry', weightage: 35, completed: 45, color: '#10B981' },
    { subject: 'Mathematics', weightage: 30, completed: 75, color: '#F59E0B' }
  ];

  const topicWeightage = [
    { topic: 'Mechanics', subject: 'Physics', weightage: 25, importance: 95, status: 'completed' },
    { topic: 'Organic Chemistry', subject: 'Chemistry', weightage: 40, importance: 90, status: 'in-progress' },
    { topic: 'Calculus', subject: 'Mathematics', weightage: 35, importance: 95, status: 'completed' },
    { topic: 'Electromagnetism', subject: 'Physics', weightage: 30, importance: 85, status: 'pending' },
    { topic: 'Physical Chemistry', subject: 'Chemistry', weightage: 35, importance: 85, status: 'in-progress' }
  ];

  const COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'in-progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const overallWeightageCompleted = subjectWeightage.reduce((sum, subject) => 
    sum + (subject.weightage * subject.completed / 100), 0
  );

  return (
    <div className="space-y-6">
      {/* Overall Weightage Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Overall Weightage Analysis
          </CardTitle>
          <CardDescription>
            Exam preparation progress based on topic weightage and importance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Math.round(overallWeightageCompleted)}%
              </div>
              <div className="text-sm text-gray-600">Weightage Completed</div>
              <Progress value={overallWeightageCompleted} className="mt-2 h-2" />
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {topicWeightage.filter(t => t.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">High-Weight Topics Done</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {topicWeightage.filter(t => t.importance >= 90 && t.status !== 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Critical Topics Pending</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Weightage Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Subject Weightage Distribution</CardTitle>
            <CardDescription>Exam weightage allocation across subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectWeightage}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ subject, weightage }) => `${subject}: ${weightage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="weightage"
                  >
                    {subjectWeightage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Progress vs Weightage */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Progress vs Weightage</CardTitle>
            <CardDescription>Completion progress compared to exam weightage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectWeightage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="weightage" fill="#8884d8" name="Exam Weightage %" />
                  <Bar dataKey="completed" fill="#82ca9d" name="Completed %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* High-Priority Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-red-600" />
            High-Weight Topics Analysis
          </CardTitle>
          <CardDescription>
            Topics with highest exam weightage and importance scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topicWeightage
              .sort((a, b) => (b.weightage * b.importance) - (a.weightage * a.importance))
              .map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium">{topic.topic}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {topic.subject}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(topic.status)}>
                        {topic.status.replace('-', ' ')}
                      </Badge>
                      {topic.importance >= 90 && topic.status !== 'completed' && (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Critical
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>Exam Weightage: <span className="font-medium text-blue-600">{topic.weightage}%</span></div>
                      <div>Importance Score: <span className="font-medium text-amber-600">{topic.importance}%</span></div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      {Math.round(topic.weightage * topic.importance / 100)}
                    </div>
                    <div className="text-xs text-gray-500">Priority Score</div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeightageAnalysis;
