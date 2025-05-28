
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingUp, Clock, Target, AlertTriangle, Star } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface DailySmartSuggestionsProps {
  subjects: StudyPlanSubject[];
  examDate?: string;
}

const DailySmartSuggestions: React.FC<DailySmartSuggestionsProps> = ({ 
  subjects, 
  examDate = '2023-12-15' 
}) => {
  const today = new Date();
  const exam = new Date(examDate);
  const daysUntilExam = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const generateSmartSuggestions = () => {
    const suggestions = [];

    // Priority-based suggestions
    const highPrioritySubjects = subjects.filter(s => s.priority === 'high');
    const weakSubjects = subjects.filter(s => s.proficiency === 'weak');
    const incompleteTopics = subjects.flatMap(s => 
      (s.topics || []).filter(t => !t.completed).map(t => ({ ...t, subject: s.name, color: s.color }))
    );

    // Time-critical suggestion
    if (daysUntilExam <= 30) {
      suggestions.push({
        id: 'time-critical',
        type: 'urgent',
        icon: AlertTriangle,
        title: 'Focus on High-Weightage Topics',
        description: `With ${daysUntilExam} days left, prioritize topics with highest exam weightage.`,
        action: 'View Weightage Analysis',
        priority: 'high',
        color: 'red'
      });
    }

    // Weak subject improvement
    if (weakSubjects.length > 0) {
      suggestions.push({
        id: 'weak-subjects',
        type: 'improvement',
        icon: TrendingUp,
        title: `Strengthen ${weakSubjects[0].name}`,
        description: 'Your weakest subject needs extra attention. Allocate 30% more time.',
        action: 'Create Focus Plan',
        priority: 'high',
        color: 'orange'
      });
    }

    // Daily optimization
    suggestions.push({
      id: 'daily-optimization',
      type: 'optimization',
      icon: Target,
      title: 'Optimize Today\'s Study Plan',
      description: 'Based on your learning patterns, start with Chemistry at 9 AM for better retention.',
      action: 'Apply Suggestion',
      priority: 'medium',
      color: 'blue'
    });

    // Topic completion suggestion
    if (incompleteTopics.length > 0) {
      const nextTopic = incompleteTopics.find(t => t.priority === 'high') || incompleteTopics[0];
      suggestions.push({
        id: 'next-topic',
        type: 'progress',
        icon: Star,
        title: `Complete ${nextTopic.name}`,
        description: `This ${nextTopic.subject} topic is crucial for your exam preparation.`,
        action: 'Start Learning',
        priority: 'medium',
        color: 'green'
      });
    }

    // Study technique suggestion
    suggestions.push({
      id: 'study-technique',
      type: 'technique',
      icon: Lightbulb,
      title: 'Try Active Recall Method',
      description: 'Your retention rate can improve by 40% using spaced repetition for formulas.',
      action: 'Learn Technique',
      priority: 'low',
      color: 'purple'
    });

    // Time management suggestion
    suggestions.push({
      id: 'time-management',
      type: 'efficiency',
      icon: Clock,
      title: 'Pomodoro Technique Recommended',
      description: 'Break your 3-hour study session into focused 25-minute intervals.',
      action: 'Set Timer',
      priority: 'low',
      color: 'teal'
    });

    return suggestions;
  };

  const suggestions = generateSmartSuggestions();

  const getSuggestionStyle = (color: string, priority: string) => {
    const baseClasses = "border-l-4 transition-all duration-200 hover:shadow-md";
    const priorityClasses = priority === 'high' ? 'bg-red-50' : priority === 'medium' ? 'bg-amber-50' : 'bg-blue-50';
    const borderColor = `border-l-${color}-500`;
    return `${baseClasses} ${priorityClasses} ${borderColor}`;
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-700 border-red-200">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Medium Priority</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Suggested</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Daily Smart Suggestions
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          AI-powered recommendations to optimize your study plan
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion) => {
            const IconComponent = suggestion.icon;
            return (
              <div 
                key={suggestion.id}
                className={`p-4 rounded-lg border-l-4`}
                style={{ 
                  borderLeftColor: `var(--${suggestion.color}-500)`,
                  backgroundColor: suggestion.priority === 'high' ? '#fef2f2' : 
                                   suggestion.priority === 'medium' ? '#fffbeb' : '#f0f9ff'
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg bg-${suggestion.color}-100`}>
                      <IconComponent className={`h-4 w-4 text-${suggestion.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{suggestion.title}</h4>
                        {getPriorityBadge(suggestion.priority)}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {suggestion.description}
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className={`bg-${suggestion.color}-50 border-${suggestion.color}-200 text-${suggestion.color}-700 hover:bg-${suggestion.color}-100`}
                      >
                        {suggestion.action}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-purple-600" />
            <span className="font-medium text-purple-700">Pro Tip</span>
          </div>
          <p className="text-sm text-purple-600">
            Following these AI suggestions can improve your exam performance by up to 25%. 
            Suggestions are updated daily based on your progress and learning patterns.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySmartSuggestions;
