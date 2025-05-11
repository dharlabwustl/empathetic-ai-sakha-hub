
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoodType, UserProfileType } from "@/types/user/base";
import { Bell, Calendar, BarChart4, ExternalLink } from "lucide-react";
import MoodLogButton from "./MoodLogButton";
import { useAuth } from '@/contexts/auth/AuthContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UpcomingEvent {
  title: string;
  time: string;
  type: 'exam' | 'task' | 'concept' | 'flashcard';
  link?: string;
}

interface EnhancedDashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan?: () => void;
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
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  // Get the greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  const greetingText = getGreeting();
  const userName = userProfile?.name || "Student";
  
  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
  };

  // Navigate to respective pages based on event type
  const handleEventClick = (event: UpcomingEvent) => {
    if (event.link) {
      navigate(event.link);
      return;
    }
    
    switch(event.type) {
      case 'exam':
        navigate('/dashboard/student/practice-exam');
        break;
      case 'task':
        navigate('/dashboard/student/today');
        break;
      case 'concept':
        navigate('/dashboard/student/concepts');
        break;
      case 'flashcard':
        navigate('/dashboard/student/flashcards');
        break;
      default:
        navigate('/dashboard/student/today');
    }
  };

  // Default upcoming events if none provided
  const defaultEvents: UpcomingEvent[] = [
    { 
      title: 'Physics Practice Test', 
      time: 'Today, 4:00 PM', 
      type: 'exam',
      link: '/dashboard/student/practice-exam/physics-101'
    },
    { 
      title: 'Chemistry Flashcards Review', 
      time: 'Today, 6:00 PM', 
      type: 'flashcard',
      link: '/dashboard/student/flashcards/chemistry'
    },
    { 
      title: 'Biology Concept Study', 
      time: 'Tomorrow, 9:00 AM', 
      type: 'concept',
      link: '/dashboard/student/concepts/biology-cell-structure'
    }
  ];

  const displayEvents = upcomingEvents.length > 0 ? upcomingEvents : defaultEvents;

  // Extract goal from user profile
  const examGoal = userProfile?.goals?.[0]?.title || "Your Exam";

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left section - Greeting and mood */}
        <Card className="p-4 col-span-1 md:col-span-1 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {greetingText}, {userName}!
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formattedDate} • {formattedTime}
            </p>
          </div>
          
          <div className="flex items-center gap-3 mt-4">
            {onMoodChange && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <MoodLogButton
                        currentMood={currentMood}
                        onMoodChange={handleMoodChange}
                        size="default"
                        showLabel={true}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Log how you're feeling today</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
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
            
            {/* Logout button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="ml-auto"
                  >
                    Logout
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Sign out of your account</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Card>
        
        {/* Middle section - Exam goal and progress */}
        <Card className="p-4 col-span-1 md:col-span-1 flex flex-col">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Target Exam</h2>
                <Badge variant="outline" className="bg-purple-100 text-purple-800">
                  Goal
                </Badge>
              </div>
              
              <h3 className="text-xl font-bold mt-2">{examGoal}</h3>
              
              <div className="flex items-center gap-2 mt-3">
                <BarChart4 className="h-4 w-4 text-blue-600" />
                <div className="text-sm">
                  <span className="font-medium">74% </span>
                  <span className="text-muted-foreground">Readiness</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 dark:bg-gray-700">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '74%' }}></div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <Button 
                onClick={onViewStudyPlan}
                size="sm"
                className="flex items-center gap-1"
              >
                <Calendar className="h-4 w-4" />
                <span>View Study Plan</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard/student/exams')}
              >
                Switch Exam
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Right section - Next session */}
        <Card className="p-4 col-span-1 md:col-span-1">
          <div>
            <h2 className="font-semibold mb-3">Next Sessions</h2>
            
            <div className="space-y-3">
              {displayEvents.map((event, index) => (
                <div 
                  key={index}
                  className="flex items-start justify-between border-b pb-2 last:border-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 p-1 rounded transition-colors"
                  onClick={() => handleEventClick(event)}
                >
                  <div>
                    <h3 className="font-medium text-sm">{event.title}</h3>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Add Badge component
import { Badge } from "@/components/ui/badge";

export default EnhancedDashboardHeader;
