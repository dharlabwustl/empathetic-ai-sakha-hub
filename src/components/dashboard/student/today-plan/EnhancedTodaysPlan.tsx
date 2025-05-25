
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { useTodaysPlan } from "@/hooks/useTodaysPlan";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import EnhancedTaskBreakdown from './EnhancedTaskBreakdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, BookOpen, Target } from 'lucide-react';

interface SmartSuggestionsProps {
  planData: any;
  isMobile: boolean;
}

const TodaysPlanProgressMeter: React.FC<{ planData: any; isMobile: boolean }> = ({ planData, isMobile }) => {
  const completedTasks = planData?.tasks?.filter((task: any) => task.completed)?.length || 0;
  const totalTasks = planData?.tasks?.length || 0;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-500" />
          Today's Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Tasks Completed</span>
            <span className="font-medium">{completedTasks}/{totalTasks}</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-xs text-gray-600">Completed</p>
              <p className="font-medium">{completedTasks}</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full mx-auto mb-1">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
              <p className="text-xs text-gray-600">Remaining</p>
              <p className="font-medium">{totalTasks - completedTasks}</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full mx-auto mb-1">
                <BookOpen className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-xs text-gray-600">Total</p>
              <p className="font-medium">{totalTasks}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SmartSuggestionsSection: React.FC<SmartSuggestionsProps> = ({ planData, isMobile }) => {
  const navigate = useNavigate();
  
  const suggestions = [
    {
      id: 'focus-concepts',
      title: 'Focus on Core Concepts',
      description: 'Review fundamental concepts that appear in multiple topics',
      action: () => navigate('/dashboard/student/concepts'),
      buttonText: 'Study Concepts',
      priority: 'high'
    },
    {
      id: 'practice-weak-areas',
      title: 'Practice Weak Areas',
      description: 'Target practice exams for subjects you need improvement',
      action: () => navigate('/dashboard/student/practice-exam'),
      buttonText: 'Take Practice Test',
      priority: 'medium'
    },
    {
      id: 'quick-review',
      title: 'Quick Formula Review',
      description: 'Spend 15 minutes reviewing important formulas',
      action: () => navigate('/dashboard/student/flashcards'),
      buttonText: 'Review Flashcards',
      priority: 'low'
    }
  ];

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 pb-2">
        <CardTitle className="text-lg">🎯 Smart Task Suggestions</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-3 border rounded-lg bg-gradient-to-r from-blue-50/50 to-white dark:from-blue-900/10 dark:to-gray-800/50"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-sm">{suggestion.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {suggestion.description}
                  </p>
                </div>
              </div>
              <Button 
                size="sm" 
                onClick={suggestion.action}
                className="w-full mt-2"
              >
                {suggestion.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const EnhancedTodaysPlan: React.FC = () => {
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
    return <LoadingState message="Loading your study plan..." />;
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
    console.log("Navigating to concept detail page:", conceptId);
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  return (
    <SharedPageLayout
      title="Today's Study Plan"
      subtitle="Your personalized daily study schedule"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Today's Plan - PREPZR</title>
      </Helmet>
      
      <div className={`space-y-6 ${isMobile ? 'px-0' : ''}`}>
        {/* Progress meter at the top */}
        <TodaysPlanProgressMeter planData={planData} isMobile={isMobile} />
        
        {/* Smart suggestions section */}
        <SmartSuggestionsSection 
          planData={planData}
          isMobile={isMobile}
        />
        
        {/* Enhanced task breakdown */}
        <EnhancedTaskBreakdown 
          planData={planData}
          onConceptClick={handleConceptClick}
          isMobile={isMobile}
        />
      </div>
    </SharedPageLayout>
  );
};

export default EnhancedTodaysPlan;
