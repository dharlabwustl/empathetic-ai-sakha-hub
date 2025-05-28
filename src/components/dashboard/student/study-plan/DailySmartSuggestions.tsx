
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Clock, Target, TrendingUp, Brain } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface DailySmartSuggestionsProps {
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
}

export const DailySmartSuggestions: React.FC<DailySmartSuggestionsProps> = ({ 
  subjects, 
  studyHoursPerDay 
}) => {
  // Generate AI-powered suggestions based on subject data
  const generateSuggestions = () => {
    const suggestions = [];

    // Find high priority, incomplete topics
    const highPriorityTopics = subjects.flatMap(subject => 
      (subject.topics || [])
        .filter(topic => topic.priority === 'high' && !topic.completed)
        .map(topic => ({ ...topic, subject: subject.name, subjectColor: subject.color }))
    );

    if (highPriorityTopics.length > 0) {
      const topic = highPriorityTopics[0];
      suggestions.push({
        id: 'high-priority',
        type: 'urgent',
        icon: Target,
        title: 'Focus on High Priority Topics',
        description: `Start with "${topic.name}" in ${topic.subject}`,
        action: 'Start Now',
        priority: 'high',
        estimatedTime: topic.estimatedHours ? `${topic.estimatedHours}h` : '2h'
      });
    }

    // Find subjects with high weightage but low progress
    const criticalSubjects = subjects.filter(subject => {
      const completedTopics = subject.topics?.filter(topic => topic.completed).length || 0;
      const totalTopics = subject.topics?.length || 1;
      const completion = (completedTopics / totalTopics) * 100;
      return (subject.weightage || 0) >= 25 && completion < 60;
    });

    if (criticalSubjects.length > 0) {
      const subject = criticalSubjects[0];
      suggestions.push({
        id: 'critical-subject',
        type: 'important',
        icon: TrendingUp,
        title: 'Boost Critical Subject',
        description: `${subject.name} needs attention (${subject.weightage}% of exam)`,
        action: 'Review Topics',
        priority: 'medium',
        estimatedTime: '1.5h'
      });
    }

    // Suggest review for completed topics
    const completedTopics = subjects.flatMap(subject => 
      (subject.topics || [])
        .filter(topic => topic.completed && topic.difficulty === 'hard')
        .map(topic => ({ ...topic, subject: subject.name }))
    );

    if (completedTopics.length > 0) {
      suggestions.push({
        id: 'review-hard',
        type: 'review',
        icon: Brain,
        title: 'Review Difficult Concepts',
        description: 'Reinforce hard topics you\'ve completed',
        action: 'Quick Review',
        priority: 'low',
        estimatedTime: '45m'
      });
    }

    // Time management suggestion
    suggestions.push({
      id: 'time-management',
      type: 'optimization',
      icon: Clock,
      title: 'Optimize Study Time',
      description: `You have ${studyHoursPerDay}h daily. Distribute wisely across subjects.`,
      action: 'View Schedule',
      priority: 'medium',
      estimatedTime: '15m planning'
    });

    return suggestions.slice(0, 3); // Limit to 3 suggestions
  };

  const suggestions = generateSuggestions();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'text-red-600';
      case 'important': return 'text-amber-600';
      case 'review': return 'text-blue-600';
      case 'optimization': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-primary" />
          Daily Smart Suggestions
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          AI-powered recommendations for your study session
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion) => {
          const IconComponent = suggestion.icon;
          return (
            <div key={suggestion.id} className="p-4 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-lg bg-white ${getTypeColor(suggestion.type)}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-sm">{suggestion.title}</h4>
                      <Badge variant="outline" className={getPriorityColor(suggestion.priority)} size="sm">
                        {suggestion.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {suggestion.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {suggestion.estimatedTime}
                      </span>
                      <Button variant="outline" size="sm">
                        {suggestion.action}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Pro Tip:</strong> Focus on high-weightage topics first to maximize your exam preparation efficiency.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
