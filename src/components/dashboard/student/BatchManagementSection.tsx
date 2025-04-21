
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Copy, 
  Users, 
  Mail, 
  UserPlus, 
  AlertTriangle, 
  Info, 
  UserX, 
  Share2, 
  Link 
} from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface BatchMember {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'expired';
  joinedAt: string;
  lastActive?: string;
}

interface BatchCode {
  code: string;
  used: boolean;
  email?: string;
}

interface BatchManagementSectionProps {
  isLeader?: boolean;
  batchName?: string;
  batchCode?: string;
  leader?: {
    name: string;
    email: string;
  };
  members?: BatchMember[];
  inviteCodes?: BatchCode[];
}

const BatchManagementSection: React.FC<BatchManagementSectionProps> = ({
  isLeader = false,
  batchName = "IIT-JEE Batch 2025",
  batchCode = "SAKHA-ABC123",
  leader = {
    name: "Amit Singh",
    email: "amit.singh@example.com"
  },
  members = [
    {
      id: "1",
      name: "Rohit Kumar",
      email: "rohit.kumar@example.com",
      status: 'active' as const,
      joinedAt: "2025-04-15T10:30:00Z",
      lastActive: "2025-04-20T14:25:00Z"
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      status: 'active' as const,
      joinedAt: "2025-04-16T11:45:00Z",
      lastActive: "2025-04-21T09:15:00Z"
    }
  ],
  inviteCodes = [
    {
      code: "SAKHA-DEF456",
      used: false
    },
    {
      code: "SAKHA-GHI789",
      used: false
    },
    {
      code: "SAKHA-JKL012",
      used: true,
      email: "neha.patel@example.com"
    }
  ]
}) => {
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { toast } = useToast();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
    
    toast({
      title: "Code Copied!",
      description: "Invitation code copied to clipboard",
    });
  };
  
  const handleAddMember = () => {
    if (!newMemberEmail) return;
    
    // In a real app, this would send an invitation email
    toast({
      title: "Invitation Sent!",
      description: `An invitation has been sent to ${newMemberEmail}`,
    });
    
    setNewMemberEmail('');
  };
  
  const handleRemoveMember = (id: string, name: string) => {
    // In a real app, this would remove the member from the batch
    toast({
      title: "Member Removed",
      description: `${name} has been removed from the batch`,
      variant: "destructive",
    });
  };
  
  const handleJoinBatch = () => {
    // For non-leaders, this would join the batch
    toast({
      title: "Successfully Joined",
      description: "You have joined the batch!",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Batch Information</CardTitle>
          {!isLeader && (
            <Button onClick={handleJoinBatch}>
              <UserPlus className="mr-2 h-4 w-4" />
              Join Batch
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-lg">{batchName}</div>
              <div className="text-sm text-muted-foreground">
                Batch Leader: {leader.name} ({leader.email})
              </div>
            </div>
            <Badge variant="outline" className="flex items-center bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700">
              <Users className="h-3.5 w-3.5 mr-1" />
              Group Plan
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md">
            <div className="flex items-center">
              <div className="mr-2 text-sm font-medium">Batch Code:</div>
              <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">{batchCode}</code>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleCopyCode(batchCode)}
              className="h-8"
            >
              {copiedCode === batchCode ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              {isLeader ? (
                <>
                  As a batch leader, you can manage members, share invitation codes,
                  and monitor group progress. Each code can be used only once.
                </>
              ) : (
                <>
                  You're part of this group plan. Enjoy access to all premium features
                  as long as your batch subscription remains active.
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {isLeader && (
        <Card>
          <CardHeader>
            <CardTitle>Invite Members</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter email address"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddMember}>
                <Mail className="mr-2 h-4 w-4" />
                Send Invite
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="font-medium mb-2">Unused Invitation Codes</h3>
              <div className="space-y-2">
                {inviteCodes.filter(code => !code.used).map((code, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">{code.code}</code>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleCopyCode(code.code)}
                        className="h-8"
                      >
                        {copiedCode === code.code ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {inviteCodes.filter(code => !code.used).length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    <AlertTriangle className="h-10 w-10 mx-auto mb-2 opacity-50" />
                    <p>No unused invitation codes available</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Batch Members ({members.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map(member => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-muted-foreground">{member.email}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Joined: {formatDate(member.joinedAt)}
                    {member.lastActive && ` • Last active: ${formatDate(member.lastActive)}`}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={
                    member.status === 'active' ? 
                      'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400' : 
                    member.status === 'pending' ? 
                      'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-400' : 
                      'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                  }>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </Badge>
                  
                  {isLeader && member.id !== "1" && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                      onClick={() => handleRemoveMember(member.id, member.name)}
                    >
                      <UserX className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            {inviteCodes.filter(code => code.used).map((code, index) => (
              <div key={`used-${index}`} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md opacity-75">
                <div>
                  <div className="font-medium">{code.email}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Used invitation code: {code.code}
                  </div>
                </div>
                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-400">
                  Pending
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchManagementSection;
