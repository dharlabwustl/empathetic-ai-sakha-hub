
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp, 
  Calendar,
  Sparkles,
  ChevronRight,
  Star,
  Award,
  Zap
} from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface SplashScreenProps {
  userName?: string;
  currentMood?: MoodType;
  studyStreak?: number;
  todayProgress?: number;
  weeklyGoal?: number;
  onGetStarted?: () => void;
  onQuickAction?: (action: string) => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ 
  userName = "Student",
  currentMood,
  studyStreak = 0,
  todayProgress = 0,
  weeklyGoal = 75,
  onGetStarted,
  onQuickAction
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const animationTimer = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 3);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(animationTimer);
    };
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getMotivationalQuote = () => {
    const quotes = [
      "Success is the sum of small efforts repeated day in and day out.",
      "The expert in anything was once a beginner.",
      "Education is the most powerful weapon you can use to change the world.",
      "The beautiful thing about learning is that no one can take it away from you.",
      "Every accomplishment starts with the decision to try."
    ];
    
    return quotes[Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % quotes.length];
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const quickActions = [
    { 
      icon: BookOpen, 
      label: "Start Studying", 
      action: "study",
      color: "bg-blue-500 hover:bg-blue-600",
      description: "Begin today's study session"
    },
    { 
      icon: Target, 
      label: "Take Quiz", 
      action: "quiz",
      color: "bg-green-500 hover:bg-green-600",
      description: "Test your knowledge"
    },
    { 
      icon: Zap, 
      label: "Flash Cards", 
      action: "flashcards",
      color: "bg-purple-500 hover:bg-purple-600",
      description: "Quick revision session"
    }
  ];

  const achievements = [
    { icon: Star, label: `${studyStreak} Day Streak`, color: "text-yellow-500" },
    { icon: Award, label: "Top Performer", color: "text-purple-500" },
    { icon: TrendingUp, label: "Improving Fast", color: "text-green-500" }
  ];

  const getMoodEmoji = (mood?: MoodType): string => {
    if (!mood) return "😊";
    
    switch (mood) {
      case MoodType.Happy:
        return "😄";
      case MoodType.Motivated:
        return "🚀";
      case MoodType.Focused:
        return "🎯";
      case MoodType.Tired:
        return "😴";
      case MoodType.Stressed:
        return "😰";
      case MoodType.Anxious:
        return "😰";
      case MoodType.Neutral:
        return "😐";
      case MoodType.Sad:
        return "😢";
      case MoodType.Calm:
        return "😌";
      case MoodType.Confused:
        return "🤔";
      case MoodType.Overwhelmed:
        return "😵";
      case MoodType.Okay:
        return "🙂";
      case MoodType.Curious:
        return "🤓";
      default:
        return "😊";
    }
  };

  const getMoodColor = (mood?: MoodType): string => {
    if (!mood) return "bg-gray-100 text-gray-800";
    
    switch (mood) {
      case MoodType.Motivated:
        return "bg-green-100 text-green-800";
      case MoodType.Happy:
        return "bg-yellow-100 text-yellow-800";
      case MoodType.Focused:
        return "bg-blue-100 text-blue-800";
      case MoodType.Okay:
        return "bg-gray-100 text-gray-800";
      case MoodType.Stressed:
        return "bg-red-100 text-red-800";
      case MoodType.Tired:
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPersonalizedMessage = (mood?: MoodType) => {
    if (!mood) return "Ready to achieve your goals today?";
    
    switch (mood) {
      case MoodType.Motivated:
        return "Your motivation is inspiring! Let's channel it into productive learning.";
      case MoodType.Happy:
        return "Your positive energy is perfect for tackling new concepts!";
      case MoodType.Focused:
        return "Great focus! This is the ideal time for challenging problems.";
      case MoodType.Okay:
        return "Steady progress leads to great achievements. Let's begin!";
      case MoodType.Stressed:
        return "Take it step by step. We'll break down complex topics together.";
      case MoodType.Tired:
        return "Let's start with lighter topics and build momentum gradually.";
      default:
        return "Every step forward counts. You're on the right path!";
    }
  };

  const moodScore = currentMood ? Object.values(MoodType).indexOf(currentMood) + 1 : 5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {formatDate(currentTime)}
            </span>
            <Clock className="h-5 w-5 text-blue-600 ml-4" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {formatTime(currentTime)}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            {getGreeting()}, {userName}!
          </h1>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            {currentMood && (
              <Badge className={`${getMoodColor(currentMood)} flex items-center gap-2`}>
                <span>{getMoodEmoji(currentMood)}</span>
                <span>Feeling {currentMood}</span>
              </Badge>
            )}
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {getPersonalizedMessage(currentMood)}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Study Streak */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-blue-200 dark:border-blue-800">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mx-auto mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{studyStreak}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Day Study Streak</div>
              <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                🔥 Keep it going!
              </div>
            </CardContent>
          </Card>

          {/* Today's Progress */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-green-200 dark:border-green-800">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">{todayProgress}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Today's Goal</div>
              <Progress value={todayProgress} className="mt-2 h-2" />
            </CardContent>
          </Card>

          {/* Weekly Goal */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-purple-200 dark:border-purple-800">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 mx-auto mb-4">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">{weeklyGoal}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Weekly Progress</div>
              <Progress value={weeklyGoal} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={action.action}
                  onClick={() => onQuickAction?.(action.action)}
                  className={`${action.color} text-white h-auto p-4 flex-col gap-2 hover:scale-105 transition-all duration-200`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <action.icon className="h-6 w-6" />
                  <span className="font-medium">{action.label}</span>
                  <span className="text-xs opacity-90">{action.description}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Motivational Quote */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white mb-8">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Star className={`h-6 w-6 ${animationPhase === 0 ? 'text-yellow-300' : 'text-white'} transition-colors duration-500`} />
              <Sparkles className={`h-6 w-6 mx-2 ${animationPhase === 1 ? 'text-yellow-300' : 'text-white'} transition-colors duration-500`} />
              <Star className={`h-6 w-6 ${animationPhase === 2 ? 'text-yellow-300' : 'text-white'} transition-colors duration-500`} />
            </div>
            <p className="text-lg font-medium mb-2">💡 Daily Inspiration</p>
            <p className="text-sm opacity-90 max-w-2xl mx-auto">
              "{getMotivationalQuote()}"
            </p>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Recent Achievements
            </h2>
            <div className="flex flex-wrap gap-3">
              {achievements.map((achievement, index) => (
                <Badge key={index} variant="outline" className="py-2 px-3 flex items-center gap-2">
                  <achievement.icon className={`h-4 w-4 ${achievement.color}`} />
                  {achievement.label}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Action Button */}
        <div className="text-center">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-medium hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Continue Learning Journey
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
