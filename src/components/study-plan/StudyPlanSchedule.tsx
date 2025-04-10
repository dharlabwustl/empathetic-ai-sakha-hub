
import React from 'react';
import { Button } from '@/components/ui/button';

interface StudyPlanScheduleProps {
  isEditing: boolean;
}

const StudyPlanSchedule = ({ isEditing }: StudyPlanScheduleProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-xl font-semibold mb-4">Weekly Schedule</h3>
      <div className="grid grid-cols-7 gap-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="text-center">
            <div className="font-medium text-sm text-muted-foreground">{day}</div>
            <div className="h-24 md:h-32 bg-gray-50 dark:bg-gray-900 mt-2 rounded-lg border border-gray-100 dark:border-gray-700 p-2">
              <div className="text-xs text-muted-foreground">4h</div>
              {day === 'Mon' && (
                <div className="bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 text-xs p-1 rounded mt-1">Physics</div>
              )}
              {day === 'Tue' && (
                <div className="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-xs p-1 rounded mt-1">Chemistry</div>
              )}
              {day === 'Wed' && (
                <div className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs p-1 rounded mt-1">Math</div>
              )}
              {day === 'Thu' && (
                <div className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs p-1 rounded mt-1">Biology</div>
              )}
              {day === 'Fri' && (
                <div className="bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-xs p-1 rounded mt-1">Practice</div>
              )}
              {day === 'Sat' && (
                <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs p-1 rounded mt-1">Review</div>
              )}
            </div>
          </div>
        ))}
      </div>
      {isEditing && (
        <Button className="mt-6 bg-gradient-to-r from-sky-500 to-violet-500 text-white">
          Edit Schedule
        </Button>
      )}
    </div>
  );
};

export default StudyPlanSchedule;
