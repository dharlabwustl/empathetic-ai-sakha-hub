
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OverviewKPICard } from '../shared/OverviewKPICard';
import { SmartSuggestionBox } from '../shared/SmartSuggestionBox';
import { BookOpen, Target, TrendingUp, Award, Clock, Brain, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export const ConceptsOverviewTab: React.FC = () => {
  const kpiData = [
    { title: "Total Concepts", value: "156", subtext: "78 Completed, 45 In Progress, 33 Pending", icon: <BookOpen className="h-6 w-6" /> },
    { title: "Today's Target", value: "8", subtext: "5 remaining", icon: <Target className="h-6 w-6" /> },
    { title: "Accuracy %", value: "84%", subtext: "+5% from last week", variant: 'success' as const, icon: <TrendingUp className="h-6 w-6" /> },
    { title: "Study Streak", value: "12", subtext: "days in a row", variant: 'success' as const, icon: <Award className="h-6 w-6" /> }
  ];

  const subjectProgress = [
    { 
      subject: "Physics", 
      completed: 65, 
      total: 85, 
      percentage: 76,
      weakTopics: ["Electromagnetism", "Optics"],
      strongTopics: ["Mechanics", "Thermodynamics"],
      avgTime: "25 min",
      lastStudied: "2 hours ago"
    },
    { 
      subject: "Chemistry", 
      completed: 48, 
      total: 70, 
      percentage: 69,
      weakTopics: ["Organic Chemistry", "Chemical Bonding"],
      strongTopics: ["Inorganic Chemistry"],
      avgTime: "30 min",
      lastStudied: "1 day ago"
    },
    { 
      subject: "Biology", 
      completed: 52, 
      total: 75, 
      percentage: 69,
      weakTopics: ["Genetics", "Evolution"],
      strongTopics: ["Human Physiology", "Plant Biology"],
      avgTime: "22 min",
      lastStudied: "5 hours ago"
    }
  ];

  const recentActivity = [
    { concept: "Newton's Laws of Motion", subject: "Physics", status: "completed", time: "2 hours ago" },
    { concept: "Organic Reactions", subject: "Chemistry", status: "in-progress", time: "1 day ago" },
    { concept: "Cell Division", subject: "Biology", status: "completed", time: "1 day ago" }
  ];

  const suggestions = [
    "Revise Electromagnetism today - 3 concepts pending",
    "Try 2 hard-level concepts from Organic Chemistry",
    "Complete Thermodynamics concepts this week"
  ];

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Physics': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'Chemistry': return 'bg-green-50 border-green-200 text-green-800';
      case 'Biology': return 'bg-purple-50 border-purple-200 text-purple-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <OverviewKPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subject Progress - Enhanced */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                Subject-wise Progress & Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {subjectProgress.map((subject) => (
                <div key={subject.subject} className="space-y-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-lg">{subject.subject}</span>
                      <Badge variant="outline" className={getSubjectColor(subject.subject)}>
                        {subject.percentage}% Complete
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      Last studied: {subject.lastStudied}
                    </div>
                  </div>
                  
                  <Progress value={subject.percentage} className="h-3" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Progress: </span>
                      <span className="font-medium">{subject.completed}/{subject.total} concepts</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Avg Time: </span>
                      <span className="font-medium">{subject.avgTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Study Time</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-700">Strong Topics</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {subject.strongTopics.map((topic, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium text-orange-700">Needs Focus</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {subject.weakTopics.map((topic, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Smart Suggestions */}
          <SmartSuggestionBox suggestions={suggestions} />

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.concept}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={`text-xs ${getSubjectColor(activity.subject)}`}>
                        {activity.subject}
                      </Badge>
                      <Badge variant={activity.status === 'completed' ? 'default' : 'outline'} className="text-xs">
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
