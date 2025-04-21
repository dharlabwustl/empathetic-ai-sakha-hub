
import React from 'react';
import { UserProfileType } from "@/types/user/base";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users, MessageSquare, UserPlus, Star } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/utils/stringUtils';

interface CommunityTabProps {
  userProfile: UserProfileType;
}

interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  memberCount: number;
  activeMembers: number;
  lastActive: string;
  isMember: boolean;
  isPremium: boolean;
}

interface Discussion {
  id: string;
  title: string;
  author: {
    name: string;
    avatar?: string;
  };
  replies: number;
  createdAt: string;
  tags: string[];
}

const CommunityTab: React.FC<CommunityTabProps> = ({ userProfile }) => {
  // Sample study groups
  const studyGroups: StudyGroup[] = [
    {
      id: 'group-1',
      name: 'Physics Champions',
      subject: 'Physics',
      memberCount: 58,
      activeMembers: 12,
      lastActive: 'Just now',
      isMember: true,
      isPremium: false
    },
    {
      id: 'group-2',
      name: 'Math Masters',
      subject: 'Mathematics',
      memberCount: 45,
      activeMembers: 8,
      lastActive: '10 minutes ago',
      isMember: false,
      isPremium: false
    },
    {
      id: 'group-3',
      name: 'Chemistry Lab',
      subject: 'Chemistry',
      memberCount: 32,
      activeMembers: 5,
      lastActive: '1 hour ago',
      isMember: false,
      isPremium: true
    }
  ];

  // Sample discussions
  const discussions: Discussion[] = [
    {
      id: 'disc-1',
      title: 'How to approach JEE Advanced Physics questions?',
      author: {
        name: 'Rahul Sharma',
        avatar: undefined
      },
      replies: 24,
      createdAt: '2 hours ago',
      tags: ['Physics', 'JEE', 'Study Tips']
    },
    {
      id: 'disc-2',
      title: 'Chemistry formula shortcuts for quick revision',
      author: {
        name: 'Priya Patel',
        avatar: undefined
      },
      replies: 16,
      createdAt: '1 day ago',
      tags: ['Chemistry', 'Shortcuts', 'Revision']
    },
    {
      id: 'disc-3',
      title: 'Math practice problems for coordinate geometry',
      author: {
        name: 'Amit Kumar',
        avatar: undefined
      },
      replies: 8,
      createdAt: '3 days ago',
      tags: ['Mathematics', 'Geometry', 'Practice']
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Community</h2>
          <p className="text-muted-foreground mt-2">
            Connect with other students, join discussions, and participate in study groups.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            New Discussion
          </Button>
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Recent Discussions</h3>
          <div className="space-y-4">
            {discussions.map(discussion => (
              <Card key={discussion.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{discussion.title}</CardTitle>
                    <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                      {discussion.replies} replies
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {discussion.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={discussion.author.avatar} />
                      <AvatarFallback className="bg-indigo-100 text-indigo-800 text-xs">
                        {getInitials(discussion.author.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{discussion.author.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{discussion.createdAt}</span>
                </CardFooter>
              </Card>
            ))}
            <Button variant="outline" className="w-full">
              View All Discussions
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Study Groups</h3>
          <div className="space-y-4">
            {studyGroups.map(group => (
              <Card key={group.id} className={group.isMember ? "border-l-4 border-l-green-500" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg flex items-center gap-1">
                      {group.name}
                      {group.isPremium && (
                        <Star className="h-4 w-4 text-amber-500" />
                      )}
                    </CardTitle>
                    <Badge variant="outline">
                      {group.subject}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{group.memberCount} members</span>
                    </div>
                    <div className="text-green-600">
                      {group.activeMembers} active now
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Last active: {group.lastActive}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={group.isMember ? "outline" : "default"} 
                    className={`w-full ${group.isMember ? "border-green-200 text-green-700" : ""}`}
                    disabled={group.isPremium && userProfile.subscription === SubscriptionType.Free}
                  >
                    {group.isMember ? (
                      <>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Enter Group
                      </>
                    ) : group.isPremium && userProfile.subscription === SubscriptionType.Free ? (
                      <>
                        <Star className="mr-2 h-4 w-4" />
                        Premium Group
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Join Group
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
            <Button variant="outline" className="w-full">
              Browse All Groups
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityTab;
