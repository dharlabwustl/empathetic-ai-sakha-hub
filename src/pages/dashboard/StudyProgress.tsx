
import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import DashboardLoading from './DashboardLoading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from "@/components/ui/scroll-area"
import { SubjectProgress } from '@/types/user/progress';
import { formatDate } from '@/utils/dateUtils';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const StudyProgress = () => {
  const {
    loading,
    userProfile,
    activeTab,
    showWelcomeTour,
    showOnboarding,
    currentTime,
    showStudyPlan,
    hideTabsNav,
    hideSidebar,
    kpis,
    nudges,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleCompleteOnboarding,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav
  } = useStudentDashboard();
  
  const [subjects, setSubjects] = useState<SubjectProgress[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (userProfile && userProfile.subjects) {
      // Use subjects directly since it's already SubjectProgress[]
      setSubjects(userProfile.subjects);
    }
  }, [userProfile]);

  if (loading || !userProfile) {
    return <DashboardLoading />;
  }

  return (
    <DashboardLayout
      userProfile={userProfile}
      hideSidebar={hideSidebar}
      hideTabsNav={hideTabsNav}
      activeTab={activeTab}
      kpis={kpis}
      nudges={nudges}
      markNudgeAsRead={markNudgeAsRead}
      showWelcomeTour={showWelcomeTour}
      onTabChange={handleTabChange}
      onViewStudyPlan={handleViewStudyPlan}
      onToggleSidebar={toggleSidebar}
      onToggleTabsNav={toggleTabsNav}
      onSkipTour={handleSkipTour}
      onCompleteTour={handleCompleteTour}
      showStudyPlan={showStudyPlan}
      onCloseStudyPlan={handleCloseStudyPlan}
    >
      <div className="container max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Study Progress</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Track your progress across different subjects
          </p>
        </div>
        
        <ScrollArea className="rounded-md border">
          <div className="p-4">
            {subjects.map((subject) => (
              <motion.div
                key={subject.id}
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{subject.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Last Studied: {subject.lastStudied ? formatDate(subject.lastStudied) : 'Never'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {subject.progress}%
                        </span>
                      </div>
                      <Progress value={subject.progress} />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Last Week Progress</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {subject.lastWeekProgress || 0}%
                        </span>
                      </div>
                      <Progress value={subject.lastWeekProgress || 0} />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Total Time Spent</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {subject.totalTimeSpent || 0} minutes
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </DashboardLayout>
  );
};

export default StudyProgress;
