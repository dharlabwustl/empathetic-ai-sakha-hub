
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, BookOpen, Target, Clock, AlertTriangle } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface TopicBreakdownProps {
  subjects: StudyPlanSubject[];
}

interface TopicWithWeightage {
  id: string;
  name: string;
  weightage: number;
  priority: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  progress: number;
  subtopics: {
    id: string;
    name: string;
    weightage: number;
    completed: boolean;
  }[];
}

const TopicBreakdown: React.FC<TopicBreakdownProps> = ({ subjects }) => {
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const toggleSubject = (subjectId: string) => {
    const newExpanded = new Set(expandedSubjects);
    if (newExpanded.has(subjectId)) {
      newExpanded.delete(subjectId);
    } else {
      newExpanded.add(subjectId);
    }
    setExpandedSubjects(newExpanded);
  };

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
      case 'medium': return 'bg-amber-50 text-amber-600';
      case 'hard': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  // Enhanced topics with weightage and subtopics
  const getEnhancedTopics = (subject: StudyPlanSubject): TopicWithWeightage[] => {
    const baseTopics = subject.topics || [];
    return baseTopics.map((topic, index) => ({
      id: topic.id,
      name: topic.name,
      weightage: subject.name === 'Physics' ? [25, 20, 18, 15, 12, 10][index] || 10 :
                 subject.name === 'Chemistry' ? [30, 25, 20, 15, 10][index] || 15 :
                 [22, 20, 18, 16, 14, 10][index] || 12,
      priority: topic.priority || (index < 2 ? 'high' : index < 4 ? 'medium' : 'low'),
      difficulty: topic.difficulty || 'medium',
      completed: topic.completed,
      progress: topic.completed ? 100 : Math.floor(Math.random() * 80) + 10,
      subtopics: [
        { id: `${topic.id}-1`, name: `${topic.name} Fundamentals`, weightage: 40, completed: topic.completed },
        { id: `${topic.id}-2`, name: `${topic.name} Applications`, weightage: 35, completed: false },
        { id: `${topic.id}-3`, name: `${topic.name} Problem Solving`, weightage: 25, completed: false }
      ]
    }));
  };

  return (
    <div className="space-y-4">
      {subjects.map((subject) => {
        const enhancedTopics = getEnhancedTopics(subject);
        const totalWeightage = enhancedTopics.reduce((sum, topic) => sum + topic.weightage, 0);
        const completedWeightage = enhancedTopics
          .filter(topic => topic.completed)
          .reduce((sum, topic) => sum + topic.weightage, 0);
        const weightageProgress = totalWeightage > 0 ? (completedWeightage / totalWeightage) * 100 : 0;

        return (
          <Card key={subject.id} className="border border-gray-200">
            <Collapsible open={expandedSubjects.has(subject.id)} onOpenChange={() => toggleSubject(subject.id)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {expandedSubjects.has(subject.id) ? 
                        <ChevronDown className="h-5 w-5 text-gray-500" /> : 
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      }
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: subject.color }}></div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">Weightage Progress</div>
                        <div className="text-xs text-gray-500">{Math.round(weightageProgress)}% covered</div>
                      </div>
                      <div className="w-24">
                        <Progress value={weightageProgress} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {enhancedTopics.map((topic) => (
                      <div key={topic.id} className="border rounded-lg p-4 bg-gray-50">
                        <Collapsible open={expandedTopics.has(topic.id)} onOpenChange={() => toggleTopic(topic.id)}>
                          <CollapsibleTrigger asChild>
                            <div className="flex items-center justify-between cursor-pointer">
                              <div className="flex items-center space-x-3">
                                {expandedTopics.has(topic.id) ? 
                                  <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                                  <ChevronRight className="h-4 w-4 text-gray-500" />
                                }
                                <div className="flex items-center space-x-2">
                                  <BookOpen className="h-4 w-4 text-blue-500" />
                                  <span className="font-medium">{topic.name}</span>
                                </div>
                                <Badge variant="outline" className={getPriorityColor(topic.priority)}>
                                  {topic.priority}
                                </Badge>
                                <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                                  {topic.difficulty}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="text-right">
                                  <div className="text-sm font-medium">{topic.weightage}%</div>
                                  <div className="text-xs text-gray-500">exam weight</div>
                                </div>
                                <div className="w-20">
                                  <Progress value={topic.progress} className="h-2" />
                                </div>
                                <div className="text-sm text-gray-600">{topic.progress}%</div>
                              </div>
                            </div>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <div className="mt-4 pl-7 space-y-2">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Subtopics Breakdown:</h4>
                              {topic.subtopics.map((subtopic) => (
                                <div key={subtopic.id} className="flex items-center justify-between p-2 bg-white rounded border">
                                  <div className="flex items-center space-x-2">
                                    <Target className="h-3 w-3 text-purple-500" />
                                    <span className="text-sm">{subtopic.name}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500">{subtopic.weightage}%</span>
                                    {subtopic.completed ? (
                                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                                        Complete
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                                        Pending
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
};

export default TopicBreakdown;
