
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';

interface BatchInvitationInputProps {
  onJoinBatch: (code: string) => Promise<void>;
}

const BatchInvitationInput: React.FC<BatchInvitationInputProps> = ({ onJoinBatch }) => {
  const [inviteCode, setInviteCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteCode.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a valid invitation code',
        variant: 'destructive',
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      await onJoinBatch(inviteCode);
      setInviteCode('');
      toast({
        title: 'Success!',
        description: 'You have successfully joined the batch',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to join batch. Please check your invitation code.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Join a Batch</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Enter batch invitation code"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isProcessing} 
            className="whitespace-nowrap"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            {isProcessing ? "Joining..." : "Join Batch"}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2">
          Enter the invitation code provided by your batch admin to join a study group
        </p>
      </CardContent>
    </Card>
  );
};

export default BatchInvitationInput;
