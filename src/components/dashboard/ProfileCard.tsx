
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BadgeCheck, ChevronRight, CreditCard, Calendar } from 'lucide-react';
import { UserProfileType } from '@/types/user/base';

interface ProfileCardProps {
  userProfile: UserProfileType;
  showStats?: boolean;
}

interface UserSubscription {
  planName: string;
  status: 'active' | 'inactive' | 'trial';
  endDate: string;
  isGroupLeader?: boolean;
}

// Helper to format date
const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

const ProfileCard: React.FC<ProfileCardProps> = ({ userProfile, showStats = true }) => {
  // Default avatar
  const defaultAvatar = 'https://github.com/shadcn.png';
  const avatarSrc = userProfile?.avatar || defaultAvatar;
  
  // Get user's initials for avatar fallback
  const getInitials = () => {
    if (!userProfile?.name) return 'U';
    
    const nameArray = userProfile.name.split(' ');
    if (nameArray.length === 1) return nameArray[0][0];
    return `${nameArray[0][0]}${nameArray[nameArray.length - 1][0]}`;
  };
  
  // Safely handle subscription data
  const userSubscription: UserSubscription = userProfile?.subscription || {
    planName: 'Free Trial',
    status: 'trial',
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };
  
  return (
    <Card className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
      <div className="h-12 bg-gradient-to-r from-blue-500 to-violet-600"></div>
      <CardContent className="p-0">
        <div className="px-6 pt-0 pb-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-center -mt-6">
            <Avatar className="h-20 w-20 border-4 border-white dark:border-gray-900 shadow-md">
              <AvatarImage src={avatarSrc} alt={userProfile?.name || 'User'} />
              <AvatarFallback className="bg-gradient-to-tr from-blue-500 to-violet-600 text-white">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            
            <div className="mt-4 sm:mt-0 sm:ml-4 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium flex items-center">
                    {userProfile?.name}
                    {userProfile?.isVerified && (
                      <BadgeCheck className="ml-1 h-4 w-4 text-blue-500" />
                    )}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {userProfile?.email}
                  </p>
                </div>
                
                <div className="mt-2 sm:mt-0 flex flex-wrap gap-2">
                  <Link to="/dashboard/student/profile">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      View Profile
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  </Link>
                  
                  <Link to="/dashboard/student/subscription">
                    <Button variant="default" size="sm" className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700">
                      Upgrade Plan
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subscription Info */}
          <div className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">{userSubscription.planName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {userSubscription.status === 'trial' ? 'Trial ends' : 'Renews'} on {formatDate(userSubscription.endDate)}
                  </p>
                </div>
              </div>
              
              {userSubscription.isGroupLeader && (
                <span className="inline-flex items-center rounded-md bg-amber-50 dark:bg-amber-900/50 px-2 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
                  Batch Leader
                </span>
              )}
            </div>
          </div>
          
          {/* Stats */}
          {showStats && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Study Time</p>
                <p className="text-lg font-medium">{userProfile?.totalStudyHours || 0}h</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Accuracy</p>
                <p className="text-lg font-medium">{userProfile?.accuracyRate || 0}%</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Streak</p>
                <p className="text-lg font-medium">{userProfile?.streakDays || 0} days</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Lessons</p>
                <p className="text-lg font-medium">{userProfile?.completedLessons || 0}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
