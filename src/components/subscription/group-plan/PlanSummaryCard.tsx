
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { Plan } from '../batch/types';

interface PlanSummaryCardProps {
  plan: Plan;
  maxUsers: number;
}

const PlanSummaryCard = ({ plan, maxUsers }: PlanSummaryCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 border-purple-200 dark:border-purple-900">
      <div className="flex items-start space-x-4">
        <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
          <Users className="h-6 w-6 text-purple-600 dark:text-purple-300" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium">{plan.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Up to {maxUsers} users • ₹{Math.round(plan.price / maxUsers)}/user/month
          </p>
          <Badge className="mt-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            {plan.planType === 'school' ? 'Educational' : plan.planType === 'corporate' ? 'Business' : 'Group'} License
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default PlanSummaryCard;
