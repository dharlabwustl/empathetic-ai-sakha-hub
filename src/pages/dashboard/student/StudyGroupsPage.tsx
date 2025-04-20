
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import DashboardLoading from './DashboardLoading';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MessageSquare, 
  Search, 
  PlusCircle, 
  Share2,
  BookOpen,
  Calendar
} from 'lucide-react';
import { BatchMember } from '@/components/subscription/batch/types';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  members: BatchMember[];
  totalMessages: number;
  lastActive: string;
  topics: {
    id: string;
    name: string;
    messageCount: number;
    lastMessage: string;
  }[];
}

export default function StudyGroupsPage() {
  const {
    userProfile,
    loading,
    activeTab,
    showWelcomeTour,
    hideTabsNav,
    hideSidebar,
    kpis,
    nudges,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    showStudyPlan,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav
  } = useStudentDashboard();
  
  const [currentTab, setCurrentTab] = useState<'all' | 'mine' | 'discover'>('all');
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Mock data initialization
    setTimeout(() => {
      const mockGroups: StudyGroup[] = [
        {
          id: '1',
          name: 'JEE Physics Masters',
          description: 'Group for discussing JEE Physics topics and problem-solving',
          createdAt: new Date().toISOString(),
          members: [
            {
              id: 'current-user-id',
              name: userProfile?.name || 'Current User',
              email: userProfile?.email || 'user@example.com',
              role: 'leader',
              status: 'active',
              joinedDate: new Date().toISOString()
            },
            {
              id: '2',
              name: 'Raj Patel',
              email: 'raj.patel@example.com',
              role: 'member',
              status: 'active',
              joinedDate: new Date().toISOString()
            },
          ],
          totalMessages: 128,
          lastActive: new Date().toISOString(),
          topics: [
            {
              id: '1',
              name: 'Mechanics',
              messageCount: 45,
              lastMessage: 'Can someone explain Newton\'s Third Law?'
            },
            {
              id: '2',
              name: 'Electromagnetism',
              messageCount: 32,
              lastMessage: 'Here\'s a tricky problem about magnetic fields'
            }
          ]
        },
        {
          id: '2',
          name: 'Chemistry Study Circle',
          description: 'Group for organic and inorganic chemistry discussions',
          createdAt: new Date().toISOString(),
          members: [
            {
              id: '3',
              name: 'Priya Sharma',
              email: 'priya.sharma@example.com',
              role: 'leader',
              status: 'active',
              joinedDate: new Date().toISOString()
            },
            {
              id: 'current-user-id',
              name: userProfile?.name || 'Current User',
              email: userProfile?.email || 'user@example.com',
              role: 'member',
              status: 'active',
              joinedDate: new Date().toISOString()
            },
          ],
          totalMessages: 94,
          lastActive: new Date(Date.now() - 86400000).toISOString(), // yesterday
          topics: [
            {
              id: '1',
              name: 'Organic Reactions',
              messageCount: 38,
              lastMessage: 'Let\'s discuss SN1 vs SN2 mechanisms'
            }
          ]
        }
      ];
      
      setStudyGroups(mockGroups);
      setIsLoading(false);
    }, 1000);
  }, [userProfile]);
  
  const filteredGroups = studyGroups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const myGroups = studyGroups.filter(group => 
    group.members.some(member => member.id === 'current-user-id')
  );
  
  const discoverGroups = studyGroups.filter(group => 
    !group.members.some(member => member.id === 'current-user-id')
  );
  
  const handleCreateGroup = () => {
    toast({
      title: "Creating new study group",
      description: "This feature will be available soon",
    });
  };
  
  const handleJoinGroup = (groupId: string) => {
    toast({
      title: "Joining study group",
      description: "This feature will be available soon",
    });
  };

  const handleSelectGroup = (group: StudyGroup) => {
    setSelectedGroup(group);
  };

  if (isLoading || !userProfile) {
    return <DashboardLoading />;
  }

  return (
    <DashboardLayout
      userProfile={userProfile}
      hideSidebar={hideSidebar}
      hideTabsNav={hideTabsNav}
      activeTab={activeTab}
      kpis={kpis}
      nudges={nudges}
      markNudgeAsRead={markNudgeAsRead}
      showWelcomeTour={showWelcomeTour}
      onTabChange={handleTabChange}
      onViewStudyPlan={handleViewStudyPlan}
      onToggleSidebar={toggleSidebar}
      onToggleTabsNav={toggleTabsNav}
      onSkipTour={handleSkipTour}
      onCompleteTour={handleCompleteTour}
      showStudyPlan={showStudyPlan}
      onCloseStudyPlan={handleCloseStudyPlan}
    >
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Study Groups</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Collaborate with peers on your exam preparations
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button onClick={handleCreateGroup} className="flex items-center gap-2">
              <PlusCircle size={16} />
              Create Group
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard/student/batch')}
              className="flex items-center gap-2"
            >
              <Users size={16} />
              Manage Batches
            </Button>
          </div>
        </div>
        
        {selectedGroup ? (
          <StudyGroupDetail 
            group={selectedGroup} 
            onBack={() => setSelectedGroup(null)} 
          />
        ) : (
          <>
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search study groups..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
            </div>
            
            <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as any)} className="mb-6">
              <TabsList>
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Users size={16} />
                  All Groups
                </TabsTrigger>
                <TabsTrigger value="mine" className="flex items-center gap-2">
                  <BookOpen size={16} />
                  My Groups
                </TabsTrigger>
                <TabsTrigger value="discover" className="flex items-center gap-2">
                  <Search size={16} />
                  Discover
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredGroups.length > 0 ? (
                    filteredGroups.map(group => (
                      <StudyGroupCard 
                        key={group.id} 
                        group={group} 
                        isMember={group.members.some(m => m.id === 'current-user-id')}
                        onSelect={() => handleSelectGroup(group)}
                        onJoin={() => handleJoinGroup(group.id)}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 p-8 text-center">
                      <p className="text-lg text-gray-500 dark:text-gray-400">No study groups found</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="mine">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myGroups.length > 0 ? (
                    myGroups.map(group => (
                      <StudyGroupCard 
                        key={group.id} 
                        group={group} 
                        isMember={true}
                        onSelect={() => handleSelectGroup(group)}
                        onJoin={() => {}}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 p-8 text-center">
                      <p className="text-lg text-gray-500 dark:text-gray-400">You haven't joined any study groups yet</p>
                      <Button variant="outline" className="mt-4" onClick={() => setCurrentTab('discover')}>
                        Discover Groups
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="discover">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {discoverGroups.length > 0 ? (
                    discoverGroups.map(group => (
                      <StudyGroupCard 
                        key={group.id} 
                        group={group} 
                        isMember={false}
                        onSelect={() => handleSelectGroup(group)}
                        onJoin={() => handleJoinGroup(group.id)}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 p-8 text-center">
                      <p className="text-lg text-gray-500 dark:text-gray-400">No new study groups to discover</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

interface StudyGroupCardProps {
  group: StudyGroup;
  isMember: boolean;
  onSelect: () => void;
  onJoin: () => void;
}

const StudyGroupCard: React.FC<StudyGroupCardProps> = ({
  group,
  isMember,
  onSelect,
  onJoin
}) => {
  return (
    <Card className="cursor-pointer transition-transform hover:scale-[1.01]" onClick={onSelect}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{group.name}</CardTitle>
            <CardDescription>{group.description}</CardDescription>
          </div>
          {isMember ? (
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              Joined
            </Badge>
          ) : (
            <Button variant="outline" size="sm" onClick={(e) => {
              e.stopPropagation();
              onJoin();
            }}>
              Join
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex -space-x-2">
            {group.members.slice(0, 3).map((member, index) => (
              <Avatar key={index} className="border-2 border-white dark:border-gray-800 rounded-full w-8 h-8">
                {member.avatar ? (
                  <AvatarImage src={member.avatar} alt={member.name} />
                ) : (
                  <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                )}
              </Avatar>
            ))}
            
            {group.members.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs">
                +{group.members.length - 3}
              </div>
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MessageSquare size={14} className="mr-1" />
            {group.totalMessages} messages
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar size={12} className="mr-1" /> 
            Created {new Date(group.createdAt).toLocaleDateString()}
          </div>
          <div>
            Last active {new Date(group.lastActive).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface StudyGroupDetailProps {
  group: StudyGroup;
  onBack: () => void;
}

const StudyGroupDetail: React.FC<StudyGroupDetailProps> = ({
  group,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'discussions' | 'members' | 'resources'>('discussions');
  const [message, setMessage] = useState('');
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // In a real app, we would send this to a server
    console.log('Sending message:', message);
    setMessage('');
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-0 h-8 w-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <span className="sr-only">Back</span>
          </Button>
          <CardTitle className="flex-grow">{group.name}</CardTitle>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Share2 size={14} />
            Share
          </Button>
        </div>
        <CardDescription>{group.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="members">Members ({group.members.length})</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="discussions" className="space-y-4 mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Topics</h3>
              
              {group.topics.map(topic => (
                <Card key={topic.id} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <CardHeader className="p-4">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">{topic.name}</CardTitle>
                      <Badge variant="outline">{topic.messageCount} messages</Badge>
                    </div>
                    <CardDescription className="italic">"{topic.lastMessage}"</CardDescription>
                  </CardHeader>
                </Card>
              ))}
              
              <Button variant="outline" className="w-full">
                <PlusCircle size={16} className="mr-2" />
                Create New Topic
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium mb-3">Group Chat</h3>
              
              <div className="h-64 rounded-md border p-4 mb-4 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>RP</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg max-w-[80%]">
                      <div className="font-medium text-sm">Raj Patel</div>
                      <div className="text-sm">Has anyone started solving the mechanics problems set?</div>
                      <div className="text-xs text-gray-500 mt-1">Today, 14:32</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-end">
                    <div className="bg-primary/10 p-3 rounded-lg max-w-[80%]">
                      <div className="text-sm">Yes, I'm working on it now. The third problem is quite challenging!</div>
                      <div className="text-xs text-gray-500 mt-1">Today, 14:35</div>
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input 
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow"
                />
                <Button type="submit">Send</Button>
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="members" className="mt-4">
            <div className="space-y-4">
              {group.members.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-2 border-b last:border-b-0">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      {member.avatar ? (
                        <AvatarImage src={member.avatar} alt={member.name} />
                      ) : (
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {member.name}
                        {member.role === 'leader' && (
                          <Badge variant="secondary" className="text-xs py-0 px-1.5 h-5">Leader</Badge>
                        )}
                        <div className="w-2 h-2 bg-green-500 rounded-full" title="Online"></div>
                      </div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  </div>
                  
                  {member.id !== 'current-user-id' && (
                    <Button variant="ghost" size="sm">
                      <MessageSquare size={16} className="mr-2" />
                      Message
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-end mt-4">
              <Button variant="outline">
                <PlusCircle size={16} className="mr-2" />
                Invite Members
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-4">
            <div className="text-center p-8">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <h3 className="text-lg font-medium">Shared Resources</h3>
              <p className="text-sm text-gray-500 mb-4">Share study materials, notes, and resources with your group</p>
              
              <Button>
                <PlusCircle size={16} className="mr-2" />
                Upload Resource
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
