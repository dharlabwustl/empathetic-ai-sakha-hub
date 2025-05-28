
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, TrendingUp, Clock, Target, Brain, Zap } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface DailySmartSuggestionsProps {
  subjects: StudyPlanSubject[];
}

interface SmartSuggestion {
  id: string;
  type: 'priority' | 'optimization' | 'revision' | 'breakthrough';
  title: string;
  description: string;
  subject?: string;
  estimatedTime: number;
  impact: 'high' | 'medium' | 'low';
  action: string;
}

const mockSuggestions: SmartSuggestion[] = [
  {
    id: '1',
    type: 'priority',
    title: 'Focus on High-Weightage Physics Topics',
    description: 'Electromagnetism carries 30% weightage but 0% completion. Prioritize this for maximum exam impact.',
    subject: 'Physics',
    estimatedTime: 60,
    impact: 'high',
    action: 'Start Electromagnetism'
  },
  {
    id: '2',
    type: 'optimization',
    title: 'Optimize Your Study Schedule',
    description: 'You perform 23% better in evening sessions. Consider shifting Chemistry study to 6-8 PM.',
    estimatedTime: 0,
    impact: 'medium',
    action: 'Adjust Schedule'
  },
  {
    id: '3',
    type: 'revision',
    title: 'Quick Revision Opportunity',
    description: 'Calculus topics learned 2 weeks ago need reinforcement to prevent knowledge decay.',
    subject: 'Mathematics',
    estimatedTime: 30,
    impact: 'medium',
    action: 'Review Calculus'
  },
  {
    id: '4',
    type: 'breakthrough',
    title: 'Breakthrough Moment Available',
    description: 'You\'re 85% through Organic Chemistry. One focused 90-min session could complete this subject.',
    subject: 'Chemistry',
    estimatedTime: 90,
    impact: 'high',
    action: 'Complete Organic Chemistry'
  }
];

const getSuggestionIcon = (type: string) => {
  switch (type) {
    case 'priority': return Target;
    case 'optimization': return TrendingUp;
    case 'revision': return Brain;
    case 'breakthrough': return Zap;
    default: return Lightbulb;
  }
};

const getSuggestionColor = (type: string) => {
  switch (type) {
    case 'priority': return 'bg-red-50 border-red-200 text-red-700';
    case 'optimization': return 'bg-blue-50 border-blue-200 text-blue-700';
    case 'revision': return 'bg-purple-50 border-purple-200 text-purple-700';
    case 'breakthrough': return 'bg-orange-50 border-orange-200 text-orange-700';
    default: return 'bg-gray-50 border-gray-200 text-gray-700';
  }
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'high': return 'bg-green-100 text-green-700 border-green-200';
    case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'low': return 'bg-gray-100 text-gray-700 border-gray-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const DailySmartSuggestions: React.FC<DailySmartSuggestionsProps> = ({ subjects }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Daily Smart Suggestions
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          AI-powered recommendations for optimal study planning based on your progress and performance patterns
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {mockSuggestions.map((suggestion) => {
            const IconComponent = getSuggestionIcon(suggestion.type);
            
            return (
              <Card key={suggestion.id} className={`border-l-4 ${getSuggestionColor(suggestion.type)}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getSuggestionColor(suggestion.type)}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{suggestion.title}</h4>
                        <Badge variant="outline" className={getImpactColor(suggestion.impact)}>
                          {suggestion.impact} impact
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {suggestion.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {suggestion.subject && (
                            <>
                              <span>{suggestion.subject}</span>
                              <span>•</span>
                            </>
                          )}
                          {suggestion.estimatedTime > 0 && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{suggestion.estimatedTime} min</span>
                            </div>
                          )}
                        </div>
                        
                        <Button size="sm" variant="outline" className="h-6 text-xs px-2">
                          {suggestion.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
