
import React, { useState } from 'react';
import { Volume2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FloatingVoiceAssistant from '@/components/dashboard/student/FloatingVoiceAssistant';

interface FloatingVoiceIconProps {
  userName?: string;
}

const FloatingVoiceIcon: React.FC<FloatingVoiceIconProps> = ({ userName }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      {/* Floating Voice Icon - Fixed position */}
      <div className="fixed bottom-6 right-6 z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setShowSettings(true)}
                className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
                size="icon"
              >
                <Volume2 className="h-6 w-6 text-white" />
                <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Sakha AI Voice Assistant</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Voice Assistant Settings Panel */}
      <FloatingVoiceAssistant
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        userName={userName}
      />
    </>
  );
};

export default FloatingVoiceIcon;
