
import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { StudyPlanBreakdown } from '@/components/dashboard/student/study-plan/StudyPlanBreakdown';
import { Button } from '@/components/ui/button';
import { Plus, Download, Calendar } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

// Enhanced mock data with weightage and subtopics
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
      topics: [
        { 
          id: "p1", 
          name: "Mechanics", 
          difficulty: "medium" as const, 
          completed: true, 
          status: "completed" as const,
          priority: "high" as const,
          weightage: 8,
          subtopics: [
            { id: "p1s1", name: "Newton's Laws", completed: true, weightage: 3 },
            { id: "p1s2", name: "Work and Energy", completed: true, weightage: 3 },
            { id: "p1s3", name: "Rotational Motion", completed: true, weightage: 2 }
          ],
          estimatedHours: 15,
          lastStudied: "2 days ago"
        },
        { 
          id: "p2", 
          name: "Thermodynamics", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "in-progress" as const,
          priority: "high" as const,
          weightage: 6,
          subtopics: [
            { id: "p2s1", name: "First Law", completed: true, weightage: 2 },
            { id: "p2s2", name: "Second Law", completed: false, weightage: 2 },
            { id: "p2s3", name: "Heat Engines", completed: false, weightage: 2 }
          ],
          estimatedHours: 12,
          lastStudied: "1 day ago"
        },
        { 
          id: "p3", 
          name: "Electromagnetism", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "high" as const,
          weightage: 10,
          subtopics: [
            { id: "p3s1", name: "Electric Fields", completed: false, weightage: 3 },
            { id: "p3s2", name: "Magnetic Fields", completed: false, weightage: 3 },
            { id: "p3s3", name: "Electromagnetic Induction", completed: false, weightage: 4 }
          ],
          estimatedHours: 20
        },
        { 
          id: "p4", 
          name: "Modern Physics", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "medium" as const,
          weightage: 6,
          subtopics: [
            { id: "p4s1", name: "Photoelectric Effect", completed: false, weightage: 2 },
            { id: "p4s2", name: "Atomic Structure", completed: false, weightage: 2 },
            { id: "p4s3", name: "Nuclear Physics", completed: false, weightage: 2 }
          ],
          estimatedHours: 15
        },
        { 
          id: "p5", 
          name: "Optics", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "low" as const,
          weightage: 3,
          subtopics: [
            { id: "p5s1", name: "Geometrical Optics", completed: false, weightage: 1.5 },
            { id: "p5s2", name: "Wave Optics", completed: false, weightage: 1.5 }
          ],
          estimatedHours: 8
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
      topics: [
        { 
          id: "c1", 
          name: "Physical Chemistry", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "in-progress" as const,
          priority: "high" as const,
          weightage: 12,
          subtopics: [
            { id: "c1s1", name: "Chemical Kinetics", completed: false, weightage: 4 },
            { id: "c1s2", name: "Thermodynamics", completed: false, weightage: 4 },
            { id: "c1s3", name: "Electrochemistry", completed: false, weightage: 4 }
          ],
          estimatedHours: 18
        },
        { 
          id: "c2", 
          name: "Organic Chemistry", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "high" as const,
          weightage: 12,
          subtopics: [
            { id: "c2s1", name: "Hydrocarbons", completed: false, weightage: 4 },
            { id: "c2s2", name: "Functional Groups", completed: false, weightage: 4 },
            { id: "c2s3", name: "Biomolecules", completed: false, weightage: 4 }
          ],
          estimatedHours: 20
        },
        { 
          id: "c3", 
          name: "Inorganic Chemistry", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "medium" as const,
          weightage: 7,
          subtopics: [
            { id: "c3s1", name: "Periodic Table", completed: false, weightage: 2 },
            { id: "c3s2", name: "Coordination Compounds", completed: false, weightage: 3 },
            { id: "c3s3", name: "Metallurgy", completed: false, weightage: 2 }
          ],
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
          subtopics: [
            { id: "c4s1", name: "Qualitative Analysis", completed: true, weightage: 1 },
            { id: "c4s2", name: "Quantitative Analysis", completed: true, weightage: 1 }
          ],
          estimatedHours: 6,
          lastStudied: "3 days ago"
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
      topics: [
        { 
          id: "m1", 
          name: "Calculus", 
          difficulty: "medium" as const, 
          completed: true, 
          status: "completed" as const,
          priority: "high" as const,
          weightage: 12,
          subtopics: [
            { id: "m1s1", name: "Limits", completed: true, weightage: 3 },
            { id: "m1s2", name: "Derivatives", completed: true, weightage: 4 },
            { id: "m1s3", name: "Integrals", completed: true, weightage: 5 }
          ],
          estimatedHours: 20,
          lastStudied: "1 day ago"
        },
        { 
          id: "m2", 
          name: "Algebra", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "in-progress" as const,
          priority: "high" as const,
          weightage: 8,
          subtopics: [
            { id: "m2s1", name: "Complex Numbers", completed: true, weightage: 3 },
            { id: "m2s2", name: "Matrices", completed: false, weightage: 3 },
            { id: "m2s3", name: "Determinants", completed: false, weightage: 2 }
          ],
          estimatedHours: 15,
          lastStudied: "2 days ago"
        },
        { 
          id: "m3", 
          name: "Coordinate Geometry", 
          difficulty: "easy" as const, 
          completed: true, 
          status: "completed" as const,
          priority: "medium" as const,
          weightage: 6,
          subtopics: [
            { id: "m3s1", name: "Straight Lines", completed: true, weightage: 2 },
            { id: "m3s2", name: "Circles", completed: true, weightage: 2 },
            { id: "m3s3", name: "Conic Sections", completed: true, weightage: 2 }
          ],
          estimatedHours: 12,
          lastStudied: "4 days ago"
        },
        { 
          id: "m4", 
          name: "Trigonometry", 
          difficulty: "easy" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "medium" as const,
          weightage: 4,
          subtopics: [
            { id: "m4s1", name: "Trigonometric Ratios", completed: false, weightage: 2 },
            { id: "m4s2", name: "Inverse Trigonometry", completed: false, weightage: 2 }
          ],
          estimatedHours: 8
        },
        { 
          id: "m5", 
          name: "Statistics", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "low" as const,
          weightage: 2,
          subtopics: [
            { id: "m5s1", name: "Probability", completed: false, weightage: 1 },
            { id: "m5s2", name: "Distributions", completed: false, weightage: 1 }
          ],
          estimatedHours: 6
        },
        { 
          id: "m6", 
          name: "Vectors", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          priority: "medium" as const,
          weightage: 2,
          subtopics: [
            { id: "m6s1", name: "Vector Operations", completed: false, weightage: 1 },
            { id: "m6s2", name: "3D Geometry", completed: false, weightage: 1 }
          ],
          estimatedHours: 10
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
      subtitle="Your personalized exam preparation roadmap with comprehensive analytics"
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
