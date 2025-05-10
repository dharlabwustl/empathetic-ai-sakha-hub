
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, CalendarDays, CalendarClock, PlusCircle } from 'lucide-react';
import { UserProfileType, MoodType } from '@/types/user/base';
import MoodSelector from './mood-tracking/MoodSelector';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface EnhancedDashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  upcomingEvents: Array<{
    title: string;
    time: string;
    type: 'exam' | 'task' | 'meeting';
  }>;
}

const EnhancedDashboardHeader: React.FC<EnhancedDashboardHeaderProps> = ({
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan,
  currentMood,
  onMoodChange,
  upcomingEvents
}) => {
  const navigate = useNavigate();
  
  const handleCreateStudyPlan = () => {
    navigate('/dashboard/student/academic');
    // Add a small delay to ensure navigation completes before showing the dialog
    setTimeout(() => {
      // Trigger a custom event that CreateStudyPlanWizard will listen for
      const event = new CustomEvent('openCreateStudyPlan', { detail: {} });
      document.dispatchEvent(event);
    }, 100);
  };

  return (
    <div className="space-y-4">
      {/* User greeting section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {userProfile?.name?.split(' ')[0] || 'Student'}!
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-muted-foreground text-sm">
              {formattedDate} · {formattedTime}
            </p>
          </div>
        </div>
        
        {/* Mood selector */}
        {onMoodChange && (
          <div className="hidden md:block">
            <MoodSelector currentMood={currentMood} onChange={onMoodChange} />
          </div>
        )}
      </div>
      
      {/* Goals and upcoming events (in a row on desktop, stacked on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Exam goal card */}
        <Card className="md:col-span-1">
          <CardContent className="p-4">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-md font-medium text-gray-700">Your Exam Preparation</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-600 p-1 h-auto" 
                  onClick={onViewStudyPlan}
                >
                  <Bell className="h-4 w-4 mr-1" />
                  <span className="text-xs">Reminders</span>
                </Button>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-lg font-semibold">{userProfile?.goals?.[0]?.title || 'NEET'}</p>
                    <p className="text-sm text-muted-foreground">Target: {userProfile?.goals?.[0]?.targetDate || '2025'}</p>
                  </div>
                  <Button 
                    onClick={handleCreateStudyPlan}
                    size="sm" 
                    className="flex items-center gap-1"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span className="hidden md:inline">Create Study Plan</span>
                    <span className="md:hidden">New Plan</span>
                  </Button>
                </div>
                
                <div className="mt-auto">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-violet-500 h-2 rounded-full" 
                      style={{ width: `${userProfile?.goals?.[0]?.progress || 35}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>{userProfile?.goals?.[0]?.progress || 35}% Complete</span>
                    <span>{userProfile?.goals?.[0]?.daysLeft || 120} days left</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Today's events */}
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-gray-700">Upcoming Events</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-600 p-1 h-auto" 
                  onClick={() => navigate('/dashboard/student/today')}
                >
                  <CalendarClock className="h-4 w-4 mr-1" />
                  <span className="text-xs">View all</span>
                </Button>
              </div>
              
              {upcomingEvents.length > 0 ? (
                <ul className="space-y-2">
                  {upcomingEvents.map((event, index) => (
                    <li key={index} className="flex items-center gap-3 py-1">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        {event.type === 'exam' ? (
                          <CalendarClock className="h-5 w-5 text-blue-500" />
                        ) : (
                          <CalendarDays className="h-5 w-5 text-emerald-500" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                      <Badge variant={event.type === 'exam' ? 'default' : 'outline'}>
                        {event.type === 'exam' ? 'Exam' : 'Task'}
                      </Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p>No upcoming events today</p>
                </div>
              )}
              
              <div className="mt-auto pt-2 text-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full md:w-auto" 
                  onClick={() => navigate('/dashboard/student/today')}
                >
                  View Today's Complete Schedule
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Mobile mood selector */}
        {onMoodChange && (
          <div className="md:hidden">
            <MoodSelector currentMood={currentMood} onChange={onMoodChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedDashboardHeader;
