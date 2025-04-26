
import React, { useState, useEffect } from 'react';
import { UserProfileType } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Users, 
  BarChart, 
  Settings, 
  UserPlus, 
  Mail, 
  Clock,
  Send,
  UserCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BatchMemberUploader from './BatchMemberUploader';
import { BatchDetails, BatchMember } from './types';
import BatchLeadershipTransfer from './BatchLeadershipTransfer';
import BatchMemberDetails from './BatchMemberDetails';

interface BatchManagementContentProps {
  isLeader: boolean;
  userProfile: UserProfileType;
}

const BatchManagementContent: React.FC<BatchManagementContentProps> = ({ 
  isLeader,
  userProfile
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(isLeader ? "members" : "overview");
  const [selectedMember, setSelectedMember] = useState<BatchMember | null>(null);
  const [showTransferLeadership, setShowTransferLeadership] = useState(false);
  
  // Mock batch data - in a real app this would be fetched from an API
  const [batchData, setBatchData] = useState<BatchDetails>({
    id: "batch-123",
    name: "Exam Prep Batch 2023",
    createdAt: new Date().toISOString(),
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    planType: "premium",
    maxMembers: 10,
    leader: {
      id: userProfile.id,
      name: userProfile.name,
      email: userProfile.email,
      avatar: userProfile.avatar,
      role: "leader",
      status: "active",
      joinDate: new Date().toISOString(),
      progress: {
        completedTopics: 24,
        totalTopics: 30,
      }
    },
    members: isLeader ? [
      {
        id: "member-1",
        name: "Alex Johnson",
        email: "alex@example.com",
        avatar: "",
        role: "member",
        status: "active",
        joinDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        progress: {
          completedTopics: 18,
          totalTopics: 30,
        }
      },
      {
        id: "member-2",
        name: "Samantha Lee",
        email: "sam@example.com",
        avatar: "",
        role: "member",
        status: "active",
        joinDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        progress: {
          completedTopics: 22,
          totalTopics: 30,
        }
      },
      {
        id: "member-3",
        name: "Jamie Smith",
        email: "jamie@example.com",
        avatar: "",
        role: "school_admin",
        status: "active",
        joinDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        progress: {
          completedTopics: 25,
          totalTopics: 30,
        }
      },
      {
        id: "member-4",
        name: "Taylor Wong",
        email: "taylor@example.com",
        avatar: "",
        role: "member",
        status: "pending",
        joinDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ] : []
  });

  // Effect to hydrate members list for non-leaders
  useEffect(() => {
    if (!isLeader) {
      // In a real app, this would be an API call to fetch batch members
      setBatchData(prev => ({
        ...prev,
        members: [
          {
            id: "leader-1",
            name: "Prof. Morgan Chen",
            email: "morgan@example.com",
            avatar: "",
            role: "leader",
            status: "active",
            joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            progress: {
              completedTopics: 30,
              totalTopics: 30,
            }
          },
          {
            id: userProfile.id,
            name: userProfile.name,
            email: userProfile.email,
            avatar: userProfile.avatar,
            role: "member",
            status: "active",
            joinDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            progress: {
              completedTopics: 16,
              totalTopics: 30,
            }
          },
          {
            id: "member-1",
            name: "Alex Johnson",
            email: "alex@example.com",
            avatar: "",
            role: "member",
            status: "active",
            joinDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
            progress: {
              completedTopics: 18,
              totalTopics: 30,
            }
          },
          {
            id: "member-2",
            name: "Samantha Lee",
            email: "sam@example.com",
            avatar: "",
            role: "member",
            status: "active",
            joinDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            progress: {
              completedTopics: 22,
              totalTopics: 30,
            }
          },
        ]
      }));
    }
  }, [isLeader, userProfile]);

  const handleInviteMember = async (emails: string[]) => {
    // In a real app, this would call an API to send invitations
    toast({
      title: "Invitations Sent",
      description: `${emails.length} invitation${emails.length > 1 ? 's' : ''} sent successfully.`,
    });
    
    // Add the invitees as pending members
    const newMembers = emails.map((email, index) => ({
      id: `pending-${Date.now()}-${index}`,
      name: email.split('@')[0],
      email: email,
      role: "member" as const,
      status: "pending" as const,
      joinDate: new Date().toISOString(),
    }));
    
    setBatchData(prev => ({
      ...prev,
      members: [...prev.members, ...newMembers]
    }));
  };

  const handleSendReminder = (memberId: string) => {
    // In a real app, this would call an API to send reminders
    toast({
      title: "Reminder Sent",
      description: "Study reminder has been sent successfully.",
    });
  };

  const handlePromoteToAdmin = (memberId: string) => {
    // In a real app, this would call an API to update the member's role
    setBatchData(prev => ({
      ...prev,
      members: prev.members.map(m => 
        m.id === memberId ? { ...m, role: "school_admin" as const } : m
      )
    }));
    
    toast({
      title: "Role Updated",
      description: "Member has been promoted to batch admin.",
    });
  };

  const handleRemoveMember = (memberId: string) => {
    // In a real app, this would call an API to remove the member
    setBatchData(prev => ({
      ...prev,
      members: prev.members.filter(m => m.id !== memberId)
    }));
    
    toast({
      title: "Member Removed",
      description: "Member has been removed from the batch.",
    });
  };

  const handleTransferLeadership = (memberId: string) => {
    // In a real app, this would call an API to transfer leadership
    setBatchData(prev => {
      // Find current leader and target member
      const currentLeader = prev.members.find(m => m.role === "leader") || prev.leader;
      const targetMember = prev.members.find(m => m.id === memberId);
      
      if (!targetMember) return prev;
      
      // Update roles
      return {
        ...prev,
        leader: {
          ...targetMember,
          role: "leader"
        },
        members: prev.members.map(m => {
          if (m.id === memberId) {
            return { ...m, role: "leader" };
          }
          if (m.id === currentLeader.id || m.role === "leader") {
            return { ...m, role: "school_admin" };
          }
          return m;
        })
      };
    });
    
    setShowTransferLeadership(false);
    
    toast({
      title: "Leadership Transferred",
      description: "You are no longer the batch leader.",
    });
  };

  const handleViewMemberDetails = (member: BatchMember) => {
    setSelectedMember(member);
  };
  
  const handleCloseMemberDetails = () => {
    setSelectedMember(null);
  };

  // Calculate batch statistics
  const activeMembers = batchData.members.filter(m => m.status === "active").length;
  const pendingMembers = batchData.members.filter(m => m.status === "pending").length;
  const completedProgress = batchData.members.reduce((sum, m) => 
    sum + (m.progress?.completedTopics || 0), 0);
  const totalProgress = batchData.members.reduce((sum, m) => 
    sum + (m.progress?.totalTopics || 30), 0);
  const progressPercentage = totalProgress > 0 ? (completedProgress / totalProgress) * 100 : 0;

  // Get remaining days until expiry
  const today = new Date();
  const expiryDate = new Date(batchData.expiryDate);
  const remainingDays = Math.max(0, Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  if (selectedMember) {
    return (
      <BatchMemberDetails 
        member={selectedMember}
        onBack={handleCloseMemberDetails}
        isLeader={isLeader}
        onSendReminder={handleSendReminder}
        onPromoteToAdmin={isLeader ? handlePromoteToAdmin : undefined}
        onRemoveMember={isLeader ? handleRemoveMember : undefined}
      />
    );
  }

  if (showTransferLeadership) {
    return (
      <BatchLeadershipTransfer 
        members={batchData.members.filter(m => m.status === "active" && m.role !== "leader")}
        onCancel={() => setShowTransferLeadership(false)}
        onTransfer={handleTransferLeadership}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Batch Overview Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>{batchData.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {activeMembers + (isLeader ? 1 : 0)} active members · Expires in {remainingDays} days
              </p>
            </div>
            
            {isLeader && (
              <div className="mt-3 md:mt-0 flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => setActiveTab("invite")}
                >
                  <UserPlus size={14} className="mr-1" />
                  Invite Members
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-amber-700 border-amber-200 bg-amber-50 hover:bg-amber-100"
                  onClick={() => setShowTransferLeadership(true)}
                >
                  <UserCheck size={14} className="mr-1" />
                  Transfer Leadership
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card className="bg-gray-50 dark:bg-gray-900 border-0">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Members</span>
                  <div className="flex items-center mt-1">
                    <Users className="mr-2 h-4 w-4 text-indigo-500" />
                    <span className="text-2xl font-bold">{activeMembers + (isLeader ? 1 : 0)}</span>
                    <span className="ml-1 text-sm text-muted-foreground">/ {batchData.maxMembers}</span>
                    {pendingMembers > 0 && (
                      <Badge 
                        variant="outline" 
                        className="ml-2 bg-amber-50 text-amber-700 border-amber-200"
                      >
                        {pendingMembers} pending
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-50 dark:bg-gray-900 border-0">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Study Progress</span>
                  <div className="flex items-center mt-1 mb-2">
                    <span className="text-2xl font-bold">{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-50 dark:bg-gray-900 border-0">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Batch Activity</span>
                  <div className="flex items-center mt-1">
                    <Clock className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-md font-bold">Last active today</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      {/* Batch Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members" className="flex items-center gap-1">
            <Users size={16} />
            <span>Members</span>
          </TabsTrigger>
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <BarChart size={16} />
            <span>Progress</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Settings size={16} />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Members Tab */}
        <TabsContent value="members">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Batch Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Member
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200">
                    {/* Leader Row */}
                    {isLeader && (
                      <tr key={batchData.leader.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                              {batchData.leader.avatar ? (
                                <img 
                                  src={batchData.leader.avatar} 
                                  alt={batchData.leader.name} 
                                  className="h-10 w-10 rounded-full"
                                />
                              ) : (
                                <User className="h-5 w-5 text-indigo-600" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {batchData.leader.name}
                                <Badge className="ml-2 bg-indigo-100 text-indigo-800 border-indigo-200">You</Badge>
                              </div>
                              <div className="text-sm text-gray-500">
                                {batchData.leader.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="default">Leader</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Active
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-32">
                            <div className="flex justify-between text-xs mb-1">
                              <span>{batchData.leader.progress?.completedTopics || 0} topics</span>
                              <span>
                                {Math.round(((batchData.leader.progress?.completedTopics || 0) / 
                                (batchData.leader.progress?.totalTopics || 1)) * 100)}%
                              </span>
                            </div>
                            <Progress 
                              value={((batchData.leader.progress?.completedTopics || 0) / 
                                     (batchData.leader.progress?.totalTopics || 1)) * 100} 
                              className="h-2"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewMemberDetails(batchData.leader)}
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    )}
                    
                    {/* Members List */}
                    {batchData.members.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                              {member.avatar ? (
                                <img 
                                  src={member.avatar} 
                                  alt={member.name} 
                                  className="h-10 w-10 rounded-full"
                                />
                              ) : (
                                <User className="h-5 w-5 text-gray-500" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {member.name}
                                {member.id === userProfile.id && 
                                  <Badge className="ml-2 bg-indigo-100 text-indigo-800 border-indigo-200">You</Badge>
                                }
                              </div>
                              <div className="text-sm text-gray-500">
                                {member.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={member.role === "leader" ? "default" : "outline"}>
                            {member.role === "leader" ? "Leader" : 
                             member.role === "school_admin" ? "Admin" :
                             member.role === "corporate_admin" ? "Admin" : "Member"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge 
                            className={member.status === "active" ? 
                              "bg-green-100 text-green-800 border-green-200" : 
                              "bg-amber-100 text-amber-800 border-amber-200"}
                          >
                            {member.status === "active" ? "Active" : "Pending"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {member.progress ? (
                            <div className="w-32">
                              <div className="flex justify-between text-xs mb-1">
                                <span>{member.progress.completedTopics} topics</span>
                                <span>
                                  {Math.round((member.progress.completedTopics / member.progress.totalTopics) * 100)}%
                                </span>
                              </div>
                              <Progress 
                                value={(member.progress.completedTopics / member.progress.totalTopics) * 100} 
                                className="h-2"
                              />
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">No data</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewMemberDetails(member)}
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Overview/Progress Tab */}
        <TabsContent value="overview">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Batch Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Overall Completion</h3>
                  <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-1">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500" 
                      style={{width: `${Math.round(progressPercentage)}%`}}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>{completedProgress} of {totalProgress} topics completed</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div className="relative">
                  <h3 className="text-sm font-medium mb-3">Member Progress</h3>
                  <div className="space-y-3">
                    {/* Leader */}
                    {isLeader && (
                      <div key="leader" className="flex items-center">
                        <div className="w-1/4 flex-shrink-0 flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-100 mr-2 flex items-center justify-center">
                            {batchData.leader.avatar ? (
                              <img 
                                src={batchData.leader.avatar} 
                                alt={batchData.leader.name} 
                                className="w-8 h-8"
                              />
                            ) : (
                              <User className="h-4 w-4 text-indigo-600" />
                            )}
                          </div>
                          <span className="text-sm truncate">{batchData.leader.name}</span>
                        </div>
                        <div className="w-3/4 ml-2">
                          <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-500" 
                              style={{
                                width: `${Math.round(((batchData.leader.progress?.completedTopics || 0) / 
                                        (batchData.leader.progress?.totalTopics || 1)) * 100)}%`
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>{batchData.leader.progress?.completedTopics || 0} topics completed</span>
                            <span>
                              {Math.round(((batchData.leader.progress?.completedTopics || 0) / 
                                         (batchData.leader.progress?.totalTopics || 1)) * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Members */}
                    {batchData.members
                      .filter(m => m.status === "active")
                      .map(member => (
                        <div key={member.id} className="flex items-center">
                          <div className="w-1/4 flex-shrink-0 flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 mr-2 flex items-center justify-center">
                              {member.avatar ? (
                                <img 
                                  src={member.avatar} 
                                  alt={member.name} 
                                  className="w-8 h-8"
                                />
                              ) : (
                                <User className="h-4 w-4 text-gray-500" />
                              )}
                            </div>
                            <span className="text-sm truncate">{member.name}</span>
                          </div>
                          <div className="w-3/4 ml-2">
                            <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                              {member.progress ? (
                                <div 
                                  className="h-full bg-blue-500" 
                                  style={{
                                    width: `${Math.round((member.progress.completedTopics / member.progress.totalTopics) * 100)}%`
                                  }}
                                ></div>
                              ) : (
                                <div className="h-full w-0"></div>
                              )}
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>
                                {member.progress ? `${member.progress.completedTopics} topics completed` : 'No progress data'}
                              </span>
                              <span>
                                {member.progress ? 
                                  `${Math.round((member.progress.completedTopics / member.progress.totalTopics) * 100)}%` : 
                                  '0%'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="text-center text-sm text-muted-foreground pt-4">
                  <p>
                    Note: Member progress is updated daily. Individual study details are private to each member.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Batch Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-medium">Batch Name</label>
                    <div className="flex mt-1">
                      <input 
                        type="text" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue={batchData.name}
                        readOnly={!isLeader}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Subscription Plan</label>
                    <div className="flex mt-1">
                      <input 
                        type="text" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={`${batchData.planType.charAt(0).toUpperCase() + batchData.planType.slice(1)} Group Plan`}
                        readOnly
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Expires on {new Date(batchData.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Max Members</label>
                    <div className="flex mt-1">
                      <input 
                        type="text" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={batchData.maxMembers}
                        readOnly
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Currently using {activeMembers + (isLeader ? 1 : 0)} of {batchData.maxMembers} seats
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Created Date</label>
                    <div className="flex mt-1">
                      <input 
                        type="text" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={new Date(batchData.createdAt).toLocaleDateString()}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <label className="text-sm font-medium">Notification Settings</label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Weekly Progress Summary</p>
                        <p className="text-xs text-muted-foreground">Send a weekly summary of batch progress</p>
                      </div>
                      <input 
                        type="checkbox" 
                        className="h-4 w-4" 
                        defaultChecked 
                        disabled={!isLeader} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Inactive Member Alerts</p>
                        <p className="text-xs text-muted-foreground">Notify when members are inactive for 3+ days</p>
                      </div>
                      <input 
                        type="checkbox" 
                        className="h-4 w-4" 
                        defaultChecked 
                        disabled={!isLeader} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Learning Milestones</p>
                        <p className="text-xs text-muted-foreground">Celebrate when batch members complete key milestones</p>
                      </div>
                      <input 
                        type="checkbox" 
                        className="h-4 w-4" 
                        defaultChecked 
                        disabled={!isLeader} 
                      />
                    </div>
                  </div>
                </div>
                
                {isLeader && (
                  <div className="flex justify-end">
                    <Button>
                      Save Settings
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Invite Tab */}
        <TabsContent value="invite">
          <BatchMemberUploader
            onUploadComplete={handleInviteMember}
            maxMembers={batchData.maxMembers}
            currentMemberCount={batchData.members.length + 1} // +1 for leader
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BatchManagementContent;
