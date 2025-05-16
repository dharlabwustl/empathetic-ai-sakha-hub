
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import StudyHabitsAnalysis from './StudyHabitsAnalysis';
import MoodPerformanceCorrelation from './MoodPerformanceCorrelation';
import WeakAreasIdentification from './WeakAreasIdentification';
import PredictiveAnalytics from './PredictiveAnalytics';
import { Gauge, Brain, AlertTriangle, TrendingUp } from 'lucide-react';

const AnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for overview cards
  const overviewData = {
    studyTime: {
      total: 124,
      thisWeek: 18.5,
      trend: '+12%'
    },
    mastery: {
      overall: 72,
      weakest: 'Electromagnetism',
      strongest: 'Cell Biology'
    },
    consistency: {
      score: 8.2,
      planAdherence: '84%',
      currentStreak: 5
    },
    projections: {
      readiness: 76,
      projectedScore: '592/720',
      daysToTarget: 18
    }
  };

  return (
    <SharedPageLayout
      title="Analytics Dashboard"
      subtitle="Track your progress and identify areas for improvement"
    >
      <div className="mb-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Study Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-baseline">
                <div className="text-2xl font-bold">{overviewData.studyTime.total} hours</div>
                <div className="text-sm text-green-600">{overviewData.studyTime.trend}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {overviewData.studyTime.thisWeek} hours this week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Overall Mastery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewData.mastery.overall}%</div>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mt-1">
                <div>
                  <span className="block">Weakest:</span>
                  <span className="text-red-500">{overviewData.mastery.weakest}</span>
                </div>
                <div>
                  <span className="block">Strongest:</span>
                  <span className="text-green-500">{overviewData.mastery.strongest}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Consistency Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-baseline">
                <div className="text-2xl font-bold">{overviewData.consistency.score}/10</div>
                <div className="text-sm">
                  {overviewData.consistency.currentStreak} day streak
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {overviewData.consistency.planAdherence} plan adherence
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Exam Readiness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewData.projections.readiness}%</div>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mt-1">
                <div>
                  <span className="block">Projected:</span>
                  <span>{overviewData.projections.projectedScore}</span>
                </div>
                <div>
                  <span className="block">Target in:</span>
                  <span>{overviewData.projections.daysToTarget} days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Analytics Tabs */}
        <Tabs 
          defaultValue="study-habits" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="study-habits" className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              <span>Study Habits</span>
            </TabsTrigger>
            <TabsTrigger value="mood-performance" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>Mood-Performance</span>
            </TabsTrigger>
            <TabsTrigger value="weak-areas" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Weak Areas</span>
            </TabsTrigger>
            <TabsTrigger value="predictive" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Predictive Analytics</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="study-habits">
            <StudyHabitsAnalysis />
          </TabsContent>
          
          <TabsContent value="mood-performance">
            <MoodPerformanceCorrelation />
          </TabsContent>
          
          <TabsContent value="weak-areas">
            <WeakAreasIdentification />
          </TabsContent>
          
          <TabsContent value="predictive">
            <PredictiveAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default AnalyticsDashboard;
