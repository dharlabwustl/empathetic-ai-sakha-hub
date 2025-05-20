
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserProfileBase } from '@/types/user/base';
import { useIsMobile } from '@/hooks/use-mobile';
import MoodSelector from './MoodSelector';

interface EnhancedDashboardHeaderProps {
  userProfile: UserProfileBase;
  onMoodChange?: (mood: any) => void;
}

const EnhancedDashboardHeader: React.FC<EnhancedDashboardHeaderProps> = ({ 
  userProfile, 
  onMoodChange 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="mb-6">
      <CardHeader className={`pb-2 ${isMobile ? 'p-4' : ''}`}>
        <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'}`}>
          Welcome back, {userProfile?.name?.split(' ')[0] || 'Scholar'}!
        </CardTitle>
      </CardHeader>
      <CardContent className={`${isMobile ? 'p-4 pt-0' : 'pt-0'}`}>
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} mb-4 text-muted-foreground`}>
          How are you feeling today? Let us know so we can tailor your learning experience.
        </p>
        
        {onMoodChange && (
          <div>
            <MoodSelector 
              onMoodSelect={onMoodChange} 
              currentMood={userProfile?.currentMood} 
              compact={isMobile}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedDashboardHeader;
