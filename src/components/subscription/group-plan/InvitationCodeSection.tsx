
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InvitationCodeSectionProps {
  codes: string[];
  maxInvites: number;
}

const InvitationCodeSection = ({ codes, maxInvites }: InvitationCodeSectionProps) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const copyInviteCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    
    setTimeout(() => {
      setCopiedCodeIndex(null);
    }, 2000);
    
    toast({
      title: "Code Copied!",
      description: "Invitation code copied to clipboard",
    });
  };

  return (
    <div className="space-y-4">
      <Label>Access Codes</Label>
      <ScrollArea className="h-[200px]">
        <div className="space-y-2">
          {codes.slice(0, maxInvites - 1).map((code, index) => (
            <div
              key={code}
              className="flex items-center justify-between bg-purple-50 dark:bg-purple-900/20 rounded-lg px-4 py-2"
            >
              <code className="font-mono text-sm text-purple-700 dark:text-purple-300">
                {code}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyInviteCode(code, index)}
                className="flex items-center space-x-1 hover:bg-purple-100 dark:hover:bg-purple-900"
              >
                {copiedCodeIndex === index ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copiedCodeIndex === index ? "Copied" : "Copy"}</span>
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default InvitationCodeSection;
