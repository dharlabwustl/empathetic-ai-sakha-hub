
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';

interface BatchInvitationInputProps {
  onJoinBatch: (code: string) => Promise<void>;
  onActivate?: (code: string) => Promise<boolean>;
  activationSuccess?: boolean;
}

const BatchInvitationInput: React.FC<BatchInvitationInputProps> = ({ 
  onJoinBatch,
  onActivate,
  activationSuccess 
}) => {
  const [invitationCode, setInvitationCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleJoinBatch = async () => {
    if (!invitationCode.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter an invitation code',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    try {
      if (onActivate) {
        const success = await onActivate(invitationCode);
        if (!success) {
          toast({
            title: 'Error',
            description: 'Invalid invitation code. Please check and try again.',
            variant: 'destructive',
          });
          setIsProcessing(false);
          return;
        }
      } else {
        await onJoinBatch(invitationCode);
      }
      setInvitationCode('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join a Batch</CardTitle>
        <CardDescription>
          Have an invitation code? Enter it below to join a batch.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter invitation code"
              value={invitationCode}
              onChange={(e) => setInvitationCode(e.target.value)}
              className="flex-1"
              disabled={isProcessing || activationSuccess}
            />
            <Button 
              onClick={handleJoinBatch} 
              disabled={isProcessing || activationSuccess}
            >
              {isProcessing ? 'Processing...' : 'Join'}
            </Button>
          </div>
          
          {activationSuccess && (
            <div className="p-3 bg-green-50 text-green-800 rounded-md flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Success!</p>
                <p className="text-sm">You have successfully joined the batch.</p>
              </div>
            </div>
          )}
          
          <p className="text-sm text-muted-foreground">
            You'll need a valid invitation code from a batch leader to join their batch.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchInvitationInput;
