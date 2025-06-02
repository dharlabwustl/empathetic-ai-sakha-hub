
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Lightbulb, Target, Clock } from 'lucide-react';

export const AIRecommendationsSection = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">Focus Recommendation</span>
                <Badge variant="destructive" className="text-xs">High Priority</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Increase Physics study time by 30% this week. Your recent mock test shows weakness in Mechanics.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
