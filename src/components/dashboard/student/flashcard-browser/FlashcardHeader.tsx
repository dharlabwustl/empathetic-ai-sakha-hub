
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from 'lucide-react';

interface FlashcardHeaderProps {
  subject: string;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
}

const FlashcardHeader = ({ subject, voiceEnabled, onToggleVoice }: FlashcardHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <Badge variant="outline">{subject}</Badge>
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleVoice}
      >
        {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default FlashcardHeader;
