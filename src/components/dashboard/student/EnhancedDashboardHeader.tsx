
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserProfileType, MoodType } from '@/types/user/base';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Lightbulb } from 'lucide-react';
import MoodSelector from '@/components/dashboard/student/mood-tracking/MoodSelector';
import { Badge } from '@/components/ui/badge';

interface Event {
  title: string;
  time: string;
  type: 'task' | 'exam' | 'concept';
  route?: string;
}

interface EnhancedDashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  upcomingEvents?: Event[];
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
  // Default events if none provided
  const defaultEvents: Event[] = [
    { title: 'NEET Physics Concept Review', time: 'Today, 4:00 PM', type: 'concept', route: '/dashboard/student/concepts' },
    { title: 'Biology Revision', time: 'Tomorrow, 9:00 AM', type: 'task', route: '/dashboard/student/today' },
    { title: 'Practice Chemistry Test', time: 'Wednesday, 2:00 PM', type: 'exam', route: '/dashboard/student/practice-exam' }
  ];

  // Use provided events or defaults
  const events = upcomingEvents.length > 0 ? upcomingEvents : defaultEvents;

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Get mood-based tips
  const getMoodBasedTip = () => {
    switch(currentMood) {
      case MoodType.Tired:
        return "Try focusing on easier review tasks today. Take plenty of short breaks.";
      case MoodType.Stressed:
        return "Consider shorter study sessions with more breaks. Focus on reviewing familiar topics.";
      case MoodType.Motivated:
        return "Great energy today! Take advantage by tackling those challenging concepts.";
      case MoodType.Focused:
        return "Your focus is strong today. Prioritize complex problem-solving tasks.";
      default:
        return "Set specific goals for today's study session to maximize productivity.";
    }
  };

  // Get exam goal from user profile
  const examGoal = userProfile?.goals?.[0]?.title || "NEET";

  return (
    <div className="mb-8 space-y-4">
      {/* Top section with greeting and exam goal */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {getGreeting()}, {userProfile.name || userProfile.firstName || 'Student'}!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
            {formattedDate} • {formattedTime}
          </p>
        </div>
        
        <div className="flex flex-col md:items-end gap-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-violet-100 text-violet-800 hover:bg-violet-100">
              Preparing for {examGoal}
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-violet-600 border-violet-200 hover:bg-violet-50"
              onClick={() => location.href = '/dashboard/student/academic'}
            >
              Change
            </Button>
          </div>
          <Link to="/dashboard/student/academic" className="text-xs text-blue-600 hover:underline">
            Create New Study Plan
          </Link>
        </div>
      </div>

      {/* Mood and Next Session */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Mood section */}
        <Card className="overflow-hidden border-violet-100">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-800 dark:text-gray-200">Your Current Mood</h3>
              <Lightbulb className="text-amber-400 h-4 w-4" />
            </div>
            
            <div className="mb-4">
              {onMoodChange ? (
                <MoodSelector 
                  currentMood={currentMood} 
                  onMoodChange={onMoodChange}
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-500">Mood tracking unavailable</p>
                </div>
              )}
            </div>
            
            <div className="bg-amber-50 p-3 rounded-md border border-amber-100">
              <p className="text-sm text-amber-800">{getMoodBasedTip()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Next Session */}
        <Card className="overflow-hidden border-blue-100">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-800 dark:text-gray-200">Next Sessions</h3>
              <Clock className="text-blue-500 h-4 w-4" />
            </div>
            
            <div className="space-y-2">
              {events.map((event, idx) => (
                <Link 
                  key={idx} 
                  to={event.route || '#'}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.time}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      event.type === 'exam' 
                        ? 'bg-red-50 text-red-700 border-red-200' 
                        : event.type === 'concept'
                          ? 'bg-violet-50 text-violet-700 border-violet-200'
                          : 'bg-green-50 text-green-700 border-green-200'
                    }
                  >
                    {event.type}
                  </Badge>
                </Link>
              ))}
            </div>
            
            <div className="mt-4">
              <Button 
                onClick={onViewStudyPlan} 
                className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                variant="outline"
              >
                <Calendar className="mr-2 h-4 w-4" />
                View Complete Study Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedDashboardHeader;
