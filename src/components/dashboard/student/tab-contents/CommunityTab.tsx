
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserProfileType } from "@/types/user/base";
import { UserSubscription } from "@/types/user/subscription";
import { Users, MessageSquare, UserPlus, Lock, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommunityTabProps {
  userProfile: UserProfileType;
}

const CommunityTab: React.FC<CommunityTabProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState("batch");
  const hasGroupSubscription = typeof userProfile.subscription === 'object' && 
    userProfile.subscription && 
    'plan' in userProfile.subscription && 
    userProfile.subscription.plan === 'group';

  // Sample data for the community tab
  const studyGroups = [
    {
      id: "1",
      name: "IIT-JEE Physics Masters",
      members: 12,
      lastActive: "2 hours ago",
      isPrivate: false
    },
    {
      id: "2",
      name: "Chemistry Study Circle",
      members: 8,
      lastActive: "5 minutes ago",
      isPrivate: false
    },
    {
      id: "3",
      name: "Math Problem Solvers",
      members: 15,
      lastActive: "Just now",
      isPrivate: false
    },
    {
      id: "4",
      name: "Premium - Advanced Physics",
      members: 5,
      lastActive: "1 day ago",
      isPrivate: true
    }
  ];

  const discussionForums = [
    {
      id: "1",
      title: "Tips for solving integral problems?",
      author: "Rahul S.",
      replies: 24,
      lastActive: "10 minutes ago",
      isPopular: true
    },
    {
      id: "2",
      title: "How to memorize periodic table effectively?",
      author: "Priya M.",
      replies: 36,
      lastActive: "2 hours ago",
      isPopular: true
    },
    {
      id: "3",
      title: "Need help with Newton's laws application",
      author: "Arjun K.",
      replies: 12,
      lastActive: "1 day ago",
      isPopular: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Community</h2>
        <div className="flex space-x-2">
          <Button 
            variant={activeTab === "batch" ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveTab("batch")}
          >
            Batch
          </Button>
          <Button 
            variant={activeTab === "groups" ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveTab("groups")}
          >
            Study Groups
          </Button>
          <Button 
            variant={activeTab === "forums" ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveTab("forums")}
          >
            Forums
          </Button>
        </div>
      </div>

      {activeTab === "batch" && (
        <div>
          {userProfile.batchName ? (
            <Card>
              <CardHeader>
                <CardTitle>{userProfile.batchName}</CardTitle>
                <CardDescription>Your study batch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      <span>Batch Members:</span>
                    </div>
                    <span>24 Students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-green-500" />
                      <span>Batch Discussion:</span>
                    </div>
                    <span>Active</span>
                  </div>
                  <div className="mt-4">
                    <Button className="w-full">Go to Batch Discussion</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Join a Batch</CardTitle>
                <CardDescription>Enter your batch code or create one as a leader</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Have a batch code?</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Enter batch code" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                      />
                      <Button>Join</Button>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">OR</span>
                    </div>
                  </div>
                  <div>
                    {hasGroupSubscription ? (
                      <Button variant="outline" className="w-full">Create Your Batch</Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        <Lock className="h-3 w-3 mr-2" />
                        Upgrade to Group Plan to Create
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === "groups" && (
        <div className="space-y-4">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Create New Study Group
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studyGroups.map(group => (
              <Card key={group.id} className="cursor-pointer hover:bg-accent/10 transition-colors">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium flex items-center">
                      {group.name}
                      {group.isPrivate && (
                        <Lock className="h-3 w-3 ml-2 text-amber-500" />
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {group.members} members • Active {group.lastActive}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "forums" && (
        <div className="space-y-6">
          <Button>Start a New Discussion</Button>
          
          <div className="space-y-4">
            {discussionForums.map(forum => (
              <Card key={forum.id} className="cursor-pointer hover:bg-accent/10 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-medium flex items-center">
                        {forum.title}
                        {forum.isPopular && (
                          <span className="ml-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            Popular
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>{forum.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          {forum.author} • {forum.replies} replies • {forum.lastActive}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityTab;
