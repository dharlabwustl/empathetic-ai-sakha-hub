
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, BookOpen, Target, Clock, TrendingUp } from 'lucide-react';
import { StudyPlanSubject, StudyPlanTopic } from '@/types/user/studyPlan';

interface TopicBreakdownCardProps {
  subject: StudyPlanSubject;
}

export const TopicBreakdownCard: React.FC<TopicBreakdownCardProps> = ({ subject }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'hard': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'easy': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const completedTopics = subject.topics?.filter(topic => topic.completed) || [];
  const totalTopics = subject.topics?.length || 0;
  const completionPercentage = totalTopics > 0 ? (completedTopics.length / totalTopics) * 100 : 0;
  
  const totalWeightage = subject.topics?.reduce((sum, topic) => sum + (topic.weightage || 0), 0) || 0;
  const completedWeightage = subject.topics?.filter(topic => topic.completed)
    .reduce((sum, topic) => sum + (topic.weightage || 0), 0) || 0;
  const weightagePercentage = totalWeightage > 0 ? (completedWeightage / totalWeightage) * 100 : 0;

  // Sort topics by priority (high -> medium -> low)
  const sortedTopics = [...(subject.topics || [])].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return (
    <Card className="h-full border-l-4" style={{ borderLeftColor: subject.color || '#8B5CF6' }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: subject.color || '#8B5CF6' }}></div>
            {subject.name}
          </CardTitle>
          <Badge variant="outline" className={getPriorityColor(subject.priority)}>
            {subject.priority} priority
          </Badge>
        </div>
        
        {/* Progress Metrics */}
        <div className="space-y-3 mt-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Topic Completion</span>
              <span className="font-medium">{completedTopics.length} / {totalTopics}</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Weightage Coverage</span>
              <span className="font-medium">{Math.round(weightagePercentage)}%</span>
            </div>
            <Progress value={weightagePercentage} className="h-2" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-2 h-auto">
              <span className="flex items-center text-sm">
                <BookOpen className="h-4 w-4 mr-2" />
                View {totalTopics} Topics
              </span>
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-2 mt-2">
            {sortedTopics.map((topic, index) => (
              <div key={topic.id} className="border rounded-lg p-3 bg-muted/30">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-medium text-sm">{topic.name}</span>
                      {topic.completed && (
                        <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200 text-xs">
                          Completed
                        </Badge>
                      )}
                    </div>
                    {topic.subtopics && topic.subtopics.length > 0 && (
                      <div className="mt-1">
                        <p className="text-xs text-muted-foreground">
                          Subtopics: {topic.subtopics.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-end space-y-1">
                    <Badge variant="outline" className={getPriorityColor(topic.priority)} size="sm">
                      {topic.priority}
                    </Badge>
                    <Badge variant="outline" className={getDifficultyColor(topic.difficulty)} size="sm">
                      {topic.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Target className="h-3 w-3 mr-1" />
                    <span>Weightage: {topic.weightage || 0}%</span>
                  </div>
                  {topic.estimatedHours && (
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{topic.estimatedHours}h</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
