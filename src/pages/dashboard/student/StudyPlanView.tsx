
import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { StudyPlanBreakdown } from '@/components/dashboard/student/study-plan/StudyPlanBreakdown';
import { Button } from '@/components/ui/button';
import { Plus, Download, Calendar, Brain, Target } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Enhanced mock data with topic weightage and detailed breakdowns
const mockStudyPlan = {
  examName: "JEE Advanced",
  examDate: "2023-12-15",
  weeklyHours: 35,
  subjects: [
    {
      id: "physics",
      name: "Physics",
      color: "#8B5CF6",
      hoursPerWeek: 12,
      priority: "high" as const,
      proficiency: "medium" as const,
      weightage: 35, // Exam weightage percentage
      topics: [
        { 
          id: "p1", 
          name: "Mechanics", 
          difficulty: "medium" as const, 
          completed: true, 
          status: "completed" as const,
          weightage: 25,
          subTopics: ["Kinematics", "Dynamics", "Work & Energy", "Rotational Motion"],
          estimatedHours: 8,
          priority: "high" as const
        },
        { 
          id: "p2", 
          name: "Thermodynamics", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "in-progress" as const,
          weightage: 15,
          subTopics: ["Laws of Thermodynamics", "Heat Engines", "Entropy"],
          estimatedHours: 6,
          priority: "medium" as const
        },
        { 
          id: "p3", 
          name: "Electromagnetism", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          weightage: 30,
          subTopics: ["Electric Fields", "Magnetic Fields", "Electromagnetic Induction", "AC Circuits"],
          estimatedHours: 12,
          priority: "high" as const
        },
        { 
          id: "p4", 
          name: "Modern Physics", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          weightage: 20,
          subTopics: ["Quantum Mechanics", "Atomic Structure", "Nuclear Physics"],
          estimatedHours: 10,
          priority: "medium" as const
        },
        { 
          id: "p5", 
          name: "Optics", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "pending" as const,
          weightage: 10,
          subTopics: ["Geometric Optics", "Wave Optics", "Optical Instruments"],
          estimatedHours: 5,
          priority: "low" as const
        },
      ]
    },
    {
      id: "chemistry",
      name: "Chemistry",
      color: "#10B981",
      hoursPerWeek: 10,
      priority: "medium" as const,
      proficiency: "weak" as const,
      weightage: 30,
      topics: [
        { 
          id: "c1", 
          name: "Physical Chemistry", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "in-progress" as const,
          weightage: 40,
          subTopics: ["Chemical Kinetics", "Equilibrium", "Electrochemistry", "Solutions"],
          estimatedHours: 10,
          priority: "high" as const
        },
        { 
          id: "c2", 
          name: "Organic Chemistry", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          weightage: 35,
          subTopics: ["Hydrocarbons", "Functional Groups", "Biomolecules", "Polymers"],
          estimatedHours: 12,
          priority: "high" as const
        },
        { 
          id: "c3", 
          name: "Inorganic Chemistry", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "pending" as const,
          weightage: 25,
          subTopics: ["Periodic Table", "Chemical Bonding", "Coordination Compounds", "Metallurgy"],
          estimatedHours: 8,
          priority: "medium" as const
        },
      ]
    },
    {
      id: "mathematics",
      name: "Mathematics",
      color: "#F59E0B",
      hoursPerWeek: 13,
      priority: "high" as const,
      proficiency: "strong" as const,
      weightage: 35,
      topics: [
        { 
          id: "m1", 
          name: "Calculus", 
          difficulty: "medium" as const, 
          completed: true, 
          status: "completed" as const,
          weightage: 30,
          subTopics: ["Limits", "Derivatives", "Integrals", "Differential Equations"],
          estimatedHours: 15,
          priority: "high" as const
        },
        { 
          id: "m2", 
          name: "Algebra", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "in-progress" as const,
          weightage: 25,
          subTopics: ["Complex Numbers", "Quadratic Equations", "Sequences & Series", "Permutations"],
          estimatedHours: 12,
          priority: "high" as const
        },
        { 
          id: "m3", 
          name: "Coordinate Geometry", 
          difficulty: "easy" as const, 
          completed: true, 
          status: "completed" as const,
          weightage: 20,
          subTopics: ["Straight Lines", "Circles", "Parabola", "Ellipse", "Hyperbola"],
          estimatedHours: 10,
          priority: "medium" as const
        },
        { 
          id: "m4", 
          name: "Trigonometry", 
          difficulty: "easy" as const, 
          completed: false, 
          status: "pending" as const,
          weightage: 15,
          subTopics: ["Trigonometric Functions", "Identities", "Inverse Functions", "Heights & Distances"],
          estimatedHours: 8,
          priority: "medium" as const
        },
        { 
          id: "m5", 
          name: "Vectors", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          weightage: 10,
          subTopics: ["Vector Algebra", "Scalar & Vector Products", "3D Geometry"],
          estimatedHours: 6,
          priority: "low" as const
        },
      ]
    }
  ]
};

// Daily Smart Suggestions Component
const DailySmartSuggestions = () => {
  const suggestions = [
    {
      type: "priority",
      title: "Focus on Electromagnetism Today",
      description: "High weightage topic (30%) in Physics. Spend 2 hours on Electric Fields.",
      icon: <Target className="h-5 w-5 text-red-500" />,
      urgency: "high"
    },
    {
      type: "review",
      title: "Quick Review: Calculus",
      description: "Reinforce completed topics to maintain retention. 30 min review recommended.",
      icon: <Brain className="h-5 w-5 text-blue-500" />,
      urgency: "medium"
    },
    {
      type: "strategy",
      title: "Weak Subject Alert",
      description: "Chemistry proficiency is weak. Consider extra 1 hour practice today.",
      icon: <Plus className="h-5 w-5 text-amber-500" />,
      urgency: "medium"
    }
  ];

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          Daily Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                suggestion.urgency === 'high' 
                  ? 'border-red-500 bg-red-50' 
                  : suggestion.urgency === 'medium'
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-blue-500 bg-blue-50'
              }`}
            >
              <div className="flex items-start gap-3">
                {suggestion.icon}
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{suggestion.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                </div>
                <Badge 
                  variant={suggestion.urgency === 'high' ? 'destructive' : 'outline'}
                  className="text-xs"
                >
                  {suggestion.urgency}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const StudyPlanView = () => {
  const [studyPlan, setStudyPlan] = useState<{
    examName: string;
    examDate: string;
    weeklyHours: number;
    subjects: StudyPlanSubject[];
  }>(mockStudyPlan);
  
  // Calculate overall statistics
  const totalTopics = studyPlan.subjects.reduce((acc, subject) => acc + subject.topics.length, 0);
  const completedTopics = studyPlan.subjects.reduce((acc, subject) => 
    acc + subject.topics.filter(topic => topic.completed).length, 0
  );
  const overallProgress = Math.round((completedTopics / totalTopics) * 100);
  
  // In a real implementation, you would fetch the study plan from an API or context
  useEffect(() => {
    // Simulate fetching data
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData && parsedData.examPreparation) {
          setStudyPlan(prev => ({
            ...prev, 
            examName: parsedData.examPreparation || mockStudyPlan.examName
          }));
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <SharedPageLayout 
      title="Study Plan" 
      subtitle="Your personalized exam preparation roadmap with topic-wise mastery tracking"
      backButtonUrl="/dashboard/student"
      showBackButton={true}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Sync Calendar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Plan
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Update Plan
          </Button>
        </div>
      }
    >
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Exam Goal</h3>
            <p className="text-lg font-semibold">{studyPlan.examName}</p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Exam Date</h3>
            <p className="text-lg font-semibold">{new Date(studyPlan.examDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Weekly Study Hours</h3>
            <p className="text-lg font-semibold">{studyPlan.weeklyHours} hours</p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Overall Progress</h3>
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold">{overallProgress}%</p>
              <Progress value={overallProgress} className="flex-1 h-2" />
            </div>
          </div>
        </div>
      </div>
      
      <StudyPlanBreakdown 
        subjects={studyPlan.subjects}
        examDate={studyPlan.examDate}
        examName={studyPlan.examName}
        weeklyHours={studyPlan.weeklyHours}
      />
      
      {/* Daily Smart Suggestions */}
      <DailySmartSuggestions />
    </SharedPageLayout>
  );
};

export default StudyPlanView;
