
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";

interface BatchInvitationInputProps {
  onJoinBatch: (code: string) => Promise<void>;
}

const BatchInvitationInput: React.FC<BatchInvitationInputProps> = ({ onJoinBatch }) => {
  const [invitationCode, setInvitationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    try {
      await onJoinBatch(invitationCode);
      setInvitationCode("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid invitation code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Join a Batch</h3>
        <p className="text-sm text-muted-foreground">
          Enter your batch invitation code to join an existing study group
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Input
            placeholder="Enter invitation code"
            value={invitationCode}
            onChange={(e) => setInvitationCode(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading || !invitationCode.trim()}>
          {isLoading ? "Joining..." : "Join Batch"}
        </Button>
      </form>

      <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
        <AlertCircle className="h-4 w-4 mt-0.5" />
        <p>
          Don't have an invitation code? Ask your batch leader or create your own batch by upgrading to a group plan.
        </p>
      </div>
    </div>
  );
};

export default BatchInvitationInput;
