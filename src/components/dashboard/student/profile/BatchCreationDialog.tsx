
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { UsersRound, Plus, Copy, CheckCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface BatchMember {
  name: string;
  email: string;
  phone?: string;
}

interface BatchCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBatch: (batchData: any) => void;
  maxMembers: number;
}

const BatchCreationDialog: React.FC<BatchCreationDialogProps> = ({
  isOpen,
  onClose,
  onCreateBatch,
  maxMembers
}) => {
  const [batchName, setBatchName] = useState('');
  const [examGoal, setExamGoal] = useState('');
  const [targetYear, setTargetYear] = useState('2025');
  const [members, setMembers] = useState<BatchMember[]>([]);
  const [currentMember, setCurrentMember] = useState<BatchMember>({ name: '', email: '' });
  const [allowProgressSharing, setAllowProgressSharing] = useState(true);
  const [allowLeaderTransfer, setAllowLeaderTransfer] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [codeCopied, setCodeCopied] = useState(false);
  
  const { toast } = useToast();

  // Reset form when dialog opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      setBatchName('');
      setExamGoal('');
      setTargetYear('2025');
      setMembers([]);
      setCurrentMember({ name: '', email: '' });
      setAllowProgressSharing(true);
      setAllowLeaderTransfer(false);
      setInviteCode('');
      setCodeCopied(false);
    } else {
      // Generate a sample invite code
      setInviteCode(`SAKHA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
    }
  }, [isOpen]);

  const handleAddMember = () => {
    if (!currentMember.name || !currentMember.email) {
      toast({
        title: "Missing information",
        description: "Please provide both name and email for the member.",
        variant: "destructive"
      });
      return;
    }
    
    if (members.length >= maxMembers) {
      toast({
        title: "Member limit reached",
        description: `Your plan allows a maximum of ${maxMembers} members.`,
        variant: "destructive"
      });
      return;
    }
    
    if (members.some(m => m.email === currentMember.email)) {
      toast({
        title: "Duplicate email",
        description: "This email is already in your invitation list.",
        variant: "destructive"
      });
      return;
    }
    
    setMembers([...members, currentMember]);
    setCurrentMember({ name: '', email: '' });
  };
  
  const handleRemoveMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };
  
  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCodeCopied(true);
    
    toast({
      title: "Invite code copied!",
      description: "The code has been copied to your clipboard.",
    });
    
    setTimeout(() => setCodeCopied(false), 3000);
  };
  
  const handleCreateBatch = () => {
    if (!batchName) {
      toast({
        title: "Missing batch name",
        description: "Please provide a name for your batch.",
        variant: "destructive"
      });
      return;
    }
    
    if (!examGoal) {
      toast({
        title: "Missing exam goal",
        description: "Please select an exam goal for your batch.",
        variant: "destructive"
      });
      return;
    }
    
    onCreateBatch({
      batchName,
      examGoal,
      targetYear,
      members,
      allowProgressSharing,
      allowLeaderTransfer,
      inviteCode
    });
    
    toast({
      title: "Batch created successfully!",
      description: `Your "${batchName}" batch has been created.`,
    });
    
    onClose();
  };

  const examOptions = [
    "IIT-JEE",
    "NEET",
    "UPSC",
    "CAT",
    "GATE",
    "GMAT",
    "GRE",
    "Bank Exams",
    "SSC",
    "CLAT",
    "NDA"
  ];
  
  const yearOptions = ["2025", "2026", "2027", "2028"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <UsersRound className="mr-2 h-5 w-5" />
            Create New Batch
          </DialogTitle>
          <DialogDescription>
            Create a study batch and invite members to join your group plan.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="batch-name">Batch Name</Label>
              <Input 
                id="batch-name" 
                value={batchName} 
                onChange={(e) => setBatchName(e.target.value)} 
                placeholder="e.g., JEE Champions 2025" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="exam-goal">Exam Goal</Label>
                <Select value={examGoal} onValueChange={setExamGoal}>
                  <SelectTrigger id="exam-goal">
                    <SelectValue placeholder="Select exam" />
                  </SelectTrigger>
                  <SelectContent>
                    {examOptions.map(exam => (
                      <SelectItem key={exam} value={exam}>{exam}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="target-year">Target Year</Label>
                <Select value={targetYear} onValueChange={setTargetYear}>
                  <SelectTrigger id="target-year">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="flex items-center justify-between mb-2">
                <Label>Invite Members ({members.length}/{maxMembers})</Label>
                <Badge variant="secondary">{maxMembers - members.length} spots left</Badge>
              </div>
              
              <div className="flex gap-2 mb-2">
                <Input 
                  value={currentMember.name}
                  onChange={(e) => setCurrentMember({...currentMember, name: e.target.value})}
                  placeholder="Member name"
                  className="flex-1"
                />
                <Input 
                  value={currentMember.email}
                  onChange={(e) => setCurrentMember({...currentMember, email: e.target.value})}
                  placeholder="Email address"
                  type="email"
                  className="flex-1"
                />
                <Button type="button" onClick={handleAddMember} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {members.length > 0 && (
                <div className="border rounded-md p-2 max-h-[150px] overflow-y-auto">
                  {members.map((member, index) => (
                    <div key={index} className="flex items-center justify-between py-1 px-2 text-sm hover:bg-muted rounded-md">
                      <div>
                        <span className="font-medium">{member.name}</span>
                        <span className="text-muted-foreground ml-2">{member.email}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveMember(index)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border rounded-md p-4 mt-2 bg-muted/50">
              <h4 className="text-sm font-medium mb-3">Batch Invite Code</h4>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-background p-2 rounded-md font-mono text-center">
                  {inviteCode}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2" 
                  onClick={copyInviteCode}
                >
                  {codeCopied ? (
                    <>
                      <CheckCheck className="h-4 w-4" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Members can use this code to join your batch. You can share it with them directly.
              </p>
            </div>
            
            <div className="border-t pt-4 mt-2">
              <h4 className="text-sm font-medium mb-3">Batch Settings</h4>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label htmlFor="progress-sharing" className="text-sm">Allow progress sharing</Label>
                  <p className="text-xs text-muted-foreground">
                    Members can see each other's progress
                  </p>
                </div>
                <Switch
                  id="progress-sharing"
                  checked={allowProgressSharing}
                  onCheckedChange={setAllowProgressSharing}
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label htmlFor="leader-transfer" className="text-sm">Allow leadership transfer</Label>
                  <p className="text-xs text-muted-foreground">
                    You can transfer leadership to another member
                  </p>
                </div>
                <Switch
                  id="leader-transfer"
                  checked={allowLeaderTransfer}
                  onCheckedChange={setAllowLeaderTransfer}
                />
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreateBatch}>Create Batch</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BatchCreationDialog;
