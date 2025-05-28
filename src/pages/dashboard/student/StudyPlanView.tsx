
import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { StudyPlanBreakdown } from '@/components/dashboard/student/study-plan/StudyPlanBreakdown';
import { Button } from '@/components/ui/button';
import { Plus, Download, Calendar } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

// Enhanced mock data with weightage and priority information
const mockStudyPlan = {
  examName: "JEE Advanced",
  examDate: "2023-12-15",
  weeklyHours: 35,
  studyHoursPerDay: 5,
  subjects: [
    {
      id: "physics",
      name: "Physics",
      color: "#8B5CF6",
      hoursPerWeek: 12,
      priority: "high" as const,
      proficiency: "medium" as const,
      completed: false,
      weightage: 35,
      totalWeightageCompleted: 15,
      topics: [
        { 
          id: "p1", 
          name: "Mechanics", 
          difficulty: "medium" as const, 
          completed: true, 
          status: "completed" as const,
          priority: "high" as const,
          weightage: 8,
          subtopics: ["Newton's Laws", "Work & Energy", "Circular Motion"],
          estimatedHours: 15
        },
        { 
          id: "p2", 
          name: "Thermodynamics", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "in-progress" as const,
          priority: "high" as const,
          weightage: 6,
          subtopics: ["Heat Transfer", "Laws of Thermodynamics", "Engines"],
          estimatedHours: 12
        },
        { 
          id: "p3", 
          name: "Electromagnetism", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "high" as const,
          weightage: 10,
          subtopics: ["Electric Fields", "Magnetic Fields", "Electromagnetic Induction"],
          estimatedHours: 18
        },
        { 
          id: "p4", 
          name: "Modern Physics", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "medium" as const,
          weightage: 7,
          subtopics: ["Quantum Mechanics", "Atomic Structure", "Nuclear Physics"],
          estimatedHours: 14
        },
        { 
          id: "p5", 
          name: "Optics", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "medium" as const,
          weightage: 4,
          subtopics: ["Geometric Optics", "Wave Optics", "Optical Instruments"],
          estimatedHours: 10
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
      completed: false,
      weightage: 30,
      totalWeightageCompleted: 8,
      topics: [
        { 
          id: "c1", 
          name: "Physical Chemistry", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "in-progress" as const,
          priority: "high" as const,
          weightage: 12,
          subtopics: ["Chemical Kinetics", "Thermodynamics", "Equilibrium"],
          estimatedHours: 16
        },
        { 
          id: "c2", 
          name: "Organic Chemistry", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "high" as const,
          weightage: 10,
          subtopics: ["Reaction Mechanisms", "Stereochemistry", "Biomolecules"],
          estimatedHours: 20
        },
        { 
          id: "c3", 
          name: "Inorganic Chemistry", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "medium" as const,
          weightage: 6,
          subtopics: ["Coordination Compounds", "Periodic Table", "Metals"],
          estimatedHours: 12
        },
        { 
          id: "c4", 
          name: "Analytical Chemistry", 
          difficulty: "easy" as const, 
          completed: true, 
          status: "completed" as const,
          priority: "low" as const,
          weightage: 2,
          subtopics: ["Titrations", "Spectroscopy", "Chromatography"],
          estimatedHours: 8
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
      completed: false,
      weightage: 35,
      totalWeightageCompleted: 20,
      topics: [
        { 
          id: "m1", 
          name: "Calculus", 
          difficulty: "medium" as const, 
          completed: true, 
          status: "completed" as const,
          priority: "high" as const,
          weightage: 12,
          subtopics: ["Differential Calculus", "Integral Calculus", "Applications"],
          estimatedHours: 18
        },
        { 
          id: "m2", 
          name: "Algebra", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "in-progress" as const,
          priority: "high" as const,
          weightage: 8,
          subtopics: ["Matrices", "Determinants", "Complex Numbers"],
          estimatedHours: 14
        },
        { 
          id: "m3", 
          name: "Coordinate Geometry", 
          difficulty: "easy" as const, 
          completed: true, 
          status: "completed" as const,
          priority: "medium" as const,
          weightage: 6,
          subtopics: ["Straight Lines", "Circles", "Conic Sections"],
          estimatedHours: 12
        },
        { 
          id: "m4", 
          name: "Trigonometry", 
          difficulty: "easy" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "medium" as const,
          weightage: 4,
          subtopics: ["Identities", "Equations", "Inverse Functions"],
          estimatedHours: 10
        },
        { 
          id: "m5", 
          name: "Statistics", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "low" as const,
          weightage: 3,
          subtopics: ["Probability", "Distributions", "Hypothesis Testing"],
          estimatedHours: 8
        },
        { 
          id: "m6", 
          name: "Vectors", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "medium" as const,
          weightage: 2,
          subtopics: ["Vector Operations", "Scalar Products", "Vector Products"],
          estimatedHours: 6
        },
      ]
    }
  ]
};

const StudyPlanView = () => {
  const [studyPlan, setStudyPlan] = useState<{
    examName: string;
    examDate: string;
    weeklyHours: number;
    studyHoursPerDay: number;
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
      subtitle="Your personalized exam preparation roadmap with smart insights"
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
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Daily Study Hours</h3>
            <p className="text-lg font-semibold">{studyPlan.studyHoursPerDay} hours</p>
          </div>
        </div>
      </div>
      
      <StudyPlanBreakdown 
        subjects={studyPlan.subjects}
        examDate={studyPlan.examDate}
        examName={studyPlan.examName}
        weeklyHours={studyPlan.weeklyHours}
        studyHoursPerDay={studyPlan.studyHoursPerDay}
      />
    </SharedPageLayout>
  );
};

export default StudyPlanView;
