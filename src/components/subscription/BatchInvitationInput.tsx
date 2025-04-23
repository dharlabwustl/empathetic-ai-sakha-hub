
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface BatchInvitationInputProps {
  onJoinBatch: (code: string) => Promise<void>;
}

const BatchInvitationInput: React.FC<BatchInvitationInputProps> = ({ onJoinBatch }) => {
  const [inviteCode, setInviteCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid invitation code.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await onJoinBatch(inviteCode.trim());
      setInviteCode('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join batch. Please check your code and try again.",
        variant: "destructive",
      });
      console.error("Error joining batch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join a Batch</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="invite-code">Enter Invitation Code</Label>
            <Input
              id="invite-code"
              placeholder="e.g., SAKHA-123456"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                Joining...
              </>
            ) : (
              'Join Batch'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BatchInvitationInput;
