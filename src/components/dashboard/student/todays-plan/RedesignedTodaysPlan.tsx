
import React, { useState, useEffect } from 'react';
import { useTodaysPlan } from '@/hooks/useTodaysPlan';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { TodaysPlanData, MoodType, TaskType } from '@/types/student/todaysPlan';
import { Button } from '@/components/ui/button';
import { UserProfileBase } from '@/types/user/base';

interface RedesignedTodaysPlanProps {
  userProfile: UserProfileBase;
}

const RedesignedTodaysPlan: React.FC<RedesignedTodaysPlanProps> = ({ userProfile }) => {
  const goalTitle = userProfile?.goals && userProfile.goals.length > 0 
    ? userProfile.goals[0].title 
    : "IIT-JEE";
    
  const { planData, loading, refreshPlan } = useTodaysPlan(goalTitle, "Student");
  const [currentPlan, setCurrentPlan] = useState<TodaysPlanData | null>(null);

  useEffect(() => {
    if (!loading && planData) {
      setCurrentPlan(planData);
    } else if (!loading && !planData) {
      // Generate mock data if no plan is available
      const mockPlan: TodaysPlanData = {
        date: new Date().toISOString(),
        greeting: `Good ${getTimeOfDay()}, ${userProfile?.name?.split(' ')[0] || 'Student'}!`,
        currentMood: MoodType.Motivated,
        studyBlocks: [
          {
            id: '1',
            title: 'Physics: Newton\'s Laws of Motion',
            duration: 45,
            startTime: '09:00',
            completed: false,
            type: TaskType.Concept,
            subject: 'Physics',
            topic: 'Mechanics',
          },
          {
            id: '2',
            title: 'Chemistry: Chemical Bonding',
            duration: 30,
            startTime: '10:00',
            completed: false,
            type: TaskType.Concept,
            subject: 'Chemistry',
            topic: 'Atomic Structure',
          },
          {
            id: '3',
            title: 'Short Break',
            duration: 15,
            startTime: '10:30',
            completed: false,
            type: TaskType.Break,
          },
          {
            id: '4',
            title: 'Mathematics: Integration Techniques',
            duration: 60,
            startTime: '10:45',
            completed: false,
            type: TaskType.Concept,
            subject: 'Mathematics',
            topic: 'Calculus',
          },
        ],
        progress: {
          plannedHours: 5,
          completedHours: 0,
          completedTasks: 0,
          totalTasks: 4,
        },
        pendingTasks: [],
        backlogTasks: [],
        timeAllocation: {
          concepts: 3,
          flashcards: 1,
          practice: 1,
          breaks: 0.5,
        },
        subjectProgress: [],
        pastRecords: [],
        completedBlocks: [],
        upcomingBlocks: [],
        backlog: [],
      };
      setCurrentPlan(mockPlan);
    }
  }, [loading, planData, userProfile.name]);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 18) return 'Afternoon';
    return 'Evening';
  };

  // Render loading state if data is still loading
  if (loading || !currentPlan) {
    return (
      <SharedPageLayout
        title="Today's Plan"
        subtitle="Loading your personalized study schedule..."
        showBackButton={false}
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </SharedPageLayout>
    );
  }

  return (
    <SharedPageLayout
      title={currentPlan.greeting || "Today's Plan"}
      subtitle="Your personalized study schedule for optimal learning"
      showBackButton={false}
    >
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Current Schedule</h2>
          <div className="space-y-3">
            {currentPlan.studyBlocks.map((block, index) => (
              <div
                key={block.id}
                className="p-4 border rounded-lg flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{block.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {block.startTime} • {block.duration} min
                    {block.subject && ` • ${block.subject}`}
                  </div>
                </div>
                <Button size="sm" disabled={index > 0 && !currentPlan.studyBlocks[index - 1].completed}>
                  {block.completed ? 'Completed' : block.type === TaskType.Break ? 'Take Break' : 'Start'}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Progress Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {currentPlan.progress.completedTasks}/{currentPlan.progress.totalTasks}
              </div>
              <div className="text-sm text-muted-foreground">Tasks Completed</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {currentPlan.progress.completedHours}/{currentPlan.progress.plannedHours}
              </div>
              <div className="text-sm text-muted-foreground">Hours Studied</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {Math.round((currentPlan.progress.completedTasks / currentPlan.progress.totalTasks) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Daily Progress</div>
            </div>
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default RedesignedTodaysPlan;
