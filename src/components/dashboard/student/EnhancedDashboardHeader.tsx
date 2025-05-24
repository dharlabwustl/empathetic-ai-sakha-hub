
import React from 'react';
import { Bell, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { getMoodEmoji } from './mood-tracking/moodUtils';

interface EnhancedDashboardHeaderProps {
  userProfile: UserProfileBase;
  onToggleSidebar: () => void;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
}

const moodDisplayNames: Record<MoodType, string> = {
  [MoodType.Happy]: 'Happy',
  [MoodType.Motivated]: 'Motivated',
  [MoodType.Focused]: 'Focused',
  [MoodType.Calm]: 'Calm',
  [MoodType.Tired]: 'Tired',
  [MoodType.Confused]: 'Confused',
  [MoodType.Anxious]: 'Anxious',
  [MoodType.Stressed]: 'Stressed',
  [MoodType.Overwhelmed]: 'Overwhelmed',
  [MoodType.Neutral]: 'Neutral',
  [MoodType.Okay]: 'Okay',
  [MoodType.Sad]: 'Sad',
  [MoodType.Curious]: 'Curious'
};

const EnhancedDashboardHeader: React.FC<EnhancedDashboardHeaderProps> = ({
  userProfile,
  onToggleSidebar,
  onOpenNotifications,
  onOpenSettings
}) => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {greeting}, {userProfile.name || 'Student'}!
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ready to continue your learning journey?
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {userProfile.mood && (
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
              <span>{getMoodEmoji(userProfile.mood)}</span>
              <span className="text-sm font-medium">{moodDisplayNames[userProfile.mood]}</span>
            </div>
          )}
          
          <Button variant="ghost" size="sm" onClick={onOpenNotifications}>
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="sm" onClick={onOpenSettings}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default EnhancedDashboardHeader;
