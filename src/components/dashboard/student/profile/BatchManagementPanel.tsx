
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserPlus, Send, UserCog, Users, Crown } from 'lucide-react';
import BatchCreationDialog from './BatchCreationDialog';

interface BatchMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'active' | 'pending';
  joinedDate?: string;
  role: 'leader' | 'member';
}

interface BatchManagementPanelProps {
  isBatchLeader: boolean;
  batchMembers?: BatchMember[];
  maxMembers: number;
}

const BatchManagementPanel: React.FC<BatchManagementPanelProps> = ({
  isBatchLeader = true,
  batchMembers = [],
  maxMembers = 5
}) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [members, setMembers] = useState<BatchMember[]>(
    batchMembers.length > 0 ? batchMembers : [
      {
        id: '1',
        name: 'You',
        email: 'you@example.com',
        status: 'active',
        joinedDate: new Date().toISOString(),
        role: 'leader'
      },
      {
        id: '2',
        name: 'Aryan Sharma',
        email: 'aryan@example.com',
        status: 'active',
        joinedDate: new Date().toISOString(),
        role: 'member'
      },
      {
        id: '3',
        name: 'Priya Patel',
        email: 'priya@example.com',
        status: 'pending',
        role: 'member'
      }
    ]
  );
  
  const { toast } = useToast();
  
  const [newLeaderId, setNewLeaderId] = useState<string | null>(null);

  const handleCreateBatch = (batchData: any) => {
    console.log("Created batch:", batchData);
    // In a real app, this would make an API call
    
    // Update members with invited ones
    const newMembers: BatchMember[] = batchData.members.map((member: any, index: number) => ({
      id: `new-${index}`,
      name: member.name,
      email: member.email,
      status: 'pending',
      role: 'member'
    }));
    
    setMembers([
      {
        id: '1',
        name: 'You',
        email: 'you@example.com',
        status: 'active',
        joinedDate: new Date().toISOString(),
        role: 'leader'
      },
      ...newMembers
    ]);
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter(member => member.id !== memberId));
    
    toast({
      title: "Member removed",
      description: "The member has been removed from your batch.",
    });
  };
  
  const handleSendReminder = (memberId: string) => {
    toast({
      title: "Reminder sent",
      description: "An invitation reminder has been sent to the member.",
    });
  };
  
  const handleTransferLeadership = () => {
    if (!newLeaderId) {
      toast({
        title: "No member selected",
        description: "Please select a member to transfer leadership to.",
        variant: "destructive"
      });
      return;
    }
    
    setMembers(members.map(member => {
      if (member.id === newLeaderId) {
        return { ...member, role: 'leader' };
      } else if (member.role === 'leader') {
        return { ...member, role: 'member' };
      }
      return member;
    }));
    
    setNewLeaderId(null);
    
    toast({
      title: "Leadership transferred",
      description: "You have successfully transferred batch leadership.",
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-500" />
            Batch Management
          </CardTitle>
          {isBatchLeader && (
            <Button size="sm" onClick={() => setShowCreateDialog(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Members
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium mb-1">No Batch Created</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create a batch to invite members to study together
              </p>
              <Button onClick={() => setShowCreateDialog(true)}>Create Batch</Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">Batch Members</h3>
                  <p className="text-sm text-muted-foreground">
                    {members.length} of {maxMembers} members
                  </p>
                </div>
                {isBatchLeader && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Crown className="h-3 w-3 mr-1" />
                    Batch Leader
                  </Badge>
                )}
              </div>
              
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                  {members.map(member => (
                    <div 
                      key={member.id} 
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div className="flex items-center">
                        <Avatar className="h-9 w-9 mr-3">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium">{member.name}</span>
                            {member.role === 'leader' && (
                              <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">
                                <Crown className="h-3 w-3 mr-1" />
                                Leader
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {member.status === 'pending' ? (
                          <Badge variant="outline" className="mr-2 bg-yellow-50 text-yellow-700 border-yellow-200">
                            Pending
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="mr-2 bg-green-50 text-green-700 border-green-200">
                            Active
                          </Badge>
                        )}
                        
                        {isBatchLeader && member.id !== '1' && (
                          <>
                            {member.status === 'pending' && (
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8" 
                                onClick={() => handleSendReminder(member.id)}
                              >
                                <Send className="h-3 w-3 mr-1" />
                                Remind
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-red-500 h-8" 
                              onClick={() => handleRemoveMember(member.id)}
                            >
                              Remove
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {isBatchLeader && (
                <div className="border-t mt-4 pt-4">
                  <h4 className="text-sm font-medium mb-2">Transfer Leadership</h4>
                  <div className="flex items-center gap-2">
                    <Select value={newLeaderId || ''} onValueChange={setNewLeaderId}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select member" />
                      </SelectTrigger>
                      <SelectContent>
                        {members
                          .filter(m => m.id !== '1' && m.status === 'active')
                          .map(member => (
                            <SelectItem key={member.id} value={member.id}>
                              {member.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      onClick={handleTransferLeadership} 
                      disabled={!newLeaderId}
                    >
                      <UserCog className="h-4 w-4 mr-2" />
                      Transfer
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Transferring leadership will make the selected member the new batch leader.
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
      
      <BatchCreationDialog 
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onCreateBatch={handleCreateBatch}
        maxMembers={maxMembers}
      />
    </>
  );
};

export default BatchManagementPanel;
