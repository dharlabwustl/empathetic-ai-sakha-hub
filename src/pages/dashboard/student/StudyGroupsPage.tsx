
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Users, Plus, MessageSquare, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfileBase } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  createdBy: string;
  createdAt: string;
  topics?: number;
  messages?: number;
  members: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
}

interface StudyGroupsPageProps {
  userProfile?: UserProfileBase;
}

const StudyGroupsPage: React.FC<StudyGroupsPageProps> = ({ userProfile }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('my-groups');
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Mock data for study groups
  const myGroups: StudyGroup[] = [
    {
      id: '1',
      name: 'Physics Study Circle',
      description: 'Group focused on advanced physics concepts for JEE',
      memberCount: 8,
      createdBy: 'Aman Kumar',
      createdAt: '2023-04-10',
      topics: 12,
      messages: 145,
      members: [
        { id: '1', name: 'Aman Kumar', avatar: '/avatars/01.png' },
        { id: '2', name: 'Priya Singh', avatar: '/avatars/02.png' },
      ]
    },
    {
      id: '2',
      name: 'Chemistry Champions',
      description: 'Organic chemistry focused study group for NEET aspirants',
      memberCount: 6,
      createdBy: 'Rahul Sharma',
      createdAt: '2023-03-22',
      topics: 8,
      messages: 97,
      members: [
        { id: '3', name: 'Rahul Sharma', avatar: '/avatars/03.png' },
        { id: '4', name: 'Neha Gupta', avatar: '/avatars/04.png' },
      ]
    }
  ];
  
  const availableGroups: StudyGroup[] = [
    {
      id: '3',
      name: 'Math Masters',
      description: 'Advanced calculus and algebra concepts for competitive exams',
      memberCount: 12,
      createdBy: 'Vikram Iyer',
      createdAt: '2023-02-15',
      topics: 15,
      messages: 203,
      members: [
        { id: '5', name: 'Vikram Iyer', avatar: '/avatars/05.png' },
        { id: '6', name: 'Ananya Patel', avatar: '/avatars/06.png' },
      ]
    },
    {
      id: '4',
      name: 'Biology Brainiacs',
      description: 'NEET preparation group focusing on biology concepts',
      memberCount: 9,
      createdBy: 'Deepak Verma',
      createdAt: '2023-01-30',
      topics: 10,
      messages: 132,
      members: [
        { id: '7', name: 'Deepak Verma', avatar: '/avatars/07.png' },
        { id: '8', name: 'Sneha Reddy', avatar: '/avatars/08.png' },
      ]
    }
  ];
  
  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a group name",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Success",
      description: `Created study group: ${newGroupName}`,
    });
    
    setNewGroupName('');
    setNewGroupDescription('');
    setDialogOpen(false);
  };
  
  const handleJoinGroup = (groupId: string) => {
    const group = availableGroups.find(g => g.id === groupId);
    if (group) {
      toast({
        title: "Success",
        description: `Joined ${group.name}`,
      });
    }
  };
  
  const isSubscriptionValid = () => {
    if (!userProfile || !userProfile.subscription) return false;
    
    if (typeof userProfile.subscription === 'object') {
      return userProfile.subscription.isActive && 
        (userProfile.subscription.planType === 'premium' || 
         userProfile.subscription.planType === 'enterprise');
    }
    
    return userProfile.subscription === 'premium' || userProfile.subscription === 'enterprise';
  };

  return (
    <SharedPageLayout
      title="Study Groups"
      subtitle="Collaborate with peers, share resources, and learn together"
    >
      <div className="space-y-6">
        {!isSubscriptionValid() && (
          <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="bg-amber-100 dark:bg-amber-800 p-3 rounded-full">
                  <Users className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-amber-800 dark:text-amber-300">Premium Feature</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Study Groups are available with Premium or Enterprise subscriptions. Upgrade now to unlock collaborative learning features.
                  </p>
                </div>
                <Button 
                  variant="default"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                  onClick={() => window.location.href = '/dashboard/student/subscription'}
                >
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex items-center justify-between">
          <Tabs 
            defaultValue="my-groups" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="my-groups">My Groups</TabsTrigger>
              <TabsTrigger value="available-groups">Available Groups</TabsTrigger>
            </TabsList>
            
            <div className="flex justify-end my-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button disabled={!isSubscriptionValid()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Group
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Study Group</DialogTitle>
                    <DialogDescription>
                      Create a study group to collaborate with peers on topics and subjects.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="group-name">Group Name</Label>
                      <Input
                        id="group-name"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        placeholder="e.g. Physics Champions"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="group-description">Description</Label>
                      <Textarea
                        id="group-description"
                        value={newGroupDescription}
                        onChange={(e) => setNewGroupDescription(e.target.value)}
                        placeholder="Describe the purpose and focus of your study group"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateGroup}>Create Group</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <TabsContent value="my-groups" className="space-y-4">
              {myGroups.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground">
                      You haven't joined any study groups yet. Create a new group or join an existing one.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myGroups.map((group) => (
                    <Card key={group.id} className="overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-900/20 dark:to-indigo-900/20">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Users className="h-5 w-5 text-sky-600" />
                          {group.name}
                        </CardTitle>
                        <CardDescription>Created by {group.createdBy} • {group.memberCount} members</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{group.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            {group.members.map((member, i) => (
                              <Avatar key={member.id} className={i > 0 ? "-ml-3 ring-2 ring-background" : ""}>
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                            ))}
                            {group.memberCount > 2 && (
                              <span className="ml-1 text-xs text-muted-foreground">+{group.memberCount - 2} more</span>
                            )}
                          </div>
                          <div className="flex gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              {group.messages} messages
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-gray-50 dark:bg-gray-800/50">
                        <Button variant="default" className="w-full" disabled={!isSubscriptionValid()}>
                          Enter Group
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="available-groups" className="space-y-4">
              {availableGroups.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground">
                      No available study groups at the moment. Check back later or create your own!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableGroups.map((group) => (
                    <Card key={group.id} className="overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Users className="h-5 w-5 text-indigo-600" />
                          {group.name}
                        </CardTitle>
                        <CardDescription>Created by {group.createdBy} • {group.memberCount} members</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{group.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            {group.members.map((member, i) => (
                              <Avatar key={member.id} className={i > 0 ? "-ml-3 ring-2 ring-background" : ""}>
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                            ))}
                            {group.memberCount > 2 && (
                              <span className="ml-1 text-xs text-muted-foreground">+{group.memberCount - 2} more</span>
                            )}
                          </div>
                          <div className="flex gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Share2 className="h-3 w-3 mr-1" />
                              {group.topics} topics
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-gray-50 dark:bg-gray-800/50">
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          disabled={!isSubscriptionValid()}
                          onClick={() => handleJoinGroup(group.id)}
                        >
                          Join Group
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default StudyGroupsPage;
