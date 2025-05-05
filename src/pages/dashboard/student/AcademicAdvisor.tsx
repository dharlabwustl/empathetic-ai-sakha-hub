
import React from 'react';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import CreateStudyPlanWizard from '@/components/dashboard/student/academic/CreateStudyPlanWizard';
import StudyPlanDetail from '@/components/dashboard/student/academic/StudyPlanDetail';
import StudyPlansList from '@/components/dashboard/student/academic/StudyPlansList';
import { useAcademicPlans } from '@/components/dashboard/student/academic/hooks/useAcademicPlans';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';
import { differenceInDays } from 'date-fns';

interface AcademicAdvisorProps {
  userProfile?: {
    examPreparation?: string;
  };
}

const AcademicAdvisor: React.FC<AcademicAdvisorProps> = ({ userProfile }) => {
  const {
    showCreateDialog,
    selectedPlan,
    activePlans,
    completedPlans,
    handleCreatePlan,
    handleViewPlanDetails,
    handleNewPlanCreated,
    setShowCreateDialog,
    setSelectedPlan
  } = useAcademicPlans(userProfile?.examPreparation);

  // Select the most recent active plan for visualization
  const currentPlan = activePlans.length > 0 ? activePlans[0] : null;
  
  const examStatsForVisualizer = currentPlan ? {
    examGoal: currentPlan.examGoal,
    progressPercentage: currentPlan.progressPercent || 0,
    daysLeft: currentPlan.daysLeft || differenceInDays(new Date(currentPlan.examDate), new Date()),
    totalSubjects: currentPlan.subjects.length,
    conceptCards: 24, // Mock data - would be calculated from the plan in a real application
    flashcards: 120, // Mock data
    practiceExams: 8, // Mock data
    studyHoursPerDay: currentPlan.studyHoursPerDay || 4,
    focusArea: currentPlan.subjects.find(s => s.proficiency === 'weak')?.name || 'All subjects'
  } : {
    examGoal: userProfile?.examPreparation || "NEET",
    progressPercentage: 0,
    daysLeft: 90,
    totalSubjects: 3,
    conceptCards: 20,
    flashcards: 100,
    practiceExams: 5,
    studyHoursPerDay: 4,
    focusArea: "Physics"
  };

  return (
    <div className="space-y-8 p-6">
      {/* Back button and Header section */}
      <div className="space-y-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="mb-4"
                asChild
              >
                <Link to="/dashboard/student">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Return to the main dashboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div>
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
              <GraduationCap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Academic Advisor</h1>
              <p className="text-muted-foreground mt-1">
                Your personalized study plans and academic progress tracking
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Study Plan Visualizer - for the active plan */}
      {currentPlan && (
        <Card className="border-2 border-purple-100 shadow-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col space-y-2 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <span className="text-sm text-muted-foreground">Exam Goal</span>
                <span className="text-xl font-semibold">{examStatsForVisualizer.examGoal}</span>
                <span className="text-sm text-muted-foreground mt-2">Days Left</span>
                <span className={`text-lg font-medium ${examStatsForVisualizer.daysLeft < 30 ? 'text-amber-500' : ''}`}>
                  {examStatsForVisualizer.daysLeft} days
                </span>
              </div>

              <div className="flex flex-col space-y-2 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <span className="text-sm text-muted-foreground">Study Plan Progress</span>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${examStatsForVisualizer.progressPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-lg font-medium">{examStatsForVisualizer.progressPercentage}%</span>
                </div>
                <span className="text-sm text-muted-foreground mt-2">Focus Area</span>
                <span className="text-lg font-medium">{examStatsForVisualizer.focusArea}</span>
              </div>

              <div className="flex flex-col space-y-2 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <span className="text-sm text-muted-foreground">Daily Study</span>
                <span className="text-xl font-semibold">{examStatsForVisualizer.studyHoursPerDay} hrs/day</span>
                <span className="text-sm text-muted-foreground mt-2">Total Subjects</span>
                <span className="text-lg font-medium">{examStatsForVisualizer.totalSubjects} subjects</span>
              </div>

              <div className="flex flex-col space-y-2 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <span className="text-sm text-muted-foreground">Learning Resources</span>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                    <p className="text-lg font-semibold">{examStatsForVisualizer.conceptCards}</p>
                    <p className="text-xs text-muted-foreground">Concepts</p>
                  </div>
                  <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                    <p className="text-lg font-semibold">{examStatsForVisualizer.flashcards}</p>
                    <p className="text-xs text-muted-foreground">Cards</p>
                  </div>
                  <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                    <p className="text-lg font-semibold">{examStatsForVisualizer.practiceExams}</p>
                    <p className="text-xs text-muted-foreground">Exams</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Study Plans List */}
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
