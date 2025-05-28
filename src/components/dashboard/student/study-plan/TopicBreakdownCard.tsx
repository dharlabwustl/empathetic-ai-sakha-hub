
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Target, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface TopicBreakdownCardProps {
  subject: StudyPlanSubject;
  onTopicClick?: (topicId: string) => void;
}

const TopicBreakdownCard: React.FC<TopicBreakdownCardProps> = ({ subject, onTopicClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'hard': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'easy': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in-progress': return 'text-blue-600';
      case 'pending': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const completedTopics = subject.topics?.filter(topic => topic.completed) || [];
  const totalTopics = subject.topics?.length || 0;
  const completionPercentage = totalTopics > 0 ? (completedTopics.length / totalTopics) * 100 : 0;

  const totalWeightage = subject.topics?.reduce((sum, topic) => sum + topic.weightage, 0) || 0;
  const completedWeightage = subject.topics?.filter(topic => topic.completed)
    .reduce((sum, topic) => sum + topic.weightage, 0) || 0;
  const weightagePercentage = totalWeightage > 0 ? (completedWeightage / totalWeightage) * 100 : 0;

  const sortedTopics = subject.topics?.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  }) || [];

  return (
    <Card className="h-full border-l-4" style={{ borderLeftColor: subject.color || '#8B5CF6' }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color || '#8B5CF6' }}></div>
            {subject.name}
          </CardTitle>
          <Badge variant="outline" className={getPriorityColor(subject.priority)}>
            {subject.priority} priority
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Topic Progress</span>
              <span className="font-medium">{completedTopics.length}/{totalTopics}</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
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
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="text-sm font-medium">
                {totalTopics} topics • {totalWeightage}% weightage
              </span>
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-3 mt-4">
            {sortedTopics.map((topic) => (
              <div 
                key={topic.id} 
                className="border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onTopicClick?.(topic.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{topic.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={getPriorityColor(topic.priority)} size="sm">
                        {topic.priority}
                      </Badge>
                      <div className={`w-2 h-2 rounded-full ${getDifficultyColor(topic.difficulty)}`}></div>
                      <span className="text-xs text-muted-foreground capitalize">{topic.difficulty}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Target className="h-3 w-3" />
                      {topic.weightage}%
                    </div>
                    <span className={`text-xs font-medium ${getStatusColor(topic.status)}`}>
                      {topic.status}
                    </span>
                  </div>
                </div>

                {topic.subtopics && topic.subtopics.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="text-xs text-muted-foreground mb-1">Subtopics:</div>
                    {topic.subtopics.slice(0, 3).map((subtopic) => (
                      <div key={subtopic.id} className="flex items-center justify-between text-xs">
                        <span className={subtopic.completed ? 'line-through text-muted-foreground' : ''}>
                          {subtopic.name}
                        </span>
                        <span className="text-muted-foreground">{subtopic.weightage}%</span>
                      </div>
                    ))}
                    {topic.subtopics.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{topic.subtopics.length - 3} more subtopics
                      </div>
                    )}
                  </div>
                )}

                {topic.estimatedHours && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Est. {topic.estimatedHours}h
                    {topic.lastStudied && (
                      <span className="ml-2">• Last studied: {topic.lastStudied}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default TopicBreakdownCard;
