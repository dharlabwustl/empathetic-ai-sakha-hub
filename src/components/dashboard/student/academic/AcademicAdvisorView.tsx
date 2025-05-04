
import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import CreateStudyPlanWizard from '@/components/dashboard/student/academic/CreateStudyPlanWizard';
import StudyPlanDetail from '@/components/dashboard/student/academic/StudyPlanDetail';
import StudyPlanSections from '@/components/dashboard/student/academic/components/StudyPlanSections';
import { useAcademicPlans } from '@/components/dashboard/student/academic/hooks/useAcademicPlans';
import { StudyPlan, StudyPlanSubject } from '@/types/user/studyPlan';

interface AcademicAdvisorViewProps {
  userProfile?: {
    examPreparation?: string;
  };
}

const AcademicAdvisorView: React.FC<AcademicAdvisorViewProps> = ({ userProfile }) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  
  // Sample active plans
  const activePlans: StudyPlan[] = [{
    id: "plan-1",
    userId: "user-1",
    goal: "NEET Preparation",
    examGoal: userProfile?.examPreparation || "NEET",
    examDate: "2024-12-15",
    createdAt: "2024-04-10T12:00:00Z",
    updatedAt: "2024-04-10T12:00:00Z",
    status: 'active',
    weeklyHours: 42,
    progressPercent: 35,
    daysLeft: 240,
    subjects: [
      {
        id: "physics-1",
        name: "Physics",
        color: "#3b82f6",
        hoursPerWeek: 14,
        priority: "high",
        proficiency: "medium",
        completed: false,
        topics: [
          { id: "mech-1", name: "Mechanics", difficulty: 'medium', completed: false, status: 'in-progress', priority: 'high' },
          { id: "thermo-1", name: "Thermodynamics", difficulty: 'hard', completed: false, status: 'pending', priority: 'medium' },
          { id: "electro-1", name: "Electrostatics", difficulty: 'hard', completed: true, status: 'completed', priority: 'high' }
        ]
      },
      {
        id: "chem-1",
        name: "Chemistry",
        color: "#10b981",
        hoursPerWeek: 12,
        priority: "medium",
        proficiency: "weak",
        completed: false,
        topics: [
          { id: "org-1", name: "Organic Chemistry", difficulty: 'hard', completed: false, status: 'pending', priority: 'high' },
          { id: "bond-1", name: "Chemical Bonding", difficulty: 'medium', completed: false, status: 'in-progress', priority: 'medium' },
          { id: "equil-1", name: "Equilibrium", difficulty: 'easy', completed: false, status: 'pending', priority: 'low' }
        ]
      },
      {
        id: "math-1",
        name: "Mathematics",
        color: "#8b5cf6",
        hoursPerWeek: 16,
        priority: "high",
        proficiency: "strong",
        completed: false,
        topics: [
          { id: "calc-1", name: "Calculus", difficulty: 'hard', completed: true, status: 'completed', priority: 'high' },
          { id: "coord-1", name: "Coordinate Geometry", difficulty: 'medium', completed: true, status: 'completed', priority: 'high' },
          { id: "prob-1", name: "Probability", difficulty: 'medium', completed: false, status: 'in-progress', priority: 'medium' }
        ]
      }
    ],
    studyHoursPerDay: 6,
    preferredStudyTime: 'evening',
    learningPace: 'moderate'
  }];

  // Sample completed plans 
  const completedPlans: StudyPlan[] = [{
    id: "plan-old-1",
    userId: "user-1",
    goal: "NEET Preparation",
    examGoal: "NEET",
    examDate: "2024-03-15",
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-03-15T12:00:00Z",
    status: 'completed',
    weeklyHours: 35,
    progressPercent: 100,
    daysLeft: 0,
    subjects: [
      {
        id: "physics-old",
        name: "Physics",
        color: "#3b82f6", 
        hoursPerWeek: 10,
        priority: "medium",
        proficiency: "weak",
        completed: true,
        topics: [
          { id: "mech-old", name: "Mechanics", difficulty: 'medium', completed: true, status: 'completed', priority: 'high' },
          { id: "waves-old", name: "Waves", difficulty: 'medium', completed: true, status: 'completed', priority: 'medium' }
        ]
      },
      {
        id: "chem-old",
        name: "Chemistry",
        color: "#10b981",
        hoursPerWeek: 12,
        priority: "low", 
        proficiency: "weak",
        completed: true,
        topics: [
          { id: "period-old", name: "Periodic Table", difficulty: 'medium', completed: true, status: 'completed', priority: 'medium' }
        ]
      },
      {
        id: "math-old",
        name: "Mathematics",
        color: "#8b5cf6",
        hoursPerWeek: 13,
        priority: "high",
        proficiency: "medium",
        completed: true,
        topics: [
          { id: "alg-old", name: "Algebra", difficulty: 'hard', completed: true, status: 'completed', priority: 'high' }
        ]
      }
    ],
    studyHoursPerDay: 5,
    preferredStudyTime: 'morning',
    learningPace: 'slow'
  }];

  const handleCreatePlan = () => {
    setShowCreateDialog(true);
  };

  const handleViewPlanDetails = (planId: string) => {
    const plan = [...activePlans, ...completedPlans].find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  const handleNewPlanCreated = (newPlan: any) => {
    console.log("New plan created:", newPlan);
    setShowCreateDialog(false);
    // In a real app, you would save this plan to your backend
    // and update the state accordingly
  };

  return (
    <div className="space-y-12">
      {/* Header section */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-indigo-600" />
          Academic Advisor
        </h1>
        <p className="text-gray-500 mt-1">
          Your personalized study plans and academic progress tracking
        </p>
      </div>

      <StudyPlanSections
        activePlans={activePlans}
        completedPlans={completedPlans}
        onCreatePlan={handleCreatePlan}
        onViewPlanDetails={handleViewPlanDetails}
      />

      {/* Study Plan Creation Dialog */}
      <CreateStudyPlanWizard
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        examGoal={userProfile?.examPreparation}
        onCreatePlan={handleNewPlanCreated}
      />

      {/* Study Plan Detail Dialog */}
      {selectedPlan && (
        <StudyPlanDetail
          plan={selectedPlan}
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
};

export default AcademicAdvisorView;
