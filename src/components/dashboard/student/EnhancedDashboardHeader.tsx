
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoodType, UserProfileType } from "@/types/user/base";
import { BookMarked, ChevronRight, Target, TrendingUp, BookOpen } from "lucide-react";
import MoodLogButton from "@/components/dashboard/student/mood-tracking/MoodLogButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

interface EnhancedDashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  upcomingEvents?: {
    title: string;
    time: string;
    type: "exam" | "task" | "revision";
  }[];
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
  // Get the greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  const greetingText = getGreeting();
  const userName = userProfile?.name || "Student";
  const avatar = userProfile?.avatar || userProfile?.photoURL;
  
  // Extract exam goal information
  const examGoal = userProfile?.examPreparation || (userProfile?.goals && userProfile.goals[0]?.title);
  
  // Calculate days left until exam (mock data - in real app would come from user profile)
  const calculateDaysLeft = () => {
    // If we have a target date in the first goal, use it
    if (userProfile?.goals?.[0]?.targetDate) {
      const targetDate = new Date(userProfile.goals[0].targetDate);
      const today = new Date();
      const diffTime = targetDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    
    // Default mock value if no target date is available
    return 120;
  };
  
  const daysLeft = calculateDaysLeft();
  const totalDays = 365; // Assuming a year of preparation
  const progressPercentage = 100 - ((daysLeft / totalDays) * 100);
  
  // Calculate exam readiness score
  const examReadinessScore = 72; // This would be calculated based on user performance
  
  // Weekly trends data for exam readiness score
  const weeklyTrends = [
    { week: '-6w', score: 45 },
    { week: '-5w', score: 52 },
    { week: '-4w', score: 58 },
    { week: '-3w', score: 63 },
    { week: '-2w', score: 68 },
    { week: '-1w', score: 70 },
    { week: 'now', score: 72 }
  ];
  
  // Tips for improving exam readiness based on score
  const examReadinessTips = [
    "Review your weak areas more frequently",
    "Try practice exams under timed conditions",
    "Create flashcards for difficult concepts",
    "Teach concepts to someone else to solidify your understanding"
  ];
  
  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
  };

  // Get initials from name
  const getInitials = (name: string): string => {
    if (!name) return '';
    
    const names = name.trim().split(' ');
    
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 rounded-xl p-4 shadow-sm mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* User profile section with avatar */}
        <div className="flex items-center gap-4">
          <Link to="/dashboard/student/profile">
            <Avatar className="h-16 w-16 border-4 border-white dark:border-gray-800 shadow-md hover:ring-2 hover:ring-purple-500 transition-all">
              {avatar ? (
                <AvatarImage src={avatar} alt={userName} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xl">
                  {getInitials(userName)}
                </AvatarFallback>
              )}
            </Avatar>
          </Link>
          
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {greetingText}, {userName}!
              </h1>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formattedDate} • {formattedTime}
            </p>
            
            <div className="flex items-center gap-3 mt-1">
              {/* Exam Goal Badge with Progress */}
              {examGoal && (
                <div className="flex flex-col">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 flex items-center gap-1 mb-1 text-base px-3 py-1">
                    <BookMarked className="h-3 w-3" />
                    <span>{examGoal}</span>
                    <span className="ml-2 text-xs bg-white/20 px-1 rounded">{daysLeft} days left</span>
                  </Badge>
                  <div className="flex items-center gap-2 w-full">
                    <Progress value={progressPercentage} className="h-1.5 w-full bg-gray-200" />
                    <span className="text-xs font-medium">{examReadinessScore}% Ready</span>
                  </div>
                </div>
              )}
              
              {userProfile.subscription && (
                <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                  {typeof userProfile.subscription === 'string' 
                    ? userProfile.subscription.toUpperCase() 
                    : userProfile.subscription.planType?.toUpperCase() || 'FREE'} Plan
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Mood button only */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mood button with enhanced styling */}
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
                      className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Log how you're feeling today to personalize your study plan</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      
      {/* Enhanced Exam Readiness Section */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Exam Readiness Section */}
        <Card className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-0 shadow-sm md:col-span-8">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium flex items-center gap-1">
                <Target className="h-4 w-4 text-purple-500" /> Exam Readiness Score
              </h3>
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-0">
                <TrendingUp className="h-3 w-3 mr-1" /> +2% this week
              </Badge>
            </div>
            
            <div className="grid grid-cols-12 gap-2">
              {/* Main Score */}
              <div className="col-span-4 bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/40 rounded-lg p-3 text-center">
                <div className="text-3xl font-bold text-violet-700 dark:text-violet-400">{examReadinessScore}%</div>
                <div className="text-xs text-violet-600 dark:text-violet-300">Overall Readiness</div>
              </div>
              
              {/* Weekly Trend */}
              <div className="col-span-8 bg-slate-50 dark:bg-slate-900/30 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-2">Weekly Progress</div>
                <div className="flex items-end justify-between h-10">
                  {weeklyTrends.map((week, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div 
                        className="w-5 bg-gradient-to-t from-blue-400 to-violet-500 dark:from-blue-600 dark:to-violet-600 rounded-sm"
                        style={{ height: `${(week.score / 100) * 40}px` }}
                      ></div>
                      <div className="text-[10px] text-gray-400 mt-1">{week.week}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tips & Weak/Strong Areas */}
              <div className="col-span-12 mt-3 grid grid-cols-12 gap-2">
                <div className="col-span-7 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                  <div className="text-xs text-blue-700 dark:text-blue-400 font-medium mb-1">Tips to Improve</div>
                  <ul className="text-xs text-gray-600 dark:text-gray-300 pl-4 list-disc space-y-0.5">
                    {examReadinessTips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="col-span-5 grid grid-rows-2 gap-2">
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-2">
                    <div className="text-xs text-red-700 dark:text-red-400 font-medium mb-1">Weak Areas</div>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-[10px] py-0 bg-white/80">Thermodynamics</Badge>
                      <Badge variant="outline" className="text-[10px] py-0 bg-white/80">Organic Chem</Badge>
                      <Badge variant="outline" className="text-[10px] py-0 bg-white/80">Vectors</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
                    <div className="text-xs text-green-700 dark:text-green-400 font-medium mb-1">Strong Areas</div>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-[10px] py-0 bg-white/80">Algebra</Badge>
                      <Badge variant="outline" className="text-[10px] py-0 bg-white/80">Mechanics</Badge>
                      <Badge variant="outline" className="text-[10px] py-0 bg-white/80">Biology</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" className="text-xs h-7" asChild>
                <Link to="/dashboard/student/academic">Switch Exam</Link>
              </Button>
              <Button variant="outline" size="sm" className="text-xs h-7" asChild>
                <Link to="/dashboard/student/academic">New Plan</Link>
              </Button>
              <Button size="sm" className="text-xs h-7 ml-auto" asChild>
                <Link to="/dashboard/student/today">
                  Today's Plan <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* KPI Dashboard */}
        <Card className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-0 shadow-sm md:col-span-4">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-blue-500" /> Learning Progress
              </h3>
            </div>
            
            <div className="space-y-2">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Concepts Completed</span>
                  <span className="font-medium text-blue-700 dark:text-blue-300">45/60</span>
                </div>
                <Progress value={75} className="h-1" />
                <div className="text-[10px] text-green-600 mt-1">+5 this week</div>
              </div>
              
              <div className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Quiz Average</span>
                  <span className="font-medium text-violet-700 dark:text-violet-300">82%</span>
                </div>
                <Progress value={82} className="h-1" />
                <div className="text-[10px] text-green-600 mt-1">+3% this week</div>
              </div>
              
              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Flashcard Recall</span>
                  <span className="font-medium text-pink-700 dark:text-pink-300">78%</span>
                </div>
                <Progress value={78} className="h-1" />
                <div className="text-[10px] text-green-600 mt-1">+7% this week</div>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Practice Tests</span>
                  <span className="font-medium text-amber-700 dark:text-amber-300">12 completed</span>
                </div>
                <Progress value={60} className="h-1" />
                <div className="text-[10px] text-green-600 mt-1">+2 this week</div>
              </div>
              
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Study Goal</span>
                  <span className="font-medium text-indigo-700 dark:text-indigo-300">4.5/5 hrs</span>
                </div>
                <Progress value={90} className="h-1" />
                <div className="text-[10px] text-green-600 mt-1">+0.5 hrs this week</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Today's upcoming events - Make them clickable and routed */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {upcomingEvents.map((event, i) => (
            <Link 
              key={i} 
              to={
                event.type === 'exam' ? '/dashboard/student/practice-exam' : 
                event.type === 'revision' ? '/dashboard/student/flashcards' :
                '/dashboard/student/today'
              }
            >
              <Card className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-3 flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    event.type === 'exam' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 
                    event.type === 'revision' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    <span className="text-lg">
                      {event.type === 'exam' ? '📝' : 
                      event.type === 'revision' ? '🔄' : 
                      '✅'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.time}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedDashboardHeader;
