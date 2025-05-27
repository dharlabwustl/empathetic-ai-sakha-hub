
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, RefreshCw, Clock, Target, Brain, TrendingUp } from 'lucide-react';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  type: 'focus' | 'review' | 'practice' | 'timing';
  priority: 'high' | 'medium' | 'low';
  subject?: string;
  estimatedTime?: number;
}

const DailySmartSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const generateSuggestions = () => {
    const suggestionPool: Suggestion[] = [
      {
        id: '1',
        title: 'Focus on Physics - Mechanics',
        description: 'Your weakest topic with only 65% completion. Spend extra 30 minutes today.',
        type: 'focus',
        priority: 'high',
        subject: 'Physics',
        estimatedTime: 30
      },
      {
        id: '2',
        title: 'Review Chemistry - Organic Reactions',
        description: 'Last studied 5 days ago. Quick revision recommended to maintain retention.',
        type: 'review',
        priority: 'medium',
        subject: 'Chemistry',
        estimatedTime: 20
      },
      {
        id: '3',
        title: 'Practice Biology - Human Physiology',
        description: 'Great progress! Take a practice test to reinforce your strong performance.',
        type: 'practice',
        priority: 'low',
        subject: 'Biology',
        estimatedTime: 25
      },
      {
        id: '4',
        title: 'Optimal Study Window: 4:00-6:00 PM',
        description: 'Based on your performance patterns, this is your peak learning time.',
        type: 'timing',
        priority: 'medium',
        estimatedTime: 120
      },
      {
        id: '5',
        title: 'Focus on Chemistry - Chemical Bonding',
        description: 'Trending topic in recent exams. Strengthen this concept for better scores.',
        type: 'focus',
        priority: 'high',
        subject: 'Chemistry',
        estimatedTime: 35
      },
      {
        id: '6',
        title: 'Review Physics - Wave Optics',
        description: 'Due for revision based on spaced repetition algorithm.',
        type: 'review',
        priority: 'medium',
        subject: 'Physics',
        estimatedTime: 40
      }
    ];

    // Randomly select 3-4 suggestions
    const shuffled = suggestionPool.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 3);
    setSuggestions(selected);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      generateSuggestions();
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    generateSuggestions();
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'focus':
        return <Target className="h-4 w-4" />;
      case 'review':
        return <RefreshCw className="h-4 w-4" />;
      case 'practice':
        return <Brain className="h-4 w-4" />;
      case 'timing':
        return <Clock className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'focus':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'review':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'practice':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'timing':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
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
    <Card className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border-yellow-200 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Lightbulb className="h-5 w-5" />
            Daily Smart Suggestions
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              className="p-4 bg-white rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-shadow"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeIn 0.5s ease-out forwards'
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded ${getTypeColor(suggestion.type)}`}>
                    {getTypeIcon(suggestion.type)}
                  </div>
                  <h4 className="font-semibold text-gray-800">{suggestion.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getTypeColor(suggestion.type)}>
                    {suggestion.type}
                  </Badge>
                  <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                    {suggestion.priority}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {suggestion.subject && (
                    <span className="px-2 py-1 bg-gray-100 rounded">
                      {suggestion.subject}
                    </span>
                  )}
                  {suggestion.estimatedTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{suggestion.estimatedTime} min</span>
                    </div>
                  )}
                </div>
                
                <Button size="sm" variant="outline" className="text-xs">
                  Take Action
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>Suggestions refresh every 24 hours based on your learning patterns</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySmartSuggestions;
