import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { UserProfileBase } from "@/types/user/base";
import { Calendar, ChevronRight, Bell, Star, Zap } from "lucide-react";
import { MoodType } from '@/types/user/base';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

interface EnhancedDashboardHeaderProps {
  userProfile: UserProfileBase;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  streakDays?: number;
  upcomingEvents?: Array<{
    title: string;
    time: string;
    type: 'exam' | 'task' | 'deadline';
  }>;
}

const EnhancedDashboardHeader: React.FC<EnhancedDashboardHeaderProps> = ({
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan,
  currentMood,
  onMoodChange,
  streakDays = 7,
  upcomingEvents = []
}) => {
  const [dailyProgress, setDailyProgress] = useState<number>(
    Math.floor(Math.random() * 60) + 20
  ); // Simulated progress between 20-80%
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };
  
  const getMoodEmoji = (mood?: MoodType) => {
    if (!mood) return "😊";
    switch(mood) {
      case "MOTIVATED": return "🚀";
      case "CONFIDENT": return "💪";
      case "FOCUSED": return "🎯";
      case "TIRED": return "😴";
      case "ANXIOUS": return "😰";
      case "DISTRACTED": return "🤔";
      default: return "😊";
    }
  };
  
  const getStudyRecommendation = () => {
    const recommendations = [
      "Focus on Physics for 2 hours today",
      "Complete 20 Biology flashcards",
      "Practice NEET mock test #3",
      "Review yesterday's Chemistry notes",
      "Take a 10-minute break every hour"
    ];
    return recommendations[Math.floor(Math.random() * recommendations.length)];
  };
  
  const moodOptions = [
    {type: "MOTIVATED", label: "Motivated", emoji: "🚀"},
    {type: "CONFIDENT", label: "Confident", emoji: "💪"},
    {type: "FOCUSED", label: "Focused", emoji: "🎯"},
    {type: "TIRED", label: "Tired", emoji: "😴"},
    {type: "ANXIOUS", label: "Anxious", emoji: "😰"},
    {type: "DISTRACTED", label: "Distracted", emoji: "🤔"}
  ];

  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Top section with user info and greeting */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 p-4 sm:p-6 rounded-xl border border-indigo-100/50 dark:border-indigo-800/30">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
            {userProfile.profilePicture ? (
              <AvatarImage src={userProfile.profilePicture} alt={userProfile.name} />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-lg">
                {userProfile.name?.charAt(0) || "U"}
              </AvatarFallback>
            )}
          </Avatar>
          
          <div>
            <div className="text-sm text-muted-foreground">
              {getGreeting()}
            </div>
            <h1 className="text-2xl font-bold">{userProfile.name}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{formattedTime}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-2 sm:mt-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 border-indigo-100 dark:border-indigo-800/30"
              >
                <span className="text-xl">{getMoodEmoji(currentMood)}</span>
                <span>I'm feeling {currentMood?.toLowerCase() || "great"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>How are you feeling today?</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {moodOptions.map((mood) => (
                <DropdownMenuItem 
                  key={mood.type} 
                  onClick={() => onMoodChange?.(mood.type as MoodType)}
                  className="cursor-pointer"
                >
                  <span className="mr-2">{mood.emoji}</span>
                  {mood.label}
                  {currentMood === mood.type && (
                    <span className="ml-auto">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={onViewStudyPlan} className="bg-indigo-600 hover:bg-indigo-700">
            View Study Plan
          </Button>
        </div>
      </div>
      
      {/* Progress & Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Daily Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border p-4 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Today's Progress</h3>
          <div className="mb-3">
            <div className="flex justify-between mb-1 text-sm">
              <span className="font-medium">{dailyProgress}% Completed</span>
              <span className="text-muted-foreground">{Math.ceil((100-dailyProgress)/10)} tasks left</span>
            </div>
            <Progress value={dailyProgress} className="h-2" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Tip: {getStudyRecommendation()}
          </p>
        </div>
        
        {/* Streak Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border p-4 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Study Streak</h3>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <span className="text-xl font-bold">{streakDays} days</span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            {Array.from({length: 7}).map((_, i) => (
              <motion.div 
                key={i}
                className={`h-2 w-full rounded-full ${i < streakDays % 7 ? 'bg-amber-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Keep your streak going! Study today to maintain momentum.
          </p>
        </div>
        
        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border p-4 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Upcoming Events</h3>
          <div className="space-y-2 mt-3">
            {upcomingEvents.map((event, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-2 bg-card hover:bg-card/80 rounded-md cursor-pointer"
                onClick={() => navigate(event.type === 'exam' ? '/dashboard/student/practice-exam' : '/dashboard/student/today')}
              >
                <div className="flex items-center gap-2">
                  {event.type === 'exam' ? <ClipboardCheck className="h-4 w-4 text-primary" /> : <Calendar className="h-4 w-4 text-primary" />}
                  <span className="text-sm font-medium">{event.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">{event.time}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Click to view your full schedule
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboardHeader;
