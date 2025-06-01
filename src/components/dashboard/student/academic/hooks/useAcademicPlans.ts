import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';
import { format, differenceInCalendarDays } from 'date-fns';
import type { StudyPlan, NewStudyPlan, StudyPlanSubject } from "@/types/user/studyPlan";

export const useAcademicPlans = (examGoal?: string) => {
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);

  const [activePlans, setActivePlans] = useState<StudyPlan[]>([{
    id: "plan-1",
    name: "NEET Preparation",
    title: "NEET Preparation",
    description: "Comprehensive NEET 2026 preparation plan",
    exam: examGoal || "NEET",
    examDate: "2026-05-03",
    examGoal: examGoal || "NEET",
    startDate: "2024-04-10",
    endDate: "2026-05-03",
    createdAt: "2024-04-10",
    updatedAt: "2024-04-10",
    status: 'active',
    hoursPerWeek: 42,
    totalHours: 2000,
    progress: 35,
    progressPercent: 35,
    subjects: [
      {
        id: "physics-1",
        name: "Physics",
        color: "#3b82f6",
        hoursPerWeek: 14,
        weeklyHours: 14,
        progress: 45,
        priority: "high",
        proficiency: "medium",
        completed: false,
        topics: [
          { id: "mechanics", name: "Mechanics", hoursAllocated: 4, status: 'in-progress', completed: false, progressPercent: 60 },
          { id: "thermodynamics", name: "Thermodynamics", hoursAllocated: 3, status: 'not-started', completed: false, progressPercent: 0 }
        ]
      },
      {
        id: "chem-1",
        name: "Chemistry",
        color: "#10b981",
        hoursPerWeek: 12,
        weeklyHours: 12,
        progress: 35,
        priority: "medium",
        proficiency: "weak",
        completed: false,
        isWeakSubject: true,
        topics: [
          { id: "organic", name: "Organic Chemistry", hoursAllocated: 4, status: 'in-progress', completed: false, progressPercent: 40 }
        ]
      },
      {
        id: "bio-1",
        name: "Biology",
        color: "#8b5cf6",
        hoursPerWeek: 16,
        weeklyHours: 16,
        progress: 60,
        priority: "high",
        proficiency: "strong",
        completed: false,
        topics: [
          { id: "botany", name: "Botany", hoursAllocated: 6, status: 'completed', completed: true, progressPercent: 100 }
        ]
      }
    ],
    studyHoursPerDay: 6,
    preferredStudyTime: 'evening',
    learningPace: 'medium',
    weeklyHours: 42,
    daysLeft: Math.ceil((new Date('2026-05-03').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  }]);

  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>([{
    id: "plan-old-1",
    name: "Previous NEET Prep",
    title: "Previous NEET Prep",
    description: "Previous preparation attempt",
    exam: "NEET",
    examDate: "2024-03-15",
    examGoal: "NEET",
    startDate: "2024-01-01",
    endDate: "2024-03-15",
    createdAt: "2024-01-01",
    updatedAt: "2024-03-15",
    status: 'completed',
    hoursPerWeek: 35,
    totalHours: 1500,
    progress: 100,
    progressPercent: 100,
    subjects: [
      {
        id: "physics-old",
        name: "Physics",
        color: "#3b82f6",
        hoursPerWeek: 10,
        weeklyHours: 10,
        progress: 100,
        priority: "medium",
        proficiency: "weak",
        completed: true,
      },
      {
        id: "chem-old",
        name: "Chemistry",
        color: "#10b981",
        hoursPerWeek: 12,
        weeklyHours: 12,
        progress: 100,
        priority: "low",
        proficiency: "weak",
        completed: true,
      },
      {
        id: "bio-old",
        name: "Biology",
        color: "#8b5cf6",
        hoursPerWeek: 13,
        weeklyHours: 13,
        progress: 100,
        priority: "high",
        proficiency: "medium",
        completed: true,
      }
    ],
    studyHoursPerDay: 5,
    preferredStudyTime: 'morning',
    learningPace: 'slow',
    weeklyHours: 35,
    daysLeft: 0
  }]);

  const handleCreatePlan = () => {
    setShowCreateDialog(true);
  };

  const handleViewPlanDetails = (planId: string) => {
    const plan = [...activePlans, ...completedPlans].find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  const handleNewPlanCreated = (plan: NewStudyPlan) => {
    const newPlan: StudyPlan = {
      id: uuidv4(),
      name: plan.name,
      title: `${plan.examGoal || plan.exam} Preparation Plan`,
      description: plan.description,
      exam: plan.exam,
      examDate: plan.examDate,
      examGoal: plan.examGoal || plan.exam,
      startDate: plan.startDate,
      endDate: plan.endDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      hoursPerWeek: plan.hoursPerWeek || 20,
      totalHours: plan.totalHours,
      progress: 0,
      progressPercent: 0,
      subjects: plan.subjects.map(subject => ({
        ...subject,
        weeklyHours: subject.weeklyHours || subject.hoursPerWeek || 10,
        progress: subject.progress || 0,
      })),
      studyHoursPerDay: plan.studyHoursPerDay,
      preferredStudyTime: plan.preferredStudyTime,
      learningPace: plan.learningPace,
      weeklyHours: plan.hoursPerWeek || 20,
      daysLeft: Math.ceil((new Date(plan.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    };
    
    const updatedCompletedPlans = [...completedPlans];
    if (activePlans.length > 0) {
      const oldActivePlans = activePlans.map(plan => ({
        ...plan,
        status: 'completed' as 'completed'
      }));
      updatedCompletedPlans.push(...oldActivePlans);
    }
    
    setActivePlans([newPlan]);
    setCompletedPlans(updatedCompletedPlans);
    
    toast({
      title: "Success",
      description: "Your new study plan has been created and is now active!",
    });
    
    setShowCreateDialog(false);
  };

  return {
    showCreateDialog,
    selectedPlan,
    activePlans,
    completedPlans,
    handleCreatePlan,
    handleViewPlanDetails,
    handleNewPlanCreated,
    setShowCreateDialog,
    setSelectedPlan
  };
};
