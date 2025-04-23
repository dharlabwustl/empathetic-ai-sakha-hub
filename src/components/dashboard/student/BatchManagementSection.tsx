import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Plus, ChevronRight, Clock } from "lucide-react";
import { UserSubscription } from '@/types/user/subscription';

interface BatchManagementSectionProps {
  userSubscription?: UserSubscription | null;
}

const BatchManagementSection: React.FC<BatchManagementSectionProps> = ({ userSubscription }) => {
  const hasActiveSubscription = userSubscription && userSubscription.status === 'active';
  const isTeamPlan = userSubscription && userSubscription.maxMembers && userSubscription.maxMembers > 1;
  const currentMembers = userSubscription?.currentMembers || 1;
  const maxMembers = userSubscription?.maxMembers || 1;

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-medium">Team Management</CardTitle>
        <CardDescription>
          {hasActiveSubscription && isTeamPlan ? (
            <>
              Manage your team members and track their progress.
              <br />
              <span className="text-sm text-muted-foreground">
                {currentMembers} / {maxMembers} members
              </span>
            </>
          ) : (
            "Unlock team features to collaborate with friends and colleagues."
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {hasActiveSubscription && isTeamPlan ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="Team Member" />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 -ml-2">
                  <AvatarImage src="/avatars/02.png" alt="Team Member" />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 -ml-2">
                  <AvatarImage src="/avatars/03.png" alt="Team Member" />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
                {currentMembers < maxMembers && (
                  <Avatar className="h-8 w-8 -ml-2">
                    <div className="h-full w-full rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      <Plus className="h-4 w-4" />
                    </div>
                  </Avatar>
                )}
                {currentMembers > 3 && (
                  <div className="ml-2">
                    <Badge variant="secondary">+{currentMembers - 3}</Badge>
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm">
                Manage Team
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Last active 2 hours ago
                </span>
              </div>
              <Button variant="ghost" size="sm">
                View Activity <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-sky-50 border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Collaborate with Friends
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Study together and track progress.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-sky-500" />
                  <span className="text-sm">Up to 5 members</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Upgrade to Team Plan
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-amber-50 border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Share Notes & Resources
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Centralize study materials and notes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-amber-500" />
                  <span className="text-sm">Unlimited resources</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Explore Team Features
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </CardContent>
      <CardFooter className="px-0 pt-3">
      </CardFooter>
    </Card>
  );
};

export default BatchManagementSection;
