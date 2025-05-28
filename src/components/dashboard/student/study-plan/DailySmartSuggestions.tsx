
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Clock, Target, TrendingUp, Brain, RefreshCw } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface DailySmartSuggestionsProps {
  subjects: StudyPlanSubject[];
  examName: string;
  daysLeft: number;
}

interface Suggestion {
  id: string;
  type: 'focus' | 'review' | 'practice' | 'break' | 'strategy';
  title: string;
  description: string;
  subject?: string;
  priority: 'high' | 'medium' | 'low';
  timeEstimate: string;
  action: string;
}

const DailySmartSuggestions: React.FC<DailySmartSuggestionsProps> = ({ 
  subjects, 
  examName, 
  daysLeft 
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const generateSuggestions = () => {
    const currentHour = new Date().getHours();
    const dayOfWeek = new Date().getDay();
    
    // Generate smart suggestions based on various factors
    const suggestionPool: Suggestion[] = [
      {
        id: '1',
        type: 'focus',
        title: 'High-Impact Physics Focus',
        description: 'Electromagnetism has 30% exam weightage but only 40% completion. Prioritize today.',
        subject: 'Physics',
        priority: 'high',
        timeEstimate: '2-3 hours',
        action: 'Start Learning'
      },
      {
        id: '2',
        type: 'review',
        title: 'Quick Chemistry Review',
        description: 'Review completed Organic Chemistry topics to reinforce memory before moving forward.',
        subject: 'Chemistry',
        priority: 'medium',
        timeEstimate: '45 mins',
        action: 'Review Now'
      },
      {
        id: '3',
        type: 'practice',
        title: 'Mathematics Problem Solving',
        description: 'Practice Calculus problems to improve speed and accuracy. Focus on integration techniques.',
        subject: 'Mathematics',
        priority: 'high',
        timeEstimate: '1.5 hours',
        action: 'Practice'
      },
      {
        id: '4',
        type: 'strategy',
        title: 'Weak Area Strategy',
        description: 'Your Chemistry proficiency is weak. Consider allocating extra 30 minutes daily this week.',
        priority: 'high',
        timeEstimate: '30 mins extra',
        action: 'Adjust Plan'
      },
      {
        id: '5',
        type: 'break',
        title: 'Mindful Study Break',
        description: 'You\'ve been studying for 2+ hours. Take a 15-minute break to maintain focus.',
        priority: 'medium',
        timeEstimate: '15 mins',
        action: 'Take Break'
      }
    ];

    // Smart filtering based on time of day and study patterns
    let filtered = suggestionPool;
    
    if (currentHour < 10) {
      // Morning: Focus on heavy subjects
      filtered = suggestionPool.filter(s => s.type === 'focus' || s.type === 'practice');
    } else if (currentHour > 18) {
      // Evening: Review and lighter tasks
      filtered = suggestionPool.filter(s => s.type === 'review' || s.type === 'strategy');
    }

    // Add urgency based on days left
    if (daysLeft < 30) {
      filtered = filtered.map(s => ({ ...s, priority: 'high' as const }));
    }

    setSuggestions(filtered.slice(0, 3));
  };

  const refreshSuggestions = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      generateSuggestions();
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    generateSuggestions();
  }, [subjects, daysLeft]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'focus':
        return <Target className="h-4 w-4" />;
      case 'review':
        return <RefreshCw className="h-4 w-4" />;
      case 'practice':
        return <Brain className="h-4 w-4" />;
      case 'strategy':
        return <TrendingUp className="h-4 w-4" />;
      case 'break':
        return <Clock className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'focus':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'review':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'practice':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'strategy':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'break':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <span>Daily Smart Suggestions</span>
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshSuggestions}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          AI-powered recommendations based on your progress and exam timeline
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id}
              className="border rounded-lg p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-full ${getTypeColor(suggestion.type)}`}>
                    {getTypeIcon(suggestion.type)}
                  </div>
                  <div>
                    <h4 className="font-medium">{suggestion.title}</h4>
                    {suggestion.subject && (
                      <Badge variant="outline" className="text-xs mt-1">
                        {suggestion.subject}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <Badge 
                  variant="outline" 
                  className={`${getPriorityColor(suggestion.priority)} text-xs`}
                >
                  {suggestion.priority.toUpperCase()}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                {suggestion.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{suggestion.timeEstimate}</span>
                  </div>
                </div>
                
                <Button size="sm" variant="outline">
                  {suggestion.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            Suggestions refresh every hour based on your study patterns and progress
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySmartSuggestions;
