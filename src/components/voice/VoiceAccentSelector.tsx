
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LANGUAGE_OPTIONS } from '@/components/dashboard/student/voice/voiceUtils';

interface VoiceAccentSelectorProps {
  onAccentChange?: (accent: string) => void;
  currentAccent?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const VoiceAccentSelector: React.FC<VoiceAccentSelectorProps> = ({
  onAccentChange,
  currentAccent = 'en-GB', // Default to UK English
  showLabel = true,
  size = 'md'
}) => {
  const [selectedAccent, setSelectedAccent] = useState(currentAccent);
  const { toast } = useToast();
  
  // Sync with external accent value if provided
  useEffect(() => {
    if (currentAccent && currentAccent !== selectedAccent) {
      setSelectedAccent(currentAccent);
    }
  }, [currentAccent]);

  const handleAccentChange = (value: string) => {
    setSelectedAccent(value);
    localStorage.setItem('preferred_voice_accent', value);
    
    if (onAccentChange) {
      onAccentChange(value);
    }
    
    // Show toast notification
    toast({
      title: "Voice accent updated",
      description: `Your voice assistant will now speak in ${getAccentName(value)}`,
    });
  };
  
  const getAccentName = (code: string): string => {
    const language = LANGUAGE_OPTIONS.find(lang => lang.value === code);
    return language ? language.label : code;
  };

  return (
    <div className="flex flex-col space-y-1">
      {showLabel && <label className="text-sm font-medium">Voice Accent</label>}
      
      <Select value={selectedAccent} onValueChange={handleAccentChange}>
        <SelectTrigger className={`w-full ${size === 'sm' ? 'h-8 text-xs' : size === 'lg' ? 'h-12 text-base' : 'h-10 text-sm'}`}>
          <span className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <SelectValue placeholder="Select accent" />
          </span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en-GB">
            <div className="flex items-center gap-2">
              <span>UK English</span>
              {selectedAccent === 'en-GB' && <Check className="h-4 w-4" />}
            </div>
          </SelectItem>
          <SelectItem value="en-US">
            <div className="flex items-center gap-2">
              <span>US English</span>
              {selectedAccent === 'en-US' && <Check className="h-4 w-4" />}
            </div>
          </SelectItem>
          <SelectItem value="en-IN">
            <div className="flex items-center gap-2">
              <span>Indian English</span>
              {selectedAccent === 'en-IN' && <Check className="h-4 w-4" />}
            </div>
          </SelectItem>
          <SelectItem value="hi-IN">
            <div className="flex items-center gap-2">
              <span>Hindi</span>
              {selectedAccent === 'hi-IN' && <Check className="h-4 w-4" />}
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default VoiceAccentSelector;
