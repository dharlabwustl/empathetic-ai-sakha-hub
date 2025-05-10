
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoodType, UserProfileType } from "@/types/user/base";
import { Bell, Calendar, FilePlus, ChevronRight, Calendar as CalendarIcon, BarChart } from "lucide-react";
import MoodLogButton from "@/components/dashboard/student/mood-tracking/MoodLogButton";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import CreateStudyPlanWizard from "@/components/dashboard/student/academic/CreateStudyPlanWizard";

interface UpcomingEvent {
  title: string;
  time: string;
  type: 'exam' | 'task' | 'meeting';
}

interface EnhancedDashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  upcomingEvents?: UpcomingEvent[];
}

const EnhancedDashboardHeader: React.FC<EnhancedDashboardHeaderProps> = ({
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan,
  currentMood,
  onMoodChange,
  upcomingEvents = []
}) => {
  const [showPlanWizard, setShowPlanWizard] = useState(false);
  
  // Get the greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  const greetingText = getGreeting();
  const userName = userProfile?.name || userProfile?.firstName || "Student";
  const examGoal = userProfile?.goals?.[0]?.title || userProfile?.examGoal || "your exam";
  
  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
  };

  const handleCreatePlan = (newPlan: any) => {
    console.log("New study plan created:", newPlan);
    // Here you would typically save the plan to your backend
    setShowPlanWizard(false);
  };

  return (
    <div className="mb-8">
      {/* Main header with greeting and stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Greeting and time */}
        <div className="flex-1 min-w-[200px]">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {greetingText}, {userName}!
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formattedDate} • {formattedTime}
          </p>
        </div>

        {/* Action buttons and mood */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mood button */}
          {onMoodChange && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <MoodLogButton
                      currentMood={currentMood}
                      onMoodChange={handleMoodChange}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Log how you're feeling today</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          {/* View study plan button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onViewStudyPlan}
                  className="gap-1"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Study Plan</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>View your personalized study plan</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Notifications button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative"
                  asChild
                >
                  <a href="/dashboard/student/notifications">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>View your notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Enhanced info card with study goal and upcoming events */}
      <Card className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 border-none shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Study Dashboard section */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Study Dashboard
                </h2>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-muted-foreground mr-2">Exam Goal:</span>
                  <span className="bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 px-2 py-0.5 rounded-full text-sm">
                    {examGoal}
                  </span>
                </div>
              </div>
              
              <Button 
                onClick={() => setShowPlanWizard(true)}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700"
              >
                <FilePlus className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Create New Study Plan</span>
                <span className="sm:hidden">New Plan</span>
              </Button>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Track your progress, manage your study plan, and stay on top of your exam preparation.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400">Progress</div>
                <div className="text-lg font-semibold">64%</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400">Days Left</div>
                <div className="text-lg font-semibold">42</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400">Today's Tasks</div>
                <div className="text-lg font-semibold">8</div>
              </div>
            </div>
            
            <div className="mt-4">
              <Button variant="link" size="sm" className="px-0 text-violet-600 dark:text-violet-400" onClick={onViewStudyPlan}>
                View detailed progress <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Upcoming events section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-3">
              <CalendarIcon className="h-4 w-4 text-violet-600 mr-2" />
              <h3 className="font-medium">Upcoming Events</h3>
            </div>
            
            {upcomingEvents.length > 0 ? (
              <ul className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <li key={index} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{event.time}</p>
                    </div>
                    <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      event.type === 'exam' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                        : event.type === 'meeting'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {event.type === 'exam' ? 'Exam' : event.type === 'meeting' ? 'Meeting' : 'Task'}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-3 text-sm text-gray-500 dark:text-gray-400">
                No upcoming events
              </div>
            )}
            
            <Separator className="my-3" />
            
            <Button variant="outline" size="sm" className="w-full">
              <BarChart className="mr-2 h-4 w-4" />
              View Complete Schedule
            </Button>
          </div>
        </div>
      </Card>

      {/* Study Plan Creation Wizard */}
      {showPlanWizard && (
        <CreateStudyPlanWizard
          onCreatePlan={handleCreatePlan}
          onClose={() => setShowPlanWizard(false)}
          examGoal={examGoal}
          isOpen={showPlanWizard}
        />
      )}
    </div>
  );
};

export default EnhancedDashboardHeader;
