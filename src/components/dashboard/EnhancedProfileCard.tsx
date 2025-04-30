
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserProfileBase, SubscriptionType } from '@/types/user/base';
import { formatDistanceToNow } from 'date-fns';
import { Award, Clock, Flame, Star } from 'lucide-react';

interface EnhancedProfileCardProps {
  userProfile: UserProfileBase;
  className?: string;
}

export default function EnhancedProfileCard({ userProfile, className = '' }: EnhancedProfileCardProps) {
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

  const goalText = userProfile.goals && userProfile.goals.length > 0 
    ? userProfile.goals[0].title
    : "No goal set";

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-white">
            <AvatarImage src={userProfile.avatarUrl || userProfile.avatar} />
            <AvatarFallback className="bg-violet-800 text-white text-xl">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-white flex items-center text-xl">
              {userProfile.name}
              {getSubscriptionBadge()}
            </CardTitle>
            <CardDescription className="text-violet-100 mt-0.5 flex items-center">
              <Clock className="h-3 w-3 mr-1 opacity-70" />
              {formatLastActive()}
            </CardDescription>
            <div className="mt-2 flex items-center">
              <Badge variant="secondary" className="bg-white/20 text-white border-none">
                {goalText}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-3">
              <Flame className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Study Streak</p>
              <p className="font-medium text-base">{userProfile.streak || 0} days</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
              <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Study Hours</p>
              <p className="font-medium text-base">{userProfile.studyHours || 0} hours</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mr-3">
              <Star className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Concepts</p>
              <p className="font-medium text-base">{userProfile.conceptsLearned || 0} mastered</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-3">
              <Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Tests</p>
              <p className="font-medium text-base">{userProfile.testsCompleted || 0} completed</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
