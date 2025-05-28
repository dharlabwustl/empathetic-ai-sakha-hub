
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp, 
  Calendar,
  Brain,
  Zap,
  Trophy,
  Star,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Lightbulb,
  Coffee,
  Sun,
  Moon,
  ChevronRight
} from 'lucide-react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';

interface ComprehensiveAdaptiveDashboardProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ComprehensiveAdaptiveDashboard: React.FC<ComprehensiveAdaptiveDashboardProps> = ({
  userProfile,
  kpis,
  currentMood,
  onMoodChange
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute for dynamic suggestions
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Dynamic suggestions based on time of day
  const getTimeBasedSuggestions = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 5 && hour < 12) {
      // Morning (5 AM - 12 PM)
      return [
        { icon: <Sun className="h-4 w-4" />, text: "Start with Physics concepts - your brain is fresh!", action: "Open Physics" },
        { icon: <Coffee className="h-4 w-4" />, text: "Morning energy is perfect for difficult topics", action: "Study Hard Topics" },
        { icon: <Target className="h-4 w-4" />, text: "Set today's study goals", action: "Set Goals" }
      ];
    } else if (hour >= 12 && hour < 17) {
      // Afternoon (12 PM - 5 PM)
      return [
        { icon: <Brain className="h-4 w-4" />, text: "Perfect time for practice tests", action: "Take Practice Test" },
        { icon: <BookOpen className="h-4 w-4" />, text: "Review morning concepts with flashcards", action: "Open Flashcards" },
        { icon: <TrendingUp className="h-4 w-4" />, text: "Check your progress analytics", action: "View Analytics" }
      ];
    } else if (hour >= 17 && hour < 21) {
      // Evening (5 PM - 9 PM)
      return [
        { icon: <Zap className="h-4 w-4" />, text: "Prime study time - tackle Chemistry!", action: "Study Chemistry" },
        { icon: <Trophy className="h-4 w-4" />, text: "Join study groups for motivation", action: "Join Groups" },
        { icon: <CheckCircle className="h-4 w-4" />, text: "Complete pending assignments", action: "View Tasks" }
      ];
    } else {
      // Night (9 PM - 5 AM)
      return [
        { icon: <Moon className="h-4 w-4" />, text: "Light revision before bed", action: "Quick Review" },
        { icon: <Star className="h-4 w-4" />, text: "Plan tomorrow's study schedule", action: "Plan Tomorrow" },
        { icon: <Lightbulb className="h-4 w-4" />, text: "Reflect on today's learning", action: "Daily Reflection" }
      ];
    }
  };

  const timeBasedSuggestions = getTimeBasedSuggestions();

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Section */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome back, {userProfile.name || userProfile.firstName || 'Student'}! 🌟
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Ready to conquer NEET 2026? Let's make today count!
        </p>
      </div>

      {/* Today's Top Priority - WITH PREMIUM ANIMATIONS */}
      <Card className="relative overflow-hidden border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 animate-pulse">
        {/* Animated border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 opacity-75 animate-pulse" 
             style={{
               background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #3b82f6)',
               backgroundSize: '200% 200%',
               animation: 'gradient-shift 3s ease infinite'
             }}>
        </div>
        <div className="absolute inset-[2px] bg-white dark:bg-gray-900 rounded-lg"></div>
        
        {/* Blinking arrow indicator */}
        <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 text-blue-500 animate-bounce">
          <ChevronRight className="h-8 w-8 animate-pulse" />
        </div>
        
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Target className="h-6 w-6 animate-spin" style={{animationDuration: '3s'}} />
            Today's Top Priority
            <Badge className="bg-red-500 text-white animate-pulse">URGENT</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-orange-500 shadow-lg">
            <h3 className="font-semibold text-orange-700 dark:text-orange-300 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 animate-pulse" />
              Physics: Wave Optics - Mock Test
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Complete the pending mock test to strengthen your weak areas
            </p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Est. 45 minutes</span>
              </div>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 animate-pulse">
                Start Now
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's NEET Study Plan - WITH PREMIUM ANIMATIONS */}
      <Card className="relative overflow-hidden border-2 border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50">
        {/* Animated border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 opacity-75" 
             style={{
               background: 'linear-gradient(45deg, #10b981, #059669, #10b981)',
               backgroundSize: '200% 200%',
               animation: 'gradient-shift 4s ease infinite'
             }}>
        </div>
        <div className="absolute inset-[2px] bg-white dark:bg-gray-900 rounded-lg"></div>
        
        {/* Blinking arrow indicator */}
        <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 text-green-500 animate-bounce">
          <ChevronRight className="h-8 w-8 animate-pulse" />
        </div>

        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <Calendar className="h-6 w-6 animate-pulse" />
            Today's NEET Study Plan
            <Badge className="bg-green-500 text-white animate-pulse">ACTIVE</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 space-y-4">
          <div className="grid gap-3">
            {[
              { subject: 'Physics', topic: 'Wave Optics', progress: 75, color: 'blue', time: '9:00 AM - 11:00 AM' },
              { subject: 'Chemistry', topic: 'Coordination Compounds', progress: 45, color: 'purple', time: '2:00 PM - 4:00 PM' },
              { subject: 'Biology', topic: 'Human Reproduction', progress: 90, color: 'green', time: '7:00 PM - 9:00 PM' }
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{item.subject}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.topic}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${item.color}-100 text-${item.color}-800 dark:bg-${item.color}-900 dark:text-${item.color}-200`}>
                      {item.progress}%
                    </div>
                  </div>
                </div>
                <Progress value={item.progress} className="mt-2 h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300">Study Streak</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">12 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-700 dark:text-purple-300">NEET Score</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">485/720</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-700 dark:text-green-300">Progress</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">68%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart AI Suggestions - Dynamic based on time */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-violet-600" />
            Smart AI Suggestions
            <Badge variant="outline" className="text-xs">
              {currentTime.getHours() < 12 ? '🌅 Morning' : 
               currentTime.getHours() < 17 ? '☀️ Afternoon' : 
               currentTime.getHours() < 21 ? '🌆 Evening' : '🌙 Night'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {timeBasedSuggestions.map((suggestion, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="text-violet-600">
                    {suggestion.icon}
                  </div>
                  <span className="text-sm font-medium">{suggestion.text}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-violet-600 hover:text-violet-700">
                  {suggestion.action}
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* NEET 2026 Strategy Card */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-indigo-200 dark:border-indigo-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-indigo-600" />
            NEET 2026 Strategy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">287</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Days Left</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Topics Covered</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-green-600">24</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Mock Tests</div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Subject-wise Progress</h4>
            <div className="space-y-2">
              {[
                { subject: 'Physics', progress: 68, target: 85 },
                { subject: 'Chemistry', progress: 72, target: 90 },
                { subject: 'Biology', progress: 76, target: 95 }
              ].map((item) => (
                <div key={item.subject} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{item.subject}</span>
                    <span>{item.progress}% / {item.target}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
