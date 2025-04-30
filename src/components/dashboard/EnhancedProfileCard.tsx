
import React, { useState } from 'react';
import { UserProfileBase } from "@/types/user/base";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Star, 
  Clock, 
  Calendar, 
  BookOpen, 
  FileText, 
  Brain, 
  Award, 
  Zap, 
  ChevronRight,
  User,
  Sparkles
} from 'lucide-react';
import { SubscriptionType } from '@/types/user/base';

interface EnhancedProfileCardProps {
  profile: UserProfileBase;
  showDetails?: boolean;
  className?: string;
}

export function EnhancedProfileCard({ profile, showDetails = false, className }: EnhancedProfileCardProps) {
  const [activeTab, setActiveTab] = useState("stats");
  
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
  
  const subscriptionBadgeColor = subscriptionColors[subscriptionTier] || "bg-gray-100 text-gray-800";
  const subscriptionLabel = subscriptionLabels[subscriptionTier] || "Free Plan";
  
  // Engagement metrics (mock data for UI demonstration)
  const engagementStats = [
    { label: "Study Streak", value: profile.streak || 0, icon: Zap },
    { label: "Hours Studied", value: profile.studyHours || 0, icon: Clock },
    { label: "Concepts Learned", value: profile.conceptsLearned || 0, icon: BookOpen },
    { label: "Tests Completed", value: profile.testsCompleted || 0, icon: FileText }
  ];
  
  // Achievements (mock data)
  const achievements = [
    { name: "7-Day Study Streak", icon: Zap, description: "Studied for 7 consecutive days" },
    { name: "Concept Master", icon: BookOpen, description: "Completed 50 concept cards" },
    { name: "Quiz Champion", icon: Trophy, description: "Scored 90%+ in 5 quizzes" },
    { name: "Early Bird", icon: Calendar, description: "Studied before 8 AM for 5 days" }
  ];
  
  // Subject progress (mock data)
  const subjectProgress = [
    { subject: "Physics", progress: 65 },
    { subject: "Chemistry", progress: 78 },
    { subject: "Mathematics", progress: 42 }
  ];
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0">
        {/* Header with avatar and basic info */}
        <div className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30 p-5 relative">
          <div className="flex items-center gap-4 mb-2">
            <Avatar className="h-16 w-16 border-2 border-white">
              <AvatarImage src={profile.avatarUrl} />
              <AvatarFallback className="bg-primary text-lg">
                {nameInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{profile.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={subscriptionBadgeColor}>
                  {subscriptionLabel}
                </Badge>
                {profile.verified && (
                  <Badge variant="outline" className="bg-emerald-100 text-emerald-800">Verified</Badge>
                )}
              </div>
            </div>
          </div>
          
          {/* User goal info */}
          <div className="pl-20">
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Goal: </span>
              <Badge variant="secondary" className="ml-2">
                {profile.goals?.[0]?.title || "Not set"}
              </Badge>
            </div>
            {profile.loginCount && profile.loginCount > 1 && (
              <div className="text-xs mt-1 text-muted-foreground">Last login: 2 days ago</div>
            )}
          </div>
          
          {/* Decorative elements */}
          <div className="absolute right-5 top-5">
            <div className="relative">
              <Star className="h-5 w-5 text-amber-500" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs h-4 w-4 flex items-center justify-center">
                5
              </span>
            </div>
          </div>
        </div>
        
        {/* Content tabs - only show if showDetails is true */}
        {showDetails && (
          <>
            <Tabs defaultValue="stats" value={activeTab} onValueChange={setActiveTab}>
              <div className="px-5 border-b">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                  <TabsTrigger value="subjects">Subjects</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="stats" className="m-0 p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {engagementStats.map((stat, idx) => (
                    <div key={idx} className="bg-muted/40 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <stat.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                      </div>
                      <p className="text-xl font-semibold">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="subjects" className="m-0 p-5 space-y-4">
                <div className="space-y-3">
                  {subjectProgress.map((subject, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{subject.subject}</span>
                        <span>{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="achievements" className="m-0 p-5 space-y-2">
                {achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <achievement.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-sm">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                    <Award className="h-5 w-5 text-yellow-500" />
                  </div>
                ))}
              </TabsContent>
            </Tabs>
            
            <div className="p-5 pt-2 flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>Points: 450</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-3 w-3" />
                  <span>Rank: 234</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                View Profile
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </>
        )}
        
        {/* Simplified view for non-detailed cards */}
        {!showDetails && (
          <div className="p-5">
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
                  <span className="text-sm text-muted-foreground">Study Hours</span>
                </div>
                <p className="text-xl font-semibold">{profile.studyHours || 0}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Trophy className="h-3 w-3" />
                <span>{profile.achievements?.length || 0} achievements</span>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                <User className="mr-1 h-3 w-3" />
                View Profile
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
