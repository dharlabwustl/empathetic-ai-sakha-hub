
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, BarChart3, Target, Clock } from 'lucide-react';

export const WeeklyMonthlyDashboard = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Weekly & Monthly Progress Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Physics Progress</h3>
              <Progress value={45} className="h-2" />
              <div className="text-sm text-gray-600">45% Complete</div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Chemistry Progress</h3>
              <Progress value={35} className="h-2" />
              <div className="text-sm text-gray-600">35% Complete</div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Biology Progress</h3>
              <Progress value={60} className="h-2" />
              <div className="text-sm text-gray-600">60% Complete</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
