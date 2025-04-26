
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";

interface InviteCodeFormProps {
  onSubmit: (code: string) => Promise<boolean>;
}

const InviteCodeForm: React.FC<InviteCodeFormProps> = ({ onSubmit }) => {
  const [code, setCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) return;
    
    setIsProcessing(true);
    
    try {
      await onSubmit(code.trim());
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="invite-code-input">
          Enter your batch invitation code
        </Label>
        <div className="flex mt-1">
          <Input
            id="invite-code-input"
            placeholder="e.g., SAKHA-ABC123"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Enter the code you received in your invitation email
        </p>
      </div>
      
      <Button
        type="submit"
        className="w-full"
        disabled={!code.trim() || isProcessing}
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Verifying...
          </>
        ) : (
          <>
            <Users className="mr-2 h-4 w-4" />
            Join Batch
          </>
        )}
      </Button>
    </form>
  );
};

export default InviteCodeForm;
