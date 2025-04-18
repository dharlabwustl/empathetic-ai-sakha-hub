import React, { useState } from 'react';
import AcademicHeader from '@/components/dashboard/student/academic/AcademicHeader';
import StudyPlansList from '@/components/dashboard/student/academic/StudyPlansList';
import CreateStudyPlanWizard from '@/components/dashboard/student/academic/CreateStudyPlanWizard';
import StudyPlanDetail from '@/components/dashboard/student/academic/StudyPlanDetail';
import { useToast } from '@/hooks/use-toast';
import type { StudyPlan, NewStudyPlan } from '@/types/user/studyPlan';

interface AcademicAdvisorProps {
  userProfile: {
    examPreparation?: string;
  };
}

const AcademicAdvisor: React.FC<AcademicAdvisorProps> = ({ userProfile }) => {
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);

  // Sample active study plan data
  const activePlans: StudyPlan[] = [{
    id: "plan-1",
    examGoal: userProfile?.examPreparation || "IIT-JEE",
    examDate: "2024-12-15",
    daysLeft: 240,
    createdAt: "2024-04-10T12:00:00Z",
    status: 'active',
    progressPercentage: 35,
    subjects: [
      {
        name: "Physics",
        topics: [
          { name: "Mechanics", duration: 120, status: 'in-progress', priority: 'high' },
          { name: "Thermodynamics", duration: 90, status: 'pending', priority: 'medium' },
          { name: "Electrostatics", duration: 60, status: 'completed', priority: 'high' }
        ],
        allocatedHours: 40,
        proficiency: 'moderate',
        progress: 45
      },
      {
        name: "Chemistry",
        topics: [
          { name: "Organic Chemistry", duration: 120, status: 'pending', priority: 'high' },
          { name: "Chemical Bonding", duration: 60, status: 'in-progress', priority: 'medium' },
          { name: "Equilibrium", duration: 90, status: 'pending', priority: 'low' }
        ],
        allocatedHours: 30,
        proficiency: 'weak',
        progress: 25
      },
      {
        name: "Mathematics",
        topics: [
          { name: "Calculus", duration: 120, status: 'completed', priority: 'high' },
          { name: "Coordinate Geometry", duration: 90, status: 'completed', priority: 'high' },
          { name: "Probability", duration: 60, status: 'in-progress', priority: 'medium' }
        ],
        allocatedHours: 45,
        proficiency: 'strong',
        progress: 72
      }
    ],
    studyHoursPerDay: 6,
    preferredStudyTime: 'evening',
    learningPace: 'moderate'
  }];

  // Sample completed plans
  const completedPlans: StudyPlan[] = [{
    id: "plan-old-1",
    examGoal: "IIT-JEE",
    examDate: "2024-03-15",
    daysLeft: 0,
    createdAt: "2024-01-01T12:00:00Z",
    status: 'completed',
    progressPercentage: 100,
    subjects: [
      {
        name: "Physics",
        topics: [
          { name: "Mechanics", duration: 120, status: 'completed', priority: 'high' },
          { name: "Waves", duration: 90, status: 'completed', priority: 'medium' }
        ],
        allocatedHours: 30,
        proficiency: 'weak',
        progress: 65
      },
      {
        name: "Chemistry",
        topics: [
          { name: "Periodic Table", duration: 60, status: 'completed', priority: 'medium' }
        ],
        allocatedHours: 25,
        proficiency: 'weak',
        progress: 60
      },
      {
        name: "Mathematics",
        topics: [
          { name: "Algebra", duration: 120, status: 'completed', priority: 'high' }
        ],
        allocatedHours: 35,
        proficiency: 'moderate',
        progress: 70
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

  const handleNewPlanCreated = (plan: NewStudyPlan) => {
    console.log('New plan created:', plan);
    toast({
      title: "Success",
      description: "Your new study plan has been created.",
    });
    setShowCreateDialog(false);
  };

  return (
    <div className="space-y-12">
      <AcademicHeader examGoal={userProfile?.examPreparation} />
      
      <StudyPlansList
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

export default AcademicAdvisor;
