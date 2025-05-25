
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Award, Clock, Target } from "lucide-react";

interface PerformanceMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
}

interface PerformanceAnalyticsProps {
  metrics?: PerformanceMetric[];
}

const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({ 
  metrics = [
    {
      id: '1',
      label: 'Study Streak',
      value: '7 days',
      change: '+2',
      trend: 'up',
      icon: Target
    },
    {
      id: '2',
      label: 'Avg. Score',
      value: '85%',
      change: '+5%',
      trend: 'up',
      icon: Award
    },
    {
      id: '3',
      label: 'Study Time',
      value: '4.5h',
      change: '-0.5h',
      trend: 'down',
      icon: Clock
    },
    {
      id: '4',
      label: 'Progress',
      value: '72%',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp
    }
  ]
}) => {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Performance Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <div key={metric.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                  <span className={`text-xs font-medium ${getTrendColor(metric.trend)}`}>
                    {metric.change}
                  </span>
                </div>
                <div>
                  <div className="text-lg font-semibold">{metric.value}</div>
                  <div className="text-xs text-muted-foreground">{metric.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceAnalytics;
