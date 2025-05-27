
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Sparkles, Star } from 'lucide-react';
import { StudyPlan } from '@/types/user/studyPlan';
import StudyPlanCard from '../StudyPlanCard';

interface StudyPlanSectionsProps {
  activePlans: StudyPlan[];
  completedPlans: StudyPlan[];
  onCreatePlan: () => void;
  onViewPlanDetails: (planId: string) => void;
}

const StudyPlanSections: React.FC<StudyPlanSectionsProps> = ({
  activePlans,
  completedPlans,
  onCreatePlan,
  onViewPlanDetails,
}) => {
  return (
    <div className="space-y-12">
      {/* Active Plans Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Active Study Plans
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your current learning paths</p>
            </div>
          </div>
          <Button 
            onClick={onCreatePlan}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            size="sm"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Plan
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {activePlans.length === 0 ? (
            <div className="relative overflow-hidden rounded-3xl p-12 text-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 border border-blue-200/50 dark:border-blue-700/30">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
              <div className="relative z-10">
                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  Ready to Start Your Journey?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                  Create your first AI-powered study plan tailored to your goals and learning style. Get personalized recommendations and track your progress.
                </p>
                <Button 
                  onClick={onCreatePlan} 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-3"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Create Your First Study Plan
                </Button>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-xl"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activePlans.map((plan) => (
                <StudyPlanCard 
                  key={plan.id}
                  plan={plan}
                  onClick={onViewPlanDetails}
                  isActive={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Completed/Archived Plans Section */}
      {completedPlans.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl text-white">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Completed Study Plans
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your learning achievements</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {completedPlans.map((plan) => (
              <StudyPlanCard 
                key={plan.id}
                plan={plan}
                onClick={onViewPlanDetails}
                isActive={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlanSections;
