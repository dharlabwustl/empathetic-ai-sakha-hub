
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BatchInvitationInputProps {
  onJoinBatch: (batchCode: string) => Promise<void>;
}

const BatchInvitationInput: React.FC<BatchInvitationInputProps> = ({ onJoinBatch }) => {
  const [batchCode, setBatchCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleJoinBatch = async () => {
    if (!batchCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid batch code",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      await onJoinBatch(batchCode);
      setBatchCode('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join batch with this code",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Have an invitation code?</h3>
      <div className="flex w-full items-center space-x-2">
        <Input
          placeholder="Enter batch code (e.g., SAKHA-ABC123)"
          value={batchCode}
          onChange={(e) => setBatchCode(e.target.value)}
          disabled={isProcessing}
          className="flex-1"
        />
        <Button 
          onClick={handleJoinBatch} 
          disabled={isProcessing}
          className="whitespace-nowrap"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Joining...
            </>
          ) : (
            <>
              Join Batch
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BatchInvitationInput;
