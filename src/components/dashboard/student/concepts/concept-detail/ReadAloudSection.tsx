
import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { VolumeX, Volume2 } from 'lucide-react';

interface ReadAloudSectionProps {
  text: string;
  isActive: boolean;
  onStop: () => void;
}

const ReadAloudSection: React.FC<ReadAloudSectionProps> = ({
  text,
  isActive,
  onStop
}) => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    let synthUtterance: SpeechSynthesisUtterance | null = null;
    let interval: ReturnType<typeof setInterval>;
    
    if (isActive && !isPaused) {
      // Create and configure the utterance
      synthUtterance = new SpeechSynthesisUtterance(text);
      synthUtterance.rate = 0.95;
      
      // Calculate approximate duration based on word count
      const wordCount = text.split(/\s+/).length;
      const approximateDuration = wordCount * 0.3; // Average 0.3 seconds per word
      
      // Setup progress update
      let elapsedTime = 0;
      interval = setInterval(() => {
        if (!speechSynthesis.speaking) {
          clearInterval(interval);
          setProgress(100);
          setTimeout(() => onStop(), 1000);
          return;
        }
        
        elapsedTime += 0.1;
        const newProgress = Math.min(100, (elapsedTime / approximateDuration) * 100);
        setProgress(newProgress);
      }, 100);
      
      // Start speaking
      speechSynthesis.speak(synthUtterance);
      
      // Setup event handlers
      synthUtterance.onend = () => {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => onStop(), 1000);
      };
      
      synthUtterance.onerror = () => {
        clearInterval(interval);
        onStop();
      };
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
      if (isActive && speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, [isActive, isPaused, text, onStop]);
  
  const togglePause = () => {
    if (speechSynthesis.speaking) {
      if (isPaused) {
        speechSynthesis.resume();
      } else {
        speechSynthesis.pause();
      }
      setIsPaused(!isPaused);
    }
  };
  
  const handleStop = () => {
    speechSynthesis.cancel();
    onStop();
  };
  
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-100 dark:border-blue-800/50 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium text-blue-800 dark:text-blue-300 text-sm">
          {isPaused ? "Paused" : "Reading aloud..."}
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 w-7 p-0" 
            onClick={togglePause}
          >
            {isPaused ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 text-xs px-2" 
            onClick={handleStop}
          >
            Stop
          </Button>
        </div>
      </div>
      
      <Progress value={progress} className="h-1" />
    </div>
  );
};

export default ReadAloudSection;
