
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Target, Calendar, Clock, TrendingUp, BookOpen } from 'lucide-react';
import { UserProfileType } from '@/types/user';
import { KpiData } from '@/hooks/useKpiTracking';
import { useNavigate } from 'react-router-dom';

interface DailySmartSuggestionsSectionProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const DailySmartSuggestionsSection: React.FC<DailySmartSuggestionsSectionProps> = ({ 
  userProfile, 
  kpis 
}) => {
  const navigate = useNavigate();

  // Generate smart suggestions based on user data
  const generateSmartSuggestions = () => {
    const suggestions = [];
    
    // Get streak from KPIs
    const streakKpi = kpis.find(kpi => kpi.title === 'Study Streak');
    const progressKpi = kpis.find(kpi => kpi.title === 'Weekly Progress');
    
    const streak = streakKpi?.value || 0;
    const progress = progressKpi?.value || 0;

    if (streak >= 7) {
      suggestions.push({
        id: 'streak-reward',
        icon: <Clock className="h-5 w-5 text-purple-600" />,
        title: 'Amazing Study Streak! 🔥',
        description: `${streak} days of consistent study. You're building excellent habits!`,
        action: () => navigate('/dashboard/student/feel-good-corner'),
        actionText: 'Celebrate Progress',
        color: 'bg-purple-50 border-purple-200'
      });
    }

    if (progress < 50) {
      suggestions.push({
        id: 'focus-concepts',
        icon: <Brain className="h-5 w-5 text-blue-600" />,
        title: 'Focus on Core Concepts',
        description: 'Start with fundamental concepts to build a strong foundation for your exam.',
        action: () => navigate('/dashboard/student/concepts'),
        actionText: 'Study Concepts',
        color: 'bg-blue-50 border-blue-200'
      });
    } else if (progress >= 70) {
      suggestions.push({
        id: 'practice-exam',
        icon: <Target className="h-5 w-5 text-green-600" />,
        title: 'Ready for Practice Tests',
        description: 'Great progress! Test your knowledge with practice exams.',
        action: () => navigate('/dashboard/student/practice-exam'),
        actionText: 'Take Practice Test',
        color: 'bg-green-50 border-green-200'
      });
    }

    // Time-based suggestions
    const currentHour = new Date().getHours();
    if (currentHour >= 9 && currentHour <= 11) {
      suggestions.push({
        id: 'morning-study',
        icon: <Calendar className="h-5 w-5 text-amber-600" />,
        title: 'Perfect Study Time!',
        description: 'Morning hours are ideal for complex topics. Start with your most challenging subject.',
        action: () => navigate('/dashboard/student/today-plan'),
        actionText: 'View Study Plan',
        color: 'bg-amber-50 border-amber-200'
      });
    }

    return suggestions.slice(0, 3);
  };

  const suggestions = generateSmartSuggestions();

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-indigo-200 dark:border-indigo-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-indigo-600" />
          Daily Smart Suggestions
          <Badge variant="secondary" className="ml-auto">
            Personalized
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id}
              className={`p-4 rounded-lg border ${suggestion.color} hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/80 rounded-full">
                  {suggestion.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    {suggestion.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {suggestion.description}
                  </p>
                  <Button 
                    size="sm" 
                    onClick={suggestion.action}
                    className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    {suggestion.actionText}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySmartSuggestionsSection;
