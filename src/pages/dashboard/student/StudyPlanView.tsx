import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { StudyPlanBreakdown } from '@/components/dashboard/student/study-plan/StudyPlanBreakdown';
import { Button } from '@/components/ui/button';
import { Plus, Download, Calendar } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

// Enhanced mock data with weightage and detailed topics
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
      totalWeightage: 33,
      completedWeightage: 18,
      completed: false,
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
          subtopics: [
            { id: "p1s1", name: "Kinematics", completed: true, weightage: 4, priority: "high" as const, difficulty: "medium" as const },
            { id: "p1s2", name: "Dynamics", completed: true, weightage: 5, priority: "high" as const, difficulty: "medium" as const },
            { id: "p1s3", name: "Work & Energy", completed: true, weightage: 3, priority: "medium" as const, difficulty: "easy" as const }
          ]
        },
        { 
          id: "p2", 
          name: "Thermodynamics", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "in-progress" as const,
          priority: "medium" as const,
          weightage: 8,
          estimatedHours: 6,
          subtopics: [
            { id: "p2s1", name: "Laws of Thermodynamics", completed: false, weightage: 4, priority: "high" as const, difficulty: "hard" as const },
            { id: "p2s2", name: "Heat Engines", completed: false, weightage: 4, priority: "medium" as const, difficulty: "medium" as const }
          ]
        },
        { 
          id: "p3", 
          name: "Electromagnetism", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "high" as const,
          weightage: 10,
          estimatedHours: 10,
          subtopics: [
            { id: "p3s1", name: "Electric Fields", completed: false, weightage: 3, priority: "high" as const, difficulty: "medium" as const },
            { id: "p3s2", name: "Magnetic Fields", completed: false, weightage: 4, priority: "high" as const, difficulty: "hard" as const },
            { id: "p3s3", name: "Electromagnetic Induction", completed: false, weightage: 3, priority: "medium" as const, difficulty: "hard" as const }
          ]
        },
        { 
          id: "p4", 
          name: "Modern Physics", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "medium" as const,
          weightage: 3,
          estimatedHours: 4
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
      completedWeightage: 8,
      completed: false,
      topics: [
        { 
          id: "c1", 
          name: "Physical Chemistry", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "in-progress" as const,
          priority: "high" as const,
          weightage: 15,
          estimatedHours: 12,
          subtopics: [
            { id: "c1s1", name: "Chemical Equilibrium", completed: true, weightage: 5, priority: "high" as const, difficulty: "medium" as const },
            { id: "c1s2", name: "Electrochemistry", completed: false, weightage: 6, priority: "high" as const, difficulty: "hard" as const },
            { id: "c1s3", name: "Chemical Kinetics", completed: true, weightage: 4, priority: "medium" as const, difficulty: "medium" as const }
          ]
        },
        { 
          id: "c2", 
          name: "Organic Chemistry", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "high" as const,
          weightage: 12,
          estimatedHours: 10
        },
        { 
          id: "c3", 
          name: "Inorganic Chemistry", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "medium" as const,
          weightage: 6,
          estimatedHours: 6
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
      completedWeightage: 22,
      completed: false,
      topics: [
        { 
          id: "m1", 
          name: "Calculus", 
          difficulty: "medium" as const, 
          completed: true, 
          status: "completed" as const,
          priority: "high" as const,
          weightage: 12,
          estimatedHours: 8,
          subtopics: [
            { id: "m1s1", name: "Differential Calculus", completed: true, weightage: 6, priority: "high" as const, difficulty: "medium" as const },
            { id: "m1s2", name: "Integral Calculus", completed: true, weightage: 6, priority: "high" as const, difficulty: "medium" as const }
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
          estimatedHours: 7,
          subtopics: [
            { id: "m2s1", name: "Quadratic Equations", completed: true, weightage: 3, priority: "high" as const, difficulty: "easy" as const },
            { id: "m2s2", name: "Complex Numbers", completed: true, weightage: 4, priority: "high" as const, difficulty: "medium" as const },
            { id: "m2s3", name: "Sequences & Series", completed: false, weightage: 3, priority: "medium" as const, difficulty: "medium" as const }
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
          estimatedHours: 5
        },
        { 
          id: "m4", 
          name: "Trigonometry", 
          difficulty: "easy" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "medium" as const,
          weightage: 4,
          estimatedHours: 3
        }
      ]
    }
  ] as StudyPlanSubject[]
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
      subtitle="Your personalized exam preparation roadmap"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
