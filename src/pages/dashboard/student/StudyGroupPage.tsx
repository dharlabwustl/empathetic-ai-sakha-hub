
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Users, MessageSquare, Calendar, FileText, PlusCircle, 
  Send, Paperclip, Search, UserPlus, Clock, Check, X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudyGroupPage = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  
  // Mock data for study groups
  const groups = [
    {
      id: '1',
      name: 'Physics Champions',
      description: 'Group focused on mastering physics concepts for JEE',
      members: 5,
      active: true,
      avatar: '',
      recentActivity: '2 hours ago'
    },
    {
      id: '2',
      name: 'Chemistry Crew',
      description: 'Organic chemistry study group',
      members: 3,
      active: true,
      avatar: '',
      recentActivity: 'Yesterday'
    },
    {
      id: '3',
      name: 'Math Masters',
      description: 'Advanced mathematics problem-solving',
      members: 4,
      active: false,
      avatar: '',
      recentActivity: '3 days ago'
    }
  ];
  
  // Mock data for discussions
  const discussions = [
    {
      id: '1',
      title: 'Thermodynamics Problem #42',
      author: 'Aryan Sharma',
      date: '2 hours ago',
      content: 'I\'m having trouble understanding how to apply the first law of thermodynamics to this problem. Can someone help me understand the concept better?',
      replies: 5,
      views: 18,
      tags: ['thermodynamics', 'physics', 'help']
    },
    {
      id: '2',
      title: 'Study session for organic chemistry',
      author: 'Priya Patel',
      date: 'Yesterday',
      content: 'I\'m planning to host a study session on organic chemistry reaction mechanisms. Would anyone like to join? I\'m thinking this Saturday at 3PM.',
      replies: 12,
      views: 32,
      tags: ['organic-chemistry', 'study-session', 'weekend']
    },
    {
      id: '3',
      title: 'Resources for calculus practice',
      author: 'Rohit Kumar',
      date: '3 days ago',
      content: 'Does anyone have good resources or practice problems for calculus integration? I need more practice before the exam next month.',
      replies: 8,
      views: 24,
      tags: ['calculus', 'resources', 'practice']
    }
  ];
  
  // Mock data for events
  const events = [
    {
      id: '1',
      title: 'Physics Problem Solving Session',
      date: 'Tomorrow, 7:00 PM',
      host: 'Aryan Sharma',
      participants: 4,
      maxParticipants: 10,
      description: 'We\'ll be solving challenging physics problems together and explaining the concepts.',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Organic Chemistry Study Group',
      date: 'Saturday, 3:00 PM',
      host: 'Priya Patel',
      participants: 6,
      maxParticipants: 8,
      description: 'Focused study session on organic chemistry reaction mechanisms.',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Mock Test - Mathematics',
      date: 'Sunday, 10:00 AM',
      host: 'Rahul Verma',
      participants: 12,
      maxParticipants: 15,
      description: 'Full-length mock test followed by detailed solution discussion.',
      status: 'upcoming'
    }
  ];
  
  // Mock data for resources
  const resources = [
    {
      id: '1',
      title: 'Physics Formula Sheet',
      type: 'PDF',
      uploadedBy: 'Aryan Sharma',
      date: '1 week ago',
      size: '2.3 MB',
      downloads: 24
    },
    {
      id: '2',
      title: 'Organic Chemistry Reaction Mechanisms',
      type: 'PDF',
      uploadedBy: 'Priya Patel',
      date: '2 weeks ago',
      size: '4.8 MB',
      downloads: 31
    },
    {
      id: '3',
      title: 'Calculus Problem Solving Techniques',
      type: 'PDF',
      uploadedBy: 'Rohit Kumar',
      date: '3 weeks ago',
      size: '3.5 MB',
      downloads: 42
    },
    {
      id: '4',
      title: 'Physics Video Tutorial - Mechanics',
      type: 'Video',
      uploadedBy: 'Aryan Sharma',
      date: '1 month ago',
      size: '156 MB',
      downloads: 18
    }
  ];
  
  // Mock data for members
  const members = [
    {
      id: '1',
      name: 'Aryan Sharma',
      role: 'Admin',
      avatar: '',
      status: 'online',
      lastActive: 'Now'
    },
    {
      id: '2',
      name: 'Priya Patel',
      role: 'Member',
      avatar: '',
      status: 'online',
      lastActive: '5m ago'
    },
    {
      id: '3',
      name: 'Rohit Kumar',
      role: 'Member',
      avatar: '',
      status: 'offline',
      lastActive: '3h ago'
    },
    {
      id: '4',
      name: 'Neha Singh',
      role: 'Member',
      avatar: '',
      status: 'online',
      lastActive: '2m ago'
    },
    {
      id: '5',
      name: 'Vikram Malhotra',
      role: 'Member',
      avatar: '',
      status: 'offline',
      lastActive: '1d ago'
    }
  ];
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    toast({
      title: "Message sent",
      description: "Your message has been posted to the discussion.",
    });
    
    setNewMessage('');
  };
  
  // Handle joining a group
  const handleJoinGroup = (groupId: string) => {
    toast({
      title: "Request sent",
      description: "Your request to join the group has been sent to the admin.",
    });
  };
  
  // Handle creating a new discussion
  const handleCreateDiscussion = () => {
    toast({
      title: "Create discussion",
      description: "Opening new discussion form...",
    });
  };
  
  // Handle creating a new event
  const handleCreateEvent = () => {
    toast({
      title: "Create event",
      description: "Opening new event form...",
    });
  };
  
  // Handle uploading a resource
  const handleUploadResource = () => {
    toast({
      title: "Upload resource",
      description: "Opening resource upload form...",
    });
  };
  
  // Handle inviting a member
  const handleInviteMember = () => {
    toast({
      title: "Invite member",
      description: "Opening member invitation form...",
    });
  };
  
  // Handle registering for an event
  const handleRegisterEvent = (eventId: string) => {
    toast({
      title: "Registered",
      description: "You have successfully registered for the event.",
    });
  };
  
  // Handle downloading a resource
  const handleDownloadResource = (resourceId: string) => {
    toast({
      title: "Download started",
      description: "Your download will begin shortly.",
    });
  };

  return (
    <SharedPageLayout
      title="Study Groups"
      subtitle="Collaborate with peers to enhance your learning experience"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left sidebar - Groups list */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">My Study Groups</CardTitle>
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Group
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search groups..." 
                    className="pl-8"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                {groups.map((group) => (
                  <div 
                    key={group.id} 
                    className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 ${
                      group.active ? 'border-blue-200 bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        {group.avatar ? (
                          <AvatarImage src={group.avatar} alt={group.name} />
                        ) : (
                          <AvatarFallback>
                            {group.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{group.name}</h3>
                          <Badge 
                            variant="outline" 
                            className={group.active ? "bg-green-50 text-green-700" : "bg-gray-100"}
                          >
                            {group.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {group.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {group.members} members
                          </div>
                          <span>•</span>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {group.recentActivity}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <h3 className="font-medium mb-3">Suggested Groups</h3>
                <div className="space-y-3">
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Biology Masters</h4>
                        <p className="text-sm text-muted-foreground">
                          NEET preparation group for biology
                        </p>
                      </div>
                      <Button size="sm" onClick={() => handleJoinGroup('suggested1')}>
                        Join
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">JEE Mathematics Pro</h4>
                        <p className="text-sm text-muted-foreground">
                          Advanced math for JEE aspirants
                        </p>
                      </div>
                      <Button size="sm" onClick={() => handleJoinGroup('suggested2')}>
                        Join
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>PC</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Physics Champions</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      5 members • Created 3 months ago
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full border-b rounded-none grid grid-cols-4">
                <TabsTrigger value="discussions" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Discussions
                </TabsTrigger>
                <TabsTrigger value="events" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Events
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Resources
                </TabsTrigger>
                <TabsTrigger value="members" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Members
                </TabsTrigger>
              </TabsList>
              
              <CardContent className="p-0">
                {/* Discussions Tab */}
                <TabsContent value="discussions" className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Group Discussions</h3>
                    <Button size="sm" onClick={handleCreateDiscussion}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      New Discussion
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {discussions.map((discussion) => (
                      <div key={discussion.id} className="border rounded-md overflow-hidden">
                        <div className="p-4">
                          <h3 className="font-medium text-lg mb-1">{discussion.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <span>{discussion.author}</span>
                            <span className="mx-1">•</span>
                            <span>{discussion.date}</span>
                          </div>
                          <p className="text-sm mb-3">{discussion.content}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {discussion.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="bg-blue-50">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex text-xs text-muted-foreground">
                            <span className="mr-3">{discussion.replies} replies</span>
                            <span>{discussion.views} views</span>
                          </div>
                        </div>
                        
                        <div className="border-t bg-gray-50 p-3">
                          <div className="flex gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>You</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 flex items-end gap-2">
                              <Input
                                placeholder="Write a reply..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1"
                              />
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-10 w-10"
                              >
                                <Paperclip className="h-4 w-4" />
                              </Button>
                              <Button onClick={handleSendMessage}>
                                <Send className="h-4 w-4 mr-2" />
                                Send
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Events Tab */}
                <TabsContent value="events" className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Upcoming Events</h3>
                    <Button size="sm" onClick={handleCreateEvent}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Create Event
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">{event.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{event.date}</span>
                            </div>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            {event.status === 'upcoming' ? 'Upcoming' : event.status}
                          </Badge>
                        </div>
                        
                        <p className="text-sm my-3">{event.description}</p>
                        
                        <div className="flex flex-wrap justify-between items-center text-sm">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>
                              {event.participants}/{event.maxParticipants} participants
                            </span>
                          </div>
                          <Button size="sm" onClick={() => handleRegisterEvent(event.id)}>
                            Register
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Resources Tab */}
                <TabsContent value="resources" className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Shared Resources</h3>
                    <Button size="sm" onClick={handleUploadResource}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Upload Resource
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {resources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-500 font-medium">
                            {resource.type === 'PDF' ? 'PDF' : 'VID'}
                          </div>
                          <div className="ml-3">
                            <h4 className="font-medium">{resource.title}</h4>
                            <div className="flex text-xs text-muted-foreground">
                              <span>{resource.uploadedBy}</span>
                              <span className="mx-1">•</span>
                              <span>{resource.date}</span>
                              <span className="mx-1">•</span>
                              <span>{resource.size}</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadResource(resource.id)}
                        >
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Members Tab */}
                <TabsContent value="members" className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Group Members (5)</h3>
                    <Button size="sm" onClick={handleInviteMember}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Invite Member
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            {member.avatar ? (
                              <AvatarImage src={member.avatar} alt={member.name} />
                            ) : (
                              <AvatarFallback>
                                {member.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium">{member.name}</span>
                              {member.role === 'Admin' && (
                                <Badge className="ml-2 bg-amber-100 text-amber-800 border-amber-200">
                                  Admin
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <div className={`h-2 w-2 rounded-full mr-1 ${
                                member.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                              }`}></div>
                              <span>{member.status === 'online' ? 'Online' : member.lastActive}</span>
                            </div>
                          </div>
                        </div>
                        
                        {member.role !== 'Admin' && (
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-2">Member Requests</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarFallback>AS</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">Ananya Shah</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="h-8">
                            <X className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                          <Button size="sm" className="h-8">
                            <Check className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default StudyGroupPage;
