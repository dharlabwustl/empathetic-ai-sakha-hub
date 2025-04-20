
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Check } from "lucide-react";

interface BatchInvitationInputProps {
  onJoinBatch: (code: string) => Promise<boolean>;
}

const BatchInvitationInput: React.FC<BatchInvitationInputProps> = ({ onJoinBatch }) => {
  const [invitationCode, setInvitationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!invitationCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter an invitation code",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const success = await onJoinBatch(invitationCode);
      
      if (success) {
        setIsSuccess(true);
        toast({
          title: "Success!",
          description: "You have successfully joined the batch",
        });
        
        // Reset after showing success state for a few seconds
        setTimeout(() => {
          setInvitationCode("");
          setIsSuccess(false);
        }, 3000);
      } else {
        toast({
          title: "Error",
          description: "Invalid invitation code. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join batch. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-lg font-medium mb-3">Join a Batch</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Enter an invitation code to join a study batch
      </p>
      
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <Input
          placeholder="Enter invitation code (e.g., SAKHA-123ABC)"
          value={invitationCode}
          onChange={(e) => setInvitationCode(e.target.value)}
          className="flex-1"
          maxLength={20}
          disabled={isSubmitting || isSuccess}
        />
        <Button 
          type="submit" 
          disabled={isSubmitting || isSuccess || !invitationCode.trim()}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isSuccess ? (
            <Check className="h-4 w-4" />
          ) : (
            "Join"
          )}
        </Button>
      </form>
      
      <p className="text-xs text-muted-foreground mt-2">
        The batch organizer will receive a notification of your request to join
      </p>
    </div>
  );
};

export default BatchInvitationInput;
