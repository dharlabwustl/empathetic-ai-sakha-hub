
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileType, SubscriptionType } from "@/types/user/base";
import { Users, MessageCircle, Star, Calendar, BookOpen, Lock, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CommunityTabProps {
  userProfile: UserProfileType;
}

const CommunityTab: React.FC<CommunityTabProps> = ({ userProfile }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('discussions');
  
  // Sample discussion topics
  const discussions = [
    {
      id: "disc-1",
      title: "How to approach complex integration problems?",
      author: "Aarav Singh",
      avatar: "/avatars/student1.jpg",
      replies: 14,
      lastActive: "2 hours ago",
      tags: ["mathematics", "calculus", "integration"],
      isPremium: false
    },
    {
      id: "disc-2",
      title: "Understanding Newton's third law with practical examples",
      author: "Priya Verma",
      avatar: "/avatars/student2.jpg",
      replies: 23,
      lastActive: "1 day ago",
      tags: ["physics", "mechanics", "newton laws"],
      isPremium: false
    },
    {
      id: "disc-3",
      title: "Study techniques that worked for JEE Advanced toppers",
      author: "Rajesh Kumar",
      avatar: "/avatars/student3.jpg",
      replies: 42,
      lastActive: "3 days ago",
      tags: ["study techniques", "exam preparation", "jee advanced"],
      isPremium: true
    }
  ];
  
  // Sample study groups
  const studyGroups = [
    {
      id: "group-1",
      name: "Physics Champions",
      members: 24,
      active: 6,
      description: "For physics enthusiasts preparing for JEE Advanced",
      leader: "Dr. Rajesh Sharma",
      nextSession: "Tomorrow, 6:00 PM",
      isPremium: false
    },
    {
      id: "group-2",
      name: "Calculus Masters",
      members: 18,
      active: 3,
      description: "Deep dive into advanced calculus problems",
      leader: "Prof. Ananya Gupta",
      nextSession: "Wednesday, 7:30 PM",
      isPremium: true
    },
    {
      id: "group-3",
      name: "Chemistry Lab",
      members: 32,
      active: 8,
      description: "Discussing organic chemistry reactions and mechanisms",
      leader: "Dr. Vikram Reddy",
      nextSession: "Friday, 5:00 PM",
      isPremium: false
    }
  ];
  
  // Sample study events
  const events = [
    {
      id: "event-1",
      title: "Mock JEE Test - Full Paper",
      date: "April 12, 2025",
      time: "10:00 AM - 1:00 PM",
      organizer: "PrepMasters Academy",
      participants: 156,
      description: "Full-length JEE Advanced mock test with instant analytics",
      isPremium: true
    },
    {
      id: "event-2",
      title: "Problem Solving Session - Mathematics",
      date: "April 15, 2025",
      time: "6:00 PM - 8:00 PM",
      organizer: "IIT Alumni Association",
      participants: 89,
      description: "Live problem solving session with IIT toppers",
      isPremium: false
    },
    {
      id: "event-3",
      title: "Chemistry Formula Revision Sprint",
      date: "April 18, 2025",
      time: "5:00 PM - 6:30 PM",
      organizer: "ChemGenius",
      participants: 112,
      description: "Quick revision of all important chemistry formulas",
      isPremium: false
    }
  ];
  
  // Helper function to determine if user has premium access
  const hasPremiumAccess = () => {
    if (!userProfile.subscription) return false;
    
    if (typeof userProfile.subscription === 'object') {
      return userProfile.subscription.plan !== SubscriptionType.Free && 
             userProfile.subscription.plan !== SubscriptionType.Basic;
    }
    
    return userProfile.subscription !== SubscriptionType.Free && 
           userProfile.subscription !== SubscriptionType.Basic;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Community</h2>
          <p className="text-muted-foreground">Connect with fellow students and join study groups</p>
        </div>
        
        <Button 
          onClick={() => navigate('/dashboard/student/community/create')}
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
        >
          <Users className="mr-2 h-4 w-4" />
          Create Study Group
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="studyGroups">Study Groups</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="discussions" className="space-y-4 mt-4">
          {discussions.map((discussion) => (
            <Card key={discussion.id} className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${discussion.isPremium && !hasPremiumAccess() ? 'opacity-70' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 mt-0.5">
                      <AvatarImage src={discussion.avatar} />
                      <AvatarFallback>{discussion.author.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{discussion.title}</h3>
                        {discussion.isPremium && (
                          <Badge variant="outline" className="text-xs bg-amber-100 text-amber-700 border-amber-200">
                            <Crown className="h-3 w-3 mr-1 text-amber-500" />
                            Premium
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <span>{discussion.author}</span>
                        <span>•</span>
                        <span>{discussion.lastActive}</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {discussion.replies} replies
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {discussion.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs px-2 py-0 h-5 bg-gray-50 dark:bg-gray-800">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="text-xs">
                    View Discussion
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="flex justify-center">
            <Button variant="outline" className="w-full md:w-auto">
              View More Discussions
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="studyGroups" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyGroups.map((group) => (
              <Card key={group.id} className={group.isPremium && !hasPremiumAccess() ? 'opacity-70' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        {group.name}
                        {group.isPremium && (
                          <Badge variant="outline" className="ml-2 text-xs bg-amber-100 text-amber-700 border-amber-200">
                            <Crown className="h-3 w-3 mr-1 text-amber-500" />
                            Premium
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div>
                      <div className="text-muted-foreground">Members</div>
                      <div className="font-medium">{group.members} total</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Online now</div>
                      <div className="font-medium">{group.active} members</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 text-amber-500 mr-2" />
                      <span>Led by {group.leader}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                      <span>Next: {group.nextSession}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    {group.isPremium && !hasPremiumAccess() ? (
                      <Button disabled={true} className="w-full text-sm flex gap-2 items-center">
                        <Lock className="h-4 w-4" />
                        Upgrade to Join
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full text-sm">
                        Join Group
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline" className="w-full md:w-auto">
              Explore All Study Groups
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-4 mt-4">
          {events.map((event) => (
            <Card key={event.id} className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${event.isPremium && !hasPremiumAccess() ? 'opacity-70' : ''}`}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 text-center min-w-[60px]">
                      <div className="text-xs text-blue-600 dark:text-blue-300">{event.date.split(',')[0].split(' ')[0]}</div>
                      <div className="text-xl font-bold text-blue-700 dark:text-blue-300">{event.date.split(',')[0].split(' ')[1]}</div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{event.title}</h3>
                        {event.isPremium && (
                          <Badge variant="outline" className="text-xs bg-amber-100 text-amber-700 border-amber-200">
                            <Crown className="h-3 w-3 mr-1 text-amber-500" />
                            Premium
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center flex-wrap gap-2 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {event.date}
                        </span>
                        <span>•</span>
                        <span>{event.time}</span>
                        <span>•</span>
                        <span>By {event.organizer}</span>
                      </div>
                      
                      <p className="text-sm mt-1">{event.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{event.participants}</span> participants
                    </div>
                    
                    {event.isPremium && !hasPremiumAccess() ? (
                      <Button disabled className="text-xs flex gap-2 items-center">
                        <Lock className="h-3.5 w-3.5" />
                        Requires Premium
                      </Button>
                    ) : (
                      <Button variant="outline" className="text-xs">
                        Join Event
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="flex justify-center">
            <Button variant="outline" className="w-full md:w-auto">
              View All Events
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityTab;
