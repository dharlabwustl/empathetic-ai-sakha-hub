
import React from 'react';
import { UserProfileBase } from '@/types/user/base';
import { Card } from '@/components/ui/card';
import { KpiData } from '@/hooks/useKpiTracking';
import LearningProfileSection from './dashboard-sections/LearningProfileSection';
import ExamReadinessSection from './dashboard-sections/ExamReadinessSection';
import UpcomingExamCountdown from './dashboard-sections/UpcomingExamCountdown';
import PerformanceTrendsSection from './dashboard-sections/PerformanceTrendsSection';
import RevisionLoopSection from './dashboard-sections/RevisionLoopSection';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, BookOpen } from 'lucide-react';

interface DashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<DashboardOverviewProps> = ({ 
  userProfile, 
  kpis 
}) => {
  const examReadinessScore = 72;
  const previousExamReadinessScore = 65;
  
  // Mock data for exam readiness weekly trends
  const weeklyTrends = [
    { week: 'Week 1', score: 54 },
    { week: 'Week 2', score: 58 },
    { week: 'Week 3', score: 62 },
    { week: 'Week 4', score: 65 },
    { week: 'Week 5', score: 68 },
    { week: 'Current', score: 72 }
  ];
  
  // Mock data for strong and weak areas
  const weakAreas = ['Organic Chemistry', 'Thermodynamics', 'Electromagnetic Induction'];
  const strongAreas = ['Mechanics', 'Algebra', 'Cell Biology', 'Acids & Bases'];
  
  // Mock upcoming exam data
  const upcomingExam = {
    name: "NEET 2023",
    date: new Date(2023, 4, 7), // May 7, 2023
    daysLeft: 87,
    totalDays: 180,
    progressPercentage: 52
  };
  
  // Mock performance data
  const performanceTrends = [
    { date: '2023-01', score: 58 },
    { date: '2023-02', score: 62 },
    { date: '2023-03', score: 65 },
    { date: '2023-04', score: 70 },
    { date: '2023-05', score: 68 },
    { date: '2023-06', score: 72 }
  ];

  return (
    <div className="p-3 md:p-6 space-y-6">
      {/* User greeting */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Hello, {userProfile?.name?.split(' ')[0] || 'Student'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's your learning progress overview
          </p>
        </div>
      </div>
      
      {/* Main dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column - Performance */}
        <div className="lg:col-span-8 space-y-6">
          {/* Learning Profile Section */}
          <LearningProfileSection 
            userProfile={userProfile} 
            examScore={examReadinessScore} 
            previousScore={previousExamReadinessScore}
            studyHours={24}
            testsCompleted={7}
            conceptsMastered={35}
            totalConcepts={48}
          />
          
          {/* Exam Readiness Section */}
          <ExamReadinessSection 
            score={examReadinessScore}
            previousScore={previousExamReadinessScore}
            weeklyTrends={weeklyTrends}
            weakAreas={weakAreas}
            strongAreas={strongAreas}
          />
          
          {/* Performance Trends */}
          <PerformanceTrendsSection 
            trendData={performanceTrends} 
          />
        </div>
        
        {/* Right column - Planning */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Exam */}
          <UpcomingExamCountdown
            examName={upcomingExam.name}
            examDate={upcomingExam.date}
            daysLeft={upcomingExam.daysLeft}
            totalDays={upcomingExam.totalDays}
            progressPercentage={upcomingExam.progressPercentage}
          />
          
          {/* Revision Loop */}
          <RevisionLoopSection />
          
          {/* Calendar View */}
          <Card className="overflow-hidden">
            <Tabs defaultValue="schedule" className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="schedule">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </TabsTrigger>
                <TabsTrigger value="study-plan">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Study Plan
                </TabsTrigger>
              </TabsList>
              <TabsContent value="schedule" className="p-4 space-y-3">
                <div className="text-sm space-y-2">
                  <div className="font-medium">Today's Schedule</div>
                  <ul className="space-y-2">
                    <li className="flex justify-between border-l-4 border-blue-500 pl-2 py-1">
                      <span>Physics - Thermodynamics</span>
                      <span className="text-gray-500">2:00 PM</span>
                    </li>
                    <li className="flex justify-between border-l-4 border-green-500 pl-2 py-1">
                      <span>Chemistry Quiz</span>
                      <span className="text-gray-500">4:30 PM</span>
                    </li>
                  </ul>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View Full Calendar
                </Button>
              </TabsContent>
              <TabsContent value="study-plan" className="p-4 space-y-3">
                <div className="text-sm space-y-2">
                  <div className="font-medium">This Week's Focus</div>
                  <ul className="space-y-1">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      Organic Chemistry - Alcohols
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      Physics - Electromagnetic Induction
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Biology - Human Physiology
                    </li>
                  </ul>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View Study Plan
                </Button>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
