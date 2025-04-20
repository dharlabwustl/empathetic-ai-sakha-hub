
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BatchInvitationInputProps } from './batch/types';

const BatchInvitationInput: React.FC<BatchInvitationInputProps> = ({ 
  onActivate,
  activationSuccess,
  onJoinBatch
}) => {
  const [invitationCode, setInvitationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!invitationCode.trim()) {
      setError("Please enter an invitation code");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Try activation if available
      if (onActivate) {
        const success = await onActivate(invitationCode);
        if (success) {
          toast({
            title: "Success!",
            description: "Invitation code activated successfully.",
          });
          return;
        }
      }
      
      // Fall back to join batch
      const success = await onJoinBatch(invitationCode);
      if (success) {
        toast({
          title: "Success!",
          description: "You have successfully joined the batch.",
        });
      } else {
        setError("Invalid invitation code. Please check and try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error activating code:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Batch Invitation</CardTitle>
        <CardDescription>
          Enter your invitation code to join a batch and unlock premium features
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {activationSuccess ? (
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-700 dark:text-green-400">
                Activation Successful!
              </h4>
              <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                Your invitation code has been activated. You now have access to all premium features 
                included in your batch subscription.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Enter your invitation code (e.g., SAKHA-ABC123)"
                  value={invitationCode}
                  onChange={(e) => setInvitationCode(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full"
                />
              </div>
              
              {error && (
                <div className="flex items-center text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm text-blue-700 dark:text-blue-300">
                <p>
                  Invitation codes are provided by batch leaders or administrators.
                  If you don't have a code, you can purchase a group plan or contact support.
                </p>
              </div>
            </div>
          </form>
        )}
      </CardContent>
      
      {!activationSuccess && (
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || !invitationCode.trim()}
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                Processing...
              </>
            ) : (
              'Activate Code'
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BatchInvitationInput;
