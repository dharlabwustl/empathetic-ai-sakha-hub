
import React from 'react';
import { Calendar, Check, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StudyPlan } from '@/types/user/studyPlan';
import { formatDistanceToNow } from 'date-fns';

interface StudyPlanCardProps {
  plan: StudyPlan;
  onViewDetails: (planId: string) => void;
}

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({ plan, onViewDetails }) => {
  const handleViewDetails = () => {
    onViewDetails(plan.id);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{plan.goal}</h3>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                plan.status === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : plan.status === 'completed'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
              }`}
            >
              {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="mr-2 h-4 w-4" />
              Exam date: {plan.examDate ? formatDate(plan.examDate) : 'Not set'}
            </div>

            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Clock className="mr-2 h-4 w-4" />
              {plan.daysLeft === undefined ? 'Study time not set' : plan.daysLeft <= 0 ? 'Exam completed' : `${plan.daysLeft} days left`}
            </div>
          </div>

          <div className="pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{plan.progressPercentage ?? 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500"
                style={{ width: `${plan.progressPercentage ?? 0}%` }}
              ></div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {plan.subjects.slice(0, 3).map((subject) => (
              <span
                key={subject.id}
                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs"
                style={{ borderLeft: `3px solid ${subject.color}` }}
              >
                {subject.name}
                {subject.completed && <Check className="inline ml-1 h-3 w-3 text-green-500" />}
              </span>
            ))}
            {plan.subjects.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                +{plan.subjects.length - 3} more
              </span>
            )}
          </div>

          <Button variant="outline" className="w-full" onClick={handleViewDetails}>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyPlanCard;
