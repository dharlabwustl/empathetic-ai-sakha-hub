
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Users, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface BatchInvitationInputProps {
  onActivate: (code: string) => Promise<boolean>;
  activationSuccess: boolean;
  onJoinBatch: (code: string) => Promise<boolean>;
}

const BatchInvitationInput: React.FC<BatchInvitationInputProps> = ({ 
  onActivate, 
  activationSuccess, 
  onJoinBatch 
}) => {
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteCode.trim()) {
      setError("Please enter an invitation code");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const success = await onActivate(inviteCode);
      if (!success) {
        setError("Invalid or expired invitation code");
      }
    } catch (err) {
      setError("Failed to activate code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinBatch = async () => {
    if (!inviteCode.trim()) {
      setError("Please enter an invitation code");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const success = await onJoinBatch(inviteCode);
      if (!success) {
        setError("Failed to join batch. Invalid or expired code.");
      }
    } catch (err) {
      setError("Failed to join batch. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl">
          <Users className="h-5 w-5 mr-2 text-blue-500" />
          Join a Study Batch
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="inviteCode" className="text-sm font-medium">
              Enter your batch invitation code
            </label>
            <Input
              id="inviteCode"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="e.g., SAKHA-AB12CD"
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Ask your batch leader for your unique invitation code.
            </p>
          </div>
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" onClick={() => setInviteCode('')}>
          Cancel
        </Button>
        <div className="space-x-2">
          <Button 
            variant="default" 
            disabled={loading || !inviteCode} 
            onClick={handleJoinBatch}
          >
            {loading ? "Processing..." : "Join Batch"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BatchInvitationInput;
