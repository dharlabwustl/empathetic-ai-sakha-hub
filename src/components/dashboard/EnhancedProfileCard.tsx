
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Edit2, Settings2 } from "lucide-react";
import { UserProfileBase, SubscriptionType } from "@/types/user/base";
import { formatDistanceToNow } from "date-fns";

interface EnhancedProfileCardProps {
  userProfile: UserProfileBase;
  className?: string;
  onEditProfile?: () => void;
  onOpenSettings?: () => void;
}

export function EnhancedProfileCard({ 
  userProfile, 
  className = "",
  onEditProfile,
  onOpenSettings
}: EnhancedProfileCardProps) {
  // Determine subscription display info
  const getSubscriptionInfo = () => {
    let planType = "free";
    if (typeof userProfile.subscription === 'object' && userProfile.subscription) {
      planType = userProfile.subscription.planType;
    } else if (typeof userProfile.subscription === 'string') {
      planType = userProfile.subscription;
    }

    const subscriptionColors: Record<string, string> = {
      free: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      basic: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      premium: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      enterprise: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      trial: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      pro_annual: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      pro_monthly: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300"
    };
    
    const subscriptionLabels: Record<string, string> = {
      free: "Free",
      basic: "Basic",
      premium: "Premium",
      enterprise: "Enterprise",
      trial: "Trial",
      pro_annual: "Pro (Annual)",
      pro_monthly: "Pro (Monthly)",
      custom: "Custom"
    };

    const color = subscriptionColors[planType.toLowerCase()] || subscriptionColors.free;
    const label = subscriptionLabels[planType.toLowerCase()] || "Unknown";
    
    return { color, label };
  };
  
  const subscriptionInfo = getSubscriptionInfo();
  
  // Format last active time if available
  const lastActiveText = userProfile.lastActive 
    ? `Last active ${formatDistanceToNow(new Date(userProfile.lastActive), { addSuffix: true })}` 
    : "Never logged in";
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const avatarUrl = userProfile.avatarUrl || userProfile.avatar || '';
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Avatar className="h-20 w-20 mr-4 border-2 border-primary/20">
              {avatarUrl ? <AvatarImage src={avatarUrl} alt={userProfile.name} /> : null}
              <AvatarFallback className="text-lg bg-primary/10 text-primary">
                {getInitials(userProfile.name)}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="text-xl font-semibold">{userProfile.name}</h3>
              <div className="flex items-center mt-1 space-x-2">
                <Badge variant="outline" className={subscriptionInfo.color}>
                  {subscriptionInfo.label}
                </Badge>
                
                <span className="text-xs text-muted-foreground">
                  {userProfile.email}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{lastActiveText}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {onEditProfile && (
              <Button size="icon" variant="ghost" onClick={onEditProfile}>
                <Edit2 className="h-4 w-4" />
              </Button>
            )}
            {onOpenSettings && (
              <Button size="icon" variant="ghost" onClick={onOpenSettings}>
                <Settings2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <Separator className="my-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Study Streak</span>
                <span className="text-sm">{userProfile.streak || 0} days</span>
              </div>
              <Progress value={Math.min(((userProfile.streak || 0) / 30) * 100, 100)} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Study Hours</span>
                <span className="text-sm">{userProfile.studyHours || 0} hours</span>
              </div>
              <Progress value={Math.min(((userProfile.studyHours || 0) / 100) * 100, 100)} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Concepts Learned</span>
                <span className="text-sm">{userProfile.conceptsLearned || 0} concepts</span>
              </div>
              <Progress value={Math.min(((userProfile.conceptsLearned || 0) / 200) * 100, 100)} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Tests Completed</span>
                <span className="text-sm">{userProfile.testsCompleted || 0} tests</span>
              </div>
              <Progress value={Math.min(((userProfile.testsCompleted || 0) / 50) * 100, 100)} className="h-2" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-muted/40 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Current Goal</h4>
              <p className="text-sm">{userProfile.goals?.length ? userProfile.goals[0].title : "No goal set"}</p>
              {userProfile.goals?.[0]?.targetDate && (
                <p className="text-xs text-muted-foreground mt-1">
                  Target date: {new Date(userProfile.goals[0].targetDate).toLocaleDateString()}
                </p>
              )}
            </div>
            
            <div className="bg-muted/40 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Study Preferences</h4>
              <p className="text-sm">Personality: {userProfile.personality || "Not set"}</p>
              <p className="text-sm mt-1">Current mood: {userProfile.mood || "Not set"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
