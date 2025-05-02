
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Key } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface BatchInvitationInputProps {
  onJoinBatch: (code: string) => Promise<void>;
}

const BatchInvitationInput: React.FC<BatchInvitationInputProps> = ({ onJoinBatch }) => {
  const [inviteCode, setInviteCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) {
      setError('Please enter an invite code');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onJoinBatch(inviteCode.trim());
      // Clear the input field on success
      setInviteCode('');
    } catch (err) {
      setError('An error occurred. Please try again with a valid code.');
      console.error('Error submitting invite code:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-3 flex items-center">
          <Key size={18} className="text-blue-600 mr-1.5" />
          Join a Study Batch
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Enter the invite code provided by your batch leader to join their study group.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <div className="flex-grow">
              <Input
                id="invite-code-input"
                placeholder="Enter invite code (e.g., SAKHA-ABC123)"
                value={inviteCode}
                onChange={(e) => {
                  setInviteCode(e.target.value);
                  if (error) setError(null);
                }}
                className={error ? 'border-red-500' : ''}
              />
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="whitespace-nowrap"
            >
              {isSubmitting ? 'Processing...' : 'Join Batch'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BatchInvitationInput;
