
import React, { useState, useEffect, useRef } from 'react';
import { Pause, Play, Square, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReadAloudSectionProps {
  text: string;
  isActive: boolean;
  onStop: () => void;
}

const ReadAloudSection: React.FC<ReadAloudSectionProps> = ({ text, isActive, onStop }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (isActive && isPlaying) {
      startReading();
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      stopReading();
    };
  }, [isActive, isPlaying]);
  
  const startReading = () => {
    if (utteranceRef.current) {
      stopReading();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utteranceRef.current = utterance;
    
    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
      
      // Stop after a second of completing
      setTimeout(() => {
        onStop();
      }, 1000);
    };
    
    utterance.onpause = () => {
      setIsPlaying(false);
    };
    
    utterance.onresume = () => {
      setIsPlaying(true);
    };
    
    // Estimate the duration based on text length
    const estimatedDuration = text.length * 50; // rough estimate
    
    timerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timerRef.current!);
          return 100;
        }
        return prev + 0.5;
      });
    }, estimatedDuration / 200);
    
    speechSynthesis.speak(utterance);
  };
  
  const stopReading = () => {
    speechSynthesis.cancel();
    if (utteranceRef.current) {
      utteranceRef.current = null;
    }
  };
  
  const handlePauseResume = () => {
    if (isPlaying) {
      speechSynthesis.pause();
      setIsPlaying(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    } else {
      speechSynthesis.resume();
      setIsPlaying(true);
    }
  };
  
  const handleStop = () => {
    stopReading();
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    onStop();
  };
  
  return (
    <div className="bg-blue-50 dark:bg-blue-950/30 p-3 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Volume2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Reading aloud...
          </span>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handlePauseResume}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={handleStop}
          >
            <Square className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-2 w-full bg-blue-200 dark:bg-blue-800/50 h-1.5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-300 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ReadAloudSection;
