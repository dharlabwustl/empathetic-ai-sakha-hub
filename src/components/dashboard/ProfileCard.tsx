
import React from 'react';
import { UserProfileBase } from "@/types/user/base";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Star, Clock, Zap } from 'lucide-react';
import { SubscriptionType } from '@/types/user/base';

interface ProfileCardProps {
  profile: UserProfileBase;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  // Avatar initials
  const nameInitials = profile.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();
  
  // Determine subscription tier
  const getSubscriptionTier = () => {
    if (!profile.subscription) {
      return SubscriptionType.free;
    }
    
    if (typeof profile.subscription === 'string') {
      return profile.subscription;
    }
    
    return profile.subscription.type || SubscriptionType.free;
  };
  
  const subscriptionTier = getSubscriptionTier();
  
  // Subscription display elements
  const subscriptionColors: Record<SubscriptionType, string> = {
    [SubscriptionType.free]: "bg-gray-100 text-gray-800",
    [SubscriptionType.premium]: "bg-purple-100 text-purple-800",
    [SubscriptionType.pro_student]: "bg-amber-100 text-amber-800",
    [SubscriptionType.pro_educator]: "bg-emerald-100 text-emerald-800"
  };
  
  const subscriptionLabels: Record<SubscriptionType, string> = {
    [SubscriptionType.free]: "Free Plan",
    [SubscriptionType.premium]: "Premium",
    [SubscriptionType.pro_student]: "Pro Student",
    [SubscriptionType.pro_educator]: "Pro Educator"
  };
  
  return (
    <Card>
      <CardContent className="p-0">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30 p-5 relative">
          {/* Avatar and basic info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-white">
              <AvatarImage src={profile.avatarUrl} />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {nameInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{profile.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant="outline"
                  className={subscriptionColors[subscriptionTier] || "bg-gray-100 text-gray-800"}
                >
                  {subscriptionLabels[subscriptionTier] || "Free Plan"}
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Decorative star */}
          <div className="absolute right-5 top-5">
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          </div>
        </div>
        
        {/* Main content */}
        <div className="p-5">
          {/* Goal info */}
          <div className="mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Goal: </span>
              <Badge variant="secondary" className="ml-2">
                {profile.goals?.[0]?.title || "Not set"}
              </Badge>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-muted/40 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Study Streak</span>
              </div>
              <p className="text-xl font-semibold">{profile.streak || 0}</p>
            </div>
            <div className="bg-muted/40 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Hours Today</span>
              </div>
              <p className="text-xl font-semibold">{profile.dailyStudyHours || 0}</p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col space-y-2">
            <Button variant="default" className="w-full">View Profile</Button>
            <Button variant="outline" className="w-full flex items-center justify-center">
              <Trophy className="mr-2 h-4 w-4" />
              View Achievements
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
