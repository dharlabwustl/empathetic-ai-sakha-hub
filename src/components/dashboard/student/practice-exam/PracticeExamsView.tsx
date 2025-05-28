import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Clock, Target, BookOpen, Play, ChevronDown, ChevronRight, TrendingUp, Brain, Star, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SharedPageLayout } from '../SharedPageLayout';

// Enhanced practice exam data structure
const practiceExamSubjects = [
  {
    id: '1',
    name: 'Physics',
    color: '#3B82F6',
    totalExams: 25,
    completedExams: 18,
    averageScore: 78,
    totalWeightage: 35,
    priority: 'high',
    topics: [
      {
        id: 'p1',
        name: 'Mechanics',
        exams: 8,
        completed: 6,
        averageScore: 82,
        weightage: 12,
        priority: 'high',
        difficulty: 'medium',
        subtopics: [
          { id: 'p1s1', name: 'Newton\'s Laws', exams: 3, completed: 3, score: 85, weightage: 4 },
          { id: 'p1s2', name: 'Kinematics', exams: 3, completed: 2, score: 78, weightage: 4 },
          { id: 'p1s3', name: 'Work & Energy', exams: 2, completed: 1, score: 90, weightage: 4 }
        ]
      },
      {
        id: 'p2',
        name: 'Thermodynamics',
        exams: 10,
        completed: 7,
        averageScore: 72,
        weightage: 15,
        priority: 'medium',
        difficulty: 'hard',
        subtopics: [
          { id: 'p2s1', name: 'Laws of Thermodynamics', exams: 4, completed: 3, score: 70, weightage: 7 },
          { id: 'p2s2', name: 'Heat Engines', exams: 3, completed: 2, score: 68, weightage: 5 },
          { id: 'p2s3', name: 'Entropy', exams: 3, completed: 2, score: 80, weightage: 3 }
        ]
      },
      {
        id: 'p3',
        name: 'Optics',
        exams: 7,
        completed: 5,
        averageScore: 88,
        weightage: 8,
        priority: 'low',
        difficulty: 'easy',
        subtopics: [
          { id: 'p3s1', name: 'Reflection', exams: 2, completed: 2, score: 90, weightage: 3 },
          { id: 'p3s2', name: 'Refraction', exams: 3, completed: 2, score: 85, weightage: 3 },
          { id: 'p3s3', name: 'Wave Optics', exams: 2, completed: 1, score: 92, weightage: 2 }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Chemistry',
    color: '#10B981',
    totalExams: 22,
    completedExams: 15,
    averageScore: 75,
    totalWeightage: 30,
    priority: 'medium',
    topics: [
      {
        id: 'c1',
        name: 'Organic Chemistry',
        exams: 12,
        completed: 8,
        averageScore: 70,
        weightage: 18,
        priority: 'high',
        difficulty: 'hard',
        subtopics: [
          { id: 'c1s1', name: 'Hydrocarbons', exams: 4, completed: 3, score: 72, weightage: 6 },
          { id: 'c1s2', name: 'Functional Groups', exams: 4, completed: 3, score: 68, weightage: 7 },
          { id: 'c1s3', name: 'Reactions', exams: 4, completed: 2, score: 75, weightage: 5 }
        ]
      },
      {
        id: 'c2',
        name: 'Inorganic Chemistry',
        exams: 10,
        completed: 7,
        averageScore: 82,
        weightage: 12,
        priority: 'medium',
        difficulty: 'medium',
        subtopics: [
          { id: 'c2s1', name: 'Periodic Table', exams: 3, completed: 3, score: 85, weightage: 4 },
          { id: 'c2s2', name: 'Chemical Bonding', exams: 4, completed: 3, score: 80, weightage: 5 },
          { id: 'c2s3', name: 'Coordination Compounds', exams: 3, completed: 1, score: 78, weightage: 3 }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Mathematics',
    color: '#8B5CF6',
    totalExams: 28,
    completedExams: 22,
    averageScore: 85,
    totalWeightage: 35,
    priority: 'high',
    topics: [
      {
        id: 'm1',
        name: 'Calculus',
        exams: 15,
        completed: 12,
        averageScore: 88,
        weightage: 20,
        priority: 'high',
        difficulty: 'hard',
        subtopics: [
          { id: 'm1s1', name: 'Differentiation', exams: 5, completed: 4, score: 90, weightage: 7 },
          { id: 'm1s2', name: 'Integration', exams: 6, completed: 5, score: 85, weightage: 9 },
          { id: 'm1s3', name: 'Applications', exams: 4, completed: 3, score: 92, weightage: 4 }
        ]
      },
      {
        id: 'm2',
        name: 'Algebra',
        exams: 13,
        completed: 10,
        averageScore: 82,
        weightage: 15,
        priority: 'medium',
        difficulty: 'medium',
        subtopics: [
          { id: 'm2s1', name: 'Quadratic Equations', exams: 4, completed: 4, score: 88, weightage: 5 },
          { id: 'm2s2', name: 'Complex Numbers', exams: 5, completed: 3, score: 75, weightage: 6 },
          { id: 'm2s3', name: 'Sequences & Series', exams: 4, completed: 3, score: 85, weightage: 4 }
        ]
      }
    ]
  }
];

const ExamTopicCard = ({ subject, topic, onTopicClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const completionPercentage = topic.exams > 0 ? (topic.completed / topic.exams) * 100 : 0;
  const scorePercentage = topic.averageScore;
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <Card className="h-full border-l-4" style={{ borderLeftColor: subject.color }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }}></div>
            {topic.name}
          </CardTitle>
          <Badge variant="outline" className={getPriorityColor(topic.priority)}>
            {topic.priority} priority
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Exam Progress</span>
              <span className="font-medium">{topic.completed}/{topic.exams}</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Average Score</span>
              <span className={`font-medium ${getScoreColor(topic.averageScore)}`}>
                {topic.averageScore}%
              </span>
            </div>
            <Progress value={scorePercentage} className="h-2" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="text-sm font-medium">
                {topic.exams} exams • {topic.weightage}% weightage
              </span>
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-3 mt-4">
            {topic.subtopics?.map((subtopic) => (
              <div key={subtopic.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{subtopic.name}</span>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">
                      {subtopic.completed}/{subtopic.exams} exams
                    </div>
                    <div className={`text-xs font-medium ${getScoreColor(subtopic.score)}`}>
                      {subtopic.score}% avg
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Progress 
                    value={subtopic.exams > 0 ? (subtopic.completed / subtopic.exams) * 100 : 0} 
                    className="flex-1 h-1" 
                  />
                  <div className="text-xs text-muted-foreground">
                    {subtopic.weightage}%
                  </div>
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/dashboard/student/practice-exam/1/start`}>
            <Play className="h-4 w-4 mr-2" />
            Start Practice Exam
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const ExamPerformanceAnalysis = () => {
  const totalExams = practiceExamSubjects.reduce((sum, subject) => sum + subject.totalExams, 0);
  const completedExams = practiceExamSubjects.reduce((sum, subject) => sum + subject.completedExams, 0);
  const overallScore = practiceExamSubjects.reduce((sum, subject) => sum + (subject.averageScore * subject.completedExams), 0) / completedExams;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Exam Performance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Performance</span>
            <span className="text-lg font-bold">{Math.round(overallScore)}%</span>
          </div>
          <Progress value={overallScore} className="h-3" />
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{completedExams}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-600">{totalExams - completedExams}</div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{Math.round(overallScore)}%</div>
              <div className="text-xs text-muted-foreground">Avg Score</div>
            </div>
          </div>
          
          <div className="space-y-3 mt-6">
            <h4 className="font-medium text-sm">Subject Performance</h4>
            {practiceExamSubjects.map((subject) => (
              <div key={subject.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }}></div>
                  <span className="text-sm">{subject.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {subject.completedExams}/{subject.totalExams}
                  </span>
                  <span className="text-sm font-medium">{subject.averageScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ExamSmartSuggestions = () => {
  const suggestions = [
    {
      id: '1',
      type: 'weakness',
      title: 'Focus on Chemistry Organic',
      description: 'Your weakest area with 70% avg score. Take 2 more practice exams.',
      priority: 'high',
      estimatedTime: 120,
      subject: 'Chemistry'
    },
    {
      id: '2',
      type: 'revision',
      title: 'Physics Thermodynamics Review',
      description: 'Good progress but need consistency. Take mock test today.',
      priority: 'medium',
      estimatedTime: 90,
      subject: 'Physics'
    },
    {
      id: '3',
      type: 'strength',
      title: 'Math Calculus Excellence',
      description: 'Strong performance! Take advanced level exams for challenge.',
      priority: 'low',
      estimatedTime: 60,
      subject: 'Mathematics'
    }
  ];

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'weakness': return Target;
      case 'revision': return Clock;
      case 'strength': return Star;
      default: return Brain;
    }
  };

  const getSuggestionColor = (type) => {
    switch (type) {
      case 'weakness': return 'bg-red-500';
      case 'revision': return 'bg-amber-500';
      case 'strength': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Exam Strategy Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion) => {
            const Icon = getSuggestionIcon(suggestion.type);
            const colorClass = getSuggestionColor(suggestion.type);
            
            return (
              <div key={suggestion.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${colorClass}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{suggestion.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className={`text-xs ${
                        suggestion.priority === 'high' ? 'bg-red-100 text-red-700' : 
                        suggestion.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        {suggestion.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.estimatedTime}m
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

const PracticeExamsView = () => {
  return (
    <SharedPageLayout
      title="Practice Exams"
      subtitle="Master exam patterns with comprehensive practice tests"
    >
      <div className="space-y-6">
        <Tabs defaultValue="topic-breakdown" className="w-full">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="topic-breakdown">Topic Breakdown</TabsTrigger>
            <TabsTrigger value="performance-analysis">Performance Analysis</TabsTrigger>
            <TabsTrigger value="smart-suggestions">Smart Suggestions</TabsTrigger>
            <TabsTrigger value="all-exams">All Exams</TabsTrigger>
          </TabsList>
          
          <TabsContent value="topic-breakdown" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {practiceExamSubjects.map((subject) => (
                <div key={subject.id} className="space-y-4">
                  {subject.topics.map((topic) => (
                    <ExamTopicCard 
                      key={topic.id}
                      subject={subject}
                      topic={topic}
                      onTopicClick={(topicId) => console.log('Topic clicked:', topicId)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="performance-analysis" className="mt-4">
            <ExamPerformanceAnalysis />
          </TabsContent>
          
          <TabsContent value="smart-suggestions" className="mt-4">
            <ExamSmartSuggestions />
          </TabsContent>
          
          <TabsContent value="all-exams" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* All exams content */}
              {practiceExamSubjects.flatMap(subject => 
                subject.topics.map(topic => (
                  <Card key={`${subject.id}-${topic.id}`} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {subject.name}
                          </span>
                          <CardTitle className="text-lg mt-1">{topic.name}</CardTitle>
                        </div>
                        <Badge variant="outline" className={
                          topic.averageScore >= 80 ? 'bg-green-100 text-green-700' : 
                          topic.averageScore >= 60 ? 'bg-amber-100 text-amber-700' : 
                          'bg-red-100 text-red-700'
                        }>
                          {topic.averageScore ? `${topic.averageScore}%` : 'Not taken'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>60 min</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className={
                          topic.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                          topic.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-green-100 text-green-700'
                        }>
                          {topic.difficulty}
                        </Badge>
                        <Badge variant="outline">{topic.weightage}% weightage</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Completion</span>
                          <span className="font-medium">{topic.completed}/{topic.exams}</span>
                        </div>
                        <Progress value={(topic.completed / topic.exams) * 100} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button asChild variant="default" className="w-full">
                        <Link to={`/dashboard/student/practice-exam/${topic.id}/start`}>
                          <Play className="h-4 w-4 mr-2" />
                          {topic.completed > 0 ? 'Retake Exam' : 'Start Exam'}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default PracticeExamsView;
