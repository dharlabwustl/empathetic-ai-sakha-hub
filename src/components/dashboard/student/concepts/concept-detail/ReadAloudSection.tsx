
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, Pause, Play, SkipForward, SkipBack } from 'lucide-react';

interface ReadAloudSectionProps {
  text: string;
  isActive: boolean;
  onStop: () => void;
}

const ReadAloudSection: React.FC<ReadAloudSectionProps> = ({ text, isActive, onStop }) => {
  const [isPaused, setIsPaused] = useState(false);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Initialize speech synthesis
    if (isActive && 'speechSynthesis' in window) {
      speechSynthRef.current = new SpeechSynthesisUtterance(text);
      
      // Set voice (use a neutral voice if available)
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(voice => voice.lang.includes('en'));
      if (englishVoice) {
        speechSynthRef.current.voice = englishVoice;
      }

      // Set properties
      speechSynthRef.current.rate = 1.0;
      speechSynthRef.current.pitch = 1.0;
      speechSynthRef.current.volume = 1.0;

      // Add event listener for when speech ends
      speechSynthRef.current.onend = () => {
        onStop();
      };

      // Start speaking
      window.speechSynthesis.speak(speechSynthRef.current);
    }

    // Cleanup
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isActive, text, onStop]);

  const handlePause = () => {
    if ('speechSynthesis' in window) {
      if (isPaused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const handleStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      onStop();
    }
  };

  return (
    <Card className="mt-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Volume2 className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-sm font-medium">Reading text aloud...</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0 rounded-full" 
              onClick={handlePause}
            >
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0 rounded-full" 
              onClick={handleStop}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadAloudSection;
