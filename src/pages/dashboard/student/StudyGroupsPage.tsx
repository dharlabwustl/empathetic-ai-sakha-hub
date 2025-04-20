import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { UserProfileType } from '@/types/user';
import { KpiData, NudgeData } from '@/types/dashboard';

interface StudyGroup {
  id: string;
  name: string;
  description?: string;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  members: Array<{
    id: string;
    name: string;
    avatar?: string;
    status: "online" | "offline" | "away";
    lastSeen?: string;
    role: "leader" | "member";
  }>;
  topics: Array<{
    id: string;
    name: string;
    description?: string;
    messageCount: number;
    lastActivity: string;
  }>;
  messages?: Array<{
    id: string;
    text: string;
    sender: {
      id: string;
      name: string;
      avatar?: string;
    };
    timestamp: string;
    read: boolean;
  }>;
  batch?: {
    id: string;
    name: string;
    code: string;
  };
  createdAt: string;
}

interface StudyGroupsPageProps {
  userProfile: UserProfileType;
}

const StudyGroupsPage: React.FC<StudyGroupsPageProps> = ({ userProfile }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [activeGroup, setActiveGroup] = useState<StudyGroup | null>(null);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [isCreatingTopic, setIsCreatingTopic] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [newTopicDescription, setNewTopicDescription] = useState("");
  const [currentTab, setCurrentTab] = useState("all-groups");

  const kpis: KpiData[] = [
    { 
      id: 'k1', 
      title: 'Active Groups', 
      value: '3', 
      changePercent: 0,
      label: 'Groups',
      unit: '',
      trend: 'neutral'
    },
    { 
      id: 'k2', 
      title: 'Study Sessions', 
      value: '12', 
      changePercent: 20,
      label: 'Sessions',
      unit: '',
      trend: 'up'
    },
    { 
      id: 'k3', 
      title: 'Collaboration Score', 
      value: '8.5', 
      changePercent: 5,
      label: 'Score',
      unit: '/10',
      trend: 'up'
    }
  ];

  const nudges: NudgeData[] = [
    { 
      id: 'n1', 
      title: 'Join Physics Group', 
      read: false,
      type: 'info',
      message: 'There\'s a new Physics study group you might be interested in.',
      timestamp: new Date().toISOString()
    },
    { 
      id: 'n2', 
      title: 'Group Session Today', 
      read: true,
      type: 'info',
      message: 'You have a scheduled group study session today at 5 PM.',
      timestamp: new Date().toISOString()
    }
  ];

  const getDisplayName = (member: UserProfileType) => {
    return member.name || 'Anonymous User';
  };

  useEffect(() => {
    const mockGroups: StudyGroup[] = [
      {
        id: "group-1",
        name: "JEE Physics Batch",
        description: "For advanced physics problem discussions",
        createdBy: {
          id: "user-1",
          name: "Raj Kumar",
          avatar: "/placeholder.svg"
        },
        members: [
          {
            id: "user-1",
            name: "Raj Kumar",
            avatar: "/placeholder.svg",
            status: "online",
            role: "leader"
          },
          {
            id: "user-2",
            name: "Priya Sharma",
            avatar: "/placeholder.svg",
            status: "online",
            role: "member"
          },
          {
            id: "user-3",
            name: "Amit Singh",
            status: "offline",
            lastSeen: "2 hours ago",
            role: "member"
          }
        ],
        topics: [
          {
            id: "topic-1",
            name: "Mechanics",
            description: "Newton's Laws and applications",
            messageCount: 24,
            lastActivity: "10 minutes ago"
          },
          {
            id: "topic-2",
            name: "Electromagnetics",
            description: "Maxwell's equations and applications",
            messageCount: 15,
            lastActivity: "3 hours ago"
          }
        ],
        batch: {
          id: "batch-1",
          name: "JEE Advanced Group",
          code: "JEE-ADV-2023"
        },
        createdAt: "2023-05-15T10:30:00"
      },
      {
        id: "group-2",
        name: "NEET Biology Discussion",
        description: "Focus on human physiology and genetics",
        createdBy: {
          id: "user-4",
          name: "Dr. Sneha Gupta",
          avatar: "/placeholder.svg"
        },
        members: [
          {
            id: "user-4",
            name: "Dr. Sneha Gupta",
            avatar: "/placeholder.svg",
            status: "away",
            role: "leader"
          },
          {
            id: "user-5",
            name: "Vikram Mehta",
            status: "offline",
            lastSeen: "1 day ago",
            role: "member"
          }
        ],
        topics: [
          {
            id: "topic-3",
            name: "Genetics",
            description: "Mendel's laws and human genetics",
            messageCount: 32,
            lastActivity: "1 day ago"
          }
        ],
        createdAt: "2023-04-10T14:20:00"
      }
    ];

    mockGroups[0].messages = [
      {
        id: "msg-1",
        text: "Has anyone solved the problem set from chapter 5?",
        sender: {
          id: "user-2",
          name: "Priya Sharma",
          avatar: "/placeholder.svg"
        },
        timestamp: "2 hours ago",
        read: true
      },
      {
        id: "msg-2",
        text: "Yes, I found questions 3 and 7 particularly challenging. The approach requires understanding of both conservation of momentum and energy.",
        sender: {
          id: "user-1",
          name: "Raj Kumar",
          avatar: "/placeholder.svg"
        },
        timestamp: "1 hour ago",
        read: true
      },
      {
        id: "msg-3",
        text: "I have a detailed solution. Let me share it with everyone tomorrow after our class.",
        sender: {
          id: "user-3",
          name: "Amit Singh"
        },
        timestamp: "30 minutes ago",
        read: false
      }
    ];

    setStudyGroups(mockGroups);
    setActiveGroup(mockGroups[0]);
    setActiveTopicId(mockGroups[0].topics[0].id);
  }, []);

  if (!userProfile) {
    return <DashboardLoading />;
  }

  const filteredGroups = studyGroups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    group.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!message.trim() || !activeGroup) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      text: message,
      sender: {
        id: userProfile.id,
        name: `${userProfile.firstName} ${userProfile.lastName}`,
        avatar: userProfile.avatar
      },
      timestamp: "Just now",
      read: false
    };

    const updatedGroups = studyGroups.map(group => {
      if (group.id === activeGroup.id) {
        const updatedGroup = {...group};
        updatedGroup.messages = [...(group.messages || []), newMessage];
        return updatedGroup;
      }
      return group;
    });

    setStudyGroups(updatedGroups);
    setActiveGroup(updatedGroups.find(g => g.id === activeGroup.id) || null);
    setMessage("");

    toast({
      title: "Message sent",
      description: "Your message has been sent to the group",
    });
  };

  const handleCreateTopic = () => {
    if (!newTopicName.trim() || !activeGroup) return;

    const newTopic = {
      id: `topic-${Date.now()}`,
      name: newTopicName,
      description: newTopicDescription,
      messageCount: 0,
      lastActivity: "Just now"
    };

    const updatedGroups = studyGroups.map(group => {
      if (group.id === activeGroup.id) {
        const updatedGroup = {...group};
        updatedGroup.topics = [...(group.topics || []), newTopic];
        return updatedGroup;
      }
      return group;
    });

    setStudyGroups(updatedGroups);
    setActiveGroup(updatedGroups.find(g => g.id === activeGroup.id) || null);
    setNewTopicName("");
    setNewTopicDescription("");
    setIsCreatingTopic(false);

    toast({
      title: "Topic created",
      description: `New discussion topic "${newTopicName}" has been created`,
    });
  };

  const getUserRoleInGroup = (groupId: string) => {
    const group = studyGroups.find(g => g.id === groupId);
    if (!group) return "member";
    
    const member = group.members.find(m => m.id === userProfile.id);
    return member?.role || "member";
  };

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
      showStudyPlan={false}
      onCloseStudyPlan={handleCloseStudyPlan}
    >
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Study Groups</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Collaborate with your peers on various subjects and topics
          </p>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all-groups">All Groups</TabsTrigger>
              <TabsTrigger value="my-groups">My Groups</TabsTrigger>
              <TabsTrigger value="batch-groups">Batch Groups</TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search groups..."
                  className="pl-9 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Create Group
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card className="h-[calc(100vh-240px)]">
                <CardHeader className="pb-3">
                  <CardTitle>Study Groups</CardTitle>
                  <CardDescription>
                    {filteredGroups.length} groups available
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[calc(100vh-340px)]">
                    {filteredGroups.length > 0 ? (
                      <div className="space-y-1 p-2">
                        {filteredGroups.map((group) => (
                          <Button
                            key={group.id}
                            variant={activeGroup?.id === group.id ? "secondary" : "ghost"}
                            className="w-full justify-start font-normal h-auto py-3"
                            onClick={() => {
                              setActiveGroup(group);
                              setActiveTopicId(group.topics[0]?.id || null);
                            }}
                          >
                            <div className="flex items-start w-full">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={group.createdBy.avatar} />
                                <AvatarFallback>{group.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col items-start">
                                <div className="flex items-center">
                                  <span className="font-medium">{group.name}</span>
                                  {group.members.some(m => m.status === "online" && m.id !== userProfile.id) && (
                                    <Badge variant="secondary" className="ml-2 h-2 w-2 rounded-full bg-green-500 p-0" />
                                  )}
                                </div>
                                <span className="text-xs text-muted-foreground line-clamp-1">
                                  {group.members.length} members • {group.topics.length} topics
                                </span>
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <p className="text-muted-foreground">No study groups found</p>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {activeGroup ? (
              <div className="lg:col-span-2 space-y-4">
                <Card className="h-[calc(100vh-240px)] flex flex-col">
                  <CardHeader className="pb-3 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center">
                          <span>{activeGroup.name}</span>
                          {activeGroup.batch && (
                            <Badge variant="outline" className="ml-2">
                              {activeGroup.batch.name}
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{activeGroup.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          {activeGroup.members.length}
                        </Button>
                        {getUserRoleInGroup(activeGroup.id) === "leader" && (
                          <Button variant="outline" size="sm">
                            Manage Group
                          </Button>
                        )}
                      </div>
                    </div>

                    {activeGroup.topics.length > 0 && (
                      <div className="flex items-center mt-2 overflow-x-auto pb-2 -mb-2">
                        <div className="flex items-center space-x-2">
                          {activeGroup.topics.map(topic => (
                            <Button 
                              key={topic.id}
                              variant={activeTopicId === topic.id ? "secondary" : "outline"}
                              size="sm"
                              onClick={() => setActiveTopicId(topic.id)}
                              className="whitespace-nowrap"
                            >
                              {topic.name}
                              <Badge variant="secondary" className="ml-2">
                                {topic.messageCount}
                              </Badge>
                            </Button>
                          ))}
                          {getUserRoleInGroup(activeGroup.id) === "leader" && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setIsCreatingTopic(true)}
                              className="whitespace-nowrap"
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add Topic
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </CardHeader>

                  {isCreatingTopic ? (
                    <CardContent className="flex-shrink-0">
                      <div className="space-y-4 p-4 border rounded-md">
                        <h3 className="font-semibold">Create New Discussion Topic</h3>
                        <div className="space-y-2">
                          <Label htmlFor="topic-name">Topic Name</Label>
                          <Input
                            id="topic-name"
                            placeholder="e.g., Thermodynamics"
                            value={newTopicName}
                            onChange={(e) => setNewTopicName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="topic-description">Description (optional)</Label>
                          <Input
                            id="topic-description"
                            placeholder="Briefly describe what this topic is about"
                            value={newTopicDescription}
                            onChange={(e) => setNewTopicDescription(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsCreatingTopic(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleCreateTopic}>
                            Create Topic
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  ) : (
                    <>
                      <CardContent className="flex-grow overflow-auto p-4">
                        {activeGroup.messages?.length ? (
                          <div className="space-y-4">
                            {activeGroup.messages.map((msg) => (
                              <div 
                                key={msg.id} 
                                className={`flex ${msg.sender.id === userProfile.id ? 'justify-end' : 'justify-start'}`}
                              >
                                <div className={`flex ${msg.sender.id === userProfile.id ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}>
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={msg.sender.avatar} />
                                    <AvatarFallback>{msg.sender.name.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className={`rounded-lg p-3 ${
                                      msg.sender.id === userProfile.id 
                                      ? 'bg-primary text-primary-foreground' 
                                      : 'bg-muted'
                                    }`}>
                                      <p className="text-sm">{msg.text}</p>
                                    </div>
                                    <div className={`flex items-center mt-1 text-xs text-muted-foreground ${
                                      msg.sender.id === userProfile.id ? 'justify-end' : 'justify-start'
                                    }`}>
                                      <span>{msg.sender.id !== userProfile.id && `${msg.sender.name} • `}{msg.timestamp}</span>
                                      {msg.sender.id === userProfile.id && (
                                        <CheckCheck className={`h-3 w-3 ml-1 ${msg.read ? 'text-blue-500' : 'text-muted-foreground'}`} />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground" />
                              <h3 className="mt-2 font-medium">No messages yet</h3>
                              <p className="text-sm text-muted-foreground">
                                Start the conversation by sending the first message
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="border-t p-3">
                        <form 
                          className="flex w-full items-center space-x-2"
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                          }}
                        >
                          <Input
                            placeholder="Type your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            type="submit" 
                            size="icon" 
                            disabled={!message.trim()}
                          >
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send</span>
                          </Button>
                        </form>
                      </CardFooter>
                    </>
                  )}
                </Card>
              </div>
            ) : (
              <div className="lg:col-span-2">
                <Card className="h-[calc(100vh-240px)] flex items-center justify-center">
                  <div className="text-center max-w-md p-6">
                    <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h2 className="mt-4 text-xl font-semibold">Select a Study Group</h2>
                    <p className="mt-2 text-muted-foreground">
                      Choose a group from the list to view discussions and collaborate with your peers
                    </p>
                    <Button className="mt-4">Create New Group</Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudyGroupsPage;
