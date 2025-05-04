
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { StudyPlan, StudyPlanSubject } from "@/types/user/studyPlan";
import { UserProfileType } from "@/types/user";
import { useAcademicPlans } from './hooks/useAcademicPlans';
import CreateStudyPlanWizard from "./CreateStudyPlanWizard";
import StudyPlanSections from "./components/StudyPlanSections";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

interface AcademicAdvisorViewProps {
  userProfile: UserProfileType;
}

const AcademicAdvisorView: React.FC<AcademicAdvisorViewProps> = ({ userProfile }) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  
  // Mock study plans for demo
  const demoStudyPlans: StudyPlan[] = [
    {
      id: "plan-1",
      title: "NEET Preparation",
      examGoal: "NEET",
      examDate: new Date(2025, 4, 15).toISOString(),
      status: "active",
      subjects: [
        {
          id: "subj-1",
          name: "Physics",
          color: "#3b82f6",
          proficiency: "medium",
          priority: "high",
          hoursPerWeek: 6,
          completed: false,
          topics: [
            { id: "mech-1", name: "Mechanics", status: "in-progress", priority: "high", difficulty: "medium", completed: false },
            { id: "thermo-1", name: "Thermodynamics", status: "pending", priority: "medium", difficulty: "hard", completed: false },
            { id: "electro-1", name: "Electrostatics", status: "completed", priority: "high", difficulty: "medium", completed: true }
          ]
        },
        {
          id: "subj-2",
          name: "Chemistry",
          color: "#10b981",
          proficiency: "weak",
          priority: "medium",
          hoursPerWeek: 4,
          completed: false,
          topics: [
            { id: "org-1", name: "Organic Chemistry", status: "pending", priority: "high", difficulty: "medium", completed: false },
            { id: "inorg-1", name: "Inorganic Chemistry", status: "pending", priority: "medium", difficulty: "easy", completed: false }
          ]
        },
        {
          id: "subj-3",
          name: "Biology",
          color: "#8b5cf6",
          proficiency: "strong",
          priority: "high",
          hoursPerWeek: 8,
          completed: false,
          topics: [
            { id: "bot-1", name: "Botany", status: "completed", priority: "medium", difficulty: "hard", completed: true },
            { id: "zoo-1", name: "Zoology", status: "in-progress", priority: "high", difficulty: "medium", completed: false }
          ]
        }
      ],
      studyHoursPerDay: 4,
      preferredStudyTime: "evening",
      learningPace: "moderate",
      createdAt: new Date(2023, 9, 10).toISOString(),
      updatedAt: new Date(2023, 9, 10).toISOString(),
      progressPercentage: 35,
      daysLeft: 120
    },
    {
      id: "plan-2",
      title: "JEE Advanced Preparation",
      examGoal: "JEE Advanced",
      examDate: new Date(2024, 11, 10).toISOString(),
      status: "active",
      subjects: [
        {
          id: "subj-4",
          name: "Physics",
          color: "#3b82f6",
          proficiency: "weak",
          priority: "high",
          hoursPerWeek: 8,
          completed: false,
          topics: [
            { id: "mech-2", name: "Mechanics", status: "pending", priority: "high", difficulty: "hard", completed: false },
            { id: "thermo-2", name: "Thermodynamics", status: "in-progress", priority: "medium", difficulty: "medium", completed: false }
          ]
        },
        {
          id: "subj-5",
          name: "Chemistry",
          color: "#10b981",
          proficiency: "medium",
          priority: "medium",
          hoursPerWeek: 6,
          completed: false,
          topics: [
            { id: "org-2", name: "Organic Chemistry", status: "in-progress", priority: "medium", difficulty: "medium", completed: false }
          ]
        },
        {
          id: "subj-6",
          name: "Mathematics",
          color: "#8b5cf6",
          proficiency: "strong",
          priority: "low",
          hoursPerWeek: 10,
          completed: false,
          topics: [
            { id: "calc-1", name: "Calculus", status: "pending", priority: "medium", difficulty: "hard", completed: false },
            { id: "algebra-1", name: "Algebra", status: "pending", priority: "low", difficulty: "medium", completed: false }
          ]
        }
      ],
      studyHoursPerDay: 6,
      preferredStudyTime: "morning",
      learningPace: "fast",
      createdAt: new Date(2023, 8, 15).toISOString(),
      updatedAt: new Date(2023, 8, 15).toISOString(),
      progressPercentage: 62,
      daysLeft: 45
    },
    {
      id: "plan-3",
      title: "UPSC Preparation",
      examGoal: "UPSC",
      examDate: new Date(2024, 5, 20).toISOString(),
      status: "completed",
      subjects: [
        {
          id: "subj-7",
          name: "History",
          color: "#3b82f6",
          proficiency: "medium",
          priority: "high",
          hoursPerWeek: 5,
          completed: true,
          topics: [
            { id: "ancient-1", name: "Ancient History", status: "completed", priority: "high", difficulty: "medium", completed: true },
            { id: "medieval-1", name: "Medieval History", status: "completed", priority: "medium", difficulty: "medium", completed: true }
          ]
        },
        {
          id: "subj-8",
          name: "Geography",
          color: "#10b981",
          proficiency: "strong",
          priority: "high",
          hoursPerWeek: 4,
          completed: true,
          topics: [
            { id: "physical-1", name: "Physical Geography", status: "completed", priority: "high", difficulty: "easy", completed: true }
          ]
        },
        {
          id: "subj-9",
          name: "Economics",
          color: "#8b5cf6",
          proficiency: "weak",
          priority: "medium",
          hoursPerWeek: 6,
          completed: true,
          topics: [
            { id: "macro-1", name: "Macroeconomics", status: "in-progress", priority: "medium", difficulty: "hard", completed: false }
          ]
        }
      ],
      studyHoursPerDay: 5,
      preferredStudyTime: "evening",
      learningPace: "moderate",
      createdAt: new Date(2023, 1, 10).toISOString(),
      updatedAt: new Date(2023, 1, 10).toISOString(),
      progressPercentage: 100,
      daysLeft: 0
    },
  ];

  // Split plans by status
  const activePlans = demoStudyPlans.filter(plan => plan.status === "active");
  const completedPlans = demoStudyPlans.filter(plan => plan.status === "completed" || plan.status === "archived");
  
  const handleCreatePlanClick = () => {
    setShowCreateDialog(true);
  };

  const handleViewPlanDetails = (planId: string) => {
    setSelectedPlanId(planId);
    // In a real app, this would navigate to a detailed view or open a modal
    console.log(`Viewing plan details for ${planId}`);
  };

  const handleCreatePlan = (newPlan: NewStudyPlan) => {
    console.log("New study plan created:", newPlan);
    setShowCreateDialog(false);
    // In a real app, this would save the plan to the database
  };

  return (
    <SharedPageLayout
      title="Academic Advisor"
      subtitle="Get personalized guidance for your academic journey"
    >
      <div className="space-y-8">
        {/* Overview Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Academic Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Current Goal</span>
                <span className="font-medium text-lg">{userProfile.goals?.[0]?.title || "NEET"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Subjects</span>
                <span className="font-medium text-lg">7 Subjects</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Progress</span>
                <span className="font-medium text-lg">48% Complete</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Study Plans Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Study Plans</h2>
            <Button onClick={handleCreatePlanClick} className="flex gap-1 items-center">
              <PlusCircle className="h-4 w-4 mr-1" />
              Create New Plan
            </Button>
          </div>

          <StudyPlanSections 
            activePlans={activePlans}
            completedPlans={completedPlans}
            onCreatePlan={handleCreatePlanClick}
            onViewPlanDetails={handleViewPlanDetails}
          />
        </div>

        {/* Create Study Plan Dialog */}
        <CreateStudyPlanWizard 
          isOpen={showCreateDialog}
          onClose={() => setShowCreateDialog(false)}
          onCreatePlan={handleCreatePlan}
          examGoal={userProfile.goals?.[0]?.title}
        />
      </div>
    </SharedPageLayout>
  );
};

export default AcademicAdvisorView;
