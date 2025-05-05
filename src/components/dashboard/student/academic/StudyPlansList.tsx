
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Book, Calendar, Clock, PlusCircle } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { StudyPlan } from '@/types/user/studyPlan';
import { format, differenceInDays } from 'date-fns';

interface StudyPlansListProps {
  activePlans: StudyPlan[];
  completedPlans: StudyPlan[];
  onCreatePlan: () => void;
  onViewPlanDetails: (planId: string) => void;
  onBackToDashboard?: () => void;
}

const StudyPlansList: React.FC<StudyPlansListProps> = ({
  activePlans,
  completedPlans,
  onCreatePlan,
  onViewPlanDetails,
  onBackToDashboard
}) => {
  // Helper function to calculate days left
  const getDaysLeft = (dateString: string | Date) => {
    try {
      const examDate = typeof dateString === 'string' ? new Date(dateString) : dateString;
      return Math.max(0, differenceInDays(examDate, new Date()));
    } catch (e) {
      return 0;
    }
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      {onBackToDashboard && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex gap-2 items-center hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={onBackToDashboard}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      )}

      {/* Active Plans Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Active Study Plans</h2>
            <p className="text-muted-foreground">Your current study plans and ongoing progress</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={onCreatePlan}
                  className="flex gap-2 items-center bg-indigo-600 hover:bg-indigo-700"
                >
                  <PlusCircle className="h-4 w-4" />
                  Create New Plan
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Create a personalized study plan based on your exam goals</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {activePlans.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <div className="rounded-full bg-indigo-100 p-3 mb-4">
                <Book className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-medium text-lg mb-2">No Active Study Plans</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Create a personalized study plan to organize your exam preparation and track your progress.
              </p>
              <Button onClick={onCreatePlan} className="flex gap-2 items-center">
                <PlusCircle className="h-4 w-4" />
                Create Study Plan
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {activePlans.map((plan) => (
              <Card 
                key={plan.id} 
                className="overflow-hidden border-2 border-indigo-100 hover:border-indigo-300 transition-all duration-200"
              >
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-4">
                    {/* Main plan info */}
                    <div className="col-span-3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-semibold">{plan.examGoal}</h3>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            Exam Date: {typeof plan.examDate === 'string' 
                              ? format(new Date(plan.examDate), 'MMM d, yyyy')
                              : format(plan.examDate, 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between items-center text-sm">
                          <span>Overall Progress</span>
                          <span className="font-medium">
                            {plan.progressPercent || plan.progressPercentage || 0}%
                          </span>
                        </div>
                        <Progress 
                          value={plan.progressPercent || plan.progressPercentage || 0} 
                          className="h-2"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {/* Days Left */}
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Days Until Exam</span>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-indigo-500" />
                            <span className="font-semibold">
                              {getDaysLeft(plan.examDate)} days left
                            </span>
                          </div>
                        </div>

                        {/* Hours Per Day */}
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Daily Study Goal</span>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-indigo-500" />
                            <span className="font-semibold">
                              {plan.studyHoursPerDay || 0} hours/day
                            </span>
                          </div>
                        </div>

                        {/* Weekly Hours */}
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Weekly Commitment</span>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-indigo-500" />
                            <span className="font-semibold">
                              {plan.weeklyHours || plan.studyHoursPerDay * 7 || 0} hours/week
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Subject pills */}
                      <div className="flex flex-wrap gap-2">
                        {plan.subjects.map((subject) => (
                          <Badge 
                            key={subject.id} 
                            className={cn(
                              "py-1 px-3 bg-opacity-20 text-indigo-700"
                            )}
                            style={{ 
                              backgroundColor: `${subject.color}40` || '#8B5CF640',
                              color: subject.color || '#8B5CF6' 
                            }}
                          >
                            {subject.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action sidebar */}
                    <div className="bg-slate-50 dark:bg-slate-900 p-6 flex flex-col justify-between">
                      <div>
                        <h4 className="font-medium mb-2">Study Preferences</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Pace:</span>{' '}
                            <span className="font-medium capitalize">
                              {plan.learningPace || 'Moderate'}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Time:</span>{' '}
                            <span className="font-medium capitalize">
                              {plan.preferredStudyTime || 'Evening'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button 
                        className="w-full mt-6" 
                        onClick={() => onViewPlanDetails(plan.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Completed Plans Section */}
      {completedPlans.length > 0 && (
        <section>
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Completed & Past Plans</h2>
            <p className="text-muted-foreground">History of your completed and expired study plans</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className="hover:shadow-md transition-all duration-200"
                onClick={() => onViewPlanDetails(plan.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base font-medium">{plan.examGoal}</CardTitle>
                    <Badge 
                      variant="secondary"
                      className={plan.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}
                    >
                      {plan.status === 'completed' ? 'Completed' : 'Archived'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Final Progress</span>
                      <span>{plan.progressPercent || plan.progressPercentage || 0}%</span>
                    </div>
                    <Progress 
                      value={plan.progressPercent || plan.progressPercentage || 0} 
                      className="h-1.5"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {plan.subjects.slice(0, 3).map((subject) => (
                      <Badge key={subject.id} variant="outline" className="bg-slate-50">
                        {subject.name}
                      </Badge>
                    ))}
                    {plan.subjects.length > 3 && (
                      <Badge variant="outline" className="bg-slate-50">
                        +{plan.subjects.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default StudyPlansList;
