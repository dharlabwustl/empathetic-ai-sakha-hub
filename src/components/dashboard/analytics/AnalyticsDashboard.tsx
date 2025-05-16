
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudyHabitsAnalysis from './StudyHabitsAnalysis';
import MoodPerformanceAnalysis from './MoodPerformanceAnalysis';
import WeakAreasAnalysis from './WeakAreasAnalysis';
import PredictiveAnalytics from './PredictiveAnalytics';
import { ChartBar, Brain, LineChart, Lightbulb } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const AnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('habits');
  
  return (
    <div className="space-y-8">
      <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight mb-2">Enhanced Analytics Dashboard</CardTitle>
          <p className="text-muted-foreground">
            Gain deeper insights into your study patterns and performance to optimize your NEET preparation.
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
