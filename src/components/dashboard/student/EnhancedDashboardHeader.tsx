
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CalendarIcon, BellIcon, ClipboardCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoodType, UserProfileType } from "@/types/user/base";
import MoodLogButton from "@/components/dashboard/student/mood-tracking/MoodLogButton";
import { useVoiceAnnouncer } from "@/components/dashboard/student/feel-good-corner/utils/VoiceAnnouncer";

interface EnhancedDashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  upcomingEvents?: Array<{
    title: string;
    time: string;
    type: string;
  }>;
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
  const { announce, isMuted } = useVoiceAnnouncer();

  // Get the greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  const greetingText = getGreeting();
  const userName = userProfile?.name || "Student";

  // Determine appropriate message based on mood
  const getMoodBasedMessage = () => {
    if (!currentMood) return "";
    
    switch (currentMood) {
      case "happy":
        return "Great to see you're feeling happy today!";
      case "focused":
        return "You're in the zone! Perfect time to tackle important tasks.";
      case "motivated":
        return "Your motivation is inspiring! Let's make the most of it.";
      case "anxious":
        return "I notice you're feeling anxious. Remember to take breaks when needed.";
      case "stressed":
        return "It's okay to feel stressed. Let's break down your tasks to make them manageable.";
      case "tired":
        return "You seem tired. Consider a short break to recharge.";
      case "overwhelmed":
        return "Feeling overwhelmed is normal. Let's prioritize your tasks together.";
      case "neutral":
        return "Ready for a productive day?";
      case "okay":
        return "Let's make today a great day!";
      default:
        return "";
    }
  };

  useEffect(() => {
    // Announce personalized greeting based on time and mood
    const personalizedGreeting = `${greetingText}, ${userName}! ${getMoodBasedMessage()}`;
    
    // Add a small delay before announcing
    const timeoutId = setTimeout(() => {
      if (!isMuted) {
        announce(personalizedGreeting);
      }
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [announce, greetingText, userName, currentMood, isMuted]);

  useEffect(() => {
    // Announce upcoming events if they exist
    if (upcomingEvents.length > 0 && !isMuted) {
      const eventsMessage = `You have ${upcomingEvents.length} upcoming ${upcomingEvents.length === 1 ? 'event' : 'events'}: ${upcomingEvents.map(event => event.title).join(", ")}`;
      
      // Add delay so it doesn't overlap with the greeting
      const timeoutId = setTimeout(() => {
        announce(eventsMessage);
      }, 5000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [upcomingEvents, announce, isMuted]);
  
  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
      
      // Announce mood change
      if (!isMuted) {
        setTimeout(() => {
          announce(`Your mood has been updated to ${mood}. ${getMoodBasedMessage()}`);
        }, 500);
      }
    }
  };

  return (
    <div className="mb-6">
      {/* Main header with greeting and profile */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            {greetingText}, {userName}!
          </h1>
          <p className="text-muted-foreground">
            {formattedDate} • {formattedTime}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {onMoodChange && (
            <MoodLogButton
              currentMood={currentMood}
              onMoodChange={handleMoodChange}
            />
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onViewStudyPlan}
            className="flex items-center gap-1"
          >
            <CalendarIcon className="h-4 w-4" />
            <span>Study Plan</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1 relative"
            asChild
          >
            <a href="/dashboard/student/notifications">
              <BellIcon className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              <span className="sr-only">Notifications</span>
            </a>
          </Button>
        </div>
      </div>
      
      {/* Upcoming events card */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-sm">Upcoming Events</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs h-auto py-1"
                asChild
              >
                <a href="/dashboard/student/calendar">View All</a>
              </Button>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-full ${event.type === 'exam' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                    <ClipboardCheck className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedDashboardHeader;
