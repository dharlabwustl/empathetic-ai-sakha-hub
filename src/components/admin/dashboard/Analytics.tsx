
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, BookOpen, Brain, Target, Clock, Award } from 'lucide-react';

const Analytics: React.FC = () => {
  const analyticsData = {
    totalStudents: 2543,
    activeToday: 1847,
    totalStudyHours: 12567,
    averageProgress: 78.5,
    completedExams: 4521,
    conceptsLearned: 15678,
    flashcardsCompleted: 28934,
    aiInteractions: 8765
  };

  const topPerformers = [
    { name: 'Aryan Sharma', exam: 'IIT-JEE', score: 94, improvement: '+12%' },
    { name: 'Priya Patel', exam: 'NEET', score: 92, improvement: '+8%' },
    { name: 'Vikram Singh', exam: 'UPSC', score: 89, improvement: '+15%' },
    { name: 'Ananya Desai', exam: 'CAT', score: 87, improvement: '+6%' },
    { name: 'Rahul Kumar', exam: 'IIT-JEE', score: 85, improvement: '+10%' }
  ];

  const examAnalytics = [
    { exam: 'IIT-JEE', students: 1245, avgScore: 76, completion: 85 },
    { exam: 'NEET', students: 987, avgScore: 82, completion: 91 },
    { exam: 'UPSC', students: 234, avgScore: 69, completion: 78 },
    { exam: 'CAT', students: 77, avgScore: 73, completion: 88 }
  ];

  const contentUsage = [
    { type: 'Concept Cards', views: 15678, engagement: 89 },
    { type: 'Flashcards', completions: 28934, retention: 76 },
    { type: 'Practice Tests', attempts: 4521, avgScore: 78 },
    { type: 'Formulas', references: 9876, bookmarks: 3421 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Hours Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalStudyHours.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.averageProgress}%</div>
            <p className="text-xs text-muted-foreground">+5.2% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Interactions</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.aiInteractions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Today's AI queries</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.exam}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{student.score}%</p>
                    <p className="text-xs text-green-600">{student.improvement}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exam Performance Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {examAnalytics.map((exam, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{exam.exam}</span>
                    <div className="text-right text-sm">
                      <div>{exam.students} students</div>
                      <div className="text-gray-500">Avg: {exam.avgScore}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${exam.completion}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">{exam.completion}% completion rate</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Usage Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Content Usage Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contentUsage.map((content, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{content.type}</span>
                  <BookOpen className="h-4 w-4 text-gray-400" />
                </div>
                <div className="space-y-1">
                  {'views' in content && (
                    <div className="text-lg font-bold">{content.views.toLocaleString()}</div>
                  )}
                  {'completions' in content && (
                    <div className="text-lg font-bold">{content.completions.toLocaleString()}</div>
                  )}
                  {'attempts' in content && (
                    <div className="text-lg font-bold">{content.attempts.toLocaleString()}</div>
                  )}
                  {'references' in content && (
                    <div className="text-lg font-bold">{content.references.toLocaleString()}</div>
                  )}
                  <div className="text-sm text-gray-600">
                    {'engagement' in content && `${content.engagement}% engagement`}
                    {'retention' in content && `${content.retention}% retention`}
                    {'avgScore' in content && `${content.avgScore}% avg score`}
                    {'bookmarks' in content && `${content.bookmarks} bookmarks`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Progress Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Progress trends chart will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Engagement Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <Target className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Engagement analytics chart will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
