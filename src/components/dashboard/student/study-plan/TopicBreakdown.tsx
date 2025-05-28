
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, BookOpen, Clock, Target, Star, AlertTriangle } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface TopicBreakdownProps {
  subjects: StudyPlanSubject[];
}

interface TopicDetail {
  id: string;
  name: string;
  subtopics: string[];
  weightage: number;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedHours: number;
  examImportance: number;
}

const mockTopicData: Record<string, TopicDetail[]> = {
  physics: [
    {
      id: 'mechanics',
      name: 'Mechanics',
      subtopics: ['Newton\'s Laws', 'Work Energy Power', 'Rotational Motion', 'SHM'],
      weightage: 25,
      priority: 'high',
      completed: true,
      difficulty: 'medium',
      estimatedHours: 40,
      examImportance: 90
    },
    {
      id: 'thermodynamics',
      name: 'Thermodynamics',
      subtopics: ['Laws of Thermodynamics', 'Heat Engines', 'Kinetic Theory'],
      weightage: 15,
      priority: 'medium',
      completed: false,
      difficulty: 'hard',
      estimatedHours: 25,
      examImportance: 75
    },
    {
      id: 'electromagnetism',
      name: 'Electromagnetism',
      subtopics: ['Electric Field', 'Magnetic Field', 'Electromagnetic Induction'],
      weightage: 30,
      priority: 'high',
      completed: false,
      difficulty: 'hard',
      estimatedHours: 45,
      examImportance: 95
    }
  ],
  chemistry: [
    {
      id: 'physical-chemistry',
      name: 'Physical Chemistry',
      subtopics: ['Chemical Kinetics', 'Equilibrium', 'Thermodynamics'],
      weightage: 35,
      priority: 'high',
      completed: false,
      difficulty: 'hard',
      estimatedHours: 50,
      examImportance: 85
    },
    {
      id: 'organic-chemistry',
      name: 'Organic Chemistry',
      subtopics: ['Hydrocarbons', 'Functional Groups', 'Biomolecules'],
      weightage: 40,
      priority: 'high',
      completed: false,
      difficulty: 'hard',
      estimatedHours: 55,
      examImportance: 90
    },
    {
      id: 'inorganic-chemistry',
      name: 'Inorganic Chemistry',
      subtopics: ['Periodic Table', 'Chemical Bonding', 'Coordination Compounds'],
      weightage: 25,
      priority: 'medium',
      completed: true,
      difficulty: 'medium',
      estimatedHours: 35,
      examImportance: 70
    }
  ],
  mathematics: [
    {
      id: 'calculus',
      name: 'Calculus',
      subtopics: ['Differential Calculus', 'Integral Calculus', 'Differential Equations'],
      weightage: 35,
      priority: 'high',
      completed: true,
      difficulty: 'medium',
      estimatedHours: 45,
      examImportance: 95
    },
    {
      id: 'algebra',
      name: 'Algebra',
      subtopics: ['Complex Numbers', 'Quadratic Equations', 'Sequences & Series'],
      weightage: 25,
      priority: 'medium',
      completed: false,
      difficulty: 'medium',
      estimatedHours: 30,
      examImportance: 80
    },
    {
      id: 'coordinate-geometry',
      name: 'Coordinate Geometry',
      subtopics: ['Straight Lines', 'Circles', 'Conic Sections'],
      weightage: 20,
      priority: 'medium',
      completed: true,
      difficulty: 'easy',
      estimatedHours: 25,
      examImportance: 75
    }
  ]
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-50 text-red-700 border-red-200';
    case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'low': return 'bg-green-50 text-green-700 border-green-200';
    default: return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'hard': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const TopicBreakdown: React.FC<TopicBreakdownProps> = ({ subjects }) => {
  const [openSubjects, setOpenSubjects] = useState<Set<string>>(new Set());

  const toggleSubject = (subjectId: string) => {
    const newOpenSubjects = new Set(openSubjects);
    if (newOpenSubjects.has(subjectId)) {
      newOpenSubjects.delete(subjectId);
    } else {
      newOpenSubjects.add(subjectId);
    }
    setOpenSubjects(newOpenSubjects);
  };

  return (
    <div className="space-y-6">
      {subjects.map((subject) => {
        const topics = mockTopicData[subject.id] || [];
        const isOpen = openSubjects.has(subject.id);
        const completedTopics = topics.filter(t => t.completed).length;
        const totalWeightage = topics.reduce((sum, t) => sum + t.weightage, 0);
        const completedWeightage = topics.filter(t => t.completed).reduce((sum, t) => sum + t.weightage, 0);

        return (
          <Card key={subject.id} className="overflow-hidden">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: subject.color }}
                      />
                      <div>
                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                        <CardDescription>
                          {completedTopics}/{topics.length} topics completed • {Math.round((completedWeightage / totalWeightage) * 100)}% weightage covered
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getPriorityColor(subject.priority)}>
                        {subject.priority} priority
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSubject(subject.id)}
                      >
                        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span>Topic Progress</span>
                      <span className="font-medium">{Math.round((completedTopics / topics.length) * 100)}%</span>
                    </div>
                    <Progress value={(completedTopics / topics.length) * 100} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Weightage Coverage</span>
                      <span className="font-medium">{Math.round((completedWeightage / totalWeightage) * 100)}%</span>
                    </div>
                    <Progress value={(completedWeightage / totalWeightage) * 100} className="h-2" />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="grid gap-4">
                    {topics
                      .sort((a, b) => {
                        // Sort by priority first (high > medium > low), then by completion status
                        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
                        const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
                        if (priorityDiff !== 0) return priorityDiff;
                        return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
                      })
                      .map((topic) => (
                        <div 
                          key={topic.id} 
                          className={`border rounded-lg p-4 ${topic.completed ? 'bg-green-50 dark:bg-green-900/10 border-green-200' : 'bg-white dark:bg-gray-800 border-gray-200'}`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium">{topic.name}</h4>
                                <Badge variant="outline" className={getPriorityColor(topic.priority)}>
                                  <Target className="h-3 w-3 mr-1" />
                                  {topic.priority}
                                </Badge>
                                <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                                  {topic.difficulty}
                                </Badge>
                              </div>
                              
                              <div className="flex flex-wrap gap-1 mb-2">
                                {topic.subtopics.map((subtopic, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {subtopic}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-lg font-bold text-blue-600">{topic.weightage}%</div>
                              <div className="text-xs text-gray-500">weightage</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span>{topic.estimatedHours}h estimated</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Star className="h-4 w-4 text-amber-400" />
                              <span>{topic.examImportance}% exam importance</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {topic.completed ? (
                                <span className="text-green-600 font-medium">✓ Completed</span>
                              ) : topic.priority === 'high' ? (
                                <span className="text-red-600 font-medium flex items-center">
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  Urgent
                                </span>
                              ) : (
                                <span className="text-gray-600">Pending</span>
                              )}
                            </div>
                          </div>
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
