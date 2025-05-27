
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Sparkles, TrendingUp, Award } from "lucide-react";
import { StudyPlan, StudyPlanSubject, NewStudyPlan } from "@/types/user/studyPlan";
import { UserProfileType } from "@/types/user/base";
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
          proficiency: "strong",
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
          proficiency: "medium",
          hoursPerWeek: 6
        }
      ],
      studyHoursPerDay: 5,
      preferredStudyTime: "evening",
      learningPace: "moderate",
      createdAt: new Date(2023, 1, 10).toISOString(),
    },
  ];

  const activePlans = demoStudyPlans.filter(plan => plan.status === "active");
  const completedPlans = demoStudyPlans.filter(plan => plan.status === "completed" || plan.status === "pending");
  
  const handleCreatePlanClick = () => {
    setShowCreateDialog(true);
  };

  const handleViewPlanDetails = (planId: string) => {
    setSelectedPlanId(planId);
    console.log(`Viewing plan details for ${planId}`);
  };

  const handleCreatePlan = (newPlan: NewStudyPlan) => {
    console.log("New study plan created:", newPlan);
    setShowCreateDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/30 via-white to-blue-50/30 dark:from-violet-950/10 dark:via-gray-900 dark:to-blue-950/10">
      <SharedPageLayout
        title="Academic Advisor"
        subtitle="Your AI-powered academic companion for personalized guidance and strategic planning"
      >
        <div className="space-y-8">
          {/* Premium Hero Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Premium Academic Guidance</h2>
                  <p className="text-blue-100">AI-powered insights for exam success</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">Smart Analytics</div>
                    <div className="text-sm text-blue-100">Performance tracking</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">Goal Achievement</div>
                    <div className="text-sm text-blue-100">Structured milestones</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">AI Recommendations</div>
                    <div className="text-sm text-blue-100">Personalized insights</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          </div>

          {/* Enhanced Overview Card */}
          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-blue-900/10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
            <CardHeader className="relative z-10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  Academic Progress Overview
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-200/50 dark:border-blue-700/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-500 rounded-lg text-white">
                      <Award className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Current Goal</span>
                  </div>
                  <span className="font-bold text-xl text-blue-900 dark:text-blue-100">
                    {userProfile.goals?.[0]?.title || "NEET"}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 border border-emerald-200/50 dark:border-emerald-700/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-emerald-500 rounded-lg text-white">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Active Subjects</span>
                  </div>
                  <span className="font-bold text-xl text-emerald-900 dark:text-emerald-100">7 Subjects</span>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 border border-purple-200/50 dark:border-purple-700/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-500 rounded-lg text-white">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Overall Progress</span>
                  </div>
                  <span className="font-bold text-xl text-purple-900 dark:text-purple-100">48% Complete</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Enhanced Study Plans Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  Study Plans
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Manage your personalized learning journey</p>
              </div>
              <Button 
                onClick={handleCreatePlanClick} 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
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

          <CreateStudyPlanWizard 
            isOpen={showCreateDialog}
            onClose={() => setShowCreateDialog(false)}
            onCreatePlan={handleCreatePlan}
            examGoal={userProfile.goals?.[0]?.title}
          />
        </div>
      </SharedPageLayout>
    </div>
  );
};

export default AcademicAdvisorView;
