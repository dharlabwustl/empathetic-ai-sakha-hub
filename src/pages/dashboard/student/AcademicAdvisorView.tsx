
import React from 'react';
import { GraduationCap } from 'lucide-react';
import CreateStudyPlanWizard from '@/components/dashboard/student/academic/CreateStudyPlanWizard';
import StudyPlanDetail from '@/components/dashboard/student/academic/StudyPlanDetail';
import StudyPlanSections from '@/components/dashboard/student/academic/components/StudyPlanSections';
import { useAcademicPlans } from '@/components/dashboard/student/academic/hooks/useAcademicPlans';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useEffect } from 'react';

const AcademicAdvisorView: React.FC = () => {
  const {
    showCreateDialog,
    selectedPlan,
    activePlans,
    completedPlans,
    handleCreatePlan,
    handleViewPlanDetails,
    handleNewPlanCreated,
    setShowCreateDialog,
    setSelectedPlan,
    loadSignupStudyPlan
  } = useAcademicPlans();

  // Load study plan from signup data when component mounts
  useEffect(() => {
    // Check localStorage for study plan created during signup
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData.studyPlan) {
          loadSignupStudyPlan(parsedData.studyPlan);
        }
      } catch (error) {
        console.error('Error loading signup study plan:', error);
      }
    }
  }, [loadSignupStudyPlan]);

  return (
    <SharedPageLayout
      title="Academic Advisor"
      subtitle="Your personalized study plans and academic progress tracking"
    >
      <div className="space-y-12">
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
    </SharedPageLayout>
  );
};

export default AcademicAdvisorView;
