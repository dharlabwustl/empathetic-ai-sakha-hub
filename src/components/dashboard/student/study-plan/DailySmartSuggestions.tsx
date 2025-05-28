
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Brain, Clock, Target, AlertTriangle, TrendingUp } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface DailySmartSuggestionsProps {
  subjects: StudyPlanSubject[];
  examDate: string;
}

interface Suggestion {
  id: string;
  type: 'critical' | 'opportunity' | 'maintenance' | 'optimization';
  title: string;
  description: string;
  subject: string;
  timeRequired: number;
  priority: 'high' | 'medium' | 'low';
  action: string;
}

const DailySmartSuggestions: React.FC<DailySmartSuggestionsProps> = ({ subjects, examDate }) => {
  // Generate smart suggestions based on subject data
  const generateSuggestions = (): Suggestion[] => {
    const suggestions: Suggestion[] = [];
    
    subjects.forEach(subject => {
      const completedTopics = subject.topics?.filter(t => t.completed).length || 0;
      const totalTopics = subject.topics?.length || 0;
      const progress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
      const weightageProgress = subject.totalWeightage ? 
        ((subject.completedWeightage || 0) / subject.totalWeightage) * 100 : 0;
      
      // Critical areas (low progress, high weightage)
      if (progress < 40 && (subject.totalWeightage || 0) > 20) {
        suggestions.push({
          id: `critical-${subject.id}`,
          type: 'critical',
          title: `Critical: ${subject.name} Needs Immediate Attention`,
          description: `Only ${progress.toFixed(0)}% complete with ${subject.totalWeightage}% exam weightage`,
          subject: subject.name,
          timeRequired: 90,
          priority: 'high',
          action: 'Start with high-priority topics'
        });
      }
      
      // Opportunities (medium progress, can be improved)
      if (progress >= 40 && progress < 75) {
        suggestions.push({
          id: `opportunity-${subject.id}`,
          type: 'opportunity',
          title: `Push ${subject.name} to 80%+ Completion`,
          description: `Good progress at ${progress.toFixed(0)}%. A focused session can boost confidence`,
          subject: subject.name,
          timeRequired: 60,
          priority: 'medium',
          action: 'Focus on medium-priority topics'
        });
      }
      
      // Maintenance (high progress subjects)
      if (progress >= 80) {
        suggestions.push({
          id: `maintenance-${subject.id}`,
          type: 'maintenance',
          title: `Maintain ${subject.name} Excellence`,
          description: `Strong performance at ${progress.toFixed(0)}%. Quick revision to maintain retention`,
          subject: subject.name,
          timeRequired: 30,
          priority: 'low',
          action: 'Quick revision of key concepts'
        });
      }
      
      // Find high-priority incomplete topics
      const highPriorityIncomplete = subject.topics?.filter(
        t => !t.completed && t.priority === 'high'
      );
      
      if (highPriorityIncomplete && highPriorityIncomplete.length > 0) {
        suggestions.push({
          id: `optimization-${subject.id}`,
          type: 'optimization',
          title: `Complete High-Priority ${subject.name} Topics`,
          description: `${highPriorityIncomplete.length} high-priority topics pending completion`,
          subject: subject.name,
          timeRequired: 45,
          priority: 'high',
          action: `Study: ${highPriorityIncomplete[0].name}`
        });
      }
    });
    
    // Sort by priority and limit to top 4 suggestions
    return suggestions
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })
      .slice(0, 4);
  };
  
  const suggestions = generateSuggestions();
  
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'opportunity': return Target;
      case 'maintenance': return TrendingUp;
      case 'optimization': return Brain;
      default: return Lightbulb;
    }
  };
  
  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'opportunity': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'maintenance': return 'bg-green-50 border-green-200 text-green-800';
      case 'optimization': return 'bg-purple-50 border-purple-200 text-purple-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-indigo-800">
          <Brain className="h-5 w-5" />
          Daily Smart Suggestions
        </CardTitle>
        <p className="text-sm text-indigo-600">
          AI-powered recommendations for optimal study planning
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {suggestions.map((suggestion) => {
          const Icon = getSuggestionIcon(suggestion.type);
          
          return (
            <div
              key={suggestion.id}
              className={`p-4 rounded-lg border ${getSuggestionColor(suggestion.type)} transition-all hover:shadow-md`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="font-semibold text-sm">{suggestion.title}</span>
                </div>
                <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                  {suggestion.priority}
                </Badge>
              </div>
              
              <p className="text-sm mb-3">{suggestion.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{suggestion.timeRequired} min</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {suggestion.subject}
                  </Badge>
                </div>
                
                <Button size="sm" variant="outline" className="text-xs">
                  {suggestion.action}
                </Button>
              </div>
            </div>
          );
        })}
        
        {suggestions.length === 0 && (
          <div className="text-center py-6">
            <Lightbulb className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
            <p className="text-indigo-600">Great job! No critical suggestions today.</p>
            <p className="text-sm text-indigo-500">Keep up the excellent study routine!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailySmartSuggestions;
