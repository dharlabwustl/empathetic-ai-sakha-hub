
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserProfileBase, SubscriptionTypeValue } from '@/types/user/base';
import { User, Calendar, Target } from 'lucide-react';

interface ProfileCardProps {
  userProfile: UserProfileBase;
  onEditProfile?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userProfile, onEditProfile }) => {
  const getSubscriptionDisplay = (subscription: any): string => {
    if (typeof subscription === 'string') {
      return subscription;
    }
    if (subscription && typeof subscription === 'object' && subscription.planType) {
      return subscription.planType;
    }
    return 'Free';
  };

  const getSubscriptionBadgeColor = (subscription: any): string => {
    const plan = getSubscriptionDisplay(subscription);
    switch (plan.toLowerCase()) {
      case 'premium':
      case 'pro':
        return 'bg-purple-100 text-purple-800';
      case 'basic':
        return 'bg-blue-100 text-blue-800';
      case 'enterprise':
        return 'bg-green-100 text-green-800';
      case 'group':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={userProfile.photoURL || userProfile.avatar} alt={userProfile.name} />
            <AvatarFallback>
              <User className="w-8 h-8" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl">{userProfile.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{userProfile.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={getSubscriptionBadgeColor(userProfile.subscription)}>
                {getSubscriptionDisplay(userProfile.subscription)}
              </Badge>
              {userProfile.examPreparation && (
                <Badge variant="outline">
                  {userProfile.examPreparation}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">{userProfile.loginCount || 0}</div>
            <div className="text-xs text-muted-foreground">Logins</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">{userProfile.goals?.length || 0}</div>
            <div className="text-xs text-muted-foreground">Goals</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">{userProfile.studyStreak || 0}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
        </div>

        {userProfile.lastLogin && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            Last active: {new Date(userProfile.lastLogin).toLocaleDateString()}
          </div>
        )}

        {onEditProfile && (
          <Button variant="outline" className="w-full" onClick={onEditProfile}>
            Edit Profile
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
