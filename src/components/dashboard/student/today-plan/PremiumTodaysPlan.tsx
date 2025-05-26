import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTodaysPlan } from "@/hooks/useTodaysPlan";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import EnhancedTaskBreakdown from './EnhancedTaskBreakdown';
import InteractiveVoiceAssistant from '@/components/voice/InteractiveVoiceAssistant';
import { 
  Brain, 
  Target, 
  Clock, 
  TrendingUp, 
  Zap, 
  BookOpen,
  Award,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Coffee,
  Gift,
  Lightbulb,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

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

  const handleSuggestionAction = (action: string) => {
    switch (action) {
      case 'concepts':
        navigate('/dashboard/student/concepts');
        break;
      case 'flashcards':
        navigate('/dashboard/student/flashcards');
        break;
      case 'practice-exam':
        navigate('/dashboard/student/practice-exam');
        break;
      case 'break':
        navigate('/dashboard/student/feel-good-corner');
        break;
      case 'bonus':
        navigate('/dashboard/student/feel-good-corner');
        break;
      default:
        console.log('Suggestion action:', action);
    }
  };

  const getCompletionRate = () => {
    return planData?.totalTasks ? (planData.completedTasks / planData.totalTasks) * 100 : 0;
  };

  const completionRate = getCompletionRate();

  // Generate premium smart suggestions
  const generatePremiumSuggestions = () => {
    const suggestions = [];
    
    if (completionRate < 30) {
      suggestions.push({
        id: 'focus-weakest',
        icon: <AlertTriangle className="h-5 w-5" />,
        title: 'Focus on Weakest Subject',
        description: 'AI identified Chemistry as your weakest area. Start here for maximum impact.',
        action: 'concepts',
        priority: 'critical',
        bgGradient: 'from-red-500 to-orange-500',
        confidence: 92
      });
    }

    if (completionRate >= 50 && completionRate < 80) {
      suggestions.push({
        id: 'practice-strong',
        icon: <Target className="h-5 w-5" />,
        title: 'Practice Your Strengths',
        description: 'Physics is your strong suit. Take a mock test to boost confidence.',
        action: 'practice-exam',
        priority: 'recommended',
        bgGradient: 'from-blue-500 to-purple-500',
        confidence: 87
      });
    }

    if (completionRate >= 80) {
      suggestions.push({
        id: 'reward-achievement',
        icon: <Gift className="h-5 w-5" />,
        title: 'Celebrate Progress!',
        description: 'Amazing work today! Visit Feel Good Corner for motivation.',
        action: 'bonus',
        priority: 'wellness',
        bgGradient: 'from-green-500 to-emerald-500',
        confidence: 95
      });
    }

    // Time-based suggestion
    const hour = new Date().getHours();
    if (hour >= 14 && hour <= 16) {
      suggestions.push({
        id: 'energy-boost',
        icon: <Coffee className="h-5 w-5" />,
        title: 'Energy Optimization',
        description: 'Perfect time for a 15-minute break to recharge your focus.',
        action: 'break',
        priority: 'wellness',
        bgGradient: 'from-amber-500 to-orange-500',
        confidence: 78
      });
    }

    return suggestions.slice(0, 3);
  };

  const suggestions = generatePremiumSuggestions();

  return (
    <SharedPageLayout
      title="Today's Study Plan"
      subtitle="Your AI-powered personalized study journey"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Premium Study Plan - PREPZR</title>
      </Helmet>
      
      <div className={`space-y-6 ${isMobile ? 'px-0' : ''}`}>
        {/* Premium Header Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8" />
                <div>
                  <div className="text-2xl font-bold">{planData?.completedTasks || 0}</div>
                  <div className="text-blue-100 text-sm">Tasks Done</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8" />
                <div>
                  <div className="text-2xl font-bold">{Math.round(completionRate)}%</div>
                  <div className="text-purple-100 text-sm">Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8" />
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-green-100 text-sm">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8" />
                <div>
                  <div className="text-2xl font-bold">4.2h</div>
                  <div className="text-orange-100 text-sm">Study Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Smart Suggestions - Premium Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-2 border-indigo-200 dark:border-indigo-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">AI Smart Suggestions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Powered by advanced learning analytics
                  </p>
                </div>
                <Badge className="ml-auto bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0">
                  <Star className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card 
                      className="relative overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group"
                      onClick={() => handleSuggestionAction(suggestion.action)}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${suggestion.bgGradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                      <CardContent className="p-4 relative">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`p-2 bg-gradient-to-r ${suggestion.bgGradient} rounded-lg text-white`}>
                            {suggestion.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1">{suggestion.title}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                              {suggestion.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {suggestion.confidence}% AI Confidence
                              </Badge>
                              <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                                Act Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subject Performance Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Subject Performance Analytics
                <Badge variant="outline">Real-time</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { subject: 'Physics', progress: 85, status: 'Strong', color: 'green' },
                  { subject: 'Chemistry', progress: 62, status: 'Improving', color: 'orange' },
                  { subject: 'Biology', progress: 78, status: 'Good', color: 'blue' }
                ].map((item, index) => (
                  <div key={item.subject} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.subject}</span>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`text-${item.color}-600 border-${item.color}-300`}
                        >
                          {item.status}
                        </Badge>
                        <span className="text-sm font-semibold">{item.progress}%</span>
                      </div>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Task Breakdown - Keep existing component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <EnhancedTaskBreakdown 
            planData={planData}
            onConceptClick={handleConceptClick}
            isMobile={isMobile}
          />
        </motion.div>
      </div>
      
      {/* Interactive Voice Assistant */}
      <InteractiveVoiceAssistant 
        userName={planData?.userName || userProfile?.name}
        language="en-US"
        onNavigationCommand={(route) => navigate(route)}
      />
    </SharedPageLayout>
  );
};

export default PremiumTodaysPlan;
