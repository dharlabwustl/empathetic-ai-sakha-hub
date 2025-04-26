
import React, { useState } from 'react';
import { UserProfileType } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Book, BookOpen, CheckCircle, Clock, Calendar, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { useStudyProgress } from '@/hooks/useStudyProgress';
import TodaysPlanSection from './todays-plan/TodaysPlanSection';
import SubjectBreakdownSection from './subject-stats/SubjectBreakdownSection';
import StudyStatsSection from './study-stats/StudyStatsSection';
import ProgressTrackerSection from './progress-tracker/ProgressTrackerSection';
import RevisionLoopSection from './revision/RevisionLoopSection';
import UpcomingMilestonesSection from './milestones/UpcomingMilestonesSection';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
}

export const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ userProfile }) => {
  const { conceptCards, loading: cardsLoading } = useUserStudyPlan();
  const { subjects, studyStreak, loading: progressLoading } = useStudyProgress();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Get exam goal from user profile
  const examGoal = userProfile?.examPreparation || userProfile?.goals?.[0]?.title || "General Study";
  
  // Calculate study stats
  const totalConcepts = conceptCards.length;
  const completedConcepts = conceptCards.filter(card => card.completed).length;
  const pendingFlashcards = conceptCards.reduce((acc, card) => acc + (card.flashcardsTotal - card.flashcardsCompleted), 0);
  const practiceExams = subjects.reduce((acc, subject) => acc + subject.quizzes.length, 0);
  
  // Calculate average study time
  const studyTimeAllocation = subjects.reduce((acc, subject) => acc + subject.recommendedStudyHours, 0);
  
  // Generate list of enrolled subjects
  const enrolledSubjects = subjects.map(subject => subject.name);
  
  const isLoading = cardsLoading || progressLoading;
  
  if (isLoading) {
    return (
      <div className="grid gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="animate-pulse flex flex-col space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Exam Goal Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-100 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                Exam Goal: {examGoal}
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                  Subjects: {enrolledSubjects.length}
                </Badge>
                <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                  Total Concepts: {totalConcepts}
                </Badge>
                <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                  Study Time: {studyTimeAllocation} hrs/week
                </Badge>
              </div>
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/dashboard/student/academic">
                View Study Plan <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Concepts" 
          value={totalConcepts} 
          description={`${completedConcepts} completed`}
          icon={<Book className="h-5 w-5 text-blue-600" />}
          progress={totalConcepts > 0 ? (completedConcepts / totalConcepts) * 100 : 0}
        />
        
        <StatsCard 
          title="Flashcards" 
          value={pendingFlashcards} 
          description="remaining to complete"
          icon={<BookOpen className="h-5 w-5 text-amber-600" />}
        />
        
        <StatsCard 
          title="Practice Exams" 
          value={practiceExams} 
          description="concept-wise tests"
          icon={<CheckCircle className="h-5 w-5 text-green-600" />}
        />
        
        <StatsCard 
          title="Study Time" 
          value={`${studyTimeAllocation}`} 
          description="hours allocated per week"
          icon={<Clock className="h-5 w-5 text-purple-600" />}
        />
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="today">Today's Plan</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="revision">Revision</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Key Stats */}
          <StudyStatsSection subjects={subjects} conceptCards={conceptCards} />
          
          {/* Today's Plan Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> Today's Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TodaysPlanSection 
                userProfile={userProfile} 
                conceptCards={conceptCards.filter(card => card.scheduledFor === 'today')}
                showHeading={false}
                compact={true}
              />
              <div className="mt-4 flex justify-end">
                <Button asChild variant="outline">
                  <Link to="/dashboard/student/today">
                    View Full Plan <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Subject Breakdown Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Subject Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <SubjectBreakdownSection subjects={subjects.slice(0, 3)} showHeading={false} compact={true} />
              <div className="mt-4 flex justify-end">
                <Button asChild variant="outline">
                  <Link to="/dashboard/student/subjects">
                    View All Subjects <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subjects" className="space-y-4">
          <SubjectBreakdownSection subjects={subjects} />
        </TabsContent>
        
        <TabsContent value="today" className="space-y-4">
          <TodaysPlanSection 
            userProfile={userProfile} 
            conceptCards={conceptCards.filter(card => card.scheduledFor === 'today')}
          />
        </TabsContent>
        
        <TabsContent value="progress" className="space-y-4">
          <ProgressTrackerSection userProfile={userProfile} subjects={subjects} />
        </TabsContent>
        
        <TabsContent value="revision" className="space-y-4">
          <RevisionLoopSection conceptCards={conceptCards} />
        </TabsContent>
        
        <TabsContent value="milestones" className="space-y-4">
          <UpcomingMilestonesSection subjects={subjects} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
  progress?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description, icon, progress }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            {icon}
          </div>
        </div>
        {typeof progress === 'number' && (
          <Progress value={progress} className="h-1 mt-4" />
        )}
      </CardContent>
    </Card>
  );
};
