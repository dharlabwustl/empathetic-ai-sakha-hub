import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, Brain, Target, Clock } from "lucide-react";

const MoodPerformanceCorrelation = () => {
  const mockData = {
    moodImprovement: 75,
    averageMoodScore: 8.2,
    timeSavedPerWeek: 6.5,
    studyPlanEfficiency: 55,
    consistentHabitsStudents: 92,
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Mood & Performance Correlation</CardTitle>
          <CardDescription>Insights into how your mood impacts your study habits and outcomes.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <p>
              <span className="font-medium">{mockData.moodImprovement}%</span> improvement in mood reported by students.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <p>
              Average mood score of <span className="font-medium">{mockData.averageMoodScore}</span> out of 10 during study sessions.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-orange-500" />
            <p>
              Students saved an average of <span className="font-medium">{mockData.timeSavedPerWeek} hours</span> per week using mood-based study plans.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Brain className="h-5 w-5 text-purple-500" />
            <p>
              <span className="font-medium">{mockData.studyPlanEfficiency}%</span> increase in study plan efficiency with mood-aware adjustments.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Target className="h-5 w-5 text-yellow-500" />
            <p>
              <span className="font-medium">{mockData.consistentHabitsStudents}%</span> of students developed consistent study habits using our platform.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodPerformanceCorrelation;
