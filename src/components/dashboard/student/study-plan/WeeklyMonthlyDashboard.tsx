
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, TrendingUp, BookOpen, Target, CheckCircle } from 'lucide-react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';

interface WeeklyMonthlyDashboardProps {
  data: any;
}

const WeeklyMonthlyDashboard: React.FC<WeeklyMonthlyDashboardProps> = ({ data }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [view, setView] = useState<'weekly' | 'monthly'>('weekly');

  const weekStart = startOfWeek(currentWeek);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const subjects = [
    { name: 'Physics', progress: 65, color: 'bg-blue-500', totalTopics: 42, completedTopics: 27 },
    { name: 'Chemistry', progress: 45, color: 'bg-green-500', totalTopics: 38, completedTopics: 17 },
    { name: 'Biology', progress: 78, color: 'bg-purple-500', totalTopics: 35, completedTopics: 27 }
  ];

  const mockTests = [
    { id: 1, name: 'Physics Mock Test #3', date: '2024-06-10', score: 85, totalQuestions: 45 },
    { id: 2, name: 'Chemistry Practice Test', date: '2024-06-12', score: 72, totalQuestions: 50 },
    { id: 3, name: 'Biology Chapter Test', date: '2024-06-15', score: 91, totalQuestions: 40 }
  ];

  const weeklyStats = {
    totalHours: 42,
    targetHours: 48,
    topicsCompleted: 12,
    testsAttempted: 3,
    averageScore: 83
  };

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={view === 'weekly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('weekly')}
          >
            Weekly
          </Button>
          <Button
            variant={view === 'monthly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('monthly')}
          >
            Monthly
          </Button>
        </div>
        <div className="text-sm text-gray-600">
          {format(weekStart, 'MMM dd')} - {format(addDays(weekStart, 6), 'MMM dd, yyyy')}
        </div>
      </div>

      {view === 'weekly' && (
        <>
          {/* Weekly Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Weekly Study Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, index) => {
                  const isToday = isSameDay(day, new Date());
                  return (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg ${
                        isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-xs text-gray-500">
                          {format(day, 'EEE')}
                        </div>
                        <div className={`text-lg font-medium ${isToday ? 'text-blue-600' : ''}`}>
                          {format(day, 'dd')}
                        </div>
                        <div className="mt-2 space-y-1">
                          {index % 3 === 0 && (
                            <div className="text-xs bg-blue-100 text-blue-800 px-1 rounded">
                              Physics
                            </div>
                          )}
                          {index % 3 === 1 && (
                            <div className="text-xs bg-green-100 text-green-800 px-1 rounded">
                              Chemistry
                            </div>
                          )}
                          {index % 3 === 2 && (
                            <div className="text-xs bg-purple-100 text-purple-800 px-1 rounded">
                              Biology
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{weeklyStats.totalHours}</div>
                  <div className="text-sm text-gray-600">Study Hours</div>
                  <div className="text-xs text-gray-500">of {weeklyStats.targetHours} target</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{weeklyStats.topicsCompleted}</div>
                  <div className="text-sm text-gray-600">Topics Done</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{weeklyStats.testsAttempted}</div>
                  <div className="text-sm text-gray-600">Tests Taken</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{weeklyStats.averageScore}%</div>
                  <div className="text-sm text-gray-600">Avg Score</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <BookOpen className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">87%</div>
                  <div className="text-sm text-gray-600">Completion</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Syllabus Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-600" />
            Syllabus Progress by Subject
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${subject.color}`}></div>
                    <span className="font-medium">{subject.name}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {subject.completedTopics}/{subject.totalTopics} topics
                  </div>
                </div>
                <Progress value={subject.progress} className="h-2" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{subject.progress}% complete</span>
                  <span>{subject.totalTopics - subject.completedTopics} remaining</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mock Test Planner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Mock Test Planner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{test.name}</div>
                  <div className="text-sm text-gray-600">{test.date}</div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">
                    {test.score}% ({test.score * test.totalQuestions / 100}/{test.totalQuestions})
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {test.totalQuestions} questions
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyMonthlyDashboard;
