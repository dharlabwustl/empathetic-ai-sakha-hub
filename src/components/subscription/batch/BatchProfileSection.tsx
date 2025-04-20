import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, CheckCircle, UserPlus, UserMinus, Mail } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BatchMember, BatchMemberRole } from '@/types/batch';

interface BatchProfileSectionProps {
  batchId: string;
}

export function BatchProfileSection({ batchId }: BatchProfileSectionProps) {
  const [members, setMembers] = useState<BatchMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');

  useEffect(() => {
    // Mock function to simulate fetching batch members
    const fetchBatchMembers = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateMembers();
      
      setLoading(false);
    };
    
    fetchBatchMembers();
  }, [batchId]);

  const updateMembers = () => {
    const mockMembers: BatchMember[] = [
      {
        id: "1",
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        role: "leader" as BatchMemberRole, // Ensure correct type casting
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

  const handleInviteMember = () => {
    if (inviteEmail) {
      alert(`Inviting member with email: ${inviteEmail}`);
      setInviteEmail('');
    }
  };

  const handleRemoveMember = (memberId: string) => {
    alert(`Removing member with ID: ${memberId}`);
  };

  const handlePromoteMember = (memberId: string) => {
    alert(`Promoting member with ID: ${memberId}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Batch Members</CardTitle>
        <CardDescription>Manage members of your batch</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <p>Loading members...</p>
        ) : (
          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    {member.role === 'leader' && (
                      <Badge variant="secondary" className="ml-1">Leader</Badge>
                    )}
                    {member.status === 'pending' && (
                      <Badge variant="outline" className="ml-1">Pending</Badge>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleRemoveMember(member.id)}>
                      <UserMinus className="mr-2 h-4 w-4" />
                      Remove Member
                    </DropdownMenuItem>
                    {member.role !== 'leader' && (
                      <DropdownMenuItem onClick={() => handlePromoteMember(member.id)}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Promote to Leader
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
        <Separator />
        <div className="space-y-2">
          <Label htmlFor="email">Invite New Member</Label>
          <div className="flex items-center space-x-2">
            <Input
              type="email"
              id="email"
              placeholder="Enter email address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <Button onClick={handleInviteMember}>
              <Mail className="mr-2 h-4 w-4" />
              Invite
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
