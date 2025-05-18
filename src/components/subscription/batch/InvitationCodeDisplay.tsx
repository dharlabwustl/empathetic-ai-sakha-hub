
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InvitationCodeDisplayProps {
  inviteCode: string;
}

const InvitationCodeDisplay: React.FC<InvitationCodeDisplayProps> = ({ inviteCode }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode)
      .then(() => {
        setCopied(true);
        toast({
          title: "Copied!",
          description: "Invitation code copied to clipboard"
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "Please try manually selecting the code",
          variant: "destructive"
        });
      });
  };

  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground">Invitation Code</div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-50 dark:bg-gray-800 border rounded-md px-3 py-2 font-mono">
          {inviteCode}
        </div>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleCopyCode}
          className={copied ? "text-green-600" : ""}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default InvitationCodeDisplay;
