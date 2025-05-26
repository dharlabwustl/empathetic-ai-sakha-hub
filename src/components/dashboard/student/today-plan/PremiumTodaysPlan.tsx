import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTodaysPlan } from "@/hooks/useTodaysPlan";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import EnhancedTaskBreakdown from './EnhancedTaskBreakdown';
import EnhancedVoiceAssistant from '@/components/voice/EnhancedVoiceAssistant';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  BookOpen, 
  Calendar,
  Star,
  Zap,
  Brain,
  Trophy
} from 'lucide-react';

const PremiumTodaysPlan: React.FC = () => {
  const { userProfile } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const goalTitle = userProfile?.goals?.[0]?.title || "NEET";
  
  const {
    loading,
    error,
    planData,
    refreshData,
    markTaskCompleted,
    addBookmark,
    addNote
  } = useTodaysPlan(goalTitle, userProfile?.name || "Student");
  
  if (loading) {
    return <LoadingState message="Loading your premium study plan..." />;
  }
  
  if (error) {
    return (
      <ErrorState 
        title="Could not load study plan" 
        message={error} 
        action={
          <Button onClick={refreshData}>
            Try Again
          </Button>
        }
      />
    );
  }

  const handleConceptClick = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  const handleNavigationCommand = (route: string) => {
    navigate(route);
  };

  // Premium Smart Suggestions Data
  const todayDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const smartSuggestions = [
    {
      type: 'focus',
      title: 'High-Impact Study Session',
      description: 'Based on your weak areas, focus on Thermodynamics for 90 minutes',
      priority: 'high',
      estimatedTime: '90 min',
      impact: '+12% score improvement',
      icon: <Target className="w-5 h-5" />,
      color: 'bg-red-500'
    },
    {
      type: 'review',
      title: 'Quick Win Opportunity',
      description: 'Review yesterday\'s Physics concepts - you\'re 85% there!',
      priority: 'medium',
      estimatedTime: '30 min',
      impact: '+5% confidence boost',
      icon: <Trophy className="w-5 h-5" />,
      color: 'bg-green-500'
    },
    {
      type: 'break',
      title: 'Smart Break Suggestion',
      description: 'Take a 15-minute mindfulness break to optimize retention',
      priority: 'low',
      estimatedTime: '15 min',
      impact: 'Better focus',
      icon: <Brain className="w-5 h-5" />,
      color: 'bg-blue-500'
    }
  ];

  const performanceMetrics = {
    todayProgress: 45,
    weeklyStreak: 8,
    completionRate: 87,
    focusTime: '4.2h',
    strongSubjects: ['Physics', 'Mathematics'],
    weakSubjects: ['Chemistry', 'Biology']
  };

  return (
    <SharedPageLayout
      title=""
      subtitle=""
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Today's Premium Plan - PREPZR</title>
      </Helmet>
      
      <div className="space-y-8">
        {/* Premium Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Good Morning, {userProfile?.name || 'Student'}! ✨
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {todayDate} • Your AI has crafted the perfect study plan for you today
            </p>
          </div>

          {/* Quick Stats Row */}
          <div className="flex items-center justify-center gap-4 md:gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span>Day 8/12 Week</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-500" />
              <span>6h Goal Today</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <span>{performanceMetrics.completionRate}% This Week</span>
            </div>
          </div>
        </motion.div>

        {/* Premium Performance Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200/50 dark:border-blue-800/50">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{performanceMetrics.todayProgress}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Today's Progress</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${performanceMetrics.todayProgress}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{performanceMetrics.weeklyStreak}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
                  <div className="flex justify-center mt-2">
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                      🔥 On Fire!
                    </Badge>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{performanceMetrics.focusTime}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Focus Time</div>
                  <div className="flex justify-center mt-2">
                    <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
                      <Clock className="w-3 h-3 mr-1" />
                      Deep Work
                    </Badge>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{performanceMetrics.completionRate}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</div>
                  <div className="flex justify-center mt-2">
                    <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                      <Star className="w-3 h-3 mr-1" />
                      Excellent
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Smart Suggestions - Premium Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">AI Smart Suggestions</h3>
                    <p className="text-white/80">Personalized recommendations for maximum impact</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {smartSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <div className={`p-3 ${suggestion.color} text-white rounded-full`}>
                      {suggestion.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{suggestion.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            suggestion.priority === 'high' ? 'border-red-300 text-red-600' :
                            suggestion.priority === 'medium' ? 'border-yellow-300 text-yellow-600' :
                            'border-blue-300 text-blue-600'
                          }`}
                        >
                          {suggestion.priority} priority
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {suggestion.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>⏱️ {suggestion.estimatedTime}</span>
                        <span>📈 {suggestion.impact}</span>
                      </div>
                    </div>
                    
                    <Button size="sm" variant="outline">
                      Start Now
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subject Performance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Strong Subjects */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold text-green-700 dark:text-green-400">Strong Subjects</h3>
              </div>
              <div className="space-y-3">
                {performanceMetrics.strongSubjects.map((subject, index) => (
                  <div key={subject} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">{subject}</span>
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300 text-xs">
                        {index === 0 ? '92%' : '88%'} mastery
                      </Badge>
                    </div>
                    <span className="text-sm text-green-600 dark:text-green-400">
                      Keep momentum
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weak Subjects */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <h3 className="font-semibold text-orange-700 dark:text-orange-400">Focus Areas</h3>
              </div>
              <div className="space-y-3">
                {performanceMetrics.weakSubjects.map((subject, index) => (
                  <div key={subject} className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="font-medium">{subject}</span>
                      <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300 text-xs">
                        {index === 0 ? '65%' : '58%'} mastery
                      </Badge>
                    </div>
                    <span className="text-sm text-orange-600 dark:text-orange-400">
                      Needs attention
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Task Breakdown - Keep existing design */}
        <EnhancedTaskBreakdown 
          planData={planData}
          onConceptClick={handleConceptClick}
          isMobile={isMobile}
        />
      </div>
      
      {/* Enhanced Voice Assistant for Today's Plan */}
      <EnhancedVoiceAssistant 
        userName={userProfile?.name || 'Student'}
        language="en-US"
        onNavigationCommand={handleNavigationCommand}
        position="bottom-right"
        size="medium"
        page="todays-plan"
      />
    </SharedPageLayout>
  );
};

export default PremiumTodaysPlan;
