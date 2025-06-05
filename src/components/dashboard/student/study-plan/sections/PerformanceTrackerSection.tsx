
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, Target } from 'lucide-react';

export const PerformanceTrackerSection = () => {
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-medium">Average Score</h3>
              <div className="text-2xl font-bold text-blue-600">78%</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-medium">Accuracy</h3>
              <div className="text-2xl font-bold text-green-600">85%</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Award className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-medium">Tests Taken</h3>
              <div className="text-2xl font-bold text-purple-600">12</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
