
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, LineChart, Clock, Brain, Zap, Activity } from 'lucide-react';

interface AnalyticsSectionProps {
  conceptName: string;
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ conceptName }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-indigo-600" />
            Performance Analytics
          </CardTitle>
          <CardDescription>
            Detailed insights into your learning progress for {conceptName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mastery Progress Chart */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-indigo-500" />
                <h3 className="font-medium">Mastery Progress</h3>
              </div>
              <div className="aspect-[4/3] bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 flex items-center justify-center">
                <LineChart className="h-12 w-12 text-slate-300" />
              </div>
              <p className="text-sm text-muted-foreground">
                Your mastery has improved by 15% over the last 2 weeks
              </p>
            </div>
            
            {/* Time Distribution */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-emerald-500" />
                <h3 className="font-medium">Study Time Distribution</h3>
              </div>
              <div className="aspect-[4/3] bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 flex items-center justify-center">
                <BarChart3 className="h-12 w-12 text-slate-300" />
              </div>
              <p className="text-sm text-muted-foreground">
                You've spent 45% of your time on theory and 55% on practice
              </p>
            </div>
            
            {/* Performance Metrics */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-amber-500" />
                <h3 className="font-medium">Key Performance Metrics</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <h4 className="text-xs text-muted-foreground font-medium">Quiz Score</h4>
                  <p className="text-2xl font-bold mt-2">85%</p>
                  <p className="text-xs text-green-600 mt-1">+15% vs avg</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <h4 className="text-xs text-muted-foreground font-medium">Recall Rate</h4>
                  <p className="text-2xl font-bold mt-2">72%</p>
                  <p className="text-xs text-amber-600 mt-1">+2% vs avg</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <h4 className="text-xs text-muted-foreground font-medium">Practice Attempts</h4>
                  <p className="text-2xl font-bold mt-2">24</p>
                  <p className="text-xs text-green-600 mt-1">Above target</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <h4 className="text-xs text-muted-foreground font-medium">Completion</h4>
                  <p className="text-2xl font-bold mt-2">89%</p>
                  <p className="text-xs text-green-600 mt-1">+9% vs avg</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsSection;
