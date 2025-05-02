
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Play, Pause, RefreshCw } from 'lucide-react';

const BreathingExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('prepare');
  const [seconds, setSeconds] = useState(3);
  
  const phases = {
    prepare: { text: "Get ready...", duration: 3 },
    inhale: { text: "Breathe in...", duration: 4 },
    hold: { text: "Hold...", duration: 4 },
    exhale: { text: "Breathe out...", duration: 6 },
    rest: { text: "Rest...", duration: 2 },
  };
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isActive) {
      timer = setInterval(() => {
        if (seconds > 1) {
          setSeconds(seconds - 1);
        } else {
          // Move to next phase
          switch (currentPhase) {
            case 'prepare':
              setCurrentPhase('inhale');
              setSeconds(phases.inhale.duration);
              break;
            case 'inhale':
              setCurrentPhase('hold');
              setSeconds(phases.hold.duration);
              break;
            case 'hold':
              setCurrentPhase('exhale');
              setSeconds(phases.exhale.duration);
              break;
            case 'exhale':
              setCurrentPhase('rest');
              setSeconds(phases.rest.duration);
              break;
            case 'rest':
              setCurrentPhase('inhale');
              setSeconds(phases.inhale.duration);
              break;
            default:
              break;
          }
        }
      }, 1000);
    }
    
    return () => clearInterval(timer);
  }, [isActive, seconds, currentPhase]);
  
  const toggleExercise = () => {
    if (!isActive && currentPhase === 'rest') {
      // Reset to inhale if restarting after rest
      setCurrentPhase('inhale');
      setSeconds(phases.inhale.duration);
    } else if (!isActive) {
      setCurrentPhase('prepare');
      setSeconds(phases.prepare.duration);
    }
    setIsActive(!isActive);
  };
  
  const resetExercise = () => {
    setIsActive(false);
    setCurrentPhase('prepare');
    setSeconds(phases.prepare.duration);
  };
  
  const getBackgroundSize = () => {
    if (currentPhase === 'inhale') {
      return (1 - seconds / phases.inhale.duration) * 100;
    } else if (currentPhase === 'exhale') {
      return 100 - (1 - seconds / phases.exhale.duration) * 100;
    } else if (currentPhase === 'hold') {
      return 100;
    } else {
      return 0;
    }
  };
  
  return (
    <Card>
      <CardContent className="pt-6 px-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-medium">4-4-6 Breathing</h3>
            <p className="text-sm text-muted-foreground">
              A simple breathing exercise to help reduce stress and anxiety
            </p>
          </div>
          
          <div className="relative w-48 h-48 flex items-center justify-center">
            <motion.div 
              className="absolute w-full h-full rounded-full bg-blue-100 dark:bg-blue-900/40"
              animate={{
                scale: currentPhase === 'inhale' ? [1, 1.2] :
                        currentPhase === 'hold' ? 1.2 :
                        currentPhase === 'exhale' ? [1.2, 1] : 1,
              }}
              transition={{ 
                duration: currentPhase === 'inhale' ? phases.inhale.duration : 
                           currentPhase === 'exhale' ? phases.exhale.duration : 0.2
              }}
            />
            <div className="z-10 text-center">
              <p className="text-xl font-bold">{seconds}</p>
              <p className="text-sm">{phases[currentPhase as keyof typeof phases]?.text}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={toggleExercise}
              className="flex items-center gap-1"
            >
              {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isActive ? "Pause" : "Start"}
            </Button>
            
            <Button
              variant="outline"
              onClick={resetExercise}
              className="flex items-center gap-1"
            >
              <RefreshCw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreathingExercise;
