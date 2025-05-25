
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
import UniversalVoiceAssistant from '@/components/voice/UniversalVoiceAssistant';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Clock, BookOpen, Lightbulb } from 'lucide-react';

const TodaysPlanProgressMeter: React.FC<{ planData: any; isMobile: boolean }> = ({ planData, isMobile }) => {
  if (!planData) return null;

  const progressPercentage = Math.round((planData.completedTasks / planData.totalTasks) * 100);
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Today's Progress
          </CardTitle>
          <Badge variant="secondary">
            {planData.completedTasks}/{planData.totalTasks} tasks
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span className="font-medium">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">{planData.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{planData.timeAllocation?.total || 0}m</div>
              <div className="text-sm text-muted-foreground">Total Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{planData.completedTasks}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SmartSuggestionsSection: React.FC<{ planData: any; onActionClick: (action: string) => void; isMobile: boolean }> = ({ 
  planData, 
  onActionClick, 
  isMobile 
}) => {
  if (!planData) return null;

  const suggestions = [
    {
      id: 'focus-concepts',
      title: 'Focus on Weak Concepts',
      description: 'Review concepts you found challenging yesterday',
      icon: <BookOpen className="h-4 w-4" />,
      action: 'concepts',
      priority: 'high'
    },
    {
      id: 'quick-revision',
      title: 'Quick Revision Session',
      description: 'Spend 15 minutes reviewing completed topics',
      icon: <Clock className="h-4 w-4" />,
      action: 'flashcards',
      priority: 'medium'
    },
    {
      id: 'practice-test',
      title: 'Take Practice Test',
      description: 'Test your understanding with practice questions',
      icon: <Target className="h-4 w-4" />,
      action: 'practice-exam',
      priority: 'medium'
    },
    {
      id: 'break-time',
      title: 'Take a Smart Break',
      description: 'Feeling stressed? Visit the Feel Good Corner',
      icon: <Lightbulb className="h-4 w-4" />,
      action: 'break',
      priority: 'low'
    }
  ];

  // Add backlog management suggestions if there are overdue tasks
  if (planData.backlogTasks && planData.backlogTasks.length > 0) {
    suggestions.unshift({
      id: 'clear-backlog',
      title: 'Clear Pending Tasks',
      description: `You have ${planData.backlogTasks.length} overdue tasks to complete`,
      icon: <Target className="h-4 w-4" />,
      action: 'backlog',
      priority: 'high'
    });
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-600" />
          Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {suggestions.slice(0, 4).map((suggestion) => (
            <div
              key={suggestion.id}
              className={`p-3 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                suggestion.priority === 'high' ? 'border-red-200 bg-red-50 dark:bg-red-900/10' :
                suggestion.priority === 'medium' ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10' :
                'border-gray-200'
              }`}
              onClick={() => onActionClick(suggestion.action)}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  suggestion.priority === 'high' ? 'bg-red-100 text-red-600' :
                  suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {suggestion.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{suggestion.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{suggestion.description}</p>
                </div>
                <Badge variant={suggestion.priority === 'high' ? 'destructive' : 'secondary'}>
                  {suggestion.priority}
                </Badge>
              </div>
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
  
  // Get today's plan data
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

  // Handle concept click to navigate to concept study page
  const handleConceptClick = (conceptId: string) => {
    console.log("Navigating to concept detail page:", conceptId);
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  // Handle smart suggestion actions
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
      case 'backlog':
        // Handle backlog management
        console.log('Managing backlog tasks');
        break;
      default:
        console.log('Suggestion action:', action);
    }
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
          onActionClick={handleSuggestionAction}
          isMobile={isMobile}
        />
        
        {/* Enhanced task breakdown with existing design */}
        <EnhancedTaskBreakdown 
          planData={planData}
          onConceptClick={handleConceptClick}
          isMobile={isMobile}
        />
      </div>
      
      {/* Voice assistant for learning support */}
      <UniversalVoiceAssistant 
        userName={planData?.userName || userProfile?.name}
      />
    </SharedPageLayout>
  );
};

export default EnhancedTodaysPlan;
