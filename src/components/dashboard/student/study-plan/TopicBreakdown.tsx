
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Target, Clock, Star, AlertTriangle } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface TopicBreakdownProps {
  subjects: StudyPlanSubject[];
  examName: string;
}

const TopicBreakdown: React.FC<TopicBreakdownProps> = ({ subjects, examName }) => {
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

  const getTopicWeightage = (topicId: string, subjectName: string): number => {
    // Mock weightage calculation based on topic and subject
    const weightageMap: Record<string, number> = {
      'Mechanics': 25,
      'Thermodynamics': 20,
      'Electromagnetism': 30,
      'Modern Physics': 15,
      'Optics': 10,
      'Physical Chemistry': 35,
      'Organic Chemistry': 40,
      'Inorganic Chemistry': 25,
      'Calculus': 30,
      'Algebra': 25,
      'Coordinate Geometry': 20,
      'Trigonometry': 15,
      'Statistics': 10
    };
    return weightageMap[topicId] || Math.floor(Math.random() * 20) + 10;
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Target className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      {subjects.map((subject) => {
        const isOpen = openSubjects.has(subject.id);
        const completedTopics = subject.topics?.filter(t => t.completed).length || 0;
        const totalTopics = subject.topics?.length || 0;
        const completionRate = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
        
        const totalWeightage = subject.topics?.reduce((sum, topic) => 
          sum + getTopicWeightage(topic.name, subject.name), 0) || 0;
        const completedWeightage = subject.topics?.filter(t => t.completed)
          .reduce((sum, topic) => sum + getTopicWeightage(topic.name, subject.name), 0) || 0;
        const weightageProgress = totalWeightage > 0 ? (completedWeightage / totalWeightage) * 100 : 0;

        return (
          <Card key={subject.id} className="overflow-hidden">
            <Collapsible>
              <CollapsibleTrigger 
                className="w-full"
                onClick={() => toggleSubject(subject.id)}
              >
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: subject.color || '#8B5CF6' }}
                      />
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          subject.priority === 'high' ? 'border-red-200 bg-red-50 text-red-700' :
                          subject.priority === 'medium' ? 'border-yellow-200 bg-yellow-50 text-yellow-700' :
                          'border-blue-200 bg-blue-50 text-blue-700'
                        }`}
                      >
                        {subject.priority.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {completedTopics}/{totalTopics} topics
                      </span>
                      {isOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                  
                  {/* Quick Progress Overview */}
                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Topic Completion</span>
                        <span>{Math.round(completionRate)}%</span>
                      </div>
                      <Progress value={completionRate} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Weightage Coverage</span>
                        <span>{Math.round(weightageProgress)}%</span>
                      </div>
                      <Progress value={weightageProgress} className="h-2" />
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {subject.topics && subject.topics.length > 0 ? (
                      subject.topics.map((topic, index) => {
                        const weightage = getTopicWeightage(topic.name, subject.name);
                        
                        return (
                          <div 
                            key={topic.id}
                            className="border rounded-lg p-4 hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                                  {index + 1}
                                </div>
                                <h4 className="font-medium">{topic.name}</h4>
                                {getPriorityIcon(topic.priority || 'medium')}
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Badge 
                                  variant="outline" 
                                  className={getDifficultyColor(topic.difficulty)}
                                >
                                  {topic.difficulty}
                                </Badge>
                                <Badge 
                                  variant="outline" 
                                  className={getStatusColor(topic.status)}
                                >
                                  {topic.status}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Exam Weightage:</span>
                                <span className="font-medium">{weightage}%</span>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Est. Time:</span>
                                <span className="font-medium">
                                  {Math.floor(weightage / 5) + 2}-{Math.floor(weightage / 3) + 3}h
                                </span>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Impact Score:</span>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < Math.ceil(weightage / 20) 
                                          ? 'text-yellow-400 fill-yellow-400' 
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            {/* Topic Progress Bar */}
                            <div className="mt-3">
                              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>Understanding Level</span>
                                <span>{topic.completed ? '100%' : Math.floor(Math.random() * 60) + 20}%</span>
                              </div>
                              <Progress 
                                value={topic.completed ? 100 : Math.floor(Math.random() * 60) + 20} 
                                className="h-1.5"
                              />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        No topics available for this subject
                      </div>
                    )}
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
