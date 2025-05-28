
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { OverviewKPICard } from '../shared/OverviewKPICard';
import { SmartSuggestionBox } from '../shared/SmartSuggestionBox';
import { Brain, Target, TrendingUp, Clock, Zap, Eye, CheckCircle, AlertTriangle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export const FlashcardsOverviewTab: React.FC = () => {
  const kpiData = [
    { title: "Cards Practiced", value: "245", subtext: "Today: 45, Week: 245", icon: <Brain className="h-6 w-6" /> },
    { title: "Recall Accuracy", value: "87%", subtext: "+3% from last week", variant: 'success' as const, icon: <Target className="h-6 w-6" /> },
    { title: "Review Streak", value: "15", subtext: "days consecutive", variant: 'success' as const, icon: <TrendingUp className="h-6 w-6" /> },
    { title: "Cards Due Today", value: "12", subtext: "8 review, 4 new", icon: <Clock className="h-6 w-6" /> }
  ];

  const subjectStats = [
    {
      subject: "Physics",
      totalCards: 150,
      mastered: 85,
      reviewing: 45,
      weak: 20,
      accuracy: 82,
      avgResponseTime: "3.2s",
      lastSession: "2 hours ago",
      dueToday: 5
    },
    {
      subject: "Chemistry", 
      totalCards: 180,
      mastered: 95,
      reviewing: 55,
      weak: 30,
      accuracy: 78,
      avgResponseTime: "4.1s",
      lastSession: "1 day ago",
      dueToday: 8
    },
    {
      subject: "Biology",
      totalCards: 140,
      mastered: 90,
      reviewing: 35,
      weak: 15,
      accuracy: 91,
      avgResponseTime: "2.8s", 
      lastSession: "5 hours ago",
      dueToday: 3
    }
  ];

  const weeklyProgress = [
    { day: "Mon", studied: 25, accuracy: 85 },
    { day: "Tue", studied: 30, accuracy: 88 },
    { day: "Wed", studied: 22, accuracy: 82 },
    { day: "Thu", studied: 35, accuracy: 90 },
    { day: "Fri", studied: 28, accuracy: 87 },
    { day: "Sat", studied: 40, accuracy: 89 },
    { day: "Sun", studied: 32, accuracy: 91 }
  ];

  const suggestions = [
    "Review 5 weak Thermodynamics formulas",
    "Practice DNA structure flashcards - due today",
    "New cards available in Organic Chemistry"
  ];

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Physics': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'Chemistry': return 'bg-green-50 border-green-200 text-green-800';
      case 'Biology': return 'bg-purple-50 border-purple-200 text-purple-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 85) return 'text-green-600';
    if (accuracy >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <OverviewKPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subject Performance - Enhanced */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Subject Performance & Memory Strength
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {subjectStats.map((subject) => (
                <div key={subject.subject} className="space-y-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-lg">{subject.subject}</span>
                      <Badge variant="outline" className={getSubjectColor(subject.subject)}>
                        {subject.totalCards} cards
                      </Badge>
                      <Badge variant="outline" className={`${getAccuracyColor(subject.accuracy)}`}>
                        {subject.accuracy}% accuracy
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      Due today: {subject.dueToday}
                    </div>
                  </div>

                  {/* Memory Strength Distribution */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Memory Strength Distribution</span>
                      <span>{subject.mastered + subject.reviewing + subject.weak} total</span>
                    </div>
                    <div className="flex h-4 rounded-full overflow-hidden bg-gray-200">
                      <div 
                        className="bg-green-500" 
                        style={{ width: `${(subject.mastered / subject.totalCards) * 100}%` }}
                        title={`Mastered: ${subject.mastered}`}
                      />
                      <div 
                        className="bg-yellow-500" 
                        style={{ width: `${(subject.reviewing / subject.totalCards) * 100}%` }}
                        title={`Reviewing: ${subject.reviewing}`}
                      />
                      <div 
                        className="bg-red-500" 
                        style={{ width: `${(subject.weak / subject.totalCards) * 100}%` }}
                        title={`Weak: ${subject.weak}`}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        Mastered ({subject.mastered})
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                        Reviewing ({subject.reviewing})
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                        Weak ({subject.weak})
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-2 bg-white dark:bg-gray-700 rounded">
                      <div className="font-semibold text-lg">{subject.accuracy}%</div>
                      <div className="text-gray-600">Accuracy</div>
                    </div>
                    <div className="text-center p-2 bg-white dark:bg-gray-700 rounded">
                      <div className="font-semibold text-lg">{subject.avgResponseTime}</div>
                      <div className="text-gray-600">Avg Time</div>
                    </div>
                    <div className="text-center p-2 bg-white dark:bg-gray-700 rounded">
                      <div className="font-semibold text-lg">{subject.lastSession}</div>
                      <div className="text-gray-600">Last Session</div>
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
          <SmartSuggestionBox suggestions={suggestions} title="Review Recommendations" />

          {/* Weekly Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium w-12">{day.day}</span>
                    <div className="flex-1 mx-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${(day.studied / 40) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-8">{day.studied}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-xs ${getAccuracyColor(day.accuracy)}`}>
                      {day.accuracy}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cards mastered this week</span>
                <span className="font-semibold">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average session time</span>
                <span className="font-semibold">18 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Best accuracy streak</span>
                <span className="font-semibold">12 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total study time</span>
                <span className="font-semibold">8h 32m</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
