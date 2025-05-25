
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import ExamReadinessScore from './dashboard-sections/ExamReadinessScore';
import StudyProgress from './StudyProgress';
import TodayStudyPlan from './TodayStudyPlan';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import PerformanceChart from './dashboard-sections/PerformanceChart';
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from './mood-tracking/moodUtils';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

interface DailySmartSuggestionsProps {
  userProfile: UserProfileBase;
  currentMood?: MoodType;
}

const DailySmartSuggestions: React.FC<DailySmartSuggestionsProps> = ({ userProfile, currentMood }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const getSmartSuggestions = () => {
    const suggestions = [
      {
        id: 'concept-study',
        title: 'Master Core Concepts',
        description: 'Focus on understanding fundamental concepts in Physics and Chemistry',
        action: 'Study Concepts',
        route: '/dashboard/student/concepts',
        priority: 'high',
        estimatedTime: '45 min'
      },
      {
        id: 'practice-test',
        title: 'Take Practice Test',
        description: 'Test your knowledge with a comprehensive practice exam',
        action: 'Start Test',
        route: '/dashboard/student/practice-exam',
        priority: 'medium',
        estimatedTime: '60 min'
      },
      {
        id: 'flashcards-review',
        title: 'Review Flashcards',
        description: 'Quick review of important formulas and concepts',
        action: 'Review Cards',
        route: '/dashboard/student/flashcards',
        priority: 'medium',
        estimatedTime: '20 min'
      }
    ];

    // Customize suggestions based on mood
    if (currentMood === MoodType.TIRED) {
      return suggestions.filter(s => s.id === 'flashcards-review');
    } else if (currentMood === MoodType.MOTIVATED) {
      return suggestions.slice(0, 2);
    }

    return suggestions.slice(0, 2);
  };

  const suggestions = getSmartSuggestions();

  const handleSuggestionClick = (route: string, title: string) => {
    toast({
      title: "Navigation",
      description: `Navigating to ${title}`,
    });
    navigate(route);
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          🎯 Daily Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-3 border rounded-lg bg-gradient-to-r from-blue-50/50 to-white dark:from-blue-900/10 dark:to-gray-800/50 hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-sm">{suggestion.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {suggestion.description}
                  </p>
                </div>
                <Badge variant="outline" className={
                  suggestion.priority === 'high' ? 'border-red-200 text-red-700' : 
                  'border-yellow-200 text-yellow-700'
                }>
                  {suggestion.priority}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  ⏱️ {suggestion.estimatedTime}
                </span>
                <Button 
                  size="sm" 
                  className="h-7 text-xs"
                  onClick={() => handleSuggestionClick(suggestion.route, suggestion.title)}
                >
                  {suggestion.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis 
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const savedMood = getCurrentMoodFromLocalStorage();
    if (savedMood) {
      setCurrentMood(savedMood);
    }
  }, []);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
  };

  // Sample data for components
  const subjectProgress = [
    { subject: 'Physics', progress: 75, total: 100 },
    { subject: 'Chemistry', progress: 68, total: 100 },
    { subject: 'Mathematics', progress: 82, total: 100 }
  ];

  const todaysTasks = [
    {
      id: 'concept-1',
      title: "Newton's Laws of Motion",
      time: "2:00 PM - 2:45 PM",
      type: 'concept' as const,
      completed: false,
      route: '/dashboard/student/concepts/concept-1'
    },
    {
      id: 'flashcard-1',
      title: "Chemical Bonds Review",
      time: "3:00 PM - 3:20 PM",
      type: 'revision' as const,
      completed: false,
      route: '/dashboard/student/flashcards'
    },
    {
      id: 'practice-1',
      title: "Math Practice Test",
      time: "4:00 PM - 5:00 PM",
      type: 'exam' as const,
      completed: false,
      route: '/dashboard/student/practice-exam'
    }
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {userProfile.name}! 🎯
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ready to ace your {userProfile.examPreparation || 'JEE'} preparation today?
        </p>
      </div>

      {/* Exam Readiness Score */}
      <ExamReadinessScore 
        score={73} 
        targetExam={userProfile.examPreparation || "JEE Advanced 2025"} 
        daysRemaining={180}
        trend="up"
        recommendations={[
          "Focus on Physics mechanics",
          "Practice more organic chemistry",
          "Strengthen calculus fundamentals"
        ]}
      />

      {/* Daily Smart Suggestions - Moved below exam readiness */}
      <DailySmartSuggestions 
        userProfile={userProfile} 
        currentMood={currentMood}
      />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Study Progress and Performance */}
        <div className="lg:col-span-2 space-y-6">
          <StudyProgress subjectProgress={subjectProgress} />
          <PerformanceChart />
        </div>

        {/* Right Column - Today's Plan and Mood */}
        <div className="space-y-6">
          <TodayStudyPlan tasks={todaysTasks} />
          <MoodBasedSuggestions 
            currentMood={currentMood} 
            onMoodSelect={handleMoodChange}
          />
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {kpis.filter(kpi => 
          !['Weekly Study Time', 'Practice Questions', 'Target Exams Covered', 'Users Log Weekly Moods'].includes(kpi.title)
        ).map(kpi => (
          <Card key={kpi.id} className="bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {kpi.value} {kpi.unit || ''}
                  </p>
                </div>
                {kpi.icon && (
                  <span className="text-2xl">{kpi.icon}</span>
                )}
              </div>
              {kpi.change && (
                <div className="mt-2">
                  <span className={`text-sm ${
                    kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.changeType === 'positive' ? '+' : ''}{kpi.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last week</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
