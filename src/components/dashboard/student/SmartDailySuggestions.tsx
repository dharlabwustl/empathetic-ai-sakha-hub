
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Zap, Target, Clock, TrendingUp } from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface SmartSuggestion {
  id: string;
  title: string;
  description: string;
  type: 'study' | 'break' | 'review' | 'practice';
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
}

interface SmartDailySuggestionsProps {
  userMood?: MoodType;
  userName?: string;
}

const SmartDailySuggestions: React.FC<SmartDailySuggestionsProps> = ({ 
  userMood, 
  userName = 'Student' 
}) => {
  // Generate mood-based suggestions
  const getMoodBasedSuggestions = (): SmartSuggestion[] => {
    const baseSuggestions: SmartSuggestion[] = [
      {
        id: '1',
        title: 'Review Yesterday\'s Concepts',
        description: 'Quick revision of physics concepts from yesterday',
        type: 'review',
        priority: 'high',
        estimatedTime: '15 min'
      },
      {
        id: '2',
        title: 'Practice Math Problems',
        description: 'Solve 10 algebra problems to strengthen basics',
        type: 'practice',
        priority: 'medium',
        estimatedTime: '20 min'
      },
      {
        id: '3',
        title: 'Take a Smart Break',
        description: 'Short meditation or walk to refresh your mind',
        type: 'break',
        priority: 'low',
        estimatedTime: '10 min'
      }
    ];

    // Adjust suggestions based on mood
    if (userMood === MoodType.MOTIVATED) {
      return [
        {
          id: '4',
          title: 'Tackle Advanced Topics',
          description: 'Perfect time to challenge yourself with complex concepts',
          type: 'study',
          priority: 'high',
          estimatedTime: '45 min'
        },
        ...baseSuggestions
      ];
    } else if (userMood === MoodType.TIRED) {
      return [
        {
          id: '5',
          title: 'Light Review Session',
          description: 'Easy flashcard review to maintain momentum',
          type: 'review',
          priority: 'high',
          estimatedTime: '10 min'
        },
        baseSuggestions[2] // Break suggestion
      ];
    } else if (userMood === MoodType.STRESSED) {
      return [
        {
          id: '6',
          title: 'Relaxation & Easy Topics',
          description: 'Focus on familiar concepts to build confidence',
          type: 'study',
          priority: 'high',
          estimatedTime: '20 min'
        },
        baseSuggestions[2] // Break suggestion
      ];
    }

    return baseSuggestions.slice(0, 3);
  };

  const suggestions = getMoodBasedSuggestions();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'study':
        return <Target className="h-4 w-4" />;
      case 'review':
        return <TrendingUp className="h-4 w-4" />;
      case 'practice':
        return <Zap className="h-4 w-4" />;
      case 'break':
        return <Clock className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-800">
          <Lightbulb className="h-5 w-5" />
          Smart Daily Recommendations
        </CardTitle>
        <p className="text-sm text-yellow-700">
          Personalized suggestions based on your {userMood?.toLowerCase() || 'current'} mood
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id} 
              className="p-3 bg-white rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-2 mb-2">
                <div className="p-1.5 bg-orange-100 rounded-full text-orange-600">
                  {getTypeIcon(suggestion.type)}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-800 mb-1">
                    {suggestion.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    {suggestion.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getPriorityColor(suggestion.priority)}`}
                >
                  {suggestion.priority}
                </Badge>
                <span className="text-xs text-gray-500 font-medium">
                  {suggestion.estimatedTime}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartDailySuggestions;
