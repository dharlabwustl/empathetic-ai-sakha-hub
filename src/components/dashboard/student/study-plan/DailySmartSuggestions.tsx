
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Lightbulb, Target, Clock, TrendingUp, Star, ChevronRight } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface DailySmartSuggestionsProps {
  subjects: StudyPlanSubject[];
  examDate: string;
  weeklyHours: number;
}

interface Suggestion {
  id: string;
  type: 'priority' | 'weightage' | 'weakness' | 'revision' | 'optimization';
  title: string;
  description: string;
  subject?: string;
  estimatedTime?: number;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  reasoning: string;
}

const DailySmartSuggestions: React.FC<DailySmartSuggestionsProps> = ({ 
  subjects, 
  examDate, 
  weeklyHours 
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    generateSmartSuggestions();
  }, [subjects, examDate, weeklyHours]);

  const generateSmartSuggestions = () => {
    const today = new Date();
    const exam = new Date(examDate);
    const daysUntilExam = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    const newSuggestions: Suggestion[] = [];

    // Priority-based suggestions
    const highPrioritySubjects = subjects.filter(s => s.priority === 'high');
    highPrioritySubjects.forEach(subject => {
      const completedTopics = subject.topics?.filter(t => t.completed).length || 0;
      const totalTopics = subject.topics?.length || 0;
      const progress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

      if (progress < 60) {
        newSuggestions.push({
          id: `priority-${subject.id}`,
          type: 'priority',
          title: `Focus on ${subject.name} Today`,
          description: `High priority subject with only ${Math.round(progress)}% completion. Tackle 2-3 pending topics.`,
          subject: subject.name,
          estimatedTime: 90,
          priority: 'high',
          actionable: true,
          reasoning: `${subject.name} is marked as high priority but shows low completion rate.`
        });
      }
    });

    // Weightage-based suggestions
    subjects.forEach(subject => {
      const subjectWeightage = subject.totalWeightage || 0;
      const completedWeightage = subject.completedWeightage || 0;
      const weightageProgress = subjectWeightage > 0 ? (completedWeightage / subjectWeightage) * 100 : 0;

      if (subjectWeightage >= 25 && weightageProgress < 50) {
        newSuggestions.push({
          id: `weightage-${subject.id}`,
          type: 'weightage',
          title: `High-Weightage Subject Alert: ${subject.name}`,
          description: `${subjectWeightage}% exam weightage but only ${Math.round(weightageProgress)}% covered. Urgent attention needed.`,
          subject: subject.name,
          estimatedTime: 120,
          priority: 'high',
          actionable: true,
          reasoning: `High exam weightage (${subjectWeightage}%) requires immediate focus.`
        });
      }
    });

    // Weakness-based suggestions
    const weakSubjects = subjects.filter(s => s.proficiency === 'weak');
    weakSubjects.forEach(subject => {
      const pendingTopics = subject.topics?.filter(t => t.status === 'pending') || [];
      if (pendingTopics.length > 0) {
        const easyTopics = pendingTopics.filter(t => t.difficulty === 'easy');
        if (easyTopics.length > 0) {
          newSuggestions.push({
            id: `weakness-${subject.id}`,
            type: 'weakness',
            title: `Build Confidence in ${subject.name}`,
            description: `Start with ${easyTopics.length} easy topics to build momentum in your weak subject.`,
            subject: subject.name,
            estimatedTime: 60,
            priority: 'medium',
            actionable: true,
            reasoning: `Weak subject needs confidence building through easier topics first.`
          });
        }
      }
    });

    // Revision suggestions
    subjects.forEach(subject => {
      const completedTopics = subject.topics?.filter(t => t.completed) || [];
      const oldCompletedTopics = completedTopics.filter(topic => {
        if (!topic.lastStudied) return true;
        const lastStudied = new Date(topic.lastStudied);
        const daysSinceStudied = Math.ceil((today.getTime() - lastStudied.getTime()) / (1000 * 60 * 60 * 24));
        return daysSinceStudied > 7;
      });

      if (oldCompletedTopics.length > 0) {
        newSuggestions.push({
          id: `revision-${subject.id}`,
          type: 'revision',
          title: `Quick Revision: ${subject.name}`,
          description: `${oldCompletedTopics.length} topics need revision (last studied >7 days ago).`,
          subject: subject.name,
          estimatedTime: 45,
          priority: 'medium',
          actionable: true,
          reasoning: `Spaced repetition needed for long-term retention.`
        });
      }
    });

    // Time optimization suggestions
    if (daysUntilExam < 30) {
      const incompleteHighWeightage = subjects.filter(s => {
        const progress = s.totalWeightage > 0 ? ((s.completedWeightage || 0) / s.totalWeightage) * 100 : 0;
        return (s.totalWeightage || 0) >= 20 && progress < 80;
      });

      if (incompleteHighWeightage.length > 0) {
        newSuggestions.push({
          id: 'optimization-time',
          type: 'optimization',
          title: 'Exam Strategy Optimization',
          description: `${daysUntilExam} days left. Focus on high-weightage incomplete topics for maximum score impact.`,
          estimatedTime: 0,
          priority: 'high',
          actionable: true,
          reasoning: `Limited time requires strategic focus on high-impact areas.`
        });
      }
    }

    // Limit to top 6 suggestions, prioritizing high priority ones
    const sortedSuggestions = newSuggestions
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })
      .slice(0, 6);

    setSuggestions(sortedSuggestions);
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'priority': return Target;
      case 'weightage': return TrendingUp;
      case 'weakness': return Lightbulb;
      case 'revision': return Clock;
      case 'optimization': return Star;
      default: return Brain;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'priority': return 'bg-blue-500';
      case 'weightage': return 'bg-purple-500';
      case 'weakness': return 'bg-amber-500';
      case 'revision': return 'bg-green-500';
      case 'optimization': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const suggestionTypes = ['all', 'priority', 'weightage', 'weakness', 'revision', 'optimization'];
  const filteredSuggestions = selectedType === 'all' 
    ? suggestions 
    : suggestions.filter(s => s.type === selectedType);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Daily Smart Suggestions
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          {suggestionTypes.map(type => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type)}
              className="capitalize"
            >
              {type}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {filteredSuggestions.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <Brain className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No suggestions available for the selected filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSuggestions.map((suggestion) => {
              const Icon = getSuggestionIcon(suggestion.type);
              const colorClass = getSuggestionColor(suggestion.type);
              
              return (
                <div key={suggestion.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm">{suggestion.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getPriorityBadgeColor(suggestion.priority)}>
                            {suggestion.priority}
                          </Badge>
                          {suggestion.estimatedTime && (
                            <Badge variant="outline" className="text-xs">
                              {suggestion.estimatedTime}m
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground italic">
                          {suggestion.reasoning}
                        </span>
                        {suggestion.actionable && (
                          <Button size="sm" variant="outline" className="ml-auto">
                            Take Action <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailySmartSuggestions;
