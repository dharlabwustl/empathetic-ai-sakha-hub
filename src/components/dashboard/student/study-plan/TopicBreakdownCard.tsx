
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Target, BookOpen, TrendingUp, AlertTriangle } from 'lucide-react';
import { StudyPlanSubject, StudyPlanTopic } from '@/types/user/studyPlan';

interface TopicBreakdownCardProps {
  subject: StudyPlanSubject;
}

const TopicBreakdownCard: React.FC<TopicBreakdownCardProps> = ({ subject }) => {
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-50 text-green-600';
      case 'medium': return 'bg-yellow-50 text-yellow-600';
      case 'hard': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const completedTopics = subject.topics?.filter(topic => topic.completed).length || 0;
  const totalTopics = subject.topics?.length || 0;
  const topicProgress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

  const completedWeightage = subject.completedWeightage || 0;
  const totalWeightage = subject.totalWeightage || 100;
  const weightageProgress = (completedWeightage / totalWeightage) * 100;

  // Sort topics by priority
  const sortedTopics = subject.topics?.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  }) || [];

  return (
    <Card className="overflow-hidden border-l-4" style={{ borderLeftColor: subject.color }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }}></div>
            {subject.name}
          </CardTitle>
          <Badge variant="outline" className={getPriorityColor(subject.priority)}>
            {subject.priority} priority
          </Badge>
        </div>
        
        {/* Progress Overview */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Topic Completion</span>
              <span className="font-medium">{completedTopics}/{totalTopics}</span>
            </div>
            <Progress value={topicProgress} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Weightage Coverage</span>
              <span className="font-medium">{completedWeightage}%/{totalWeightage}%</span>
            </div>
            <Progress value={weightageProgress} className="h-2" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {sortedTopics.map((topic) => (
          <Collapsible key={topic.id}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-3 h-auto border rounded-lg hover:bg-gray-50"
                onClick={() => toggleTopic(topic.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1 rounded ${getDifficultyColor(topic.difficulty)}`}>
                    {topic.completed ? (
                      <BookOpen className="h-4 w-4" />
                    ) : (
                      <Target className="h-4 w-4" />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{topic.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <Badge variant="outline" className={getPriorityColor(topic.priority)} size="sm">
                        {topic.priority}
                      </Badge>
                      <span>Weightage: {topic.weightage || 0}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {topic.status === 'completed' && (
                    <Badge variant="outline" className="bg-green-50 text-green-600">
                      Completed
                    </Badge>
                  )}
                  {expandedTopics.has(topic.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-2 ml-6 space-y-2">
              {topic.subtopics && topic.subtopics.length > 0 ? (
                <div className="space-y-1">
                  {topic.subtopics.map((subtopic) => (
                    <div key={subtopic.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                      <span className={subtopic.completed ? 'line-through text-gray-500' : ''}>
                        {subtopic.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" size="sm" className={getPriorityColor(subtopic.priority)}>
                          {subtopic.priority}
                        </Badge>
                        <span className="text-xs text-gray-500">{subtopic.weightage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 p-2 bg-gray-50 rounded">
                  No subtopics available
                </div>
              )}
              
              <div className="flex items-center gap-2 text-xs text-gray-600 mt-2">
                <TrendingUp className="h-3 w-3" />
                <span>Estimated: {topic.estimatedHours || 2} hours</span>
                {topic.priority === 'high' && (
                  <>
                    <AlertTriangle className="h-3 w-3 text-red-500" />
                    <span className="text-red-600">High Priority</span>
                  </>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};

export default TopicBreakdownCard;
