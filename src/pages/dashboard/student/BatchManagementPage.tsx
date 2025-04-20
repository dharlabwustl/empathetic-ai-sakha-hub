import React, { useState, useEffect } from 'react';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import DashboardLoading from './DashboardLoading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, UserPlus, CheckCircle, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { BatchMember, BatchMemberRole } from '@/types/batch';
import { DashboardLayoutWrapper } from '@/components/dashboard/student/DashboardLayoutWrapper';

export default function BatchManagementPage() {
  const {
    userProfile,
    loading: dashboardLoading,
  } = useStudentDashboard();
  
  const [members, setMembers] = useState<BatchMember[]>([]);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [isAddingMember, setIsAddingMember] = useState(false);
  
  useEffect(() => {
    updateMembers();
  }, []);
  
  const updateMembers = () => {
    const mockMembers: BatchMember[] = [
      {
        id: "1",
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        role: "leader" as BatchMemberRole,
        status: "active",
        joinedDate: "2023-05-15",
        avatar: "https://i.pravatar.cc/150?img=11",
        progress: {
          completedTopics: 45,
          totalTopics: 100,
          lastActiveDate: "2023-08-15T10:30:00Z"
        }
      },
      {
        id: "2", 
        name: "Priya Patel",
        email: "priya.patel@example.com",
        role: "member" as BatchMemberRole,
        status: "active",
        joinedDate: "2023-05-16",
        avatar: "https://i.pravatar.cc/150?img=5",
        progress: {
          completedTopics: 38,
          totalTopics: 100,
          lastActiveDate: "2023-08-14T15:45:00Z"
        }
      },
      {
        id: "3",
        name: "Aditya Singh",
        email: "aditya.singh@example.com",
        role: "member" as BatchMemberRole,
        status: "active",
        joinedDate: "2023-05-18",
        avatar: "https://i.pravatar.cc/150?img=12",
        progress: {
          completedTopics: 52,
          totalTopics: 100,
          lastActiveDate: "2023-08-13T09:30:00Z"
        }
      },
      {
        id: "4",
        name: "Sneha Gupta",
        email: "sneha.gupta@example.com",
        role: "member" as BatchMemberRole,
        status: "pending",
        invitationCode: "SAKHA-XYZ789"
      }
    ];
    
    setMembers(mockMembers);
  };
  
  const handleAddMember = async () => {
    setIsAddingMember(true);
    
    // Simulate adding a member
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you'd send an invitation to the new member
    const newMember: BatchMember = {
      id: Math.random().toString(36).substring(7),
      name: '', // Name will be updated when the user joins
      email: newMemberEmail,
      role: "member",
      status: "pending",
      invitationCode: `SAKHA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    };
    
    setMembers([...members, newMember]);
    setNewMemberEmail('');
    setIsAddingMember(false);
  };
  
  if (dashboardLoading || !userProfile) {
    return <DashboardLoading />;
  }

  return (
    <DashboardLayoutWrapper userProfile={userProfile}>
      <div className="container max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Manage Your Batch</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Add and manage members of your learning batch
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Batch Members</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span>{member.name || 'N/A'}</span>
                      </div>
                    </TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{member.role}</Badge>
                    </TableCell>
                    <TableCell>
                      {member.status === 'active' && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Active</span>
                        </div>
                      )}
                      {member.status === 'pending' && (
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                          <span>Pending</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {member.status === 'pending' && (
                        <Button variant="ghost" size="sm">
                          Resend Invite
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <Separator className="my-4" />
            
            <div className="flex items-center space-x-2">
              <Input 
                type="email"
                placeholder="Enter member's email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
              />
              <Button onClick={handleAddMember} disabled={isAddingMember}>
                {isAddingMember ? 'Adding...' : 'Add Member'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayoutWrapper>
  );
}
