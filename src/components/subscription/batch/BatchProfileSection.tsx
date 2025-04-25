import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BatchMemberUploader from './BatchMemberUploader';
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  User, 
  Users, 
  BarChart, 
  Settings, 
  UserCheck, 
  Mail, 
  CalendarDays, 
  Clock
} from "lucide-react";
import { BatchDetails, BatchMember } from './types';

interface BatchMember {
  id: string;
  name: string;
  email: string;
  role: "member" | "leader" | "school_admin" | "corporate_admin";
  status: "active" | "inactive" | "pending";
  joinedDate?: string;
  invitationCode?: string;
  avatar?: string;
  progress?: {
    completedTopics: number;
    totalTopics: number;
    lastActiveDate?: string;
  };
}

interface BatchProfileSectionProps {
  userBatches?: BatchDetails[];
  onInviteMembers: (emails: string[]) => void;
}

const BatchProfileSection: React.FC<BatchProfileSectionProps> = ({
  userBatches = [],
  onInviteMembers
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("manage");
  const [activeBatchId, setActiveBatchId] = useState<string | null>(null);
  const [batchMembers, setBatchMembers] = useState<BatchMember[]>([]);
  const [batchProgress, setBatchProgress] = useState<{ 
    completed: number; 
    total: number;
    activeMembersCount: number;
    lastActive: string;
    averageProgress: number;
  }>({
    completed: 0,
    total: 0,
    activeMembersCount: 0,
    lastActive: new Date().toISOString(),
    averageProgress: 0
  });
  
  useEffect(() => {
    if (userBatches.length > 0 && !activeBatchId) {
      setActiveBatchId(userBatches[0].id);
      setBatchMembers(userBatches[0].members || []);
      
      setBatchProgress({
        completed: Math.floor(Math.random() * 50) + 10,
        total: 100,
        activeMembersCount: userBatches[0].members.filter(m => m.status === "active").length,
        lastActive: new Date().toISOString(),
        averageProgress: Math.floor(Math.random() * 40) + 20
      });
    }
  }, [userBatches, activeBatchId]);
  
  const handleUploadComplete = (emails: string[]) => {
    toast({
      title: "Processing invitations",
      description: `${emails.length} email(s) will be invited to join your batch.`
    });
    onInviteMembers(emails);
  };

  const handleBatchSelect = (batchId: string) => {
    setActiveBatchId(batchId);
    const selectedBatch = userBatches.find(batch => batch.id === batchId);
    if (selectedBatch) {
      setBatchMembers(selectedBatch.members || []);
      
      setBatchProgress({
        completed: Math.floor(Math.random() * 50) + 10,
        total: 100,
        activeMembersCount: selectedBatch.members.filter(m => m.status === "active").length,
        lastActive: new Date().toISOString(),
        averageProgress: Math.floor(Math.random() * 40) + 20
      });
    }
  };
  
  const handleSendReminder = (memberId: string) => {
    toast({
      title: "Reminder Sent",
      description: "Study reminder has been sent to the member."
    });
  };
  
  const handleAssignAdmin = (memberId: string) => {
    if (!activeBatchId) return;
    
    toast({
      title: "Admin Assigned",
      description: "Member has been promoted to batch admin."
    });
    
    const updatedMembers = batchMembers.map(member => 
      member.id === memberId ? {...member, role: "school_admin"} : member
    );
    
    setBatchMembers(updatedMembers);
  };

  const activeBatch = userBatches.find(batch => batch.id === activeBatchId);
  const progressPercent = (batchProgress.completed / batchProgress.total) * 100;
  
  if (userBatches.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Batch Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">No Batches Found</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't created any batches yet. To get started, purchase a Group, School, or Corporate plan.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {userBatches.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Batches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userBatches.map(batch => (
                <Button
                  key={batch.id}
                  variant={batch.id === activeBatchId ? "default" : "outline"}
                  onClick={() => handleBatchSelect(batch.id)}
                >
                  {batch.name}
                  <Badge variant="secondary" className="ml-2">
                    {batch.members.length}/{batch.maxMembers}
                  </Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manage" className="flex items-center gap-1">
              <Users size={16} />
              <span>Members</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1">
              <BarChart size={16} />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings size={16} />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage" className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Batch Members</h3>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setActiveTab("invite")}
                >
                  <Mail className="h-4 w-4" />
                  Invite Members
                </Button>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Member
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {batchMembers.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
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
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
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
                            variant={member.status === "active" ? "default" : 
                                   member.status === "pending" ? "outline" : "destructive"}
                            className={member.status === "active" ? "bg-green-100 text-green-800 border-green-200" : 
                                     member.status === "pending" ? "bg-yellow-100 text-yellow-800 border-yellow-200" : 
                                     "bg-red-100 text-red-800 border-red-200"}
                          >
                            {member.status === "active" ? "Active" : 
                             member.status === "pending" ? "Pending" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {member.progress ? (
                            <div className="w-32">
                              <div className="flex justify-between text-xs mb-1">
                                <span>{member.progress.completedTopics} topics</span>
                                <span>{Math.round((member.progress.completedTopics / member.progress.totalTopics) * 100)}%</span>
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
                          <div className="flex justify-end gap-2">
                            {member.status === "active" && member.role !== "leader" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSendReminder(member.id)}
                              >
                                Send Reminder
                              </Button>
                            )}
                            
                            {member.status === "active" && member.role !== "leader" && 
                             member.role !== "school_admin" && member.role !== "corporate_admin" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAssignAdmin(member.id)}
                              >
                                Make Admin
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-sm text-gray-500">Study Progress</h3>
                    <Badge variant="outline">{progressPercent.toFixed(0)}%</Badge>
                  </div>
                  <Progress value={progressPercent} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {batchProgress.completed} of {batchProgress.total} topics completed by members
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-sm text-gray-500">Member Activity</h3>
                    <Badge variant="outline">
                      {batchProgress.activeMembersCount} Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Last active:</span>
                    </div>
                    <span className="text-xs font-medium">
                      {new Date(batchProgress.lastActive).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Batch Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Average Progress</h4>
                    <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500" 
                        style={{width: `${batchProgress.averageProgress}%`}}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>{batchProgress.averageProgress}% Average Completion</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="font-medium text-sm mb-2">Member Engagement</h4>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {Math.round(batchMembers.length * 0.7)} Daily Active
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {Math.round(batchMembers.length * 0.9)} Weekly Active
                      </Badge>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        {Math.round(batchMembers.length * 0.2)} Needs Attention
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <p className="text-sm text-center text-muted-foreground">
              Note: Member's detailed performance data is private and not accessible to batch managers.
            </p>
          </TabsContent>
          
          <TabsContent value="settings" className="p-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Batch Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="batchName">Batch Name</Label>
                      <Input 
                        id="batchName" 
                        value={activeBatch?.name || ""}
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="batchType">Batch Type</Label>
                      <Input 
                        id="batchType" 
                        value={activeBatch?.planType || ""}
                        className="mt-1"
                        disabled
                      />
                    </div>
                    <div>
                      <Label htmlFor="createdDate">Created Date</Label>
                      <Input 
                        id="createdDate" 
                        value={activeBatch ? new Date(activeBatch.createdAt).toLocaleDateString() : ""}
                        className="mt-1"
                        disabled
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input 
                        id="expiryDate" 
                        value={activeBatch?.expiryDate ? new Date(activeBatch.expiryDate).toLocaleDateString() : "Never"}
                        className="mt-1"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button>
                      Update Batch
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure batch notifications and reminder settings
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="weeklyReport">Weekly Progress Reports</Label>
                        <p className="text-xs text-muted-foreground">Send weekly reports to all members</p>
                      </div>
                      <input type="checkbox" id="weeklyReport" className="toggle" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="inactiveAlert">Inactive Member Alerts</Label>
                        <p className="text-xs text-muted-foreground">Get notified when members are inactive for 3 days</p>
                      </div>
                      <input type="checkbox" id="inactiveAlert" className="toggle" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="achievementAlert">Achievement Notifications</Label>
                        <p className="text-xs text-muted-foreground">Celebrate when members reach milestones</p>
                      </div>
                      <input type="checkbox" id="achievementAlert" className="toggle" defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="invite">
            <BatchMemberUploader
              onUploadComplete={handleUploadComplete}
              maxMembers={activeBatch?.maxMembers || 50}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default BatchProfileSection;
