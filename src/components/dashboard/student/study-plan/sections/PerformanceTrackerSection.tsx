
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, TrendingUp, Target, BarChart3, Clock } from 'lucide-react';

export const PerformanceTrackerSection = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');

  const overallStats = {
    averageScore: 78,
    improvement: 12,
    studyStreak: 15,
    totalHours: 245,
    conceptsMastered: 156,
    totalConcepts: 240
  };

  const subjectPerformance = [
    {
      subject: 'Physics',
      currentScore: 72,
      previousScore: 65,
      improvement: 7,
      hoursStudied: 85,
      conceptsMastered: 45,
      totalConcepts: 80,
      weakAreas: ['Thermodynamics', 'Modern Physics'],
      strongAreas: ['Mechanics', 'Electromagnetism']
    },
    {
      subject: 'Chemistry',
      currentScore: 68,
      previousScore: 58,
      improvement: 10,
      hoursStudied: 75,
      conceptsMastered: 38,
      totalConcepts: 70,
      weakAreas: ['Organic Chemistry', 'Chemical Kinetics'],
      strongAreas: ['Inorganic Chemistry']
    },
    {
      subject: 'Biology',
      currentScore: 85,
      previousScore: 80,
      improvement: 5,
      hoursStudied: 85,
      conceptsMastered: 73,
      totalConcepts: 90,
      weakAreas: ['Genetics'],
      strongAreas: ['Human Physiology', 'Plant Biology', 'Ecology']
    }
  ];

  const recentTests = [
    {
      date: '2024-06-01',
      subject: 'Physics',
      topic: 'Thermodynamics',
      score: 75,
      totalQuestions: 20,
      timeTaken: 35
    },
    {
      date: '2024-05-30',
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      score: 65,
      totalQuestions: 25,
      timeTaken: 42
    },
    {
      date: '2024-05-28',
      subject: 'Biology',
      topic: 'Genetics',
      score: 88,
      totalQuestions: 30,
      timeTaken: 38
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Performance Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Overall Performance Summary */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <Card>
              <CardContent className="p-3 text-center">
                <BarChart3 className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                <div className="text-xs text-gray-600">Avg Score</div>
                <div className="text-lg font-bold">{overallStats.averageScore}%</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3 text-center">
                <TrendingUp className="h-4 w-4 mx-auto mb-1 text-green-600" />
                <div className="text-xs text-gray-600">Improvement</div>
                <div className="text-lg font-bold">+{overallStats.improvement}%</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3 text-center">
                <Target className="h-4 w-4 mx-auto mb-1 text-purple-600" />
                <div className="text-xs text-gray-600">Study Streak</div>
                <div className="text-lg font-bold">{overallStats.studyStreak} days</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3 text-center">
                <Clock className="h-4 w-4 mx-auto mb-1 text-orange-600" />
                <div className="text-xs text-gray-600">Total Hours</div>
                <div className="text-lg font-bold">{overallStats.totalHours}h</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3 text-center">
                <Award className="h-4 w-4 mx-auto mb-1 text-yellow-600" />
                <div className="text-xs text-gray-600">Concepts</div>
                <div className="text-lg font-bold">{overallStats.conceptsMastered}/{overallStats.totalConcepts}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3 text-center">
                <div className="text-xs text-gray-600">Mastery</div>
                <div className="text-lg font-bold">{Math.round((overallStats.conceptsMastered / overallStats.totalConcepts) * 100)}%</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="subjects" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="subjects">Subject Performance</TabsTrigger>
              <TabsTrigger value="tests">Recent Tests</TabsTrigger>
            </TabsList>

            <TabsContent value="subjects">
              <div className="space-y-4">
                {subjectPerformance.map((subject, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">{subject.subject}</h3>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={subject.improvement > 8 ? "default" : subject.improvement > 5 ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            +{subject.improvement}% improvement
                          </Badge>
                          <div className="text-lg font-bold">{subject.currentScore}%</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Current Progress</div>
                          <Progress value={subject.currentScore} className="h-2" />
                          <div className="text-xs text-gray-500 mt-1">Score: {subject.currentScore}%</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Concepts Mastered</div>
                          <Progress value={(subject.conceptsMastered / subject.totalConcepts) * 100} className="h-2" />
                          <div className="text-xs text-gray-500 mt-1">{subject.conceptsMastered}/{subject.totalConcepts}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Study Hours</div>
                          <div className="text-lg font-semibold">{subject.hoursStudied}h</div>
                          <div className="text-xs text-gray-500">Total studied</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-red-600 mb-2">Areas to Improve</h4>
                          <div className="flex flex-wrap gap-1">
                            {subject.weakAreas.map((area, i) => (
                              <Badge key={i} variant="outline" className="text-xs border-red-300 text-red-600">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-green-600 mb-2">Strong Areas</h4>
                          <div className="flex flex-wrap gap-1">
                            {subject.strongAreas.map((area, i) => (
                              <Badge key={i} variant="outline" className="text-xs border-green-300 text-green-600">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tests">
              <div className="space-y-4">
                {recentTests.map((test, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{test.subject} - {test.topic}</h3>
                          <div className="text-sm text-gray-600">{new Date(test.date).toLocaleDateString()}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{test.score}%</div>
                          <div className="text-xs text-gray-500">{test.totalQuestions} questions in {test.timeTaken}m</div>
                        </div>
                      </div>
                      <Progress value={test.score} className="h-2 mt-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
