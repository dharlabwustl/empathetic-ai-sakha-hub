
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Clock, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';

interface KPIData {
  title: string;
  value: number;
  total?: number;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
  color?: string;
}

interface SubjectProgress {
  name: string;
  completed: number;
  total: number;
  progress: number;
  color: string;
}

interface OverviewSectionProps {
  type: 'concepts' | 'flashcards' | 'exams';
  kpis: KPIData[];
  subjectProgress: SubjectProgress[];
  suggestions: string[];
  todayTarget?: string;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
  type,
  kpis,
  subjectProgress,
  suggestions,
  todayTarget
}) => {
  const getTypeConfig = () => {
    switch (type) {
      case 'concepts':
        return {
          title: 'Concepts Overview',
          icon: Target,
          color: 'bg-blue-500'
        };
      case 'flashcards':
        return {
          title: 'Flashcards Overview',
          icon: CheckCircle,
          color: 'bg-purple-500'
        };
      case 'exams':
        return {
          title: 'Practice Exams Overview',
          icon: TrendingUp,
          color: 'bg-green-500'
        };
      default:
        return {
          title: 'Overview',
          icon: Target,
          color: 'bg-gray-500'
        };
    }
  };

  const config = getTypeConfig();
  const IconComponent = config.icon;

  return (
    <div className="space-y-6 mb-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${config.color}`}>
          <IconComponent className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold">{config.title}</h2>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">
                      {kpi.total ? `${kpi.value}/${kpi.total}` : kpi.value}
                    </p>
                    <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                  </div>
                </div>
                {kpi.trend && (
                  <div className={`flex items-center ${
                    kpi.trend === 'up' ? 'text-green-600' : 
                    kpi.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    <TrendingUp className={`h-4 w-4 ${kpi.trend === 'down' ? 'rotate-180' : ''}`} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subject Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Subject-wise Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjectProgress.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{subject.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {subject.completed}/{subject.total}
                  </span>
                </div>
                <Progress 
                  value={subject.progress} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{subject.progress}% complete</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${subject.color}`}
                  >
                    {subject.progress >= 80 ? 'Excellent' : 
                     subject.progress >= 60 ? 'Good' : 
                     subject.progress >= 40 ? 'Average' : 'Needs Work'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Suggestions & Today's Target */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {todayTarget && (
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                Today's Target
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{todayTarget}</p>
            </CardContent>
          </Card>
        )}
        
        <Card className={todayTarget ? "lg:col-span-2" : "lg:col-span-3"}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-600" />
              Smart Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <AlertCircle className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewSection;
