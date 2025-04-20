
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';

export interface BatchInvitationInputProps {
  onJoinBatch: (code: string) => Promise<void>;
  onActivate?: (code: string) => Promise<boolean>;  // Added for compatibility
  activationSuccess?: boolean;  // Added for compatibility
}

const BatchInvitationInput: React.FC<BatchInvitationInputProps> = ({ onJoinBatch, onActivate, activationSuccess }) => {
  const [inviteCode, setInviteCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter an invitation code",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Use onActivate if provided, otherwise use onJoinBatch
      if (onActivate) {
        const success = await onActivate(inviteCode);
        if (success) {
          toast({
            title: "Success",
            description: "You've successfully joined the batch"
          });
          setInviteCode('');
        } else {
          toast({
            title: "Failed",
            description: "Invalid invitation code. Please check and try again.",
            variant: "destructive"
          });
        }
      } else {
        await onJoinBatch(inviteCode);
        setInviteCode('');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join batch. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Join a Batch</CardTitle>
        <CardDescription>
          Have an invitation code? Enter it below to join an existing batch.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Enter invitation code (SAKHA-XXXXXX)"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="font-mono"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !inviteCode.trim()}
          >
            {isSubmitting ? "Joining..." : "Join Batch"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BatchInvitationInput;
