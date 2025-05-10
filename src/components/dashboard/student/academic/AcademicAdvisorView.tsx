
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { StudyPlan, StudyPlanSubject, NewStudyPlan } from "@/types/user/studyPlan";
import { UserProfileType } from "@/types/user";
import CreateStudyPlanWizard from "./CreateStudyPlanWizard";
import StudyPlanSections from "./components/StudyPlanSections";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const AcademicAdvisorView: React.FC = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  
  // Listen for custom event to open the dialog
  useEffect(() => {
    const openDialogHandler = () => {
      setShowCreateDialog(true);
    };
    
    document.addEventListener('openCreateStudyPlan', openDialogHandler);
    
    return () => {
      document.removeEventListener('openCreateStudyPlan', openDialogHandler);
    };
  }, []);
  
  // Mock study plans for demo
  const demoStudyPlans: StudyPlan[] = [
    {
      id: "plan-1",
      title: "NEET Preparation",
      examGoal: "NEET",
      examDate: new Date(2025, 4, 15).toISOString(),
      status: "active",
      progress: 35,
      subjects: [
        {
          id: "subj-1",
          name: "Physics",
          difficulty: "medium",
          completed: false,
          status: "in-progress",
          priority: "high",
          proficiency: "medium",
          hoursPerWeek: 6
        },
        {
          id: "subj-2",
          name: "Chemistry",
          difficulty: "easy",
          completed: false,
          status: "pending",
          priority: "medium",
          proficiency: "strong",
          hoursPerWeek: 4
        },
        {
          id: "subj-3",
          name: "Biology",
          difficulty: "hard",
          completed: false,
          status: "completed",
          priority: "high",
          proficiency: "weak",
          hoursPerWeek: 8
        }
      ],
      studyHoursPerDay: 4,
      preferredStudyTime: "evening",
      learningPace: "moderate",
      createdAt: new Date(2023, 9, 10).toISOString(),
    },
    {
      id: "plan-2",
      title: "JEE Advanced Preparation",
      examGoal: "JEE Advanced",
      examDate: new Date(2024, 11, 10).toISOString(),
      status: "pending",
      progress: 62,
      subjects: [
        {
          id: "subj-4",
          name: "Physics",
          difficulty: "hard",
          completed: false,
          status: "pending",
          priority: "high",
          proficiency: "weak",
          hoursPerWeek: 8
        },
        {
          id: "subj-5",
          name: "Chemistry",
          difficulty: "medium",
          completed: false,
          status: "in-progress",
          priority: "medium",
          proficiency: "medium",
          hoursPerWeek: 6
        },
        {
          id: "subj-6",
          name: "Mathematics",
          difficulty: "hard",
          completed: false,
          status: "pending",
          priority: "low",
          proficiency: "weak",
          hoursPerWeek: 10
        }
      ],
      studyHoursPerDay: 6,
      preferredStudyTime: "morning",
      learningPace: "fast",
      createdAt: new Date(2023, 8, 15).toISOString(),
    },
    {
      id: "plan-3",
      title: "UPSC Preparation",
      examGoal: "UPSC",
      examDate: new Date(2024, 5, 20).toISOString(),
      status: "completed",
      progress: 100,
      subjects: [
        {
          id: "subj-7",
          name: "History",
          difficulty: "medium",
          completed: true,
          status: "completed",
          priority: "high",
          proficiency: "medium",
          hoursPerWeek: 5
        },
        {
          id: "subj-8",
          name: "Geography",
          difficulty: "easy",
          completed: true,
          status: "completed",
          priority: "high",
          proficiency: "strong",
          hoursPerWeek: 4
        },
        {
          id: "subj-9",
          name: "Economics",
          difficulty: "hard",
          completed: true,
          status: "in-progress",
          priority: "medium",
          proficiency: "weak",
          hoursPerWeek: 6
        }
      ],
      studyHoursPerDay: 5,
      preferredStudyTime: "evening",
      learningPace: "moderate",
      createdAt: new Date(2023, 1, 10).toISOString(),
    },
  ];

  // Split plans by status
  const activePlans = demoStudyPlans.filter(plan => plan.status === "active");
  const completedPlans = demoStudyPlans.filter(plan => plan.status === "completed" || plan.status === "pending");
  
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
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Current Goal</span>
                <span className="font-medium text-lg">NEET</span>
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
              <span className="hidden sm:inline">Create New Plan</span>
              <span className="sm:hidden">New Plan</span>
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
          examGoal="NEET"
        />
      </div>
    </SharedPageLayout>
  );
};

export default AcademicAdvisorView;
