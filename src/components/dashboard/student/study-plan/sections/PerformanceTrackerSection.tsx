
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp, Target, Calendar } from 'lucide-react';

export const PerformanceTrackerSection = () => {
  const performanceData = {
    weeklyGoals: [
      { subject: "Physics", target: 15, completed: 12, percentage: 80 },
      { subject: "Chemistry", target: 12, completed: 8, percentage: 67 },
      { subject: "Biology", target: 13, completed: 13, percentage: 100 }
    ],
    achievements: [
      { title: "Study Streak Master", description: "45 consecutive days", icon: "🔥", earned: true },
      { title: "Chemistry Champion", description: "90% accuracy in tests", icon: "🧪", earned: false },
      { title: "Mock Test Hero", description: "Top 10% performance", icon: "🎯", earned: true }
    ],
    weeklyStats: {
      totalHours: 35,
      targetHours: 40,
      testsCompleted: 8,
      averageScore: 78
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Performance Tracker & Achievement System
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Weekly Goals Progress */}
          <div className="mb-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Weekly Study Goals
            </h3>
            <div className="space-y-3">
              {performanceData.weeklyGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{goal.subject}</span>
                    <span className="text-sm text-gray-600">
                      {goal.completed}/{goal.target} hours ({goal.percentage}%)
                    </span>
                  </div>
                  <Progress value={goal.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Performance Stats */}
          <div className="mb-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              This Week's Performance
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{performanceData.weeklyStats.totalHours}</div>
                <div className="text-xs text-gray-600">Hours Studied</div>
                <div className="text-xs text-gray-500">Target: {performanceData.weeklyStats.targetHours}h</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{performanceData.weeklyStats.testsCompleted}</div>
                <div className="text-xs text-gray-600">Tests Completed</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{performanceData.weeklyStats.averageScore}%</div>
                <div className="text-xs text-gray-600">Average Score</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">87%</div>
                <div className="text-xs text-gray-600">Goal Achievement</div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Award className="h-4 w-4" />
              Achievements & Milestones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {performanceData.achievements.map((achievement, index) => (
                <Card key={index} className={`border-2 ${achievement.earned ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'}`}>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{achievement.icon}</div>
                    <h4 className="font-medium mb-1">{achievement.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                    <Badge variant={achievement.earned ? "default" : "secondary"}>
                      {achievement.earned ? "Earned" : "In Progress"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Recent Milestones
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Completed Biology Chapter 15 - Human Physiology (Today)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Scored 85% in Chemistry Mock Test (Yesterday)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Reached 45-day study streak (2 days ago)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
