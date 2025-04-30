
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserProfileBase, SubscriptionType } from '@/types/user/base';
import { formatDistanceToNow } from 'date-fns';

interface ProfileCardProps {
  userProfile: UserProfileBase;
  className?: string;
}

export default function ProfileCard({ userProfile, className = '' }: ProfileCardProps) {
  const initials = userProfile.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
    
  const getSubscriptionBadge = () => {
    // Default to Free plan
    let plan = SubscriptionType.Free;
    
    if (userProfile.subscription) {
      if (typeof userProfile.subscription === 'object') {
        plan = userProfile.subscription.planType;
      } else {
        plan = userProfile.subscription;
      }
    }
    
    // Color mapping based on subscription type
    const badgeColors: Record<SubscriptionType, string> = {
      [SubscriptionType.Free]: 'bg-gray-100 text-gray-800 border-gray-200',
      [SubscriptionType.Basic]: 'bg-blue-100 text-blue-800 border-blue-200',
      [SubscriptionType.Premium]: 'bg-purple-100 text-purple-800 border-purple-200',
      [SubscriptionType.Pro]: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      [SubscriptionType.Enterprise]: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      [SubscriptionType.Trial]: 'bg-amber-100 text-amber-800 border-amber-200',
      [SubscriptionType.Custom]: 'bg-pink-100 text-pink-800 border-pink-200'
    };
    
    // Label mapping based on subscription type
    const badgeLabels: Record<SubscriptionType, string> = {
      [SubscriptionType.Free]: 'Free Plan',
      [SubscriptionType.Basic]: 'Basic Plan',
      [SubscriptionType.Premium]: 'Premium',
      [SubscriptionType.Pro]: 'Pro',
      [SubscriptionType.Enterprise]: 'Enterprise',
      [SubscriptionType.Trial]: 'Trial',
      [SubscriptionType.Custom]: 'Custom Plan'
    };
    
    return (
      <Badge 
        variant="outline" 
        className={`${badgeColors[plan]} text-xs font-normal ml-2`}
      >
        {badgeLabels[plan]}
      </Badge>
    );
  };
  
  const formatLastActive = () => {
    if (!userProfile.lastActive) return 'No activity yet';
    try {
      return `Last active ${formatDistanceToNow(new Date(userProfile.lastActive), { addSuffix: true })}`;
    } catch (e) {
      return 'Last active recently';
    }
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 border-2 border-white">
            <AvatarImage src={userProfile.avatarUrl || userProfile.avatar} />
            <AvatarFallback className="bg-violet-800 text-white">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-white flex items-center">
              {userProfile.name}
              {getSubscriptionBadge()}
            </CardTitle>
            <CardDescription className="text-violet-100 mt-0.5">
              {formatLastActive()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Study Streak</p>
            <p className="font-medium">{userProfile.streak || 0} days</p>
          </div>
          <div>
            <p className="text-muted-foreground">Study Hours</p>
            <p className="font-medium">{userProfile.studyHours || 0} hours</p>
          </div>
          <div>
            <p className="text-muted-foreground">Concepts</p>
            <p className="font-medium">{userProfile.conceptsLearned || 0} mastered</p>
          </div>
          <div>
            <p className="text-muted-foreground">Tests</p>
            <p className="font-medium">{userProfile.testsCompleted || 0} completed</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
