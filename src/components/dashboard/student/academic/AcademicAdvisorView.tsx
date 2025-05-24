
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAcademicPlans } from './hooks/useAcademicPlans';
import { StudyPlanSubject, StudyPlanTopic } from '@/types/user/studyPlan';
import { 
  Brain, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Calendar,
  Clock,
  Award,
  AlertCircle
} from 'lucide-react';

const AcademicAdvisorView: React.FC = () => {
  const { jeeSubjects, neetSubjects, loading, updateSubjectProgress } = useAcademicPlans();
  const [activeExam, setActiveExam] = useState<'JEE' | 'NEET'>('JEE');

  // Mock JEE subjects with proper topic structure
  const mockJeeSubjects: StudyPlanSubject[] = [
    {
      id: 'jee-physics',
      name: 'Physics',
      difficulty: 'medium',
      completed: false,
      status: 'in-progress',
      priority: 'high',
      proficiency: 'medium',
      hoursPerWeek: 8,
      chaptersTotal: 15,
      chaptersCompleted: 8,
      estimatedHours: 120,
      actualHours: 64,
      topics: [
        { id: 'mechanics', name: 'Mechanics', completed: true },
        { id: 'thermodynamics', name: 'Thermodynamics', completed: false },
        { id: 'electromagnetism', name: 'Electromagnetism', completed: false },
        { id: 'optics', name: 'Optics', completed: true }
      ]
    },
    {
      id: 'jee-chemistry',
      name: 'Chemistry',
      difficulty: 'medium',
      completed: false,
      status: 'in-progress',
      priority: 'medium',
      proficiency: 'weak',
      hoursPerWeek: 6,
      chaptersTotal: 12,
      chaptersCompleted: 5,
      estimatedHours: 96,
      actualHours: 42,
      topics: [
        { id: 'physical-chemistry', name: 'Physical Chemistry', completed: false },
        { id: 'organic-chemistry', name: 'Organic Chemistry', completed: true },
        { id: 'inorganic-chemistry', name: 'Inorganic Chemistry', completed: false }
      ]
    },
    {
      id: 'jee-mathematics',
      name: 'Mathematics',
      difficulty: 'hard',
      completed: false,
      status: 'pending',
      priority: 'high',
      proficiency: 'strong',
      hoursPerWeek: 10,
      chaptersTotal: 18,
      chaptersCompleted: 12,
      estimatedHours: 144,
      actualHours: 96,
      topics: [
        { id: 'algebra', name: 'Algebra', completed: true },
        { id: 'calculus', name: 'Calculus', completed: false },
        { id: 'coordinate-geometry', name: 'Coordinate Geometry', completed: true },
        { id: 'trigonometry', name: 'Trigonometry', completed: false }
      ]
    }
  ];

  // Mock NEET subjects with proper topic structure
  const mockNeetSubjects: StudyPlanSubject[] = [
    {
      id: 'neet-physics',
      name: 'Physics',
      difficulty: 'medium',
      completed: true,
      status: 'completed',
      priority: 'medium',
      proficiency: 'weak',
      hoursPerWeek: 6,
      chaptersTotal: 12,
      chaptersCompleted: 12,
      estimatedHours: 72,
      actualHours: 78,
      topics: [
        { id: 'mechanics', name: 'Mechanics', completed: true },
        { id: 'thermodynamics', name: 'Thermodynamics', completed: true },
        { id: 'waves', name: 'Waves', completed: true }
      ]
    },
    {
      id: 'neet-chemistry',
      name: 'Chemistry',
      difficulty: 'easy',
      completed: true,
      status: 'completed',
      priority: 'low',
      proficiency: 'weak',
      hoursPerWeek: 5,
      chaptersTotal: 10,
      chaptersCompleted: 10,
      estimatedHours: 60,
      actualHours: 65,
      topics: [
        { id: 'physical-chemistry', name: 'Physical Chemistry', completed: true },
        { id: 'organic-chemistry', name: 'Organic Chemistry', completed: true }
      ]
    },
    {
      id: 'neet-biology',
      name: 'Biology',
      difficulty: 'medium',
      completed: true,
      status: 'completed',
      priority: 'high',
      proficiency: 'medium',
      hoursPerWeek: 8,
      chaptersTotal: 16,
      chaptersCompleted: 16,
      estimatedHours: 96,
      actualHours: 88,
      topics: [
        { id: 'botany', name: 'Botany', completed: true },
        { id: 'zoology', name: 'Zoology', completed: true },
        { id: 'human-physiology', name: 'Human Physiology', completed: true }
      ]
    }
  ];

  const currentSubjects = activeExam === 'JEE' ? mockJeeSubjects : mockNeetSubjects;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3">Loading academic plans...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Academic Advisor
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            AI-powered academic guidance and study plan management
          </p>
        </CardHeader>
      </Card>

      {/* Exam Type Selector */}
      <div className="flex gap-2">
        <Button 
          variant={activeExam === 'JEE' ? 'default' : 'outline'}
          onClick={() => setActiveExam('JEE')}
        >
          JEE Plan
        </Button>
        <Button 
          variant={activeExam === 'NEET' ? 'default' : 'outline'}
          onClick={() => setActiveExam('NEET')}
        >
          NEET Plan
        </Button>
      </div>

      {/* Subjects Overview */}
      <div className="grid gap-4">
        {currentSubjects.map((subject) => (
          <Card key={subject.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium">{subject.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {subject.chaptersCompleted}/{subject.chaptersTotal} chapters completed
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(subject.status)}>
                    {subject.status}
                  </Badge>
                  <Badge className={getPriorityColor(subject.priority)}>
                    {subject.priority} priority
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round((subject.chaptersCompleted / subject.chaptersTotal) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(subject.chaptersCompleted / subject.chaptersTotal) * 100} 
                    className="h-2"
                  />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">{subject.hoursPerWeek}h</div>
                    <div className="text-xs text-muted-foreground">Per Week</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{subject.actualHours}h</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-600">{subject.proficiency}</div>
                    <div className="text-xs text-muted-foreground">Proficiency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-orange-600">{subject.difficulty}</div>
                    <div className="text-xs text-muted-foreground">Difficulty</div>
                  </div>
                </div>

                {/* Topics */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {subject.topics.map((topic, index) => {
                      const topicObj = typeof topic === 'string' 
                        ? { id: `topic-${index}`, name: topic, completed: false }
                        : topic;
                      
                      return (
                        <Badge 
                          key={topicObj.id} 
                          variant={topicObj.completed ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {topicObj.name}
                          {topicObj.completed && ' ✓'}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Focus Area</p>
                <p className="text-sm text-muted-foreground">
                  Spend more time on Chemistry - Organic reactions need attention
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <Award className="h-4 w-4 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Strength</p>
                <p className="text-sm text-muted-foreground">
                  Mathematics progress is excellent - maintain the momentum
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicAdvisorView;
