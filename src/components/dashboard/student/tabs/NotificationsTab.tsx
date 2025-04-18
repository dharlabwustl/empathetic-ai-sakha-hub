
import React from 'react';
import { UserProfileType } from '@/types/user';
import { NudgeData } from '@/hooks/useKpiTracking';

interface NotificationsTabProps {
  userProfile: UserProfileType;
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({ 
  userProfile, 
  nudges, 
  markNudgeAsRead 
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Stay updated with your latest notifications.
      </p>
      
      {/* Display nudges as notifications */}
      <div className="mt-4 space-y-3">
        {nudges.length > 0 ? (
          nudges.map((nudge) => (
            <div 
              key={nudge.id} 
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <div className="flex justify-between">
                <h3 className="font-medium">{nudge.title}</h3>
                <button 
                  onClick={() => markNudgeAsRead(nudge.id)}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Mark as read
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{nudge.message}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <p className="text-gray-500">No new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsTab;
