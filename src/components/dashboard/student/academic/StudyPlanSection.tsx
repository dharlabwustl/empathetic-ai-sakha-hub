
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import StudyPlanCard from './StudyPlanCard';

interface StudyPlanSectionProps {
  title: string;
  description?: string;
  plans: Array<any>;
  onCreatePlan: () => void;
  onViewPlanDetails: (planId: string) => void;
}

const StudyPlanSection: React.FC<StudyPlanSectionProps> = ({
  title,
  description,
  plans,
  onCreatePlan,
  onViewPlanDetails
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          {description && <p className="text-gray-500 mt-1">{description}</p>}
        </div>
        <Button 
          onClick={onCreatePlan}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Plan
        </Button>
      </div>

      {plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map(plan => (
            <StudyPlanCard 
              key={plan.id}
              plan={plan}
              onViewDetails={onViewPlanDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Study Plans Yet</h3>
          <p className="text-gray-500 mb-4">Create your first study plan to get started</p>
          <Button onClick={onCreatePlan} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Create Study Plan
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudyPlanSection;
