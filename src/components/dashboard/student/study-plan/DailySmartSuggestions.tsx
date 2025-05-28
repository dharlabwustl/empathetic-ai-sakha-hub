
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Clock, Target, TrendingUp, ArrowRight } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface DailySmartSuggestionsProps {
  subjects: StudyPlanSubject[];
  examDate: string;
}

const DailySmartSuggestions: React.FC<DailySmartSuggestionsProps> = ({ subjects, examDate }) => {
  const today = new Date();
  const exam = new Date(examDate);
  const daysLeft = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Generate AI-powered suggestions based on progress and priorities
  const generateSuggestions = () => {
    const suggestions = [];

    // Find weak subjects
    const weakSubjects = subjects.filter(s => s.proficiency === 'weak');
    if (weakSubjects.length > 0) {
      suggestions.push({
        type: 'priority',
        icon: Target,
        title: 'Focus on Weak Areas',
        description: `Prioritize ${weakSubjects[0].name} - your weakest subject`,
        action: 'Start Review',
        urgency: 'high'
      });
    }

    // Find incomplete high-priority topics
    const incompletePriorityTopics = subjects.flatMap(s => 
      s.topics?.filter(t => !t.completed && t.priority === 'high') || []
    );
    if (incompletePriorityTopics.length > 0) {
      suggestions.push({
        type: 'topic',
        icon: Clock,
        title: 'High Priority Topics Pending',
        description: `Complete ${incompletePriorityTopics.length} high-priority topics today`,
        action: 'View Topics',
        urgency: 'medium'
      });
    }

    // Time-based suggestions
    if (daysLeft < 30) {
      suggestions.push({
        type: 'revision',
        icon: TrendingUp,
        title: 'Revision Mode Recommended',
        description: `Focus on revision and practice tests with ${daysLeft} days left`,
        action: 'Start Revision',
        urgency: 'high'
      });
    }

    // Daily goal suggestion
    const totalTopics = subjects.reduce((acc, s) => acc + (s.topics?.length || 0), 0);
    const completedTopics = subjects.reduce((acc, s) => acc + (s.topics?.filter(t => t.completed).length || 0), 0);
    const remainingTopics = totalTopics - completedTopics;
    const dailyTarget = Math.ceil(remainingTopics / Math.max(daysLeft, 1));

    suggestions.push({
      type: 'goal',
      icon: Lightbulb,
      title: 'Daily Target',
      description: `Complete ${dailyTarget} topics today to stay on track`,
      action: 'Set Goal',
      urgency: 'low'
    });

    return suggestions;
  };

  const suggestions = generateSuggestions();

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
          AI-powered recommendations for today's study session
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion, index) => {
          const IconComponent = suggestion.icon;
          return (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <IconComponent className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{suggestion.title}</span>
                    <Badge variant="outline" className={getUrgencyColor(suggestion.urgency)}>
                      {suggestion.urgency}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                {suggestion.action}
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          );
        })}
        
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Days until exam:</span>
            <span className="font-bold text-lg text-primary">{daysLeft} days</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySmartSuggestions;
