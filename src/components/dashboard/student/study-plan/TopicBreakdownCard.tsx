
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Target, Clock, TrendingUp, BookOpen } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface TopicBreakdownCardProps {
  subject: StudyPlanSubject;
}

const TopicBreakdownCard: React.FC<TopicBreakdownCardProps> = ({ subject }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
      case 'hard': return 'bg-red-50 text-red-600';
      case 'medium': return 'bg-amber-50 text-amber-600';
      case 'easy': return 'bg-green-50 text-green-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const weightageProgress = (subject.completedWeightage / subject.totalWeightage) * 100;
  const topicProgress = subject.topics ? (subject.topics.filter(t => t.completed).length / subject.topics.length) * 100 : 0;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4" style={{ borderLeftColor: subject.color || '#8B5CF6' }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: subject.color || '#8B5CF6' }}></div>
            <CardTitle className="text-lg font-semibold">{subject.name}</CardTitle>
            <Badge variant="outline" className={getPriorityColor(subject.priority)}>
              {subject.priority} priority
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {subject.examImportance}% exam weight
            </Badge>
            <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Topic Completion</span>
              <span className="font-medium">{topicProgress.toFixed(0)}%</span>
            </div>
            <Progress value={topicProgress} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Weightage Coverage</span>
              <span className="font-medium">{weightageProgress.toFixed(0)}%</span>
            </div>
            <Progress value={weightageProgress} className="h-2" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{subject.hoursPerWeek}</div>
            <div className="text-xs text-blue-500">hrs/week</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">{subject.topics?.length || 0}</div>
            <div className="text-xs text-green-500">topics</div>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-600">{subject.totalWeightage}%</div>
            <div className="text-xs text-purple-500">weightage</div>
          </div>
        </div>

        {/* AI Suggestions */}
        {subject.aiSuggestions && subject.aiSuggestions.length > 0 && (
          <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Daily Smart Suggestion</span>
            </div>
            <p className="text-sm text-blue-600">{subject.aiSuggestions[0]}</p>
          </div>
        )}

        {/* Collapsible Topic Details */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleContent className="space-y-3">
            <div className="border-t pt-4">
              <h4 className="font-semibold text-sm mb-3 flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Detailed Topic Breakdown
              </h4>
              
              {subject.topics && subject.topics.length > 0 ? (
                <div className="space-y-3">
                  {subject.topics
                    .sort((a, b) => {
                      // Sort by priority (high first), then by weightage (desc)
                      const priorityOrder = { high: 3, medium: 2, low: 1 };
                      const priorityDiff = priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
                      return priorityDiff !== 0 ? priorityDiff : (b.weightage || 0) - (a.weightage || 0);
                    })
                    .map((topic, index) => (
                      <div key={topic.id} className="border rounded-lg p-3 bg-gray-50/50">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm">{topic.name}</span>
                              <Badge variant="outline" className={getPriorityColor(topic.priority)} size="sm">
                                {topic.priority}
                              </Badge>
                              <Badge variant="outline" className={getDifficultyColor(topic.difficulty)} size="sm">
                                {topic.difficulty}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>Weightage: {topic.weightage}%</span>
                              <span>Est. Time: {topic.estimatedHours || 2}h</span>
                              {topic.masteryLevel && <span>Mastery: {topic.masteryLevel}%</span>}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={topic.completed ? "default" : "secondary"} size="sm">
                              {topic.status || (topic.completed ? "completed" : "pending")}
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Subtopics */}
                        {topic.subtopics && topic.subtopics.length > 0 && (
                          <div className="mt-2 pl-4 border-l-2 border-gray-200">
                            <div className="text-xs font-medium text-gray-600 mb-1">Subtopics:</div>
                            <div className="space-y-1">
                              {topic.subtopics.map((subtopic) => (
                                <div key={subtopic.id} className="flex items-center justify-between text-xs">
                                  <span className={subtopic.completed ? "line-through text-gray-500" : ""}>{subtopic.name}</span>
                                  <div className="flex items-center space-x-1">
                                    <span className="text-gray-500">{subtopic.weightage}%</span>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-gray-500">{subtopic.estimatedTime}min</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No topics available for this subject</p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default TopicBreakdownCard;
