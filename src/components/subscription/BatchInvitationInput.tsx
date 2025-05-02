import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface BatchInvitationInputProps {
  onJoinBatch?: (code: string) => Promise<void>;
  onAddEmail?: (email: string) => void;
  placeholder?: string;
}

const BatchInvitationInput: React.FC<BatchInvitationInputProps> = ({ 
  onJoinBatch,
  onAddEmail,
  placeholder = "Enter batch code (e.g., SAKHA-ABC123)"
}) => {
  const { toast } = useToast();
  const [invitationCode, setInvitationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!invitationCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid code or email",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // If it looks like an email, handle as email
      if (invitationCode.includes('@') && onAddEmail) {
        onAddEmail(invitationCode);
        setInvitationCode('');
      } 
      // Otherwise handle as batch code
      else if (onJoinBatch) {
        await onJoinBatch(invitationCode);
        setInvitationCode('');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your request",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg items-center space-x-2">
      <Input
        type="text"
        placeholder={placeholder}
        value={invitationCode}
        onChange={(e) => setInvitationCode(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" disabled={isSubmitting || !invitationCode.trim()}>
        {isSubmitting ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {onJoinBatch ? "Joining..." : "Adding..."}
          </span>
        ) : (
          onJoinBatch ? "Join" : "Add"
        )}
      </Button>
    </form>
  );
};

export default BatchInvitationInput;
