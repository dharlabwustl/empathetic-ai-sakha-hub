
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ReadAloudSectionProps {
  text: string;
  isActive: boolean;
  onStop: () => void;
}

const ReadAloudSection: React.FC<ReadAloudSectionProps> = ({ text, isActive, onStop }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  
  // Format time in mm:ss format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Calculate estimated reading time based on average reading speed
  useEffect(() => {
    if (text) {
      const words = text.split(/\s+/).length;
      const timeInSeconds = Math.floor(words / 2.5); // Assuming 150 words per minute reading speed (2.5 words per second)
      setTotalTime(timeInSeconds);
    }
  }, [text]);
  
  // Progress tracking
  useEffect(() => {
    let intervalId: number | null = null;
    
    if (isActive && !isPaused) {
      intervalId = window.setInterval(() => {
        setElapsedTime(prev => {
          const newTime = prev + 1;
          const newProgress = (newTime / totalTime) * 100;
          setProgress(Math.min(newProgress, 100));
          
          if (newProgress >= 100) {
            onStop();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [isActive, isPaused, totalTime, onStop]);
  
  const togglePause = () => {
    setIsPaused(!isPaused);
    
    if (isPaused) {
      // Resume speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      speechSynthesis.speak(utterance);
    } else {
      // Pause speech
      speechSynthesis.pause();
    }
  };
  
  const handleStop = () => {
    speechSynthesis.cancel();
    setElapsedTime(0);
    setProgress(0);
    onStop();
  };
  
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800/50 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-blue-700 dark:text-blue-300">Reading Aloud</span>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {formatTime(elapsedTime)} / {formatTime(totalTime)}
        </div>
      </div>
      
      <Progress value={progress} className="h-1.5 mb-3" />
      
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 px-3"
          onClick={togglePause}
        >
          {isPaused ? (
            <>
              <Play className="h-3 w-3 mr-1" /> Resume
            </>
          ) : (
            <>
              <Pause className="h-3 w-3 mr-1" /> Pause
            </>
          )}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 px-3" 
          onClick={handleStop}
        >
          <VolumeX className="h-3 w-3 mr-1" /> Stop
        </Button>
      </div>
    </div>
  );
};

export default ReadAloudSection;
