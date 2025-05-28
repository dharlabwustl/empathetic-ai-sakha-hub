
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Target, 
  BookOpen, 
  Brain, 
  TrendingUp, 
  Calendar,
  Trophy,
  Star,
  Zap,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Coffee,
  Sun,
  Moon,
  Sunrise,
  Sunset
} from 'lucide-react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { useNavigate } from 'react-router-dom';
import SubscriptionBanner from '../student/SubscriptionBanner';
import { SubscriptionType } from '@/types/user/subscription';
import TodaysPlanSection from '../student/dashboard-sections/TodaysPlanSection';
import NEETStrategyCard from '../student/NEETStrategyCard';
import SubjectBreakdownSection from '../student/SubjectBreakdownSection';

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
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every minute for dynamic suggestions
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  const currentHour = currentTime.getHours();
  
  // Get time-based greeting and suggestions
  const getTimeBasedContent = () => {
    if (currentHour >= 5 && currentHour < 12) {
      return {
        period: 'Morning',
        icon: <Sunrise className="h-4 w-4 text-orange-500" />,
        greeting: 'Good Morning',
        suggestions: [
          'Start with complex Physics concepts when your mind is fresh',
          'Review yesterday\'s learning with flashcards',
          'Plan your day with high-priority topics first'
        ],
        bgColor: 'bg-gradient-to-r from-orange-50 to-yellow-50',
        textColor: 'text-orange-800'
      };
    } else if (currentHour >= 12 && currentHour < 17) {
      return {
        period: 'Afternoon',
        icon: <Sun className="h-4 w-4 text-yellow-500" />,
        greeting: 'Good Afternoon',
        suggestions: [
          'Perfect time for Chemistry practicals and experiments',
          'Take short breaks between intensive study sessions',
          'Practice mock tests to maintain concentration'
        ],
        bgColor: 'bg-gradient-to-r from-yellow-50 to-amber-50',
        textColor: 'text-yellow-800'
      };
    } else if (currentHour >= 17 && currentHour < 21) {
      return {
        period: 'Evening',
        icon: <Sunset className="h-4 w-4 text-purple-500" />,
        greeting: 'Good Evening',
        suggestions: [
          'Review Biology topics - ideal for memorization',
          'Solve previous year questions and analyze mistakes',
          'Group study with friends for better retention'
        ],
        bgColor: 'bg-gradient-to-r from-purple-50 to-pink-50',
        textColor: 'text-purple-800'
      };
    } else {
      return {
        period: 'Night',
        icon: <Moon className="h-4 w-4 text-blue-500" />,
        greeting: 'Good Evening',
        suggestions: [
          'Light revision of today\'s topics before sleep',
          'Avoid heavy concepts - focus on formula practice',
          'Plan tomorrow\'s study schedule and priorities'
        ],
        bgColor: 'bg-gradient-to-r from-blue-50 to-indigo-50',
        textColor: 'text-blue-800'
      };
    }
  };

  const timeContent = getTimeBasedContent();

  // Mock subscription data
  const mockSubscription = {
    planType: 'free',
    isActive: true,
    startDate: '2024-01-01',
    expiryDate: '2024-12-31'
  };

  const handleUpgrade = () => {
    window.open('https://preview--empathetic-ai-sakha-hub.lovable.app/dashboard/student/subscription', '_blank');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Subscription Banner */}
      <SubscriptionBanner subscription={mockSubscription} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Top Priority - WITH BLINKING ANIMATION */}
          <div className="relative">
            {/* Animated Arrow Pointer */}
            <div className="absolute -left-4 top-4 z-10">
              <div className="animate-pulse">
                <ArrowRight className="h-6 w-6 text-red-500 animate-bounce" />
              </div>
            </div>
            
            {/* Blinking Border Animation */}
            <div className="absolute inset-0 rounded-lg animate-pulse">
              <div className="absolute inset-0 border-4 border-red-400 rounded-lg opacity-50 animate-ping"></div>
            </div>
            
            <Card className="relative bg-gradient-to-r from-red-50 to-pink-50 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="animate-pulse">
                      <Target className="h-5 w-5 text-red-600" />
                    </div>
                    <span className="animate-pulse text-red-800">Today's Top Priority</span>
                    <Badge className="bg-red-100 text-red-800 border-red-300 animate-pulse">
                      URGENT
                    </Badge>
                  </CardTitle>
                  <div className="animate-bounce">
                    <Zap className="h-5 w-5 text-yellow-500" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h3 className="font-semibold text-red-900">
                    Physics: Newton's Laws of Motion
                  </h3>
                  <p className="text-sm text-red-700">
                    Complete this topic today to stay on track with your NEET preparation timeline.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-4 w-4 text-red-600" />
                      <span>Due: Today</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Trophy className="h-4 w-4 text-yellow-600" />
                      <span>High Impact</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700 text-white animate-pulse"
                    onClick={() => navigate('/dashboard/student/concepts')}
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Start Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's NEET Study Plan - WITH BLINKING ANIMATION */}
          <div className="relative">
            {/* Animated Arrow Pointer */}
            <div className="absolute -left-4 top-4 z-10">
              <div className="animate-pulse">
                <ArrowRight className="h-6 w-6 text-blue-500 animate-bounce" />
              </div>
            </div>
            
            {/* Blinking Border Animation */}
            <div className="absolute inset-0 rounded-lg animate-pulse">
              <div className="absolute inset-0 border-4 border-blue-400 rounded-lg opacity-50 animate-ping"></div>
            </div>
            
            <TodaysPlanSection 
              currentMood={currentMood}
            />
          </div>

          {/* Time-based Smart Suggestions - DYNAMIC */}
          <Card className={`${timeContent.bgColor} border-opacity-50`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                {timeContent.icon}
                <span className={timeContent.textColor}>
                  {timeContent.greeting}! {timeContent.period} Study Tips
                </span>
                <Badge variant="outline" className="ml-auto">
                  {timeContent.period}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {timeContent.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className={`text-sm ${timeContent.textColor}`}>
                      {suggestion}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-gray-600 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Updates automatically based on time of day</span>
              </div>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">68%</div>
                  <div className="text-sm text-gray-600">Overall Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">15</div>
                  <div className="text-sm text-gray-600">Concepts Mastered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">230</div>
                  <div className="text-sm text-gray-600">Flashcards</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">8</div>
                  <div className="text-sm text-gray-600">Mock Tests</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* NEET 2026 Strategy Card */}
          <NEETStrategyCard />

          {/* AI Coach Suggestions */}
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-5 w-5 text-indigo-600" />
                NEET AI Tutor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-white/60 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Focus on Weak Areas</p>
                      <p className="text-xs text-gray-600">Your Physics mechanics needs attention</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-white/60 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Practice More</p>
                      <p className="text-xs text-gray-600">Increase Chemistry problem solving</p>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => navigate('/dashboard/student/ai-tutor')}
                >
                  Get Personalized Help
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upgrade Prompt */}
          <Card className="bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
            <CardContent className="p-4">
              <div className="text-center space-y-3">
                <div className="text-2xl">🚀</div>
                <h3 className="font-semibold text-violet-800">Unlock Premium Features</h3>
                <p className="text-sm text-violet-600">
                  Get unlimited practice tests, AI tutoring, and personalized study plans
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-violet-600 hover:bg-violet-700"
                  onClick={handleUpgrade}
                >
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Subject Breakdown */}
      <div className="mt-8">
        <SubjectBreakdownSection />
      </div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
