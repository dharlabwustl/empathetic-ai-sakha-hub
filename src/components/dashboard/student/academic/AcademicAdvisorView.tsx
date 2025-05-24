
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  TrendingUp, 
  Calendar, 
  Target,
  Clock,
  BookOpen,
  Brain,
  Award
} from 'lucide-react';
import { StudyPlan, StudyPlanSubject } from "@/types/user/studyPlan";
import CreateStudyPlanWizard from './CreateStudyPlanWizard';

const AcademicAdvisorView = () => {
  const [showCreatePlan, setShowCreatePlan] = useState(false);

  // Mock current study plan with proper types
  const currentPlan: StudyPlan = {
    id: "plan-1",
    name: "NEET 2025 Preparation",
    description: "Comprehensive NEET preparation plan",
    examGoal: "NEET",
    examDate: "2025-05-05",
    difficulty: "intermediate",
    status: "active",
    progress: 65,
    startDate: "2024-01-01",
    endDate: "2025-05-01",
    totalHours: 1200,
    completedHours: 780,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
    isCustom: false,
    subjects: [
      {
        id: "subj-1",
        name: "Biology",
        topics: ["Cell Biology", "Genetics", "Ecology"],
        hours: 400,
        difficulty: "medium",
        completed: false,
        status: "in-progress",
        priority: "high",
        progress: 70,
        proficiency: "medium",
        hoursPerWeek: 12
      },
      {
        id: "subj-2",
        name: "Chemistry", 
        topics: ["Organic", "Inorganic", "Physical"],
        hours: 350,
        difficulty: "easy",
        completed: false,
        status: "pending",
        priority: "medium",
        progress: 45,
        proficiency: "strong",
        hoursPerWeek: 10
      },
      {
        id: "subj-3",
        name: "Physics",
        topics: ["Mechanics", "Thermodynamics", "Optics"],
        hours: 450,
        difficulty: "hard",
        completed: false,
        status: "completed",
        priority: "high",
        progress: 80,
        proficiency: "weak",
        hoursPerWeek: 14
      }
    ]
  };

  // Mock recommended study plans
  const recommendedPlans: StudyPlan[] = [
    {
      id: "rec-1",
      name: "Intensive NEET Crash Course",
      description: "6-month intensive preparation",
      examGoal: "NEET",
      examDate: "2025-05-05",
      difficulty: "advanced",
      status: "pending",
      progress: 0,
      startDate: "2024-02-01",
      endDate: "2024-08-01",
      totalHours: 800,
      completedHours: 0,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
      isCustom: false,
      subjects: [
        {
          id: "subj-4",
          name: "Biology",
          topics: ["Advanced Topics"],
          hours: 300,
          difficulty: "hard",
          completed: false,
          status: "pending",
          priority: "high",
          progress: 0,
          proficiency: "weak",
          hoursPerWeek: 15
        },
        {
          id: "subj-5",
          name: "Chemistry",
          topics: ["Advanced Topics"],
          hours: 250,
          difficulty: "medium",
          completed: false,
          status: "in-progress",
          priority: "medium",
          progress: 0,
          proficiency: "medium",
          hoursPerWeek: 12
        },
        {
          id: "subj-6",
          name: "Physics",
          topics: ["Advanced Topics"],
          hours: 250,
          difficulty: "hard",
          completed: false,
          status: "pending",
          priority: "low",
          progress: 0,
          proficiency: "weak",
          hoursPerWeek: 10
        }
      ]
    }
  ];

  // Mock past completed plans
  const completedPlans: StudyPlan[] = [
    {
      id: "comp-1",
      name: "Foundation Course",
      description: "Basic foundation building",
      examGoal: "NEET Foundation",
      examDate: "2024-03-15",
      difficulty: "beginner",
      status: "completed",
      progress: 100,
      startDate: "2023-06-01",
      endDate: "2024-03-01",
      totalHours: 400,
      completedHours: 400,
      createdAt: "2023-06-01",
      updatedAt: "2024-03-01",
      isCustom: false,
      subjects: [
        {
          id: "subj-7",
          name: "Biology Basics",
          topics: ["Basic Topics"],
          hours: 150,
          difficulty: "medium",
          completed: true,
          status: "completed",
          priority: "high",
          progress: 100,
          proficiency: "strong",
          hoursPerWeek: 8
        },
        {
          id: "subj-8",
          name: "Chemistry Basics",
          topics: ["Basic Topics"],
          hours: 125,
          difficulty: "easy",
          completed: true,
          status: "completed",
          priority: "high",
          progress: 100,
          proficiency: "strong",
          hoursPerWeek: 6
        },
        {
          id: "subj-9",
          name: "Physics Basics",
          topics: ["Basic Topics"],
          hours: 125,
          difficulty: "hard",
          completed: true,
          status: "in-progress",
          priority: "medium",
          progress: 100,
          proficiency: "medium",
          hoursPerWeek: 6
        }
      ]
    }
  ];

  const handleCreatePlan = () => {
    setShowCreatePlan(true);
  };

  const getSubjectStatusColor = (subject: StudyPlanSubject) => {
    if (subject.status === 'completed') return 'bg-green-500';
    if (subject.status === 'in-progress') return 'bg-blue-500';
    return 'bg-gray-300';
  };

  const activeRecommendations = recommendedPlans.filter(plan => plan.status !== 'pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <GraduationCap className="h-8 w-8" />
            Academic Advisor
          </h1>
          <p className="text-muted-foreground mt-2">
            Your personalized study guidance and plan recommendations
          </p>
        </div>
        <Button onClick={handleCreatePlan}>
          <Target className="mr-2 h-4 w-4" />
          Create New Plan
        </Button>
      </div>

      {/* Current Study Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Current Study Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{currentPlan.name}</h3>
                <p className="text-muted-foreground">{currentPlan.description}</p>
              </div>
              <Badge variant="default">{currentPlan.status}</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{currentPlan.progress}%</div>
                <div className="text-sm text-muted-foreground">Overall Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentPlan.completedHours}h</div>
                <div className="text-sm text-muted-foreground">Hours Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentPlan.subjects.length}</div>
                <div className="text-sm text-muted-foreground">Subjects</div>
              </div>
            </div>
            
            <Progress value={currentPlan.progress} className="h-2" />
            
            <div className="space-y-2">
              <h4 className="font-medium">Subject Progress</h4>
              {currentPlan.subjects.map((subject) => (
                <div key={subject.id} className="flex items-center justify-between p-2 bg-muted rounded">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getSubjectStatusColor(subject)}`} />
                    <span className="font-medium">{subject.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{subject.progress}%</span>
                    <Badge variant="outline">{subject.proficiency}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Study Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">+15%</div>
                <div className="text-sm text-muted-foreground">Performance This Week</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">4.2h</div>
                <div className="text-sm text-muted-foreground">Avg Daily Study</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">89%</div>
                <div className="text-sm text-muted-foreground">Retention Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Study Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Study Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendedPlans.map((plan) => (
              <div key={plan.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{plan.name}</h4>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span>Duration: {plan.totalHours}h</span>
                      <span>Difficulty: {plan.difficulty}</span>
                      <Badge variant="outline">{plan.subjects.length} subjects</Badge>
                    </div>
                  </div>
                  <Button variant="outline">Adopt Plan</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completed Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Completed Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedPlans.map((plan) => (
              <div key={plan.id} className="p-4 border rounded-lg bg-green-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{plan.name}</h4>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span>Completed: {plan.completedHours}h</span>
                      <Badge variant="default">Completed</Badge>
                    </div>
                  </div>
                  <Award className="h-8 w-8 text-yellow-500" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Study Plan Wizard */}
      {showCreatePlan && (
        <CreateStudyPlanWizard onClose={() => setShowCreatePlan(false)} />
      )}
    </div>
  );
};

export default AcademicAdvisorView;
