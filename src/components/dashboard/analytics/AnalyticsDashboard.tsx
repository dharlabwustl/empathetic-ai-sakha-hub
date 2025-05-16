
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudyHabitsAnalysis from './StudyHabitsAnalysis';
import MoodPerformanceAnalysis from './MoodPerformanceAnalysis';
import WeakAreasAnalysis from './WeakAreasAnalysis';
import PredictiveAnalytics from './PredictiveAnalytics';
import { ChartBar, Brain, LineChart, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card className="border-0 shadow-sm bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
        <CardContent className="p-6">
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-gradient bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Enhanced Analytics Dashboard</h2>
          <p className="text-muted-foreground max-w-3xl">
            Gain deeper insights into your study patterns, performance correlations, and personalized recommendations to optimize your NEET preparation and maximize your learning potential.
          </p>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="habits" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 h-auto mb-8">
          <TabsTrigger value="habits" className="flex flex-col h-auto py-3 px-4">
            <ChartBar className="mb-1 h-5 w-5" />
            <span>Study Habits</span>
          </TabsTrigger>
          <TabsTrigger value="mood" className="flex flex-col h-auto py-3 px-4">
            <Brain className="mb-1 h-5 w-5" />
            <span>Mood Impact</span>
          </TabsTrigger>
          <TabsTrigger value="weakareas" className="flex flex-col h-auto py-3 px-4">
            <Lightbulb className="mb-1 h-5 w-5" />
            <span>Weak Areas</span>
          </TabsTrigger>
          <TabsTrigger value="predictive" className="flex flex-col h-auto py-3 px-4">
            <LineChart className="mb-1 h-5 w-5" />
            <span>Predictions</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="habits" className="space-y-6">
          <StudyHabitsAnalysis />
        </TabsContent>
        
        <TabsContent value="mood" className="space-y-6">
          <MoodPerformanceAnalysis />
        </TabsContent>
        
        <TabsContent value="weakareas" className="space-y-6">
          <WeakAreasAnalysis />
        </TabsContent>
        
        <TabsContent value="predictive" className="space-y-6">
          <PredictiveAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
