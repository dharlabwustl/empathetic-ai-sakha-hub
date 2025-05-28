
import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { StudyPlanBreakdown } from '@/components/dashboard/student/study-plan/StudyPlanBreakdown';
import { Button } from '@/components/ui/button';
import { Plus, Download, Calendar } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

// Enhanced mock data with comprehensive topic breakdowns and weightage
const mockStudyPlan = {
  examName: "JEE Advanced",
  examDate: "2024-06-15",
  weeklyHours: 35,
  subjects: [
    {
      id: "physics",
      name: "Physics",
      color: "#8B5CF6",
      hoursPerWeek: 12,
      priority: "high" as const,
      proficiency: "medium" as const,
      totalWeightage: 33,
      completedWeightage: 22,
      examImportance: 33,
      completed: false,
      aiSuggestions: [
        "Focus on Mechanics and Thermodynamics this week - they carry 40% weightage in JEE Advanced",
        "Complete practice problems on rotational motion - your weak area identified from previous tests"
      ],
      topics: [
        { 
          id: "p1", 
          name: "Mechanics", 
          difficulty: "medium" as const, 
          completed: true, 
          status: "completed" as const,
          priority: "high" as const,
          weightage: 12,
          estimatedHours: 8,
          masteryLevel: 85,
          subtopics: [
            { id: "p1s1", name: "Kinematics", completed: true, weightage: 4, difficulty: "easy" as const, estimatedTime: 120 },
            { id: "p1s2", name: "Newton's Laws", completed: true, weightage: 4, difficulty: "medium" as const, estimatedTime: 180 },
            { id: "p1s3", name: "Work & Energy", completed: false, weightage: 4, difficulty: "hard" as const, estimatedTime: 240 }
          ]
        },
        { 
          id: "p2", 
          name: "Thermodynamics", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "in-progress" as const,
          priority: "high" as const,
          weightage: 10,
          estimatedHours: 6,
          masteryLevel: 45,
          subtopics: [
            { id: "p2s1", name: "First Law", completed: true, weightage: 3, difficulty: "medium" as const, estimatedTime: 150 },
            { id: "p2s2", name: "Second Law", completed: false, weightage: 4, difficulty: "hard" as const, estimatedTime: 200 },
            { id: "p2s3", name: "Heat Engines", completed: false, weightage: 3, difficulty: "hard" as const, estimatedTime: 180 }
          ]
        },
        { 
          id: "p3", 
          name: "Electromagnetism", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "medium" as const,
          weightage: 8,
          estimatedHours: 10,
          masteryLevel: 20,
          subtopics: [
            { id: "p3s1", name: "Electric Field", completed: false, weightage: 3, difficulty: "medium" as const, estimatedTime: 200 },
            { id: "p3s2", name: "Magnetic Field", completed: false, weightage: 3, difficulty: "hard" as const, estimatedTime: 240 },
            { id: "p3s3", name: "Electromagnetic Induction", completed: false, weightage: 2, difficulty: "hard" as const, estimatedTime: 180 }
          ]
        },
        { 
          id: "p4", 
          name: "Modern Physics", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "low" as const,
          weightage: 3,
          estimatedHours: 4,
          masteryLevel: 0
        }
      ]
    },
    {
      id: "chemistry",
      name: "Chemistry",
      color: "#10B981",
      hoursPerWeek: 10,
      priority: "medium" as const,
      proficiency: "weak" as const,
      totalWeightage: 33,
      completedWeightage: 15,
      examImportance: 33,
      completed: false,
      aiSuggestions: [
        "Organic Chemistry needs immediate attention - 45% of Chemistry weightage but only 30% complete",
        "Schedule daily 2-hour sessions for reaction mechanisms - your biggest challenge area"
      ],
      topics: [
        { 
          id: "c1", 
          name: "Physical Chemistry", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "in-progress" as const,
          priority: "high" as const,
          weightage: 15,
          estimatedHours: 8,
          masteryLevel: 60,
          subtopics: [
            { id: "c1s1", name: "Chemical Equilibrium", completed: true, weightage: 5, difficulty: "medium" as const, estimatedTime: 180 },
            { id: "c1s2", name: "Electrochemistry", completed: false, weightage: 5, difficulty: "hard" as const, estimatedTime: 240 },
            { id: "c1s3", name: "Chemical Kinetics", completed: false, weightage: 5, difficulty: "hard" as const, estimatedTime: 200 }
          ]
        },
        { 
          id: "c2", 
          name: "Organic Chemistry", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "high" as const,
          weightage: 15,
          estimatedHours: 12,
          masteryLevel: 25,
          subtopics: [
            { id: "c2s1", name: "Hydrocarbons", completed: false, weightage: 5, difficulty: "medium" as const, estimatedTime: 300 },
            { id: "c2s2", name: "Functional Groups", completed: false, weightage: 5, difficulty: "hard" as const, estimatedTime: 360 },
            { id: "c2s3", name: "Reaction Mechanisms", completed: false, weightage: 5, difficulty: "hard" as const, estimatedTime: 400 }
          ]
        },
        { 
          id: "c3", 
          name: "Inorganic Chemistry", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "medium" as const,
          weightage: 3,
          estimatedHours: 6,
          masteryLevel: 40
        }
      ]
    },
    {
      id: "mathematics",
      name: "Mathematics",
      color: "#F59E0B",
      hoursPerWeek: 13,
      priority: "high" as const,
      proficiency: "strong" as const,
      totalWeightage: 34,
      completedWeightage: 25,
      examImportance: 34,
      completed: false,
      aiSuggestions: [
        "Excellent progress in Mathematics! Focus on Coordinate Geometry for the final 15% boost",
        "Your strong subject - use it to build confidence before tackling weaker areas"
      ],
      topics: [
        { 
          id: "m1", 
          name: "Calculus", 
          difficulty: "medium" as const, 
          completed: true, 
          status: "completed" as const,
          priority: "high" as const,
          weightage: 12,
          estimatedHours: 6,
          masteryLevel: 90,
          subtopics: [
            { id: "m1s1", name: "Limits", completed: true, weightage: 3, difficulty: "easy" as const, estimatedTime: 120 },
            { id: "m1s2", name: "Derivatives", completed: true, weightage: 5, difficulty: "medium" as const, estimatedTime: 180 },
            { id: "m1s3", name: "Integrals", completed: true, weightage: 4, difficulty: "medium" as const, estimatedTime: 200 }
          ]
        },
        { 
          id: "m2", 
          name: "Algebra", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "in-progress" as const,
          priority: "high" as const,
          weightage: 10,
          estimatedHours: 5,
          masteryLevel: 70,
          subtopics: [
            { id: "m2s1", name: "Quadratic Equations", completed: true, weightage: 4, difficulty: "easy" as const, estimatedTime: 150 },
            { id: "m2s2", name: "Complex Numbers", completed: false, weightage: 3, difficulty: "medium" as const, estimatedTime: 180 },
            { id: "m2s3", name: "Sequences & Series", completed: false, weightage: 3, difficulty: "hard" as const, estimatedTime: 200 }
          ]
        },
        { 
          id: "m3", 
          name: "Coordinate Geometry", 
          difficulty: "easy" as const, 
          completed: true, 
          status: "completed" as const,
          priority: "medium" as const,
          weightage: 8,
          estimatedHours: 4,
          masteryLevel: 95
        },
        { 
          id: "m4", 
          name: "Trigonometry", 
          difficulty: "easy" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "low" as const,
          weightage: 4,
          estimatedHours: 3,
          masteryLevel: 50
        }
      ]
    }
  ]
};

const StudyPlanView = () => {
  const [studyPlan, setStudyPlan] = useState<{
    examName: string;
    examDate: string;
    weeklyHours: number;
    subjects: StudyPlanSubject[];
  }>(mockStudyPlan);
  
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
      subtitle="Your personalized exam preparation roadmap with comprehensive topic analysis"
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
            <p className="text-lg font-semibold">
              {Math.round(
                (studyPlan.subjects.reduce((sum, s) => sum + s.completedWeightage, 0) / 
                 studyPlan.subjects.reduce((sum, s) => sum + s.totalWeightage, 0)) * 100
              )}%
            </p>
          </div>
        </div>
      </div>
      
      <StudyPlanBreakdown 
        subjects={studyPlan.subjects}
        examDate={studyPlan.examDate}
        examName={studyPlan.examName}
        weeklyHours={studyPlan.weeklyHours}
      />
    </SharedPageLayout>
  );
};

export default StudyPlanView;
