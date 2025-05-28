
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  ChevronDown, 
  ChevronRight,
  CheckCircle,
  Circle,
  AlertCircle,
  BarChart3,
  Brain
} from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface StudyPlanBreakdownProps {
  subjects: StudyPlanSubject[];
  examDate: string;
  examName: string;
  weeklyHours: number;
}

interface TopicDetailProps {
  topic: any;
  subjectColor: string;
}

const TopicDetail: React.FC<TopicDetailProps> = ({ topic, subjectColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getStatusIcon = () => {
    switch (topic.status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Circle className="h-4 w-4 text-blue-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityBadge = () => {
    const priorityColors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-amber-100 text-amber-800 border-amber-200',
      low: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    
    return (
      <Badge variant="outline" className={priorityColors[topic.priority]}>
        {topic.priority} priority
      </Badge>
    );
  };

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div className="border rounded-lg p-4 mb-3 hover:shadow-md transition-shadow">
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3 flex-1">
              {getStatusIcon()}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{topic.name}</h4>
                  {getPriorityBadge()}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    {topic.weightage}% weightage
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {topic.estimatedHours}h estimated
                  </span>
                  <Badge 
                    variant="outline" 
                    className={
                      topic.difficulty === 'hard' 
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : topic.difficulty === 'medium'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-green-50 text-green-700 border-green-200'
                    }
                  >
                    {topic.difficulty}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border-2"
                style={{ 
                  backgroundColor: topic.completed ? subjectColor : 'transparent',
                  borderColor: subjectColor 
                }}
              />
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-4">
          <div className="space-y-3 pl-7">
            <div>
              <h5 className="font-medium text-sm mb-2">Sub-topics:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {topic.subTopics?.map((subTopic: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                    {subTopic}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Weightage Impact:</span>
                  <p className="text-gray-600">
                    {topic.weightage >= 25 ? 'High impact on exam score' : 
                     topic.weightage >= 15 ? 'Moderate impact on exam score' : 
                     'Low impact on exam score'}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Study Strategy:</span>
                  <p className="text-gray-600">
                    {topic.priority === 'high' && topic.difficulty === 'hard' ? 'Focus area - allocate extra time' :
                     topic.priority === 'high' ? 'Priority topic - consistent practice' :
                     'Regular review sufficient'}
                  </p>
                </div>
              </div>
            </div>
            
            <Button size="sm" className="w-full" style={{ backgroundColor: subjectColor }}>
              {topic.completed ? 'Review Topic' : topic.status === 'in-progress' ? 'Continue Learning' : 'Start Learning'}
            </Button>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export const StudyPlanBreakdown: React.FC<StudyPlanBreakdownProps> = ({
  subjects,
  examDate,
  examName,
  weeklyHours
}) => {
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());
  
  const toggleSubject = (subjectId: string) => {
    const newExpanded = new Set(expandedSubjects);
    if (newExpanded.has(subjectId)) {
      newExpanded.delete(subjectId);
    } else {
      newExpanded.add(subjectId);
    }
    setExpandedSubjects(newExpanded);
  };

  const getSubjectProgress = (subject: StudyPlanSubject) => {
    const completed = subject.topics.filter(topic => topic.completed).length;
    return Math.round((completed / subject.topics.length) * 100);
  };

  const getWeightageProgress = (subject: StudyPlanSubject) => {
    const completedWeightage = subject.topics
      .filter(topic => topic.completed)
      .reduce((acc, topic) => acc + (topic.weightage || 0), 0);
    const totalWeightage = subject.topics.reduce((acc, topic) => acc + (topic.weightage || 0), 0);
    return Math.round((completedWeightage / totalWeightage) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Weightage Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            Exam Weightage Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subjects.map((subject) => (
              <div key={subject.id} className="text-center p-4 border rounded-lg">
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: subject.color }}
                >
                  {subject.weightage}%
                </div>
                <h4 className="font-medium">{subject.name}</h4>
                <p className="text-sm text-gray-600">{subject.topics.length} topics</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject-wise Breakdown */}
      {subjects.map((subject) => {
        const progress = getSubjectProgress(subject);
        const weightageProgress = getWeightageProgress(subject);
        const isExpanded = expandedSubjects.has(subject.id);
        
        return (
          <Card key={subject.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: subject.color }}
                  />
                  <div>
                    <CardTitle className="text-xl">{subject.name}</CardTitle>
                    <div className="flex items-center gap-4 mt-1">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {subject.proficiency} proficiency
                      </Badge>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        {subject.priority} priority
                      </Badge>
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        {subject.hoursPerWeek}h/week
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSubject(subject.id)}
                  className="flex items-center gap-2"
                >
                  {isExpanded ? (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Collapse
                    </>
                  ) : (
                    <>
                      <ChevronRight className="h-4 w-4" />
                      Expand Topics
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Progress Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Topic Progress</span>
                    <span className="text-sm text-gray-600">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">
                    {subject.topics.filter(t => t.completed).length} of {subject.topics.length} topics completed
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Weightage Coverage</span>
                    <span className="text-sm text-gray-600">{weightageProgress}%</span>
                  </div>
                  <Progress value={weightageProgress} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">
                    High-weightage topics mastery
                  </p>
                </div>
              </div>

              {/* Topic Analysis Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Topic Analysis
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-red-600">High Priority:</span>
                    <p>{subject.topics.filter(t => t.priority === 'high').length} topics</p>
                  </div>
                  <div>
                    <span className="font-medium text-amber-600">Medium Priority:</span>
                    <p>{subject.topics.filter(t => t.priority === 'medium').length} topics</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-600">Low Priority:</span>
                    <p>{subject.topics.filter(t => t.priority === 'low').length} topics</p>
                  </div>
                </div>
              </div>
              
              {/* Expanded Topic Details */}
              {isExpanded && (
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Topic-wise Breakdown
                  </h4>
                  {subject.topics.map((topic) => (
                    <TopicDetail 
                      key={topic.id} 
                      topic={topic} 
                      subjectColor={subject.color}
                    />
                  ))}
                </div>
              )}
              
              {/* Quick Actions */}
              {!isExpanded && (
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    style={{ backgroundColor: subject.color }}
                    className="text-white"
                  >
                    Continue {subject.name}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleSubject(subject.id)}
                  >
                    View All Topics
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
