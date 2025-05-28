
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Target, Clock, BookOpen, TrendingUp } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface TopicBreakdownProps {
  subjects: StudyPlanSubject[];
}

interface TopicDetail {
  id: string;
  name: string;
  weightage: number;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  subtopics: {
    id: string;
    name: string;
    weightage: number;
    completed: boolean;
    estimatedTime: number;
  }[];
  estimatedTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const mockTopicDetails: Record<string, TopicDetail[]> = {
  physics: [
    {
      id: 'mechanics',
      name: 'Mechanics',
      weightage: 25,
      priority: 'high',
      completed: true,
      estimatedTime: 180,
      difficulty: 'medium',
      subtopics: [
        { id: 'kinematics', name: 'Kinematics', weightage: 8, completed: true, estimatedTime: 60 },
        { id: 'dynamics', name: 'Dynamics', weightage: 10, completed: true, estimatedTime: 70 },
        { id: 'work-energy', name: 'Work & Energy', weightage: 7, completed: false, estimatedTime: 50 }
      ]
    },
    {
      id: 'thermodynamics',
      name: 'Thermodynamics',
      weightage: 20,
      priority: 'high',
      completed: false,
      estimatedTime: 150,
      difficulty: 'hard',
      subtopics: [
        { id: 'first-law', name: 'First Law', weightage: 8, completed: false, estimatedTime: 50 },
        { id: 'second-law', name: 'Second Law', weightage: 7, completed: false, estimatedTime: 45 },
        { id: 'heat-engines', name: 'Heat Engines', weightage: 5, completed: false, estimatedTime: 55 }
      ]
    },
    {
      id: 'electromagnetism',
      name: 'Electromagnetism',
      weightage: 30,
      priority: 'high',
      completed: false,
      estimatedTime: 200,
      difficulty: 'hard',
      subtopics: [
        { id: 'electric-field', name: 'Electric Field', weightage: 10, completed: false, estimatedTime: 60 },
        { id: 'magnetic-field', name: 'Magnetic Field', weightage: 12, completed: false, estimatedTime: 70 },
        { id: 'electromagnetic-induction', name: 'EM Induction', weightage: 8, completed: false, estimatedTime: 70 }
      ]
    }
  ],
  chemistry: [
    {
      id: 'physical-chemistry',
      name: 'Physical Chemistry',
      weightage: 35,
      priority: 'high',
      completed: false,
      estimatedTime: 180,
      difficulty: 'hard',
      subtopics: [
        { id: 'chemical-kinetics', name: 'Chemical Kinetics', weightage: 12, completed: false, estimatedTime: 60 },
        { id: 'equilibrium', name: 'Chemical Equilibrium', weightage: 13, completed: false, estimatedTime: 70 },
        { id: 'thermochemistry', name: 'Thermochemistry', weightage: 10, completed: false, estimatedTime: 50 }
      ]
    },
    {
      id: 'organic-chemistry',
      name: 'Organic Chemistry',
      weightage: 40,
      priority: 'high',
      completed: false,
      estimatedTime: 220,
      difficulty: 'hard',
      subtopics: [
        { id: 'hydrocarbons', name: 'Hydrocarbons', weightage: 15, completed: false, estimatedTime: 80 },
        { id: 'functional-groups', name: 'Functional Groups', weightage: 15, completed: false, estimatedTime: 90 },
        { id: 'biomolecules', name: 'Biomolecules', weightage: 10, completed: false, estimatedTime: 50 }
      ]
    }
  ],
  mathematics: [
    {
      id: 'calculus',
      name: 'Calculus',
      weightage: 30,
      priority: 'high',
      completed: true,
      estimatedTime: 200,
      difficulty: 'medium',
      subtopics: [
        { id: 'limits', name: 'Limits', weightage: 8, completed: true, estimatedTime: 60 },
        { id: 'derivatives', name: 'Derivatives', weightage: 12, completed: true, estimatedTime: 80 },
        { id: 'integrals', name: 'Integrals', weightage: 10, completed: true, estimatedTime: 60 }
      ]
    },
    {
      id: 'coordinate-geometry',
      name: 'Coordinate Geometry',
      weightage: 25,
      priority: 'medium',
      completed: true,
      estimatedTime: 150,
      difficulty: 'easy',
      subtopics: [
        { id: 'straight-lines', name: 'Straight Lines', weightage: 8, completed: true, estimatedTime: 50 },
        { id: 'circles', name: 'Circles', weightage: 9, completed: true, estimatedTime: 55 },
        { id: 'conic-sections', name: 'Conic Sections', weightage: 8, completed: true, estimatedTime: 45 }
      ]
    }
  ]
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

export const TopicBreakdown: React.FC<TopicBreakdownProps> = ({ subjects }) => {
  const [openSubjects, setOpenSubjects] = useState<Record<string, boolean>>({});
  const [openTopics, setOpenTopics] = useState<Record<string, boolean>>({});

  const toggleSubject = (subjectId: string) => {
    setOpenSubjects(prev => ({ ...prev, [subjectId]: !prev[subjectId] }));
  };

  const toggleTopic = (topicId: string) => {
    setOpenTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Topic-wise Breakdown & Weightage Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {subjects.map((subject) => {
          const topicDetails = mockTopicDetails[subject.id] || [];
          const totalWeightage = topicDetails.reduce((sum, topic) => sum + topic.weightage, 0);
          const completedWeightage = topicDetails
            .filter(topic => topic.completed)
            .reduce((sum, topic) => sum + topic.weightage, 0);
          const weightageProgress = totalWeightage > 0 ? (completedWeightage / totalWeightage) * 100 : 0;

          return (
            <Collapsible key={subject.id} open={openSubjects[subject.id]} onOpenChange={() => toggleSubject(subject.id)}>
              <CollapsibleTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color || '#8B5CF6' }}></div>
                        <div>
                          <h3 className="font-semibold text-lg">{subject.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">
                              {topicDetails.length} topics • {totalWeightage}% total weightage
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-medium">{Math.round(weightageProgress)}% covered</div>
                          <Progress value={weightageProgress} className="w-24 h-2 mt-1" />
                        </div>
                        {openSubjects[subject.id] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-2 ml-4 space-y-3">
                {topicDetails.map((topic) => (
                  <Collapsible key={topic.id} open={openTopics[topic.id]} onOpenChange={() => toggleTopic(topic.id)}>
                    <CollapsibleTrigger asChild>
                      <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                {openTopics[topic.id] ? (
                                  <ChevronDown className="h-3 w-3" />
                                ) : (
                                  <ChevronRight className="h-3 w-3" />
                                )}
                                <h4 className="font-medium">{topic.name}</h4>
                              </div>
                              <div className="flex gap-1">
                                <Badge variant="outline" className={getPriorityColor(topic.priority)}>
                                  {topic.priority}
                                </Badge>
                                <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                                  {topic.difficulty}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="text-sm font-medium">{topic.weightage}% weightage</div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {topic.estimatedTime} min
                                </div>
                              </div>
                              <div className={`w-3 h-3 rounded-full ${topic.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="mt-2 ml-6">
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-muted-foreground">Subtopics:</h5>
                        {topic.subtopics.map((subtopic) => (
                          <div key={subtopic.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${subtopic.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <span className="text-sm">{subtopic.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{subtopic.weightage}%</span>
                              <span>•</span>
                              <span>{subtopic.estimatedTime} min</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </CardContent>
    </Card>
  );
};
