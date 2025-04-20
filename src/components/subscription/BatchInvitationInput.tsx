
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, CheckCircle } from 'lucide-react';

interface BatchInvitationInputProps {
  onActivate: (code: string) => Promise<boolean>;
  isLoading?: boolean;
  activationSuccess?: boolean;
}

const BatchInvitationInput: React.FC<BatchInvitationInputProps> = ({ 
  onActivate,
  isLoading = false,
  activationSuccess = false
}) => {
  const [inviteCode, setInviteCode] = useState('');
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();
  
  const handleActivate = async () => {
    if (inviteCode.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter a valid invitation code",
        variant: "destructive",
      });
      return;
    }
    
    setProcessing(true);
    try {
      const success = await onActivate(inviteCode);
      if (!success) {
        toast({
          title: "Invalid Code",
          description: "The invitation code you entered is not valid",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (activationSuccess) {
    return (
      <Card className="border-green-200 dark:border-green-800">
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="mr-4 bg-green-100 dark:bg-green-900 p-2 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                Batch Membership Activated!
              </h3>
              <p className="mt-1 text-sm text-green-700 dark:text-green-400">
                You have successfully joined the batch. Enjoy your enhanced learning experience!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Join a Batch or Group</CardTitle>
        <CardDescription>
          Enter your invitation code to join a batch, school, or corporate group
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input 
              placeholder="Enter invitation code (e.g. SAKHA-123456)"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="flex-grow"
              disabled={isLoading || processing}
            />
            <Button 
              onClick={handleActivate}
              disabled={isLoading || processing}
            >
              {(isLoading || processing) ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Activate'
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            This code can be provided by a batch leader, school administrator, or corporate manager.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchInvitationInput;
