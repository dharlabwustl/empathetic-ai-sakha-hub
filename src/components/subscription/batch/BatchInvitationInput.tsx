
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Check } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface BatchInvitationInputProps {
  planId: string;
  maxMembers: number;
  onComplete?: (emails: string[]) => void;
}

const BatchInvitationInput: React.FC<BatchInvitationInputProps> = ({
  planId,
  maxMembers,
  onComplete
}) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const { toast } = useToast();

  const handleAddEmail = () => {
    if (!currentEmail.trim()) return;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(currentEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    // Check if email already exists in the list
    if (emails.includes(currentEmail)) {
      toast({
        title: "Duplicate Email",
        description: "This email is already in your invitation list",
        variant: "destructive"
      });
      return;
    }
    
    // Check if we've reached the maximum allowed members
    if (emails.length >= maxMembers) {
      toast({
        title: "Maximum Reached",
        description: `You can only invite up to ${maxMembers} members with this plan`,
        variant: "destructive"
      });
      return;
    }
    
    setEmails([...emails, currentEmail]);
    setCurrentEmail('');
  };
  
  const handleRemoveEmail = (index: number) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
  };
  
  const handleComplete = () => {
    if (onComplete && emails.length > 0) {
      onComplete(emails);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEmail();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter email address"
          value={currentEmail}
          onChange={(e) => setCurrentEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button 
          onClick={handleAddEmail}
          size="sm"
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
      
      {emails.length > 0 && (
        <div className="border rounded-md p-4 space-y-2">
          <h4 className="text-sm font-medium">Invitations ({emails.length}/{maxMembers})</h4>
          
          <div className="space-y-2">
            {emails.map((email, index) => (
              <div 
                key={index}
                className="flex justify-between items-center p-2 bg-muted rounded-md"
              >
                <span className="text-sm">{email}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleRemoveEmail(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
          
          {emails.length > 0 && (
            <Button
              className="mt-4 w-full"
              onClick={handleComplete}
            >
              <Check className="h-4 w-4 mr-2" />
              Continue with {emails.length} Invitation{emails.length !== 1 ? 's' : ''}
            </Button>
          )}
        </div>
      )}
      
      <p className="text-xs text-muted-foreground">
        Note: Group members will receive an email invitation after you complete the checkout process.
      </p>
    </div>
  );
};

export default BatchInvitationInput;
