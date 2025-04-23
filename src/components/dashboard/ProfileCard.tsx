
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { UserProfileType, MoodType } from '@/types/user/base';
import { CalendarDays, ChevronRight, Cloud, CreditCard, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import MoodSelector from './student/mood-tracking/MoodSelector';

export interface ProfileCardProps {
  userProfile: UserProfileType;
  onUploadImage?: (file: File) => void;
  showPeerRanking?: boolean;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  userProfile, 
  onUploadImage,
  showPeerRanking = false,
  currentMood,
  onMoodChange
}) => {
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onUploadImage) return;
    
    setIsUploading(true);
    try {
      onUploadImage(file);
    } finally {
      setIsUploading(false);
    }
  };

  // Get initials from name for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Format last active time
  const getLastActive = () => {
    if (!userProfile.lastLogin) return 'Never logged in';
    try {
      return formatDistanceToNow(new Date(userProfile.lastLogin), { addSuffix: true });
    } catch (error) {
      return 'Recently';
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-primary/40 to-primary/60 relative">
        {onUploadImage && (
          <div className="absolute top-2 right-2">
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <div className="bg-white dark:bg-gray-800 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-gray-600 dark:text-gray-300"
                >
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                  <line x1="16" y1="5" x2="22" y2="5"></line>
                  <line x1="19" y1="2" x2="19" y2="8"></line>
                  <circle cx="9" cy="9" r="2"></circle>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                </svg>
              </div>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </div>
        )}
      </div>
      
      <CardContent className="pt-0 pb-3">
        <div className="flex justify-center -mt-12">
          <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-800">
            {userProfile.avatar ? (
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
            ) : (
              <AvatarFallback className="text-xl bg-primary/20">
                {getInitials(userProfile.name)}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        
        <div className="text-center mt-3 space-y-1">
          <h3 className="font-semibold text-xl">{userProfile.name}</h3>
          <p className="text-sm text-muted-foreground">{userProfile.email}</p>
          
          <div className="flex justify-center space-x-2 mt-1">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              {userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)}
            </Badge>
            
            {userProfile.isVerified && (
              <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                Verified
              </Badge>
            )}
          </div>
          
          {/* Subscription Info */}
          {userProfile.subscription && (
            <div className="mt-3 py-2 border-t border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-center gap-2 text-sm">
                <CreditCard className="h-4 w-4 text-primary" />
                <span>
                  {userProfile.subscription.planName} Plan
                  {userProfile.subscription.status === 'trial' && " (Trial)"}
                </span>
              </div>
              {userProfile.isGroupLeader && (
                <div className="flex items-center justify-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>Group Leader</span>
                </div>
              )}
              <div className="flex items-center justify-center gap-1 mt-1 text-xs text-muted-foreground">
                <CalendarDays className="h-3 w-3" />
                <span>
                  {userProfile.subscription.status === 'active' ? 'Renews' : 'Expires'} on {' '}
                  {new Date(userProfile.subscription.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
          
          {/* Mood Selection */}
          {onMoodChange && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">How are you feeling today?</p>
              <MoodSelector 
                currentMood={currentMood || userProfile.mood || userProfile.currentMood} 
                onMoodSelect={onMoodChange}
              />
            </div>
          )}
          
          {/* Last active */}
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-2">
            <Cloud className="h-3 w-3" />
            <span>Last active: {getLastActive()}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2 pt-0">
        <Link to="/dashboard/student/profile" className="w-full">
          <Button variant="outline" className="w-full">
            View Profile
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
        
        {!userProfile.subscription?.planName?.toLowerCase().includes('premium') && (
          <Link to="/dashboard/student/subscription" className="w-full">
            <Button className="w-full">
              Upgrade Plan
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
