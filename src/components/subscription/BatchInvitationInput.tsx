import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Send, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BatchInvitationInputProps {
  onJoinBatch?: (code: string) => Promise<void>;
  onAddEmail?: (email: string) => boolean;
  onRemoveEmail?: (email: string) => void;
  invitedEmails?: string[];
  maxInvites?: number;
}

const BatchInvitationInput: React.FC<BatchInvitationInputProps> = ({
  onJoinBatch,
  onAddEmail,
  onRemoveEmail,
  invitedEmails = [],
  maxInvites = 10
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid code or email",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // If it looks like an email and onAddEmail is provided
      if (validateEmail(inputValue) && onAddEmail) {
        const added = onAddEmail(inputValue);
        if (added) {
          toast({
            title: "Success",
            description: `${inputValue} has been added to the invite list`
          });
          setInputValue('');
        } else {
          toast({
            title: "Already invited",
            description: `${inputValue} has already been invited`
          });
        }
      } 
      // Otherwise, treat as batch code
      else if (onJoinBatch) {
        await onJoinBatch(inputValue);
        setInputValue('');
      } else {
        toast({
          title: "Invalid input",
          description: "Please enter a valid email address or batch code"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const isInviteDisabled = invitedEmails && invitedEmails.length >= maxInvites;

  return (
    <div className="space-y-4">
      {onAddEmail && (
        <div className="mb-2">
          <h3 className="text-sm font-medium mb-2">Invite Members</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {invitedEmails.map((email) => (
              <Badge key={email} variant="secondary" className="flex items-center gap-1">
                {email}
                {onRemoveEmail && (
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => onRemoveEmail(email)}
                  />
                )}
              </Badge>
            ))}
            {invitedEmails.length === 0 && (
              <p className="text-sm text-muted-foreground">No members invited yet</p>
            )}
          </div>
          {isInviteDisabled && (
            <p className="text-xs text-amber-600">Maximum number of invites reached ({maxInvites})</p>
          )}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder={onAddEmail ? "Enter email address" : "Enter batch code (e.g., SAKHA-ABC123)"}
            disabled={isProcessing || isInviteDisabled}
          />
        </div>
        <Button type="submit" disabled={isProcessing || isInviteDisabled || !inputValue.trim()}>
          {isProcessing ? (
            "Processing..."
          ) : onAddEmail ? (
            <>
              <Plus className="h-4 w-4 mr-1" /> Add
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-1" /> Join
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default BatchInvitationInput;
