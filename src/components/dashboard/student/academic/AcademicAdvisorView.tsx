
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp, Target, Clock, Star, BookOpen, Award, Users } from "lucide-react";
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
    <SharedPageLayout
      title="Academic Advisor"
      subtitle="Get AI-powered personalized guidance for your academic journey"
    >
      <div className="space-y-8">
        {/* Premium Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Award className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Premium Academic Guidance</h2>
                <p className="text-blue-100">AI-powered personalized study planning</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-emerald-300" />
                  <span className="font-semibold">Smart Analytics</span>
                </div>
                <p className="text-sm text-blue-100">Track progress with advanced insights</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-rose-300" />
                  <span className="font-semibold">Goal Optimization</span>
                </div>
                <p className="text-sm text-blue-100">Adaptive study plans that evolve</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-amber-300" />
                  <span className="font-semibold">Expert Support</span>
                </div>
                <p className="text-sm text-blue-100">24/7 AI academic assistance</p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
        </div>

        {/* Enhanced Overview Card */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  Academic Progress Dashboard
                </CardTitle>
                <p className="text-sm text-muted-foreground">Real-time insights into your academic journey</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-800/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-muted-foreground text-sm font-medium">Current Goal</span>
                </div>
                <span className="font-bold text-xl text-blue-700 dark:text-blue-300">
                  {userProfile.goals?.[0]?.title || "NEET"}
                </span>
              </div>
              
              <div className="group p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-100 dark:border-emerald-800/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-muted-foreground text-sm font-medium">Active Subjects</span>
                </div>
                <span className="font-bold text-xl text-emerald-700 dark:text-emerald-300">7 Subjects</span>
              </div>
              
              <div className="group p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border border-purple-100 dark:border-purple-800/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-muted-foreground text-sm font-medium">Overall Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl text-purple-700 dark:text-purple-300">48%</span>
                  <span className="text-sm text-muted-foreground">Complete</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Enhanced Study Plans Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  Study Plans
                </h2>
                <p className="text-sm text-muted-foreground">Manage your personalized study roadmaps</p>
              </div>
            </div>
            <Button 
              onClick={handleCreatePlanClick} 
              className="flex gap-2 items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <PlusCircle className="h-5 w-5" />
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
