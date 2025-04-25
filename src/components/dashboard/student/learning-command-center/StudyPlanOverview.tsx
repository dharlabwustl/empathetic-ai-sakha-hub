
import React from 'react';
import { UserProfileType } from "@/types/user";
import { Card } from "@/components/ui/card";
import { CalendarDays, Clock } from 'lucide-react';

interface StudyPlanOverviewProps {
  userProfile: UserProfileType;
}

export const StudyPlanOverview: React.FC<StudyPlanOverviewProps> = ({ userProfile }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="h-5 w-5 text-indigo-500" />
        <h3 className="text-lg font-semibold">Personalized Study Plan Overview</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="flex items-center gap-2 font-medium mb-3">
            <Clock className="h-4 w-4 text-violet-500" />
            Time Allocation
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Daily Study Target:</span>
              <span className="font-medium">4 hours</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Concepts per Day:</span>
              <span className="font-medium">5</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Flashcards per Day:</span>
              <span className="font-medium">20</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Practice Tests per Week:</span>
              <span className="font-medium">3</span>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
