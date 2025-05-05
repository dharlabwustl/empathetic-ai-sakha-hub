
import React from 'react';
import { GraduationCap, BarChart3, BookOpen, Calendar, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import CreateStudyPlanWizard from '@/components/dashboard/student/academic/CreateStudyPlanWizard';
import StudyPlanDetail from '@/components/dashboard/student/academic/StudyPlanDetail';
import StudyPlansList from '@/components/dashboard/student/academic/StudyPlansList';
import { useAcademicPlans } from '@/components/dashboard/student/academic/hooks/useAcademicPlans';
import { useNavigate } from 'react-router-dom';

interface AcademicAdvisorProps {
  userProfile?: {
    examPreparation?: string;
  };
}

const AcademicAdvisor: React.FC<AcademicAdvisorProps> = ({ userProfile }) => {
  const navigate = useNavigate();
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

  const handleBackToDashboard = () => {
    navigate('/dashboard/student');
  };

  // Calculate total stats from active plans
  const getTotalSubjects = () => {
    if (activePlans.length === 0) return 0;
    return activePlans.reduce((acc, plan) => acc + plan.subjects.length, 0);
  };

  const getTotalTopics = () => {
    if (activePlans.length === 0) return 0;
    let count = 0;
    activePlans.forEach(plan => {
      plan.subjects.forEach(subject => {
        if (subject.topics) {
          count += subject.topics.length;
        }
      });
    });
    return count;
  };

  const getWeeklyHours = () => {
    if (activePlans.length === 0) return 0;
    const plan = activePlans[0];
    return plan.weeklyHours || (plan.studyHoursPerDay * 7) || 0;
  };

  const getDailyHours = () => {
    if (activePlans.length === 0) return 0;
    return activePlans[0].studyHoursPerDay || 0;
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <GraduationCap className="h-6 w-6 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold">Academic Advisor</h1>
        </div>
        <p className="text-muted-foreground">
          Your personalized study plans and academic progress tracking
        </p>
      </div>

      {activePlans.length > 0 && (
        <TooltipProvider>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Stats Cards */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-indigo-100 dark:border-indigo-900/30">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Subjects</p>
                      <p className="text-2xl font-bold">{getTotalSubjects()}</p>
                    </div>
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Number of subjects in your current study plan</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-100 dark:border-green-900/30">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Topics</p>
                      <p className="text-2xl font-bold">{getTotalTopics()}</p>
                    </div>
                    <div className="bg-green-100 p-2 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Total number of topics across all subjects</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-100 dark:border-purple-900/30">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Daily Hours</p>
                      <p className="text-2xl font-bold">{getDailyHours()}</p>
                    </div>
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Hours of study per day based on your plan</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-100 dark:border-amber-900/30">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Weekly Hours</p>
                      <p className="text-2xl font-bold">{getWeeklyHours()}</p>
                    </div>
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-amber-600" />
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Total hours of study per week in your plan</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      )}

      {/* Progress Overview */}
      {activePlans.length > 0 && (
        <Card className="bg-white dark:bg-gray-900 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Overall Progress</h2>
              <span className="text-sm font-medium">
                {activePlans[0].progressPercentage || activePlans[0].progressPercent || 0}% Complete
              </span>
            </div>
            
            <Progress 
              value={activePlans[0].progressPercentage || activePlans[0].progressPercent || 0} 
              className="h-2.5 mb-6"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activePlans[0].subjects.map(subject => (
                <Card key={subject.id} className="bg-slate-50 dark:bg-slate-800 border-slate-200">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: subject.color }}
                        ></div>
                        <span className="font-medium text-sm">{subject.name}</span>
                      </div>
                      <span className="text-xs">
                        {subject.proficiency === 'weak' ? 'Needs focus' : (
                          subject.proficiency === 'medium' ? 'Intermediate' : 'Strong'
                        )}
                      </span>
                    </div>
                    <Progress 
                      value={Math.random() * 100} 
                      className="h-1 mb-1.5"
                      style={{ 
                        backgroundColor: 'rgba(200,200,200,0.3)',
                        "--primary": subject.color
                      } as React.CSSProperties}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{subject.hoursPerWeek} hrs/week</span>
                      <span>{subject.topics?.length || '—'} topics</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <StudyPlansList
        activePlans={activePlans}
        completedPlans={completedPlans}
        onCreatePlan={handleCreatePlan}
        onViewPlanDetails={handleViewPlanDetails}
        onBackToDashboard={handleBackToDashboard}
      />

      <CreateStudyPlanWizard
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        examGoal={userProfile?.examPreparation}
        onCreatePlan={handleNewPlanCreated}
      />

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
